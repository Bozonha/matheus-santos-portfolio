import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

async function fetchGoogleFontTtf(family, weight) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`;
  const css = await fetch(cssUrl, {
    // Google serve .ttf (em vez de .woff2) para user-agents antigos, que o
    // satori consegue ler diretamente sem precisar converter o formato.
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1)" },
  }).then((res) => res.text());

  const match = css.match(/src: url\(([^)]+\.ttf)\)/);
  if (!match) {
    throw new Error(`Nao encontrei URL de fonte ttf para ${family} ${weight}`);
  }
  const fontResponse = await fetch(match[1]);
  return Buffer.from(await fontResponse.arrayBuffer());
}

const WIDTH = 1200;
const HEIGHT = 630;

const NIGHT = {
  bg: "#0b1220",
  fg: "#e9edf5",
  muted: "#a8b3c7",
  accent: "#f2994a",
};

const copy = {
  pt: {
    eyebrow: "23h47 — consultoria em tecnologia",
    title: "O negócio fecha. O atendimento, não.",
    name: "Matheus Santos",
    role: "Consultor em Tecnologia e Melhoria Contínua",
  },
  en: {
    eyebrow: "11:47 PM — technology consulting",
    title: "The shop closes. The support doesn't.",
    name: "Matheus Santos",
    role: "Technology & Continuous Improvement Consultant",
  },
};

function card(locale) {
  const c = copy[locale];
  return {
    type: "div",
    props: {
      style: {
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        backgroundColor: NIGHT.bg,
        color: NIGHT.fg,
        fontFamily: "Bricolage Grotesque",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: 28,
              color: NIGHT.accent,
              letterSpacing: "0.02em",
            },
            children: c.eyebrow,
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: "920px",
            },
            children: c.title,
          },
        },
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column", gap: "6px" },
            children: [
              {
                type: "div",
                props: { style: { fontSize: 32, fontWeight: 700 }, children: c.name },
              },
              {
                type: "div",
                props: { style: { fontSize: 24, color: NIGHT.muted }, children: c.role },
              },
            ],
          },
        },
      ],
    },
  };
}

async function main() {
  const outDir = path.resolve(process.cwd(), "public", "og");
  await mkdir(outDir, { recursive: true });

  const [regular, bold] = await Promise.all([
    fetchGoogleFontTtf("Bricolage Grotesque", 400),
    fetchGoogleFontTtf("Bricolage Grotesque", 700),
  ]);

  const fonts = [
    { name: "Bricolage Grotesque", data: regular, weight: 400, style: "normal" },
    { name: "Bricolage Grotesque", data: bold, weight: 700, style: "normal" },
  ];

  for (const locale of ["pt", "en"]) {
    const svg = await satori(card(locale), { width: WIDTH, height: HEIGHT, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } });
    const png = resvg.render().asPng();
    await writeFile(path.join(outDir, `og-${locale}.png`), png);
    console.log(`OG image gerada: public/og/og-${locale}.png`);
  }
}

main().catch((error) => {
  console.error("Falha ao gerar imagens OG:", error);
  process.exit(1);
});
