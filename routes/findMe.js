const Recommender = require('../recommender/recommender')

var express = require('express')

var router = express.Router()

router.use(express.json())

// selectedSymptoms,gender,yearOfBirth
var selectedSymptoms = [10,17]
var gender = 'male'
var year_of_birth = 1988

router.post('/', function (req, res) {
  // ApiService.loadDiagnosis(selectedSymptoms, gender, year_of_birth).then(data => res.send(data))

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