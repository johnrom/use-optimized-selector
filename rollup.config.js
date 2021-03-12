import package from "./package.json";

const extensions = [".ts"];

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: package.main,
        format: "cjs",
      },
      {
        file: package.module,
        format: "es",
      },
    ],
    plugins: [
      resolve({
        extensions, //specifies the extensions of files that the plugin will operate on
      }),
    ],
  },
];
