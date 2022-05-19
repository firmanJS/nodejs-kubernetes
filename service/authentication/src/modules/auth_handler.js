const { baseResponse } = require('../utils')
const { login, refreshToken } = require('./auth_repository')

const verifyLogin = async (req, res) => {
  const { username, password } = req.body
  const result = await login(username, password)
  return baseResponse(res, result)
}

const verifyRefreshToken = (req, res) => {
  const { refresh_token } = req.body
  const result = refreshToken(refresh_token)
  return baseResponse(res, result)
}

module.exports = {
  verifyLogin,
  verifyRefreshToken
}