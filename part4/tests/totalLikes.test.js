const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("total likes", () => {
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

  test("of empty list is 0", () => {
    const result = listHelper.totalLikes(noBlogs);
    assert.strictEqual(result, 0);
  });

  test("When list only has one blog, should equal the likes of that blog", () => {
    const result = listHelper.totalLikes(oneBlog);
    assert.strictEqual(result, 5);
  });

  test("of many blogs is calculated correctly", () => {
    const result = listHelper.totalLikes(manyBlogs);
    assert.strictEqual(result, 20);
  });
});
