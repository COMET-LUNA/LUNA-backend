const Recommend = require('../recommender/recommender')

var express = require('express')
var router = express.Router()

// selectedSymptoms,gender,yearOfBirth
var selectedSymptoms = [10,17]
var gender = 'male'
var year_of_birth = 1988

router.get('/', function (req, res) {
  // ApiService.loadDiagnosis(selectedSymptoms, gender, year_of_birth).then(data => res.send(data))

  let data = {
    symptoms: querySymptoms.split(','),
    gender: req.query.gender,
    year_of_birth: req.query.year_of_birth,
    location: req.query.location,
    age: req.query.age,
    experience: req.query.experience,
    price: req.query.price,
    sex: req.query.sex,
  }

  Recommend(data).then( (data) => {
    res.send(data)
  })
  
})

module.exports = router