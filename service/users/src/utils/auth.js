const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const SECRET_KEY_TOKEN = process.env.SECRET_KEY

const generatePassword = (payload) => {
  payload.salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(payload.password, payload.salt, 1000, 50, 'sha512').toString('hex')
  payload.password = hash
  return payload
}

const accesRole = (req) => {
  const token = req.headers.authorization.split(' ')[1]
  const { id, role } = jwt.verify(token, SECRET_KEY_TOKEN)

  if (role === 'User') {
    return { _id: id}
  }

  return {}
}

module.exports = {
  generatePassword,
  accesRole
}