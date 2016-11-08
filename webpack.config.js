const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const { name, version } = require('./package.json');

const TARGET = process.env.npm_lifecycle_event;
const title = `${name} v${version}`;

const htmlWebpackPluginOptions = {
  title,
  template: 'src/static/template.html',
  inject: 'body',
  filename: 'falcor-postman.html'
};

const common = {
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};

if (TARGET === 'start') {
  module.exports = merge(common, {
    devtool: 'eval-source-map',

    entry: [
      'webpack-hot-middleware/client?reload=true',
      path.join(__dirname, 'src/main.jsx')
    ],

    output: {
      path: path.join(__dirname, '/dist/'),
      filename: '[name].js',
      publicPath: '/'
    },

    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015', 'react-hmre']
          }
        },
        {
          test: /\.(css|scss)$/,
          loaders: ['style', 'css', 'sass']
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin(htmlWebpackPluginOptions),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ]
  });
}

if (TARGET === 'build') {
  module.exports = merge(common, {
    entry: [
      path.join(__dirname, 'src/main.jsx')
    ],

    output: {
      path: path.join(__dirname, '/dist/'),
      filename: '[name]-[hash].min.js',
      publicPath: '/'
    },

    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015']
          }
        },
        {
          test: /\.(css|scss)$/,
          loader: ExtractTextPlugin.extract(
            'style',
            'css!sass'
          )
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin(htmlWebpackPluginOptions),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
          screw_ie8: true
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new ExtractTextPlugin('[hash].css', { allChunks: true }),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compressor: { warnings: false }
      })
    ]
  });
}
