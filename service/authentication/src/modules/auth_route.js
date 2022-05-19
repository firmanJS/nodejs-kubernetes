
  
const { Router } = require('express')
const { verifyLogin, verifyRefreshToken } = require('./auth_handler')
const router = Router()

router.post('/api/v1/auth/login', verifyLogin)
router.post('/api/v1/auth/register', verifyLogin)
router.post('/api/v1/auth/refresh-token', verifyRefreshToken)
module.exports = router