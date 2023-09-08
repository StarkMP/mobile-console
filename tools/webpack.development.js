const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  devtool: 'source-map',
  context: path.resolve(__dirname, '../src'),
  entry: {
    bundle: './index.ts',
  },
  output: {
    filename: '[name].[contenthash:8].js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../example/index.html'),
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 3030,
    watchContentBase: true,
    progress: true,
  },
};
