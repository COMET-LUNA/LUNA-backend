const {getFirestore, collection, query, where, getDocs} = require('firebase/firestore')

var express = require('express')
var router = express.Router()
router.use(express.json())

const firestore = getFirestore();
const findMeHistoryDb = collection(firestore, 'findmehistory')

router.post('/history', function (req, res) {
  // ApiService.loadDiagnosis(selectedSymptoms, gender, year_of_birth).then(data => res.send(data))

  // res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body)

  const q = query(findMeHistoryDb, where("email", "==", req.body.email))
  getDocs(q).then(data => {
    var historyData = []
    data.forEach(doc => {
      // console.log(doc.data())
      historyData.push(doc.data())
    })
    res.send({historyData})
  })
  
})

module.exports = router