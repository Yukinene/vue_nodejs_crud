const postModel = require('../models/Post')

exports.getAll = async (require, respond) => {
  const posts = await postModel.getPostsByUser(require.user.id)
  respond.json(posts)
}

exports.create = async (require, respond) => {
  const { title, content } = require.body
  const postId = await postModel.createPost(require.user.id, title, content)
  respond.json({ id: postId })
}

exports.update = async (require, respond) => {
  const { title, content } = require.body
  const updated = await postModel.updatePost(require.params.id, title, content)
  if (!updated) return respond.status(404).json({ message: 'Not found' })
  respond.json({ message: 'Updated' })
}

exports.remove = async (require, respond) => {
  const deleted = await postModel.deletePost(require.params.id)
  if (!deleted) return respond.status(404).json({ message: 'Not found' })
  respond.json({ message: 'Deleted' })
}
