/* eslint no-console: "off" */

const express = require('express')
const falcorExpress = require('falcor-express')
const Router = require('falcor-router')
const falcorPostman = require('./../falcor-postman.js')
const app = express()
const isDevelopment = process.env.NODE_ENV !== 'production'
const port = process.env.PORT ? process.env.PORT : 3000

if (isDevelopment) {
  require('./webpackServeBundle')(app)
} else {
  app.use(falcorPostman({
    // # middlewarePath
    // Optional: path used to serve the falcor-postman app, default: '/falcor-postman'
    // middlewarePath: '/falcor-postman',

    // # falcorPath
    // Optional: falcor model path, default: localhost/model.json
    // falcorPath: '/model.json',

    // Express app
    app
  }))
}


app.use('/model.json', falcorExpress.dataSourceRoute((req, res) => {
  const router = new Router([
    {
      route: 'metrosById[{integers:ids}]["name"]',
      get(pathSet) {
        const metros = [
          { id: 4, name: 'San Francisco' },
          { id: 72, name: 'London' },
        ]

        const results = []
        metros.forEach((metro) => {
          pathSet[1].forEach((metroId) => {
            if (metro.id === metroId) {
              results.push({
                path: ['metrosById', metro.id, 'name'],
                value: metro.name,
              })
            }
          }, this)
        }, this)

        results.push({
          path: ['metrosById', 72, 'name'],
          value: 'London',
        })
        return results
      },
    },
  ])
  return router
}))


app.listen(port, () => console.log(`go to http://0.0.0.0:${port}`))
