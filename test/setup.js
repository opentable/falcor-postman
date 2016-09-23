 var jsdom = require('jsdom').jsdom;
    document = jsdom('hello world');
    window = document.defaultView;
    navigator = window.navigator;
    window.localStorage = window.sessionStorage = {
        getItem: function (key) {
            return this[key];
        },
        setItem: function (key, value) {
            this[key] = value;
        }
    };
