module.exports = (rolesArr) => {
  return (req, res, next) => {
    try {
      //1. Отримаємо токен
      //2. Розшифровуємо токен
      //3. Передаємо інфо про користувача далі

      const { roles } = req.user;
      console.log(roles);
      console.log(rolesArr);
      let hasRole = false;
      roles.forEach((role) => {
        if (rolesArr.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res.status(403).json({
          code: 403,
          message: "Forbidden",
        });
      }
      next();
    } catch (error) {
      res.status(403).json({
        code: 403,
        message: error.message,
      });
    }
  };
};

// {
//   salary: 1500,
//   students: [ 'Kate', 'Tanya' ],
//   teacher: 'Andrew',
//   id: '65c8d4a9d8c047565e5b7fd6',
//   roles: [ 'SEO' ],
//   iat: 1707660652,
//   exp: 1707689452
// }
