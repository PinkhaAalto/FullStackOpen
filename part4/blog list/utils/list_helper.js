const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    let sum = 0

    blogs.forEach(blog => {
        sum += blog.likes
    });

    return sum
}
  
const favouriteBlog = (blogs) => {
  let favourite = {
    title: "",
    author: "",
    likes: 0
  }
  let max = 0

  blogs.forEach(blog => {
    if (blog.likes > max){
      favourite = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
      max = blog.likes
    }
  })
  return favourite
}

const mostBlogs = (blogs) => {
  let maxBlogs = 0;
  let authorWithMostBlogs = '';

  const authorBlogs = blogs.reduce((acc, blog) => {
    if (!acc[blog.author]) {
      acc[blog.author] = 0;
    }
    acc[blog.author] += 1;
    return acc;
  }, {});

  for (const author in authorBlogs) {
    if (authorBlogs[author] > maxBlogs) {
      maxBlogs = authorBlogs[author];
      authorWithMostBlogs = author;
    }
  }

  return {
    author: authorWithMostBlogs,
    blogs: maxBlogs
  }
}

const mostLikes = (blogs) => {
  let maxLikes = 0
  let authorWithMostLikes = ''
  
  const authorLikes = blogs.reduce((acc, blog) => {
    if (!acc[blog.author]) {
      acc[blog.author] = 0;
    }
    acc[blog.author] += blog.likes;
    return acc;
  }, {});

  for (const author in authorLikes) {
    if (authorLikes[author] > maxLikes) {
      maxLikes = authorLikes[author];
      authorWithMostLikes = author;
    }
  }

  return {
    author: authorWithMostLikes,
    likes: maxLikes
  }

}


  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
  }
