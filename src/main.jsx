import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import model from './model';
import './static/css/styles.scss';

const falcorModelPath = document.getElementById('app').getAttribute('data-falcor-model-path');

const props = {
  model: model(falcorModelPath)
};

ReactDOM.render(<App {...props} />, document.getElementById('app'));
