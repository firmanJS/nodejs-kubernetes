const Users = require('./Users')
const { mappingResult, mappingError, isValidPassword } = require('../utils')
const jwt = require('jsonwebtoken')

const SECRET_KEY_TOKEN = process.env.SECRET_KEY
const TOKEN_EXPIRED = process.env.TOKEN_EXPIRED
const SECRET_KEY_TOKEN_REFRESH = process.env.SECRET_KEY_REFRESH
const TOKEN_EXPIRED_REFRESH = process.env.TOKEN_EXPIRED_REFRESH

const login = async (username, password) => {
  try {
    const result = await Users.findOne({ username }).select(['role', 'password', 'salt'])
    if (result) {
      if (isValidPassword(password, result?.password, result?.salt)) {
        const payload = { id: result?._id, role: result?.role}
        const token = jwt.sign(payload, SECRET_KEY_TOKEN, { expiresIn: TOKEN_EXPIRED })
        const refreshToken = jwt.sign(payload, SECRET_KEY_TOKEN_REFRESH, { expiresIn: TOKEN_EXPIRED_REFRESH })
        return mappingResult('get data succesfully', 200, true, { token, refresh_token: refreshToken })
      } else {
        return mappingResult('incorrect password', 400, false)
      }
    } else {
      return mappingResult(`username : ${username} not found`, 404, false)
    }
  } catch (error) {
    return mappingError(error)
  }
}

const refreshToken = (tokenRefresh) => {
  try {
    const { id, role } = jwt.verify(tokenRefresh, SECRET_KEY_TOKEN_REFRESH)
    const token = jwt.sign({ id, role }, SECRET_KEY_TOKEN, { expiresIn: TOKEN_EXPIRED_REFRESH })
    return mappingResult('get data succesfully', 200, true, { token })
  } catch (error) {
    console.log(error.toString());
    return mappingError(error)
  }
}

module.exports = {
  login,
  refreshToken
}