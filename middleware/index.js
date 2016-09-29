import express from 'express'
import path from 'path'

module.exports = ({middlewarePath='/falcor-postman', app}) => {
  app.use(express.static(path.join(__dirname, '/../dist/')))

  return (req, res, next) => {
    if (req.url === middlewarePath) {
      res.status(200)
      res.sendFile(path.join(__dirname, '/../dist/falcor-postman.html'));
      return
    }
    next()
  }
}
