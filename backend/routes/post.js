const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const auth = require('../middlewares/auth')

router.use(auth)

router.get('/', postController.getAll)
router.post('/', postController.create)
router.put('/:id', postController.update)
router.delete('/:id', postController.remove)

module.exports = router
