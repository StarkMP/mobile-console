const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.ts', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  target: 'web',
  entry: {
    index: path.resolve(__dirname, '../src/index.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    library: 'mobile-console',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true,
  },
  plugins: [new CleanWebpackPlugin()],
};
