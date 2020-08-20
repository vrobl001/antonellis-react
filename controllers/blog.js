const Blog = require('../models/blog');

module.exports = {
  create,
  index,
  update,
  delete: deleteBlog,
};

async function create(req, res) {
  try {
    const blog = await Blog.create(req.body);
    res.json({ blog });
  } catch (error) {
    throw new Error('unable to create blog post');
  }
}

async function index(req, res) {
  try {
    const blog = await Blog.find({});
    res.json(blog);
  } catch (error) {
    throw new Error('unable to retrieve blog posts');
  }
}

async function update(req, res) {
  try {
    const blog = await Blog.findById(req.params.id);
    Blog.updateOne(blog, req.body);
  } catch (error) {
    throw new Error('unable to update blog post');
  }
}

async function deleteBlog(req, res) {
  try {
    const blog = Blog.findById(req.params.id);
    Blog.deleteOne(blog);
  } catch (error) {
    throw new Error('unable to delete blog post');
  }
}
