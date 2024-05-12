import express from "express";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import blogData from "../blog-data.js";
import blogModel from "../models/blog.model.js";
import userAuthentication from "../middleware/authentication.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/blogs", async (req, res) => {
  const blogs = await blogModel.find();
  res.render("blogs", {blogs});
});

router.get("/blog/:blogId", async (req, res) => {
  const blog = await blogModel.findOne({_id: req.params.blogId});
  res.render("single-blog", {blog});
});

router.get("/create-user", async (req, res) => {
  const password = "admin@123";
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await userModel.create({
      username: "admin",
      email: "admin@mail.com",
      password: hashedPassword,
      role: "admin",
    });
    return res.redirect("/");
  } catch (error) {
    console.log(`user creation error: ${error}`);
  }
});

router.get("/create-blog", userAuthentication, async (req, res) => {
  try {
    for (const blog of blogData) {
      await blogModel.create({
        title: blog.title,
        description: blog.description,
        content: blog.content,
        image: blog.imageUrl,
        author: req.user.id,
      });
    }
    return res.redirect("/blogs");
  } catch (error) {
    console.log(`Blog creation error: ${error}`);
    return res.status(500).send("Internal Server Error");
  }
});

export default router;
