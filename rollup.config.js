import vue from "rollup-plugin-vue";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import clear from "rollup-plugin-clear";
import analyze from "rollup-plugin-analyzer";
import visualizer from "rollup-plugin-visualizer";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import dts from "rollup-plugin-dts";
const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
        banner: "/* eslint-disable */",
        globals: {
          vue: "Vue",
        },
      },
      {
        file: packageJson.main,
        format: "umd",
        name: "agora-lib",
        sourcemap: true,
        banner: "/* eslint-disable */",
        globals: {
          vue: "Vue",
        },
      },
    ],
    plugins: [
      clear({
        targets: ["./dist"],
        watch: true,
      }),
      nodeResolve(),
      typescript({
        tsconfig: "./rollup.tsconfig.json",
        exclude: ["**/example/**"],
      }),
      postcss({
        plugins: [autoprefixer(), cssnano()],
        extract: "css/index.css",
      }),
      vue({
        css: false,
      }),
      analyze({
        hideDeps: true,
        summaryOnly: true,
      }),
      visualizer(),
    ],
    external: ["vue"],
  },
  {
    input: "dist/esm/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    external: [/\.less$/],
    plugins: [dts()],
  },
];
