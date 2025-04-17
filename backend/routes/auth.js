const express = require('express')
const router = express.Router()
const { register, login , logout } = require('../controllers/authController')

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/user', (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: 'ไม่ได้ล็อกอิน' })
    }
    res.json({ user: req.session.user })
  })
  
module.exports = router
