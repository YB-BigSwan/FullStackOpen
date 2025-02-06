const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("info of most liked", () => {
  const noBlogs = [];

  const oneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const manyBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "67a4e997622298722f88ab41",
      title: "Swanson Dev",
      author: "Stephen Swanson",
      url: "https://swansondev.me",
      likes: 10,
      __v: 0,
    },
    {
      _id: "67a4e922622298722f88ab3d",
      title: "Go To Statement Considered Harmful 2",
      author: "Edsger W. Dijkstra 2",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const tiedBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "67a4e997622298722f88ab41",
      title: "Swanson Dev",
      author: "Stephen Swanson",
      url: "https://swansondev.me",
      likes: 10,
      __v: 0,
    },
    {
      _id: "67a4e922622298722f88ab3d",
      title: "Go To Statement Considered Harmful 2",
      author: "Edsger W. Dijkstra 2",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 10,
      __v: 0,
    },
  ];

  test("with empty list displays error message", () => {
    const result = listHelper.favoriteBlog(noBlogs);
    assert.strictEqual(result, "Error: No blogs to search");
  });

  test("with one blog displays that blog", () => {
    const result = listHelper.favoriteBlog(oneBlog);
    assert.deepStrictEqual(result, {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("with many blogs displays the most liked blog", () => {
    const result = listHelper.favoriteBlog(manyBlogs);
    assert.deepStrictEqual(result, {
      title: "Swanson Dev",
      author: "Stephen Swanson",
      likes: 10,
    });
  });

  test("with two most liked blogs displays the most liked blogs", () => {
    const result = listHelper.favoriteBlog(tiedBlogs);
    assert.deepStrictEqual(result, [
      {
        title: "Swanson Dev",
        author: "Stephen Swanson",
        likes: 10,
      },
      {
        title: "Go To Statement Considered Harmful 2",
        author: "Edsger W. Dijkstra 2",
        likes: 10,
      },
    ]);
  });
});
