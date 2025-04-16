const db = require('../config/db')

async function getPostsByUser(userId) {
  const [rows] = await db.query(
    'SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  )
  return rows
}

async function getPostById(id) {
  const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id])
  return rows[0]
}

async function createPost(userId, title, content) {
  const [result] = await db.query(
    'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
    [userId, title, content]
  )
  return result.insertId
}

async function updatePost(id, title, content) {
  const [result] = await db.query(
    'UPDATE posts SET title = ?, content = ? WHERE id = ?',
    [title, content, id]
  )
  return result.affectedRows
}

async function deletePost(id) {
  const [result] = await db.query('DELETE FROM posts WHERE id = ?', [id])
  return result.affectedRows
}

module.exports = {
  getPostsByUser,
  getPostById,
  createPost,
  updatePost,
  deletePost
}
