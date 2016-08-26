const express = require('express')
const app = express()
const fqt = require('./')('morla')

app.use(fqt)
app.listen(3000, () => console.log('Listening on port 3000'))