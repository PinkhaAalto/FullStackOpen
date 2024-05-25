const blogRouter = require('express').Router();
const Blog = require('../models/blog.js');

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)

  })
  
blogRouter.post('/', async (request, response) => {
	const body = request.body

    const blog = new Blog({
		  title: body.title,
		  author: body.author,
		  url: body.url,
		  likes: body.likes? body.likes : 0,
		})


	if(body.title === undefined || body.url === undefined){
		response.status(400).end()
	}else{
		const result = await blog.save()
		response.status(201).json(result)
	}  
  })
  
blogRouter.get('/:id', async (request, response) => {
	  const blog = await Blog.findById(request.params.id)
	  if (blog) {
		response.json(blog)
	  } else {
		response.status(404).end()
	  }
})

blogRouter.delete('/:id', async (request, response) => {

	const blog = await Blog.findById(request.params.id)
	if(blog){
		await Blog.findByIdAndDelete(request.params.id)
	    response.status(204).end()
	}else{
		return response.status(400).end()
	}
  })

blogRouter.put('/:id', async (request, response) => {
	const body = request.body
  
	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes? body.likes : 0 ,
	}
  
	await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	response.json(blog)
})

module.exports = blogRouter