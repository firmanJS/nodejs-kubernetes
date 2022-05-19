const jwt = require('jsonwebtoken')
const SECRET_KEY_TOKEN = process.env.SECRET_KEY

const verifyToken = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY, (err) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: err?.message,
          data: []
        })
      }
      next()
    })
  } else {
    res.status(401).json({
      status: false,
      message: 'Token required',
      data: []
    })
  }
}

const verifyRole = roles => {
  return (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const { role } = jwt.verify(token, SECRET_KEY_TOKEN)
    if (!roles.includes(role)) {
      res.status(401).json({
        status: false,
        message: 'You have no access this resource',
        data: []
      })
    } else {
      next()
    }
  }
}

module.exports = { verifyToken, verifyRole }