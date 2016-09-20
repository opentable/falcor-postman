/* eslint no-console: off */

const express = require('express')
const path = require('path')
const falcorExpress = require('falcor-express')
const Router = require('falcor-router')

const app = express()

const options = {
  middlewarePath: '/falcor-postman',
  falcorPath: '/model.json',
  app
}

// app.use(express.static(path.join(__dirname, 'public')))

const falcorPostman = require('./')(options)

app.use(falcorPostman)

app.use(options.falcorPath, falcorExpress.dataSourceRoute((req, res) => {
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

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`go to http://0.0.0.0:${port}${options.middlewarePath}`))
