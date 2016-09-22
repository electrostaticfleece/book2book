var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

var commonLoaders = [
  {
    /*
     * TC39 categorises proposals for babel in 4 stages
     * Read more http://babeljs.io/docs/usage/experimental/
     */
    test: /\.js$|\.jsx$/,
    loader: 'babel-loader',
    // Reason why we put this here instead of babelrc
    // https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
    query: {
      presets: ['es2015', 'react', 'stage-0'],
      plugins: ['transform-decorators-legacy']
    },
    exclude: path.join(__dirname, '..', 'node_modules')
  },
  { test: /\.json$/, loader: 'json-loader' }
];

module.exports = {
    // The configuration for the server-side testing
  name: 'server-side testing',
  target: 'node',
  module: {
    loaders: commonLoaders
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEVCLIENT__: false,
      __DEVSERVER__: true
    }),
    new webpack.IgnorePlugin(/vertx/)
  ]
};