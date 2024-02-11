const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    //1. Отримаємо токен
    //2. Розшифровуємо токен
    //3. Передаємо інфо про користувача далі
    const [type, token] = req.headers.authorization.split(" ");
    if ("Bearer" === type && token) {
      const decoded = jwt.verify(token, "cat");

      req.user = decoded;
      next();
    }
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error.message,
    });
  }
};

// {
//   salary: 1500,
//   students: [ 'Kate', 'Tanya' ],
//   teacher: 'Andrew',
//   id: '65c8c0fb55d706a2696ac425',
//   iat: 1707657589,
//   exp: 1707686389
// }
