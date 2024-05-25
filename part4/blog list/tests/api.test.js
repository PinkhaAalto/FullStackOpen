const { test, after, beforeEach, describe} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./api_test_helper.js')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    for (const blog of helper.blogsInit) {
        const blogObject = new Blog(blog)
        await blogObject.save()
    }
})
  
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.blogsInit.length)
  })

test('the id property of a blog is formatted correctly', async () => {
    const blogs = await helper.blogsInDb()
  
    const blog = blogs[0]
  
    await api    
      .get(`/api/blogs/${blog.id}`)    
      .expect(200)    
      .expect('Content-Type', /application\/json/)
  
})

test('creating a new blog incrases the number of blogs in the system', async () => {
    //Generated with AI  
    const newBlog = {
      title: 'GraphQL Basics',
      author: 'Charlie Black',
      url: 'example.com/graphql-basics',
      likes: 50,
      _v: 0
    };  
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()

    assert.strictEqual(blogs.length, helper.blogsInit.length+1) 
})

test('posting a blog with no likes populates likes as 0', async () => {
    const newBlog = {
      title: 'GraphQL Basics',
      author: 'Charlie Black',
      url: 'example.com/graphql-basics',
      _v: 0
    };  
    
    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.likes, 0)
})

test('a blog without a title returns 400', async () => {
  const newBlog = {
    author: 'Charlie Black',
    url: 'example.com/graphql-basics',
    likes: 50,
    _v: 0
  };  

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('a blog without a url returns 400', async () => {
  const newBlog = {
    title: 'GraphQL Basics',
    author: 'Charlie Black',
    likes: 50,
    _v: 0
  };  
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('deleting a blog functions correctly', async () => {
  const blogs = await helper.blogsInDb()
  const blog = blogs[0]
  
  await api
    .delete(`/api/blogs/${blog.id}`)
    .expect(204)
})

test('updating a blogs likes returns the correct likes', async () => {
  const blogs = await helper.blogsInDb()
  const blog = blogs[0]

  const updatedBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: 3000,
  }

  const result = await api
    .put(`/api/blogs/${blog.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(result.body.likes, 3000)

})



after(async () => {
  await mongoose.connection.close()
})