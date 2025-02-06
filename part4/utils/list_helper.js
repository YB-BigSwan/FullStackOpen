/* eslint-disable @stylistic/js/indent */
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item;
  };

  const blogLikes = blogs.map((blog) => blog.likes);

  return blogLikes.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return "Error: No blogs to search";

  const mostLikes = Math.max(...blogs.map((blog) => blog.likes));
  const mostLikedBlog = blogs.filter((blog) => blog.likes === mostLikes);

  return mostLikedBlog.length > 1
    ? mostLikedBlog.map((blog) => ({
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      }))
    : {
        title: mostLikedBlog[0].title,
        author: mostLikedBlog[0].author,
        likes: mostLikedBlog[0].likes,
      };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
