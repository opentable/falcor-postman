import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import model from './model'
import 'normalize.css'
import './static/css/styles.scss'

const props = {
  model,
  falcorPath: '/model.json',
}

ReactDOM.render(<App {...props} />, document.getElementById('app'))
