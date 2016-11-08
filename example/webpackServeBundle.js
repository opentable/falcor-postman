const path = require('path');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./../webpack.config.js');

module.exports = (options) => {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
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

  options.app.use(middleware);
  options.app.use(webpackHotMiddleware(compiler));
  options.app.get(options.middlewarePath, (req, res) => {
    res.status(200);
    const html = middleware.fileSystem.readFileSync(path.join(__dirname, '/../dist/falcor-postman.html'))
      .toString()
      .replace(/{{falcor-model-path}}/g, options.falcorModelPath);
    res.send(html);
  });
};
