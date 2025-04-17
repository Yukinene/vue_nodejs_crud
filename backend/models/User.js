const db = require('../config/db')

async function findByUsername(username) {
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username])
  return rows[0]
}

async function createUser(username, hashedPassword) {
  const [result] = await db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword]
  )
  return result.insertId
}

async function findById(id) {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id])
  return rows[0]
}

module.exports = {
  findByUsername,
  createUser,
  findById
}
