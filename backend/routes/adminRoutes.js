// /api/v1/cars
// /api/v1/books
// /api/v1/posts
const controller = require("../controllers/AdminController");
const authMiddleware = require("../middlewares/authMiddleware");

const rolesMiddleware = require("../middlewares/rolesMiddleware");

const adminRouter = require("express").Router();

// Додати машину

// Отримати всі
adminRouter.get(
  "/",
  authMiddleware,
  rolesMiddleware(["SEO", "ADMIN"]),
  controller.getAdminPanel
);

adminRouter.patch(
  "/user/update/:id",
  authMiddleware,
  rolesMiddleware(["SEO", "ADMIN"]),
  controller.updateUser
);

adminRouter.patch(
  "/user/addrole/:id",
  authMiddleware,
  rolesMiddleware(["SEO", "ADMIN"]),
  controller.addRole
);

module.exports = adminRouter;
