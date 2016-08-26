const express = require('express')
const app = express()
const path = require('path')

const options = {
  middlewarePath: '/falcor-postman',
  falcorPath: '/model.json'
}

const falcorPostman = require('./')(options)
app.use(express.static(path.join(__dirname, 'public')))
app.use(falcorPostman)
app.listen(3000, () => console.log('Listening on port 3000'))