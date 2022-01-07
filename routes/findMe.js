const recommender = require('../recommender/recommender')

var express = require('express')
var router = express.Router()

// selectedSymptoms,gender,yearOfBirth
var selectedSymptoms = [10,17]
var gender = 'male'
var year_of_birth = 1988

router.get('/', function (req, res) {
  // ApiService.loadDiagnosis(selectedSymptoms, gender, year_of_birth).then(data => res.send(data))

  let selectedSymptoms = req.query.symptoms.split(',')
  
})

module.exports = router