/* eslint no-console: off */
const express = require('express');
const falcorExpress = require('falcor-express');
const Router = require('falcor-router');
const falcorPostman = require('./../falcor-postman.js');
const webpackServeBundle = require('./webpackServeBundle');

const app = express();
const isDevelopment = process.env.NODE_ENV !== 'production';

const middlewarePath = '/falcor-postman';
const falcorModelPath = '/example.json';

const options = { middlewarePath, falcorModelPath, app };

if (isDevelopment) {
  webpackServeBundle(app);
} else {
  app.use(falcorPostman(options));
}

app.use(falcorModelPath, falcorExpress.dataSourceRoute(() => {
  const router = new Router([
    {
      route: 'metrosById[{integers:ids}]["name"]',
      get(pathSet) {
        const metros = [
            { id: 4, name: 'San Francisco' },
            { id: 72, name: 'London' },
            { id: 201, name: 'Tokio' }
        ];

        const results = [];
        metros.forEach((metro) => {
          pathSet[1].forEach((metroId) => {
            if (metro.id === metroId) {
              results.push({
                path: ['metrosById', metro.id, 'name'],
                value: metro.name
              });
            }
          }, this);
        }, this);

        return results;
      }
    }
  ]);
  return router;
}));

const port = process.env.PORT ? process.env.PORT : 3000;
app.listen(port, () => console.log(`go to http://127.0.0.1:${port}${middlewarePath}`));
