const express = require('express')
const app = express()

app.listen(3000, function() {
  console.log('listening on 3000')
})

app.post('/messages', function (request, response) {
  console.log('wee')
})