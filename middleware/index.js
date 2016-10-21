const express = require('express');
const path = require('path');

module.exports = ({ middlewarePath = '/falcor-postman', app }) => {
  app.use(express.static(path.join(__dirname, '/../dist/'), { redirect: false }));

  return (req, res, next) => {
    const regexp = new RegExp(`${middlewarePath}(/.*)?$`);
    if (regexp.test(req.url)) {
      res.status(200);
      res.sendFile(path.join(__dirname, '/../dist/falcor-postman.html'));
      return;
    }
    next();
  };
};
