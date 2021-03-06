const {
  loadDiagnosis,
  loadSpecialisations,
} = require("../ApiMedic/apiService");
const Config = require("../ApiMedic/config");

const { getFirestore, collection, getDocs } = require("firebase/firestore");

const firestore = getFirestore();

const doctorDb = collection(firestore, "doctors");

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

async function Recommend(data) {
  // Setup
  var doctors = await getDocs(doctorDb).then((snapshot) => {
    let doctors = [];
    console.log("getting doctors...");
    snapshot.docs.forEach((doc) => {
      doctors.push({ ...doc.data() });
    });
    return doctors;
  });
  // console.log(doctors)
  const {
    symptoms,
    location,
    age,
    price,
    experience,
    sex,
    userSex,
    userYearBirth,
    teleconsult,
  } = data;
  const results = await loadSpecialisations(symptoms, userSex, userYearBirth);
  const diagnosis = await loadDiagnosis(symptoms, userSex, userYearBirth);

  // console.log(results[0])
  // console.log(results[0].Specialisation[0].Name, location, price, sex)

  var recommendations = doctors;
  // console.log(doctors)
  const today = new Date();
  const thisYear = today.getFullYear();

  var specializations = results.slice(0, 3);
  specializations = specializations.map((spec) => {
    return spec.Name;
  });

  // Getting doctors that are of the top 3 specializations
  recommendations = recommendations.filter((doctor) => {
    return specializations
      .map((spec) => {
        return spec.toLowerCase();
      })
      .includes(doctor.specialization.toLowerCase());
  });

  specRecom = recommendations;

  // Filter by top specialization
  recommendations = recommendations.filter((doctor) => {
    return (
      doctor.specialization.toLowerCase() == specializations[0].toLowerCase()
    );
  });
  console.log("After specialization: ");
  console.log(recommendations);

  // Filter by location
  recommendations = recommendations.filter((doctor) => {
    if (location === "") return true;
    return doctor.clinic_address == location;
  });
  console.log("After location: ");
  console.log(recommendations);

  // Filtered by specialization and location at this point
  const secondRecommendations = recommendations;

  // Filter by price
  recommendations = recommendations.filter((doctor) => {
    if (price === "-1") return true;
    return doctor.price_range == price;
  });
  console.log("After price: ");
  console.log(recommendations);

  recommendations = recommendations.filter((doctor) => {
    if (experience === 0) return true;
    const docExperience = thisYear - doctor.startyear;
    return docExperience >= experience;
  });
  console.log("After experience: ");
  console.log(recommendations);

  recommendations = recommendations.filter((doctor) => {
    const docAge = thisYear - doctor.birthyear;
    if (age == 0) {
      return true;
    }
    if (age == 30) {
      return docAge >= 30 && docAge < 40;
    }
    if (age == 40) {
      return docAge >= 40 && docAge < 50;
    }
    if (age == 50) {
      return docAge >= 50;
    }
  });
  console.log("After age: ");
  console.log(recommendations);

  recommendations = recommendations.filter((doctor) => {
    if (sex === "none") return true;
    return doctor.sex == sex;
  });
  console.log("After sex: ");
  console.log(recommendations);

  console.log(teleconsult);
  recommendations = recommendations.filter((doctor) => {
    if (teleconsult === "none") return true;
    return doctor.teleconsult == teleconsult;
  });
  console.log("After teleconsult: ");
  console.log(recommendations);

  // Filtered by all preferences and best spec at this point
  const firstRecommendations = recommendations;

  return {
    firstRecommendations: recommendations,
    secondRecommendations: secondRecommendations,
    specRecommendations: specRecom,
    specialization: specializations,
    diagnosis: diagnosis,
  };
}

module.exports = { Recommend };
