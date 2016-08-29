const express = require('express')
const path = require('path')
const falcorExpress = require('falcor-express')
const Router = require('falcor-router')

const app = express()

const options = {
  middlewarePath: '/falcor-postman',
  falcorPath: '/model.json',
}

app.use(express.static(path.join(__dirname, 'public')))

const falcorPostman = require('./')(options)

app.use(falcorPostman)

app.use(options.falcorPath, falcorExpress.dataSourceRoute((req, res) => {
  const router = new Router([
    {
      route: 'metrosById[{integers:ids}]["name"]',
      get(pathSet) {
        const results = []
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

/* eslint no-console: "off" */

app.listen(port, () => console.log(`go to http://0.0.0.0:${port}${options.middlewarePath}`))
