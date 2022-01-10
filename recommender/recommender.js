const { loadDiagnosis } = require('../ApiMedic/apiService')
const Config = require('../ApiMedic/config')
var doctors = require('../data/doctorTest.json')

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
    console.log(results[0].Specialisation[0].Name, location, price, sex)

    var recommendations = doctors;
    const today = new Date()
    const thisYear = today.getFullYear()
    
    recommendations = recommendations.filter((obj) => {
        return obj.specialization == results[0].Specialisation[0].Name
    })

    recommendations = recommendations.filter( (obj) => {
        return obj.clinic_address == location
    })
    recommendations = recommendations.filter( (obj) => {
        return obj.price_range == price
    })
    recommendations = recommendations.filter( (obj) => {
        const docExperience = thisyear - obj.startyear
        return docExperience >= experience 
    })
    recommendations = recommendations.filter( (obj) => {
        const docAge = thisyear - obj.birthyear
        if (age == -1){
            return true
        } else {
            if (age == 30){
                return docAge <= 30
            }
            if (age == 45)
            {
                return docAge > 30 && docAge <= 45
            }
            if (age == 46){
                return docAge >= 46
            }
        }
    })
    recommendations = recommendations.filter( (obj) => {
        return obj.sex == sex
    })

    // console.log(recommendations)

    return recommendations

}

module.exports = {Recommend}