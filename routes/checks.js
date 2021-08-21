const express = require('express')
const router = express.Router()
const login = require('../middleware/login')
const Controller = require('../controllers/checks')

router.post('/', login, Controller.insertCheck)
router.get('/', Controller.getChecks)
router.get('/:id_check', Controller.getChecks)
router.patch('/:id_check', login, Controller.updateCheck)
router.delete('/:id_check', login, Controller.deleteCheck)

module.exports = router
