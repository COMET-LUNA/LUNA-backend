/*
*   Code taken from https://github.com/priaid-eHealth/symptomchecker
*/
const Config = require('../ApiMedic/config')
const axios = require('axios').default

async function loadDiagnosis(selectedSymptoms,gender,yearOfBirth) {

  const config = new Config()
  const token = await config.getToken()

  // let symptoms = selectedSymptoms.split(',');
  // let url = `${config.getAPIURL()}/diagnosis?symptoms=`+JSON.stringify(symptoms)+`&gender=${gender}&year_of_birth=${yearOfBirth}`;
  let url = `${config.getAPIURL()}/diagnosis?symptoms=`+JSON.stringify(selectedSymptoms)+`&gender=${gender}&year_of_birth=${yearOfBirth}`;
  // let headers = new Headers()
  let extraArgs = 'token='+token+'&language='+config.getLanguage()+'&format='+config.getFormat();
  url += url.indexOf("?") > 0 ? "&"+extraArgs : "?"+extraArgs;

  // console.log(config.getFormat())
  console.log(url)

  if(config.getFormat() == "json")
    return axios
      .get(url)
      .then(res => {
        return res.data
      })
      .catch(e => {
        // console.log(e)
        console.log("Error in Diagnosis API")
      })
  else 
    axios.get(url).then(res => {return res})

}

module.exports = {loadDiagnosis}