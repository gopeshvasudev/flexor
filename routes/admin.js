import express from "express";
import userAuthentication from "../middleware/authentication.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import blogModel from "../models/blog.model.js";
const router = express.Router();

router.use((req, res, next) => {
  if (req.path === "/") {
    next();
  } else {
    userAuthentication(req, res, next); // Apply authentication for other routes
  }
});

router.get("/", async (req, res) => {
  res.render("./admin/login");
});
router.get("/dashboard", async (req, res) => {
  res.render("./admin/index");
});
router.get("/charts-apexcharts", (req, res) => {
  res.render("./admin/charts-apexcharts");
});
router.get("/charts-chartjs", (req, res) => {
  res.render("./admin/charts-chartjs");
});
router.get("/charts-echarts", (req, res) => {
  res.render("./admin/charts-echarts");
});
router.get("/components-accordion", (req, res) => {
  res.render("./admin/components-accordion");
});
router.get("/components-alerts", (req, res) => {
  res.render("./admin/components-alerts");
});
router.get("/components-badges", (req, res) => {
  res.render("./admin/components-badges");
});
router.get("/components-breadcrumbs", (req, res) => {
  res.render("./admin/components-breadcrumbs");
});
router.get("/components-buttons", (req, res) => {
  res.render("./admin/components-buttons");
});
router.get("/components-cards", (req, res) => {
  res.render("./admin/components-cards");
});
router.get("/components-carousel", (req, res) => {
  res.render("./admin/components-carousel");
});
router.get("/components-list-group", (req, res) => {
  res.render("./admin/components-list-group");
});
router.get("/components-modal", (req, res) => {
  res.render("./admin/components-modal");
});
router.get("/components-pagination", (req, res) => {
  res.render("./admin/components-pagination");
});
router.get("/components-progress", (req, res) => {
  res.render("./admin/components-progress");
});
router.get("/components-spinners", (req, res) => {
  res.render("./admin/components-spinners");
});
router.get("/components-tabs", (req, res) => {
  res.render("./admin/components-tabs");
});
router.get("/components-tooltips", (req, res) => {
  res.render("./admin/components-tooltips");
});
router.get("/forms-editors", (req, res) => {
  res.render("./admin/forms-editors");
});
router.get("/forms-elements", (req, res) => {
  res.render("./admin/forms-elements");
});
router.get("/forms-layouts", (req, res) => {
  res.render("./admin/forms-layouts");
});
router.get("/forms-validation", (req, res) => {
  res.render("./admin/forms-validation");
});
router.get("/icons-bootstrap", (req, res) => {
  res.render("./admin/icons-bootstrap");
});
router.get("/icons-boxicons", (req, res) => {
  res.render("./admin/icons-boxicons");
});
router.get("/icons-remix", (req, res) => {
  res.render("./admin/icons-remix");
});
router.get("/pages-blogs", async (req, res) => {
  const blogs = await blogModel.find();
  res.render("./admin/pages-blank", { blogs });
});
router.get("/blog/edit/:id", async (req, res) => {
  const blog = await blogModel.findOne({ _id: req.params.id });
  res.render("./admin/blog-edit", { blog });
});
router.post("/blog/edit/:id", async (req, res) => {
  try {
    const blog = await blogModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    return res.redirect("/admin/pages-blank");
  } catch (error) {
    console.log(`Blog update error: ${error}`);
  }
});
router.get("/blog/delete/:id", async (req, res) => {
  try {
    const blog = await blogModel.findOneAndDelete({ _id: req.params.id });
    return res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(`Blog deletion error: ${error}`);
  }
});
router.get("/pages-contact", (req, res) => {
  res.render("./admin/pages-contact");
});
router.get("/pages-error-404", (req, res) => {
  res.render("./admin/pages-error-404");
});
router.get("/pages-faq", (req, res) => {
  res.render("./admin/pages-faq");
});
router.get("/pages-login", (req, res) => {
  res.render("./admin/pages-login");
});
router.get("/pages-register", (req, res) => {
  res.render("./admin/pages-register");
});
router.get("/tables-data", (req, res) => {
  res.render("./admin/tables-data");
});
router.get("/tables-general", (req, res) => {
  res.render("./admin/tables-general");
});
router.get("/users-profile", (req, res) => {
  res.render("./admin/users-profile");
});
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username: username });
    if (user) {
      const unhashedPassword = await bcrypt.compare(password, user.password);
      if (unhashedPassword) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
        res.cookie("token", token, { httpOnly: true });
        return res.redirect("/admin/dashboard");
      } else {
        return res
          .status(401)
          .render("./admin/pages-error-404", {
            status: 401,
            message: "Invalid password",
          });
      }
    } else {
      return res
        .status(401)
        .render("./admin/pages-error-404", {
          status: 401,
          message: "User not found",
        });
    }
  } catch (error) {
    console.log(`login error: ${error}`);
  }
});
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.redirect("/admin");
});
router.get("*", (req, res) => {
  return res.status(404).render("./admin/pages-error-404", {
    status: 404,
    message: "Page not found",
  });
});

export default router;
