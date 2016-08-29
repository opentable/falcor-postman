import { renderToString as render } from 'react-dom/server'
import React from 'react'
import App from './app/app'

module.exports = (options) =>
  (req, res, next) => {
    if (req.url === options.middlewarePath) {
      const html =
        `
        <!DOCTYPE html>
          <div id="app">${render(<App />)}</div>
          <script src="js/bundle-sfx.js" />
          <script>System.import('index.js')</script>
        `
      res.status(200)
      res.send(html)
      return
    }
    next()
  }
