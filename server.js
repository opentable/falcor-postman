const express = require('express')
const app = express()

const options = {
  middlewarePath: '/falcor-postman',
  falcorPath: '/model.json'
}

const falcorPostman = require('./')(options)

app.use(falcorPostman)
app.listen(3000, () => console.log('Listening on port 3000'))