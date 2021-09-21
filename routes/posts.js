const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const Post = require("../models/posts");
const getUser = require("../middleware/authUser");

//get User specific Post "/timeline/posts"
router.get("/posts", getUser, async (req, res) => {
  try {
    const posts = await Post.findOne({ user: req.user.id });
    res.json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

//add new post at "/timeline/new-post"
router.post(
  "/new-post",
  getUser,
  [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "description is too short").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const err = validationResult(req);
      if (!err.isEmpty()) {
        res.status(401).json({ err: err.array() });
      }
      const post = new Post({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const newPost = await post.save();
      res.json(newPost);
    } catch (error) {
      console.log(error.message);
      res.json("Internal server error");
    }
  }
);

//update post at "/timeline/update-post"
router.put("/update-post/:id", getUser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const newPost = {};
    if (title) {
      newPost.title = title;
    }
    if (description) {
      newPost.description = description;
    }
    if (tag) {
      newPost.tag = tag;
    }

    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).send("User unauthorized!");
    }
    post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: newPost },
      { new: true }
    );
    res.json({ post });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Delete a post at "/timeline/delete-post"
router.delete("/delete-post/:id", getUser, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).send("User unauthorized!");
    }
    post = await Post.findByIdAndDelete(req.params.id);
    res.json({ Done: "Post deleted successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
