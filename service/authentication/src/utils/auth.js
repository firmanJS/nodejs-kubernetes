const crypto = require('crypto')

const isValidPassword = (password, hash, salt) => {
  const generatedHash = crypto.pbkdf2Sync(password, salt, 1000, 50, 'sha512').toString('hex')
  return hash === generatedHash
}

module.exports = {
  isValidPassword
}