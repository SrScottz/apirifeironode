const express = require('express')
const router = express.Router()
const login = require('../middleware/login')
const Controller = require('../controllers/suppliers')

router.post('/', login, Controller.insertSupplier)
router.get('/', Controller.getSuppliers)
router.get('/:id_check', Controller.getSupplier)
router.patch('/:id_check', login, Controller.updateSupplier)
router.delete('/:id_check', login, Controller.deleteSupplier)

module.exports = router
