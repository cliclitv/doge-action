const core = require('@actions/core')
const crypto = require('crypto')
const axios = require('axios')

try {
  const key = core.getInput('key')
  upload(key).then(res=>{
    core.setOutput('success', res)
  })
  
  
} catch (error) {
  core.setFailed(error.message)
}

function getToken(uri) {
    const ACCESS_KEY = 'd54899f6d6036a2d'
    const SECRET_KEY = '3e2333eb0b03973dbe6f38d8654dad61'
    const signStr = `${uri}\n`
    const sign = crypto
      .createHmac('sha1', SECRET_KEY)
      .update(signStr)
      .digest('hex')
    return ACCESS_KEY + ':' + sign
}

function upload(key){
  let uri = `/oss/upload/put.json?bucket=clicli&key=${key}`
  let token = getToken(uri)
  return axios
    .post(`https://api.dogecloud.com/${uri}`, {
      headers: {
        Host: 'api.dogecloud.com',
        Authorization: `TOKEN ${token}`
      }
    })
}
