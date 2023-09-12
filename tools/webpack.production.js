/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpackCommonConfig = require("./webpack.common");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  ...webpackCommonConfig,
  target: "web",
  entry: {
    index: path.resolve(__dirname, "../src/index.ts"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist"),
    library: "mobile-console",
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true,
  },
  plugins: [new CleanWebpackPlugin()],
};
