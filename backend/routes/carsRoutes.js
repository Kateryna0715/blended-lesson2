// /api/v1/cars
// /api/v1/books
// /api/v1/posts
const controller = require("../controllers/CarsController");
const authMiddleware = require("../middlewares/authMiddleware");
const carValidation = require("../middlewares/carValidation");
const rolesMiddleware = require("../middlewares/rolesMiddleware");
const validateId = require("../middlewares/validateId");

const carsRouter = require("express").Router();
const carJoiSchema = require("../schemas/carJoiSchema");
// Додати машину
carsRouter.post("/cars", carValidation(carJoiSchema), controller.add);

// Отримати всі
carsRouter.get(
  "/cars",
  authMiddleware,
  rolesMiddleware(["MANAGER", "ACCOUNTER"]),
  controller.getAll
);

// Отримати одну
carsRouter.get("/cars/:id", validateId, controller.getOne);

// Оновити машину
carsRouter.patch("/cars/:id", validateId, controller.update);

// Видалити машину
carsRouter.delete("/cars/:id", validateId, controller.remove);

module.exports = carsRouter;
