const express = require('express')
const app = express()
const path = require('path')
var falcorExpress = require('falcor-express')
var Router = require('falcor-router')

const options = {
  middlewarePath: '/falcor-postman',
  falcorPath: '/model.json'
}

app.use(express.static(path.join(__dirname, 'public')))

const falcorPostman = require('./')(options)
app.use(falcorPostman)

app.use(options.falcorPath, falcorExpress.dataSourceRoute(function (req, res) {

  var router = new Router([
    {
      route: 'metrosById[{integers:ids}]["name"]',
      get(pathSet) {
        const results = []
        results.push({
          path: ['metrosById', 72, 'name'],
          value: 'London'
        })
        return results;
      }
    }
  ]);
  return router;
}));

app.listen(3000, () => console.log('Listening on port 3000'))