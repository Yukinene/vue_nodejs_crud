const postModel = require('../models/Post')

exports.getAll = async (req, res) => {
  const posts = await postModel.getPostsByUser(req.session.user.id)
  res.json(posts)
}

exports.getById = async (req, res) => {
  const posts = await postModel.getPostById(req.params.id)
  res.json(posts)
}

exports.create = async (req, res) => {
  const { title, content } = req.body
  const postId = await postModel.createPost(req.session.user.id, title, content)
  res.json({ id: postId })
}

exports.update = async (req, res) => {
  const { title, content } = req.body
  const updated = await postModel.updatePost(req.params.id, title, content)
  if (!updated) return respond.status(404).json({ message: 'Not found' })
    res.json({ message: 'Updated' })
}

exports.remove = async (req, res) => {
  const deleted = await postModel.deletePost(req.params.id)
  if (!deleted) return respond.status(404).json({ message: 'Not found' })
    res.json({ message: 'Deleted' })
}
