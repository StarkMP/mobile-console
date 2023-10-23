import path, { resolve } from "path";
import { ConfigEnv, defineConfig, UserConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const commonConfig = {
    base: "./",
    resolve: {
      alias: {
        "@core": path.resolve(__dirname, "./src/core"),
        "@templates": path.resolve(__dirname, "./src/templates"),
        "@typings": path.resolve(__dirname, "./src/typings"),
      },
    },
  };

  // library build
  if (mode === "production") {
    return {
      ...commonConfig,
      plugins: [dts({ include: ["src"] })],
      build: {
        lib: {
          entry: resolve(__dirname, "src/index.ts"),
          name: "mobile-console",
          fileName: "mobile-console",
        },
      },
    };
  }

  // development mode
  return {
    ...commonConfig,
    root: "./example",
  };
});
