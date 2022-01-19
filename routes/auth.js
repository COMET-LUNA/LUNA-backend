// const users = require('../data/users.json')
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} = require("firebase/auth")
const {getFirestore, collection, query, where, getDocs} = require('firebase/firestore')

var express = require('express')
var router = express.Router()
router.use(express.json())

const firestore = getFirestore();
const usersDb = collection(firestore, 'users')

router.post('/login', function(req, res){
  console.log(req.body)
  const email = req.body.email
  const password = req.body.password
  var status = "wrong_creds" // ok, wrong_creds, error_server

  const auth = getAuth()
  
  // verify logic
  signInWithEmailAndPassword(auth, email, password).then(user => {
    status = "ok"
    console.log(user.user.email)
    const q = query(usersDb, where("email", "==", user.user.email))
    getDocs(q).then(data => {
      var userData = {}
      data.forEach(doc => {
        // console.log(doc.data())
        userData = doc.data()
      })
      res.send({userData, status})
    })
  }).catch((error) => {
    console.log(error.code, error.message)
    res.send({status})
  })
})

router.post('/register', function (req, res) {

})

module.exports = router