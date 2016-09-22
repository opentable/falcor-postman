import { renderToString as render } from 'react-dom/server'
import React from 'react'
import App from './app/app'
import express from 'express'
import path from 'path'

module.exports = ({middlewarePath='/falcor-postman', app}) => {
  app.use(express.static(path.join(__dirname, 'public')))

  return (req, res, next) => {
    if (req.url === middlewarePath) {
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
}
