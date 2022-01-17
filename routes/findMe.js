const Recommender = require('../recommender/recommender')

var express = require('express')

var router = express.Router()

router.use(express.json())


router.post('/findMe', function (req, res) {
  // ApiService.loadDiagnosis(selectedSymptoms, gender, year_of_birth).then(data => res.send(data))

  // res.header("Access-Control-Allow-Origin", "*");

  console.log(req.body)
  let data = {
    symptoms: req.body.querySymptoms.split(','),
    userSex: req.body.usersex,
    userYearBirth: req.body.useryearbirth,
    location: req.body.location,
    age: req.body.age,
    experience: req.body.experience,
    price: req.body.price,
    sex: req.body.sex,
  }

  console.log(data)

  Recommender.Recommend(data).then((data) => {
    res.send(data)
  })
  
})

module.exports = router