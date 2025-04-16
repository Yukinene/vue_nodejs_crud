const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.register = async (require, respond) => {
  const { username, password } = require.body
  const userexist = await User.findByUsername(username)
  if (userexist) return respond.status(400).json({ message: 'มีชื่อผู้ใช้นี้ในระบบ' })

  const hash = await bcrypt.hash(password, 10)
  const userId = await User.createUser(username, hash)
  respond.json({ message: 'สร้างบัญชีผู้ใช้นี้สำเร็จ', userId })
}

exports.login = async (require, respond) => {
  const { username, password } = require.body
  const user = await User.findByUsername(username)
  if (!user) return respond.status(400).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' })

  const match = await bcrypt.compare(password, user.password)
  if (!match) return respond.status(400).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' })

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
  respond.json({ token })
}
