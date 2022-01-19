// const users = require('../data/users.json')
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} = require("firebase/auth")

var express = require('express')
var router = express.Router()
router.use(express.json())

router.post('/login', function(req, res){
  console.log(req.body)
  const email = req.body.email
  const password = req.body.password
  var status = "wrong_creds" // ok, wrong_creds, error_server

  const auth = getAuth()
  
  // verify logic
  signInWithEmailAndPassword(auth, email, password).then(user => {
    status = "ok"
    res.send({status})
  }).catch((error) => {
    console.log(error.code, error.message)
    res.send({status})
  })
})

router.post('/register', function (req, res) {

})

module.exports = router