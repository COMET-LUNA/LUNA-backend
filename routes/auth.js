// const users = require('../data/users.json')
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} = require("firebase/auth")
const {doc, getFirestore, collection, query, where, getDocs, addDoc, updateDoc} = require('firebase/firestore')

var express = require('express')
var router = express.Router()
router.use(express.json())

const firestore = getFirestore();
const usersDb = collection(firestore, 'users')

async function getUserData(email){
  const q = query(usersDb, where("personal.emailAddress", "==", email))
  return getDocs(q).then(data => {
    var userData = {}
    data.forEach(doc => {
      // console.log(doc.data())
      userData = doc.data()
    })
    return userData
  })
}

router.post('/login', function(req, res){
  console.log(req.body.email)
  const email = req.body.email
  const password = req.body.password

  const auth = getAuth()
  
  // verify logic
  signInWithEmailAndPassword(auth, email, password).then(user => {
    getUserData(user.user.email).then(userData => res.status(200).send({userData}))
  }).catch((error) => {
    console.log(error)
    const errorCode = error.code;
    const errorMessage = error.message;
    res.status(500).send({errorCode, errorMessage})
  })
})

router.post('/register', async function (req, res) {
  const userData = req.body.userData
  
  const firestore = getFirestore();
  const usersDb = collection(firestore, 'users')

  const auth = getAuth()

  createUserWithEmailAndPassword(auth, userData.personal.emailAddress, userData.security.password)
  .then((userCredential) => {
    // Signed in 
    // const user = userCredential.user;

    // Add User Data to Database
    let {personal, medical} = userData     

    try{
      addDoc(usersDb, {
        personal,
        medical
      })
    } catch (e) {
      console.log(e)
    }

    const userReturn = {personal, medical}
    console.log(userReturn)

    res.status(200).send({userReturn})
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error)
    res.status(500).send({errorCode, errorMessage})
  });
})

router.post('/update', async function(req,res) {
  const userData = req.body.userData
  console.log(req.body)

  let userId = null
  await getDocs(query(usersDb, where("personal.emailAddress", "==", userData.personal.emailAddress))).then(data => {
    data.forEach(doc => {
      userId = doc.id
    })
  })
  
  console.log(userId)
  const firestore = getFirestore();
  const usersRef = doc(firestore, 'users', userId)

  try { 
    await updateDoc(usersRef, userData) 
    const successMessage = "Account has been successfully updated."
    res.status(200).send({successMessage, userData})
  }
  catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error)
    res.status(500).send({errorCode, errorMessage})
  }
})

module.exports = router