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

app.listen(3000, () => console.log('Listening on port 3000'))
