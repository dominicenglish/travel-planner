var path = require('path');
var webpack = require('webpack');

module.exports = {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './client/client.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loaders: ['babel'],
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'api'),
          path.join(__dirname, 'shared')
        ]
      },
      {
        test: /\.css?/,
        loader: 'style!css'
      },
      {
        test   : /\.(ttf|eot|svg|woff(2)?)?$/,
        loader : 'file-loader'
      }
  ]
  }
};
