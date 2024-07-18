import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      formats: ["es"],
      entry: "src/virtual-file.js",
    },
  },
  plugins: [
    {
      name: "resolve-id",
      resolveId(id) {
        if (!id.endsWith("virtual-file")) return undefined;
        console.log(id);
        return resolve("main.js");
      },
    },
  ],
});
