const express = require('express');
const path = require('path');
const fs = require('fs');

module.exports = ({ middlewarePath = '/falcor-postman', falcorModelPath = '/model.json', app, fileSystem = fs }) => {
  app.use(express.static(path.join(__dirname, '/../dist/'), { redirect: false }));

  return (req, res, next) => {
    const regexp = new RegExp(`${middlewarePath}(/.*)?$`);
    if (regexp.test(req.url)) {
      res.status(200);
      const html = fileSystem.readFileSync(path.join(__dirname, '/../dist/falcor-postman.html'))
        .toString()
        .replace(/{{falcor-model-path}}/g, falcorModelPath);
      res.send(html);
      return;
    }
    next();
  };
};
