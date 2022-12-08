const { Router } = require('express');
const Post = require('../models/Post.js');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const posts = await Post.getAll();
    res.json(posts);
  } catch (e) {
    next(e);
  }
});
