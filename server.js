const express = require('express')
const app = express()
const parser = require('body-parser')
const sha256 = require('js-sha256')
const url = 'mongodb://localhost:27017/test'
const db = require('./db')

app.use(parser.json())

app.post('/messages', function (request, response) {
	console.log(db.set)
	var s = sha256(request.body.message)
  db.set(s, request.body.message)
  response.setHeader('Content-Type', 'application/json')
  response.send(JSON.stringify({"digest" : s}, null, 3) + '\n')
})

app.get('/messages/:sha', function (request, response) {
	console.log(request.param('sha'))
	db.get(request.param('sha'), function(res) {
		if (res === 'not found') {
			response.status(404).send('Not Found')
		} else {
			response.setHeader('Content-Type', 'application/json')
		  response.send(JSON.stringify({"message" : res}, null, 3) + '\n')
	  }
	})
})

// Connect to Mongo on start
db.connect('mongodb://localhost:27017/test', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(3000, function() {
      console.log('Listening on port 3000...')
    })
  }
})