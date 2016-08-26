import {renderToString as render} from 'react-dom/server'
import React from 'react'
import App from './app'

module.exports = (endpoint) =>
  (req, res, next) => {
    const endpointRegX = new RegExp(endpoint, 'i');
    if (endpointRegX.test(req.url)) {
      // TODO: pass queryString Params as props to the rendered component
      // TODO: add sfx bundle
      const html = `
        <!DOCTYPE html>		
          <div id="app">${render(<App  name={endpoint}/>)}</div>		
      `
      res.status(200).send(html)
    }
    next()
  }