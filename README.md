# falcor-postman

A graphical interactive in-browser [Falcor](https://netflix.github.io/falcor/) queries validator IDE.

## Usage

Npm install using the following command:

```
npm install --save falcor-postman
```

And use it inside your Express app:

```javascript
const falcorPostman = require('falcor-postman');

const app = express();

const options = { middlewarePath: '/falcor-postman', falcorPath: '/model.json', app };

app.use(falcorPostman(options));
```

Where **options** is an object with the following properties:

name|type|description|default
---|---|---|---|---
middlewarePath|_string_|Optional: path used to serve the falcor-postman app|'/falcor-postman'|
falcorPath|_string_|Optional: falcor model path|'/model.json'|
app|_object_|The instance of your Express.js app|app

## UI

![falcor-postman UI](falcor-postman-ui.png "falcor-postman UI")

> Query: `[["metrosById", [201], ["name"]]]`

## Example

Clone or download this GitHub repository then run the example app using the following npm commands:

```
npm install

npm run start
```

> You should be able to open your browser and see the middleware running at the following URL: [http://127.0.0.1:3000/falcor-postman](http://127.0.0.1:3000/falcor-postman)
