/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  resolve: {
    extensions: [".ts", ".json"],
    alias: {
      "@core": path.resolve(__dirname, "../src/core/"),
      "@templates": path.resolve(__dirname, "../src/templates/"),
      "@typings": path.resolve(__dirname, "../src/typings/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "../src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
};
