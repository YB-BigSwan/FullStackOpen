/* eslint-disable @stylistic/js/indent */
const _ = require("lodash");

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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return "Error: No blogs to search";

  const authorBlogCounts = _(blogs)
    .countBy("author")
    .toPairs()
    .map(([author, count]) => ({ author, blogs: count }))
    .value();

  const maxBlogs = Math.max(...authorBlogCounts.map((entry) => entry.blogs));

  const topAuthors = authorBlogCounts.filter(
    (entry) => entry.blogs === maxBlogs
  );

  return topAuthors.length > 1 ? topAuthors : topAuthors[0];
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return "Error: No blogs to search";

  const authorLikeCounts = _(blogs)
    .groupBy("author")
    .map((authorBlogs, author) => ({
      author,
      likes: _.sumBy(authorBlogs, "likes"),
    }))
    .value();

  const maxLikes = Math.max(...authorLikeCounts.map((entry) => entry.likes));

  const topAuthors = authorLikeCounts.filter(
    (entry) => entry.likes === maxLikes
  );

  return topAuthors.length > 1 ? topAuthors : topAuthors[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
