const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.register = async (req, res) => {
  const { username, password } = req.body
  const userexist = await User.findByUsername(username)
  if (userexist) return res.status(400).json({ message: 'มีชื่อผู้ใช้นี้ในระบบ' })

  const hash = await bcrypt.hash(password, 10)
  const userId = await User.createUser(username, hash)
  res.json({ message: 'สร้างบัญชีผู้ใช้นี้สำเร็จ', userId })
}

exports.login = async (req, res) => {
  // การตรวจสอบผู้ใช้และรหัสผ่านที่ฐานข้อมูล
  const { username, password } = req.body
  // ตรวจสอบ user ใน database (อาจใช้ bcrypt ตรวจรหัสผ่าน)
  try {
    const user = await User.findByUsername(username)

    if (!user) return res.status(401).send({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' })

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) return res.status(401).send({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' })

      req.session.user = {
      id: user.id,
      username: user.username
    }
    res.send({ message: 'เข้าสู่ระบบสำเร็จ', user: req.session.user })

  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Server error' })
  }
}


exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destroy error:', err)
      return res.status(500).json({ message: 'Logout failed' })
    }


    res.clearCookie('connect.sid',{
      path: '/',
  httpOnly: true,
  sameSite: 'lax',
  secure: false,
    }) 

    res.json({ message: 'Logged out' })
  })
}
