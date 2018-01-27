const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const express = require('express')
var mongoose = require('mongoose')

let app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(errorhandler())

const url = 'mongodb://localhost:27017/edx-course-db'

mongoose.Promise = global.Promise
mongoose.connect(url)

var Account = mongoose.model('Account', 
                                {
                                  name: String,
                                  balance: Number })

app.get('/accounts', (req, res, next) => {
  Account.find({})
  .exec((err, accounts) => {
    if (err) return next(err)
    res.send(accounts)
  })
})

app.get('/accounts/:id', (req, res, next) => {
  Account.findById(req.params.id, (err, account) => {
    if (err) return next(err)
    res.send(account)
  })
})

app.post('/accounts', (req, res, next) => {
  let account = new Account({name: req.body.name, balance: req.body.balance});
  account.save((err, results) => {
    if (err) return next(err)
    res.send(results)
  })
})

app.put('/accounts/:id', (req, res, next) => {
  Account.findById(req.params.id, (err, account) => {
    
    if (err) return next(err);
  
    req.body.name ? account.name = req.body.name : null;
    req.body.balance ? account.balance = req.body.balance : null;

    account.save((error, updatedAccount) => {
      res.send(updatedAccount);
    });
  });
})

app.delete('/accounts/:id', (req, res, next) => {
  Account.remove({ _id: mongodb.ObjectID(req.params.id) }, (err) => { 
    if (err) return next(err); 
    res.send({"success": true})
  });
})


app.listen(3000)