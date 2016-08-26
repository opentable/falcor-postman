import {renderToString as render} from 'react-dom/server'
import React from 'react'
import App from './app'

module.exports = (options) =>
  (req, res, next) => {
    const endpointRegExp = new RegExp(options.middlewarePath, 'i');
    if (endpointRegExp.test(req.url)) {
      // TODO: pass queryString Params as props to the rendered component
      // TODO: add sfx bundle
      const html =
        `
        <!DOCTYPE html>
          <div id="app">${render(<App falcorPath={options.falcorPath} />)}</div>
        `
      res.status(200).send(html)
    }
    next()
  }