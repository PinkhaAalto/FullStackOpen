const Blog = require('../models/blog')

//Fake blogs generated with AI
const blogsInit = [
  { _id: '60d5f483d6b2b24dcd9b45a1', title: 'JavaScript Basics', author: 'John Doe', url: 'example.com/js-basics', likes: 25, _v: 0 },
  { _id: '60d5f483d6b2b24dcd9b45a2', title: 'Advanced CSS', author: 'Jane Smith', url: 'example.com/advanced-css', likes: 35, _v: 0 },
  { _id: '60d5f483d6b2b24dcd9b45a3', title: 'React Introduction', author: 'John Doe', url: 'example.com/react-intro', likes: 50, _v: 0 },
  { _id: '60d5f483d6b2b24dcd9b45a4', title: 'Node.js for Beginners', author: 'Alice Johnson', url: 'example.com/nodejs-beginners', likes: 45, _v: 0 },
  { _id: '60d5f483d6b2b24dcd9b45a5', title: 'Understanding TypeScript', author: 'Jane Smith', url: 'example.com/typescript', likes: 40, _v: 0 },
  { _id: '60d5f483d6b2b24dcd9b45a6', title: 'CSS Grid Layout', author: 'John Doe', url: 'example.com/css-grid', likes: 30, _v: 0 },
  { _id: '60d5f483d6b2b24dcd9b45a7', title: 'Async JavaScript', author: 'Bob Brown', url: 'example.com/async-js', likes: 20, _v: 0 },
  { _id: '60d5f483d6b2b24dcd9b45a8', title: 'RESTful API Design', author: 'Alice Johnson', url: 'example.com/restful-api', likes: 60, _v: 0 },
  { _id: '60d5f483d6b2b24dcd9b45a9', title: 'Functional Programming in JS', author: 'John Doe', url: 'example.com/functional-js', likes: 55, _v: 0 },
  { _id: '60d5f483d6b2b24dcd9b45aa', title: 'Modern JavaScript Features', author: 'Jane Smith', url: 'example.com/modern-js', likes: 70, _v: 0 },
];


const nonExistingId = async () => {
    const blog = new Blog({ title: 'PLACEHOLDER' })
    await blog.save()
    await blog.deleteOne()
  
    return blog._id.toString()
  }
  
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }
  
  module.exports = {
    blogsInit, nonExistingId, blogsInDb,
  }