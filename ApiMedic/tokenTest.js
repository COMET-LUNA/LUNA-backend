const axios = require("axios")
const CryptoJS = require("crypto-js")

const uri = "https://sandbox-authservice.priaid.ch/login"
const api_key = "jose_lorenzo_cansana@dlsu.edu.ph"
const secret_key = "k3HCs48Jgd9ALf7n6"
const computedHash = CryptoJS.HmacMD5(uri, secret_key)
const computedHashString = computedHash.toString(CryptoJS.enc.Base64);

const headers = {
  'Content-Type': 'application/json',
  'Authorization': "Bearer " + api_key + ":" + computedHashString
}

console.log(headers.Authorization)

axios.post(uri,"",{ headers: headers })
.then((res) => {
  console.log(res.data.Token)
  return res
})
.catch(e => {
  console.log('Error')
})