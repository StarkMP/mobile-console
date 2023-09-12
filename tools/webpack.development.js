/* eslint-disable @typescript-eslint/no-var-requires */
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const webpackCommonConfig = require("./webpack.common");

module.exports = {
  ...webpackCommonConfig,
  devtool: "source-map",
  entry: {
    bundle: "./example/index.ts",
  },
  output: {
    filename: "[name].[contenthash:8].js",
    path: path.resolve(__dirname, "../dist"),
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "../example/index.html"),
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    compress: true,
    port: 3030,
    watchContentBase: true,
    progress: true,
  },
};
