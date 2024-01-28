const CarModel = require("../models/CarModel");
const asyncHandler = require("express-async-handler");

class CarsController {
  add = asyncHandler(async (req, res) => {
    // Контролерна валідація - це перевірка чи передано обов'язкове поле
    const { title, price } = req.body;
    if (!title || !price) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }
    const car = await CarModel.create({ ...req.body });
    res.status(201).json({
      code: 201,
      data: car,
    });
  });

  getAll = asyncHandler(async (req, res) => {
    const cars = await CarModel.find({});
    res.status(200).json({
      code: 200,
      qty: cars.length,
      data: cars,
    });
  });

  // ID буває валідний існуючий
  // ID буває валідний неіснуючий
  // ID буває невалідний
  getOne = asyncHandler(async (req, res) => {
    const car = await CarModel.findById(req.params.id);
    if (!car) {
      res.status(400);
      throw new Error(`Car with ID: ${req.params.id} not found`);
    }
    res.status(200).json({
      code: 200,
      data: car,
    });
  });

  update = asyncHandler(async (req, res) => {
    const car = await CarModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!car) {
      res.status(400);
      throw new Error(`Car with ID: ${req.params.id} not found`);
    }
    res.status(200).json({
      code: 200,
      data: car,
    });
  });

  remove = asyncHandler(async (req, res) => {
    const car = await CarModel.findByIdAndDelete(req.params.id);
    if (!car) {
      res.status(400);
      throw new Error(`Car with ID: ${req.params.id} not found`);
    }
    res.status(200).json({
      code: 200,
      data: car,
    });
  });
}

module.exports = new CarsController();
