const express = require('express')
const {initializeApp} = require('firebase/app')

const firebaseConfig = {
  apiKey: "AIzaSyCMittekZsL95o57e6kyERNtnd7pwZL8fk",
  authDomain: "luna-doctor-finder.firebaseapp.com",
  projectId: "luna-doctor-finder",
  storageBucket: "luna-doctor-finder.appspot.com",
  messagingSenderId: "642725602228",
  appId: "1:642725602228:web:87a40fdb2a4d70340248e1",
  measurementId: "G-01SJDX2TFB"
};


// Initialize Firebase
initializeApp(firebaseConfig)

const app = express()
const port = process.env.PORT || 3030

var cors = require('cors')

app.use(cors())

var findMeRouter = require('./routes/findMe')
app.use("/", findMeRouter);

var authRouter = require('./routes/auth')
app.use("/", authRouter)

var historyRouter = require('./routes/history')
app.use("/", historyRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})