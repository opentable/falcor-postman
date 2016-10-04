/* eslint no-global-assign: "off" */
const jsdom = require('jsdom').jsdom;

document = jsdom('hello world');
window = document.defaultView;
navigator = window.navigator;
window.localStorage = window.sessionStorage = {
  getItem(key) {
    return this[key];
  },
  setItem(key, value) {
    this[key] = value;
  }
};
