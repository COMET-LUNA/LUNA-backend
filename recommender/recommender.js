const { loadDiagnosis } = require('../ApiMedic/apiService')
const Config = require('../ApiMedic/config')
var doctors = require('../data/doctorTest.json')


async function Recommend(data){
    const  { symptoms, location, age, price, experience, sex, userSex, userYearBirth } = data
    const results = await loadDiagnosis(symptoms, userSex, userYearBirth)

    // console.log(results[0])
    console.log(results[0].Specialisation[0].Name, location, price, sex)

    var recommendations = doctors;
    
    recommendations = recommendations.filter((obj) => {
        return obj.specialization == results[0].Specialisation[0].Name
    })

    recommendations = recommendations.filter( (obj) => {
        return obj.clinic_address == location
    })
    recommendations = recommendations.filter( (obj) => {
        return obj.price_range == price
    })
    // recommendations = recommendations.filter( (obj) => {
    //     obj.experience == experience
    // })
    // recommendations = recommendations.filter( (obj) => {
    //     obj.age == age
    // })
    recommendations = recommendations.filter( (obj) => {
        return obj.sex == sex
    })

    // console.log(recommendations)

    return recommendations

}

module.exports = {Recommend}