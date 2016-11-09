const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./../webpack.config.js');
const falcorPostman = require('./../falcor-postman.js');

module.exports = (options) => {
  const compiler = webpack(config);
  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });
  const hotMiddleware = webpackHotMiddleware(compiler);

  options.app.use(devMiddleware);
  options.app.use(hotMiddleware);
  const optionsWithFileSystem = Object.assign({}, options);
  optionsWithFileSystem.fileSystem = devMiddleware.fileSystem;
  options.app.use(falcorPostman(optionsWithFileSystem));
};
