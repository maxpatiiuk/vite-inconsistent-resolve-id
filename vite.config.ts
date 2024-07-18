import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      formats: ["es"],
      entry: "virtual-file.js",
    },
  },
  plugins: [
    {
      name: "resolve-id",
      resolveId(id): string | undefined {
        // On Windows, during build, this is called with an absolute path like C:\Users\root\... rather than C:/Users/root/...
        if (!id.endsWith("virtual-file.js")) {
          return undefined;
        }
        console.log("resolveId called with: ", id);
        return resolve("main.js");
      },
    },
  ],
});
