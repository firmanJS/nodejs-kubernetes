
  
const { Router } = require('express')
const { create, read, readById, hardDelete, udpatedById } = require('./users_handler')
const { verifyToken, verifyRole } = require('../middleware')
const router = Router()

router.post('/api/v1/users', verifyToken, verifyRole(['Admin']), create)
router.get('/api/v1/users', verifyToken, verifyRole(['Admin', 'User']), read)
router.get('/api/v1/users/:id', verifyToken, verifyRole(['Admin']), readById)
router.put('/api/v1/users/:id', verifyToken, verifyRole(['Admin']), udpatedById)
router.delete('/api/v1/users/:id', verifyToken, verifyRole(['Admin']), hardDelete)
module.exports = router