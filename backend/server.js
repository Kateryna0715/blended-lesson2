require("colors");
const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const configPath = path.join(__dirname, "..", "config", ".env");
const connectDb = require("../config/connectDb");
const errorHandler = require("./middlewares/errorHandler");
const asyncHandler = require("express-async-handler");
const UserModel = require("./models/UserModel");
const RoleModel = require("./models/RoleModel");
const authMiddleware = require("./middlewares/authMiddleware");
require("dotenv").config({ path: configPath });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", require("./routes/carsRoutes"));
app.use("/admin", require("./routes/adminRoutes"));

//Реєстрація - збереження даних у БД
//Аутентифікація - перевірка і порівняння даних з тим, що в БД
//Авторизація - перевірка прав доступу
//Логаут - вихід зі свого акаунта

app.post(
  "/register",
  asyncHandler(async (req, res) => {
    //get and validate data from user
    //find user in BD
    //if find error 409
    //if didn't find hesh password
    //save user in BD with hesh password

    // res.send(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(409);
      throw new Error("User already exists");
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const roles = await RoleModel.findOne({ title: "USER" });

    // { _id: new ObjectId('65c8d22d53721a7867b3e446'), title: 'USER' }

    const newUser = await UserModel.create({
      ...req.body,
      password: hashPassword,
      roles: [roles.title],
    });
    res.status(201).json({
      code: 201,
      data: {
        email: newUser.email,
        name: newUser.name,
      },
    });
  })
);

app.post(
  "/login",
  asyncHandler(async (req, res) => {
    // 1.Отримуємо і валідуємо дані користувача
    // 2.Шукаємо користувача в базі і розшифровуємо пароль
    // 3.Якщо не знайшли або не розшифрували пароль - Invalid login or password, то видаємо помилку
    // 4.Якщо знайшли і розшифрували, тоді видаємо токен
    // 5.Зберіємо токен користувачу
    // res.send(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }
    const user = await UserModel.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.status(400);
      throw new Error("Invalid login or password");
    }
    const token = generateToken({
      salary: 1500,
      students: ["Kate", "Tanya"],
      teacher: "Andrew",
      id: user._id,
      roles: user.roles,
    });
    user.token = token;
    await user.save();

    res.status(200).json({
      code: 200,
      data: {
        email: user.email,
        token: user.token,
      },
    });
  })
);

app.patch(
  "/logout",
  authMiddleware,
  asyncHandler(async (req, res) => {
    //1. Отримаємо інфо про користувача - нас цікавить id
    //2. Видаляємо токен
    // res.send(req.user);
    const { id } = req.user;
    const user = await UserModel.findById(id);
    user.token = null;
    await user.save();

    res.status(200).json({
      code: 200,
      data: {
        email: user.email,
        token: user.token,
      },
    });
  })
);

app.use(errorHandler);
const { PORT } = process.env;
connectDb();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.green.bold);
});

function generateToken(data) {
  return jwt.sign({ ...data }, "cat", { expiresIn: "8h" });
}

// console.log("green".green.italic.bold);
// console.log("yellow".yellow.underline);
// console.log("red".red.bold);
// console.log(process.env.KATE);
// console.log(process.env.PORT);
// console.log(process.env.DB_STRING);
