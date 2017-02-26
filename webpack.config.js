const HtmlWebpackPlugin = require('html-webpack-plugin');
const html = new HtmlWebpackPlugin({
  title: 'App'
});

const js = {
    exclude: /(node_modules)/,
  test: /\.js[x]?$/,
  loader: 'babel-loader',
  query: {
    plugins: ['transform-object-rest-spread']
  }
};

const css = {
  test: /\.css$/,
  loader: 'style-loader!css-loader'
};

module.exports = {
  cache: true,
  entry: [
    'webpack/hot/dev-server',
    './src/index.js'
  ],
  output: {
    filename: 'dist/bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [js, css]
  },
  plugins: [html]
};
