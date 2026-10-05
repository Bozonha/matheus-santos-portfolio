import { defineConfig } from "vitest/config";
import path from "node:path";

const rootDir = import.meta.dirname;

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
    exclude: ["node_modules", "out", ".next", "server-extension", "tests/**"],
    coverage: {
      provider: "v8",
      include: ["lib/demos/**", "lib/dayCycle/progress.ts"],
      thresholds: {
        lines: 90,
        statements: 90,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "."),
    },
  },
});
