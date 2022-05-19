const { baseResponse, accesRole } = require('../utils')
const { store, fetch, fetchById, destroy, udpateById } = require('./users_repository')

const create = async (req, res) => {
  const result = await store(req?.body)
  return baseResponse(res, result)
}

const read = async (req, res) => {
  const condition = accesRole(req)
  const result = await fetch(condition)
  return baseResponse(res, result)
}

const readById = async (req, res) => {
  const result = await fetchById(req?.params?.id)
  return baseResponse(res, result)
}

const udpatedById = async (req, res) => {
  const result = await udpateById(req?.params?.id, req?.body)
  return baseResponse(res, result)
}

const hardDelete = async (req, res) => {
  const result = await destroy(req?.params?.id)
  return baseResponse(res, result)
}

module.exports = {
  create,
  read,
  readById,
  udpatedById,
  hardDelete
}