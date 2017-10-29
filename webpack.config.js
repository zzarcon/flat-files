const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
  entry: './example/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'flatFiles',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: [
    new CheckerPlugin()
  ]
};