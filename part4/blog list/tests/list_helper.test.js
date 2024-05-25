const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {  
  const listWithOneBlog = [
    {
      _id: '21',
      title: 'Faketitle 1',
      author:'Me :)',
      url : 'Fakeurl.com/21',
      likes: 15,
      _v: 0

    }
  ]
  
  const listWithManyBlogs = [
    {
      _id: '21',
      title: 'Faketitle 1',
      author:'Me :)',
      url : 'Fakeurl.com/21',
      likes: 15,
      _v: 0

    },    {
      _id: '2121',
      title: 'Faketitle 2',
      author:'Me :)',
      url : 'Fakeurl.com/2121',
      likes: 30,
      _v: 0

    },   {
      _id: '212112',
      title: 'Faketitle 3',
      author:'Me :)',
      url : 'Fakeurl.com/212112',
      likes: 45,
      _v: 0

    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that', () =>{
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result,15)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    assert.strictEqual(result, 90)
  })


})

describe('Author with most blogs', () => {
  const listWithOneBlog = [
    {
      _id: '21',
      title: 'Faketitle 1',
      author:'Author 1',
      url : 'Fakeurl.com/21',
      likes: 15,
      _v: 0

    }
  ]
  
  const listWithManyBlogs = [
    {
      _id: '1',
      title: 'Faketitle 1',
      author:'Author 1',
      url : 'Fakeurl.com/1',
      likes: 15,
      _v: 0

    },    {
      _id: '2',
      title: 'Faketitle 2',
      author:'Author 2',
      url : 'Fakeurl.com/2',
      likes: 30,
      _v: 0

    },   {
      _id: '3',
      title: 'Faketitle 3',
      author:'Author 3',
      url : 'Fakeurl.com/3',
      likes: 45,
      _v: 0

    },   {
      _id: '4',
      title: 'Faketitle 4',
      author:'Author 4',
      url : 'Fakeurl.com/4',
      likes: 30,
      _v: 0

    },   {
      _id: '5',
      title: 'Faketitle 5',
      author:'Author 1',
      url : 'Fakeurl.com/5',
      likes: 30,
      _v: 0

    },    {
      _id: '6',
      title: 'Faketitle 6',
      author:'Author 2',
      url : 'Fakeurl.com/6',
      likes: 30,
      _v: 0

    }
  ]



  test('of empty returns no author and 0', () => {
    const result = listHelper.mostBlogs([])
    assert.deepEqual({author: '', blogs:0}, result)
  })

  test('when list has only one blog equals the author of that with 1 blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepEqual({author: 'Author 1', blogs:1}, result)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    assert.deepEqual({author: 'Author 1', blogs:2}, result)
  })
})


describe('Author with most likes', () => {
  const listWithOneBlog = [
    {
      _id: '21',
      title: 'Faketitle 1',
      author:'Author 1',
      url : 'Fakeurl.com/21',
      likes: 15,
      _v: 0

    }
  ]
  
  const listWithManyBlogs = [
    {
      _id: '1',
      title: 'Faketitle 1',
      author:'Author 1',
      url : 'Fakeurl.com/1',
      likes: 15,
      _v: 0

    },    {
      _id: '2',
      title: 'Faketitle 2',
      author:'Author 2',
      url : 'Fakeurl.com/2',
      likes: 30,
      _v: 0

    },   {
      _id: '3',
      title: 'Faketitle 3',
      author:'Author 3',
      url : 'Fakeurl.com/3',
      likes: 45,
      _v: 0

    },   {
      _id: '4',
      title: 'Faketitle 4',
      author:'Author 4',
      url : 'Fakeurl.com/4',
      likes: 30,
      _v: 0

    },   {
      _id: '5',
      title: 'Faketitle 5',
      author:'Author 1',
      url : 'Fakeurl.com/5',
      likes: 30,
      _v: 0

    },    {
      _id: '6',
      title: 'Faketitle 6',
      author:'Author 2',
      url : 'Fakeurl.com/6',
      likes: 30,
      _v: 0

    }
  ]

  test('of empty returns no author and 0', () => {
    const result = listHelper.mostLikes([])
    assert.deepEqual({author: '', likes:0}, result)
  })

  test('when list has only one blog equals the author of that with the correct amount of likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepEqual({author: 'Author 1', likes:15}, result)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)
    assert.deepEqual({author: 'Author 2', likes:60}, result)
  })
})