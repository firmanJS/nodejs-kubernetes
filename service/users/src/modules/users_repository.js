const Users = require('./Users')
const { mappingResult, generatePassword } = require('../utils')

const store = async (body) => {
  try {
    body = generatePassword(body)
    const save = await Users.create(body)
    return mappingResult('created', 201, true, save)
  } catch (error) {
    return mappingResult(error.message, 400, false)
  }
}

const fetch = async (condition) => {
  try {
    const save = await Users.find(condition)
    return mappingResult('get data succesfully', 200, true, save)
  } catch (error) {
    return mappingResult(error.message, 400, false)
  }
}

const fetchById = async (id) => {
  try {
    const save = await Users.findById(id)
    return mappingResult('get data succesfully', 200, true, save)
  } catch (error) {
    return mappingResult(error.message, 400, false)
  }
}

const udpateById = async (id, body) => {
  try {
    const save = await Users.findByIdAndUpdate(id, body, { new: true })
    if (save) {
      return mappingResult('update data succesfully', 200, true, save)
    }
    return mappingResult('not found', 404, true)
  } catch (error) {
    return mappingResult(error.message, 400, false)
  }
}

const destroy = async (id) => {
  try {
    const save = await Users.findByIdAndDelete(id)
    if (save) {
      return mappingResult('delete data succesfully', 200, true, save)
    }
    return mappingResult('not found', 404, true)
  } catch (error) {
    return mappingResult(error.message, 400, false)
  }
}

module.exports = {
  store,
  fetch,
  fetchById,
  udpateById,
  destroy
}