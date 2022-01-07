const { loadDiagnosis } = require('../ApiMedic/apiService')
var doctors = require('../data/doctorTest.json')


async function Recommend(data){
    const  { symptoms, location, age, price, experience, sex, userSex, userAge } = data
    const { Specialisation } = await loadDiagnosis(symptoms, userSex, userAge)

    var recommendations = doctors;
    recommendations = recommendations.filter( (obj) => {
        obj.specialization === Specialisation[0]
    })
    recommendations = recommendations.filter( (obj) => {
        obj.clinic_address === location
    })
    recommendations = recommendations.filter( (obj) => {
        obj.price_range === price
    })
    recommendations = recommendations.filter( (obj) => {
        obj.experience === experience
    })
    recommendations = recommendations.filter( (obj) => {
        obj.age === age
    })
    recommendations = recommendations.filter( (obj) => {
        obj.sex === sex
    })

    return recommendations
}

module.exports = {Recommend}