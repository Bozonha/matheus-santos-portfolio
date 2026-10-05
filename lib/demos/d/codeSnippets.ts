export interface CodeSnippet {
  id: "power-query" | "python";
  language: string;
  title: string;
  code: string;
}

const POWER_QUERY_M = `// Pagina resultados de uma API de gestao ficticia ate a lista de itens vir vazia.
let
    BuscarPagina = (pagina as number) as record =>
        let
            url = "https://api.sistema-gestao.exemplo/v1/pedidos?page="
                & Number.ToText(pagina) & "&per_page=50",
            resposta = Json.Document(Web.Contents(url)),
            itens = resposta[data],
            temProxima = List.Count(itens) > 0
        in
            [Itens = itens, TemProxima = temProxima],

    // List.Generate funciona como um laco: comeca na pagina 1 e segue
    // enquanto TemProxima for verdadeiro, acumulando so os itens de cada pagina.
    Paginas = List.Generate(
        () => [Pagina = 1, Resultado = BuscarPagina(1)],
        each _[Resultado][TemProxima],
        each [Pagina = _[Pagina] + 1, Resultado = BuscarPagina(_[Pagina] + 1)],
        each _[Resultado][Itens]
    ),

    TodosOsItens = List.Combine(Paginas),
    Tabela = Table.FromRecords(TodosOsItens)
in
    Tabela
`;

const PYTHON = `import requests

API_URL = "https://api.sistema-gestao.exemplo/v1/pedidos"
PER_PAGE = 50


def buscar_todos_os_registros(session: requests.Session) -> list[dict]:
    """Percorre a API paginada ate a resposta vir sem itens."""
    registros = []
    pagina = 1

    while True:
        resposta = session.get(API_URL, params={"page": pagina, "per_page": PER_PAGE})
        resposta.raise_for_status()
        dados = resposta.json()
        itens = dados.get("data", [])

        if not itens:
            break

        registros.extend(itens)
        pagina += 1

    return registros


def validar(registros: list[dict]) -> list[dict]:
    """Descarta registros sem os campos obrigatorios."""
    obrigatorios = {"id", "valor", "data_pedido"}
    return [r for r in registros if obrigatorios.issubset(r.keys())]


if __name__ == "__main__":
    with requests.Session() as sessao:
        brutos = buscar_todos_os_registros(sessao)
        validos = validar(brutos)
        print(f"{len(validos)} de {len(brutos)} registros validos")
`;

export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: "power-query",
    language: "Power Query (M)",
    title: "Paginação no Power Query",
    code: POWER_QUERY_M,
  },
  {
    id: "python",
    language: "Python",
    title: "Paginação em Python",
    code: PYTHON,
  },
];
