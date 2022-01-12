const { loadDiagnosis } = require('../ApiMedic/apiService')
const Config = require('../ApiMedic/config')
var doctors = require('../data/doctors.json')

// // {
//     "sex": "Male",
//     "name": "Henry Vanakin",
//     "specialization": "Gastroenterology",
//     "price_range": "501-1000",
//     "clinic_address": "Davao City",
//     "clinic_location": "Southern Philippines Medical Center",
//     "med_school": "St.Luke's",
//     "birthyear": 1987,
//     "startyear": 2015
//   },

async function Recommend(data){
    const  { symptoms, location, age, price, experience, sex, userSex, userYearBirth } = data
    const results = await loadDiagnosis(symptoms, userSex, userYearBirth)

    // console.log(results[0])
    // console.log(results[0].Specialisation[0].Name, location, price, sex)

    var recommendations = doctors;
    // console.log(doctors)
    const today = new Date()
    const thisYear = today.getFullYear()
    
    recommendations = recommendations.filter((obj) => {
        return obj.specialization === results[0].Specialisation[0].Name
    })

    specRecom = recommendations
    // console.log("After specialization: ")
    // console.log(recommendations)
    recommendations = recommendations.filter( (obj) => {
        return obj.clinic_address == location
    })
    // console.log("After location: ")
    // console.log(recommendations)
    recommendations = recommendations.filter( (obj) => {
        return obj.price_range == price
    })
    const secondRecommendations = recommendations;
    // console.log("After price: ")
    // console.log(recommendations)
    recommendations = recommendations.filter( (obj) => {
        const docExperience = thisYear - obj.startyear
        return docExperience >= experience 
    })
    // console.log("After experience: ")
    // console.log(recommendations)
    recommendations = recommendations.filter( (obj) => {
        const docAge = thisYear - obj.birthyear
        if (age == -1){
            return true
        } else {
            if (age == 30)
            {
                return docAge <= 30
            }
            if (age == 45)
            {
                return docAge > 30 && docAge <= 45
            }
            if (age == 46)
            {
                return docAge >= 46
            }
        }
    })
    // console.log("After age: ")
    // console.log(recommendations)
    recommendations = recommendations.filter( (obj) => {
        return obj.sex == sex
    })
    console.log("After sex: ")
    console.log(recommendations)
    
    const firstRecommendations = recommendations

    return {
        firstRecommendations: recommendations, 
        secondRecommendations: secondRecommendations,
        specRecommendations: specRecom,
        diagnosis: results
    }
}

module.exports = {Recommend}