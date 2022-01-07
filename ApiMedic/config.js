/*
*   Code taken from https://github.com/priaid-eHealth/symptomchecker
*/

const Token = require('../ApiMedic/token')

class Config {
  
  mainURL = "https://sandbox-healthservice.priaid.ch"
  token
  language
  format
  symptoms
  config_info = {
    "method": "Get",
    "transformRequest": [
      null
    ],
    "transformResponse": [
      null
    ],
    "URL": "",
    "url": "",
    "headers": {
      "Accept": "application/json, text/plain, */*"
    }
  }

  constructor() {
    this.token = Token.token_str
    this.language = 'en-gb'
    this.format = 'json'
  }

  getAPIURL() {
    return this.mainURL
  }

  getConfig() {
    return this.config_info
  }

  setConfig(config_info) {
    this.config_info = config_info 
  }

  getToken() {
    return this.token
  }

  setToken(token) {
    this.token = token
  }

  getLanguage() {
    return this.language
  }

  setLanguage(lang) {
    this.language = lang
  }

  getFormat() {
    return this.format
  }

  setFormat(format) {
    this.format = format
  }
}

module.exports = Config