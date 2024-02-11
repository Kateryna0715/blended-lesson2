const asyncHandler = require("express-async-handler");
const UserModel = require("../models/UserModel");

class AdminController {
  getAdminPanel = asyncHandler(async (req, res) => {
    // Контролерна валідація - це перевірка чи передано обов'язкове поле

    res.status(200).send("Admin panel main page");
  });

  updateUser = asyncHandler(async (req, res) => {
    // Контролерна валідація - це перевірка чи передано обов'язкове поле
    const { id } = req.params;
    const user = await UserModel.findById(id);
    user.roles = [req.body.roles];
    await user.save();
    res.status(200).send("Update sucsses");
  });

  addRole = asyncHandler(async (req, res) => {
    // Контролерна валідація - це перевірка чи передано обов'язкове поле
    const { id } = req.params;
    const user = await UserModel.findById(id);
    user.roles.push(req.body.roles);
    await user.save();
    res.status(200).send("Add role sucsses");
  });
}

module.exports = new AdminController();
