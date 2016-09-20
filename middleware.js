import { renderToString as render } from 'react-dom/server'
import React from 'react'
import express from 'express'
import path from 'path'
import jspm from 'jspm'

import App from './app/app'

const builder = new jspm.Builder()

module.exports = (options) => {
  options.app.use(express.static(path.join(__dirname, 'node_modules/systemjs/dist')))
  return (req, res, next) => {
    if (req.url === options.middlewarePath) {
      builder.bundle('index.js', {
        minify: true
      })
        .then(function (output) {
          const html =
            `
            <!DOCTYPE html>
              <div id="app"></div>
              <script src="/system.js"></script>
              <script>${output.source}</script>
              <script>System.import('index.js')</script>
            `
          res.status(200)
          res.send(html)
          return
        })
    } else {
      next()
    }
  }
}
