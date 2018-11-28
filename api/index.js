const { Router } = require('express')
const bodyParser = require('body-parser')
const filterPayload = require('./utils.js')

const apiService = () => {
  let api = Router()
  api.use(bodyParser.json())
  api.post('/filter-service', async (req, res) => {
    try {
      const newPayload= filterPayload(req.body.payload)
      res.status(200).send({response: newPayload})
    } catch (error) {
      // sending 400 in case of error
      res.status(400).send({error: "Could not decode request: JSON parsing failed"})
    }
  })
  return api
}

module.exports = apiService