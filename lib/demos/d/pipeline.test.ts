import { describe, expect, it } from "vitest";
import {
  createInitialPipelineState,
  injectError,
  pausePipeline,
  startPipeline,
  tick,
} from "./pipeline";

function started() {
  return startPipeline(createInitialPipelineState());
}

/** Injeta erro 3 vezes seguidas na primeira etapa ate o pipeline falhar de vez. */
function failAfterThreeAttempts() {
  let state = tick(started(), "pt");
  for (let attempt = 1; attempt <= 3; attempt++) {
    state = injectError(state);
    state = tick(state, "pt"); // vira error
    if (attempt < 3) {
      state = tick(state, "pt"); // retrying
      state = tick(state, "pt"); // running de novo
    } else {
      state = tick(state, "pt"); // esgotou tentativas -> falha definitiva
    }
  }
  return state;
}

describe("createInitialPipelineState", () => {
  it("comeca com todas as etapas pendentes e nada rodando", () => {
    const state = createInitialPipelineState();
    expect(state.currentStepIndex).toBe(-1);
    expect(state.running).toBe(false);
    expect(state.completed).toBe(false);
    expect(state.failed).toBe(false);
    expect(state.steps.every((s) => s.status === "pending")).toBe(true);
  });
});

describe("tick — caminho feliz", () => {
  it("o primeiro tick inicia a primeira etapa (fetch)", () => {
    const state = tick(createInitialPipelineState(), "pt");
    expect(state.currentStepIndex).toBe(0);
    expect(state.steps[0]!.status).toBe("running");
    expect(state.logs.length).toBeGreaterThan(0);
  });

  it("avanca uma pagina por tick ate o total de paginas", () => {
    let state = tick(createInitialPipelineState(), "pt");
    for (let i = 0; i < 5; i++) state = tick(state, "pt");
    expect(state.currentPage).toBe(5);
    expect(state.recordsProcessed).toBe(5 * state.recordsPerPage);
  });

  it("marca fetch como sucesso depois da ultima pagina", () => {
    let state = tick(createInitialPipelineState(), "pt");
    for (let i = 0; i < 6; i++) state = tick(state, "pt");
    expect(state.steps[0]!.status).toBe("success");
  });

  it("avanca para a proxima etapa so num tick separado apos o sucesso", () => {
    let state = tick(createInitialPipelineState(), "pt");
    for (let i = 0; i < 6; i++) state = tick(state, "pt");
    expect(state.currentStepIndex).toBe(0);
    state = tick(state, "pt");
    expect(state.currentStepIndex).toBe(1);
    expect(state.steps[1]!.status).toBe("running");
  });

  it("completa o pipeline inteiro e para no final", () => {
    let state = createInitialPipelineState();
    for (let i = 0; i < 40 && !state.completed; i++) state = tick(state, "pt");
    expect(state.completed).toBe(true);
    expect(state.running).toBe(false);
    expect(state.steps.every((s) => s.status === "success")).toBe(true);
  });

  it("nao faz nada depois de completo", () => {
    let state = createInitialPipelineState();
    for (let i = 0; i < 40 && !state.completed; i++) state = tick(state, "pt");
    const afterCompletion = tick(state, "pt");
    expect(afterCompletion).toEqual(state);
  });

  it("o tempo decorrido cresce de forma previsivel a cada tick", () => {
    let state = createInitialPipelineState();
    expect(state.elapsedSeconds).toBe(0);
    state = tick(state, "pt");
    expect(state.elapsedSeconds).toBe(2);
    state = tick(state, "pt");
    expect(state.elapsedSeconds).toBe(4);
  });
});

describe("injectError e retentativa", () => {
  it("injectError nao faz nada se o pipeline nao estiver rodando", () => {
    const state = createInitialPipelineState();
    expect(injectError(state)).toEqual(state);
  });

  it("injectError marca pendingError quando a etapa atual esta rodando", () => {
    const state = tick(started(), "pt");
    const withError = injectError(state);
    expect(withError.pendingError).toBe(true);
  });

  it("o proximo tick aplica o erro: etapa falha e tentativa e contada", () => {
    let state = tick(started(), "pt");
    state = injectError(state);
    state = tick(state, "pt");
    expect(state.steps[0]!.status).toBe("error");
    expect(state.steps[0]!.attempts).toBe(1);
    expect(state.pendingError).toBe(false);
  });

  it("depois do erro, o tick seguinte entra em retrying e depois volta a rodar", () => {
    let state = tick(started(), "pt");
    state = injectError(state);
    state = tick(state, "pt"); // error
    state = tick(state, "pt"); // retrying
    expect(state.steps[0]!.status).toBe("retrying");
    state = tick(state, "pt"); // running de novo
    expect(state.steps[0]!.status).toBe("running");
  });

  it("depois de 3 falhas na mesma etapa, o pipeline para definitivamente", () => {
    const state = failAfterThreeAttempts();
    expect(state.steps[0]!.attempts).toBe(3);
    expect(state.failed).toBe(true);
    expect(state.running).toBe(false);
  });

  it("nao faz nada depois de uma falha definitiva", () => {
    const state = failAfterThreeAttempts();
    const after = tick(state, "pt");
    expect(after).toEqual(state);
  });

  it("o progresso de paginas nao e perdido ao retomar depois de um erro", () => {
    let state = tick(started(), "pt"); // inicia fetch
    state = tick(state, "pt"); // pagina 1
    state = tick(state, "pt"); // pagina 2
    expect(state.currentPage).toBe(2);

    state = injectError(state);
    state = tick(state, "pt"); // error
    state = tick(state, "pt"); // retrying
    state = tick(state, "pt"); // running de novo
    expect(state.currentPage).toBe(2);

    state = tick(state, "pt"); // pagina 3
    expect(state.currentPage).toBe(3);
  });
});

describe("startPipeline e pausePipeline", () => {
  it("startPipeline liga running", () => {
    const state = startPipeline(createInitialPipelineState());
    expect(state.running).toBe(true);
  });

  it("pausePipeline desliga running sem alterar o progresso", () => {
    let state = tick(createInitialPipelineState(), "pt");
    state = startPipeline(state);
    const paused = pausePipeline(state);
    expect(paused.running).toBe(false);
    expect(paused.currentStepIndex).toBe(state.currentStepIndex);
  });

  it("startPipeline nao reativa um pipeline ja concluido", () => {
    let state = createInitialPipelineState();
    for (let i = 0; i < 40 && !state.completed; i++) state = tick(state, "pt");
    const restarted = startPipeline(state);
    expect(restarted.running).toBe(false);
  });
});

describe("determinismo", () => {
  it("a mesma sequencia de operacoes produz sempre o mesmo resultado", () => {
    function run() {
      let state = started();
      for (let i = 0; i < 8; i++) state = tick(state, "pt");
      state = injectError(state);
      state = tick(state, "pt");
      return state;
    }
    expect(run()).toEqual(run());
  });
});
