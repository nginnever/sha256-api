'use strict'

const MongoClient = require('mongodb').MongoClient

let db

exports.connect = function(url, done) {
  if (db) return done()

  MongoClient.connect(url, function(err, database) {
    if (err) return done(err)
    db = database
    done()
  })
}

exports.get = function(input, cb) {
  var collection = db.collection('hashes')
  //console.log(collection.find())
  collection.find({hash: input}).toArray(function(err, docs) {
    if(docs.length == 0) {
      cb('not found')
      return
    }

    cb(docs[0].message)
  })
  
}

exports.set = function(hash, message) {
  var collection = db.collection('hashes')
  collection.find({hash: hash}).toArray(function(err, res) {
    if (res.length != 0 ) {
      return
    }
    var m = {hash: hash, message: message}
    collection.insert(m, function(err, result) {
      console.log(result)
      console.log('saved to database')
    })
  })
}

exports.close = function(done) {
  if (db) {
    db.close(function(err, result) {
      db = null
      done(err)
    })
  }
}