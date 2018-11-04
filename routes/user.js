const errors = require("restify-errors");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../auth");
const config = require("../config");

module.exports = server => {
  // Регистрация юзера
  server.post("/register", (req, res, next) => {
    const { email, password } = req.body;

    const user = new User({
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      console.log(err);
      bcrypt.hash(user.password, salt, async (err, hash) => {
        //Хешируем пароль
        user.password = hash;

        try {
          const newUser = await user.save();
          res.send(201);
          next();
        } catch (error) {
          return next(new errors.InternalError(error.message));
        }
      });
    });
  });

  server.post("/auth", async (req, res, next) => {
    const { email, password } = req.body;

    try {
      // Попытка залогинить пользователя
      const user = await auth.authenticate(email, password);

      const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
        expiresIn: "15m"
      });

      const { iat, exp } = jwt.decode(token);

      // Отправляем токен
      res.send({ iat, exp, token });

      next();
    } catch (err) {
      return next(new errors.UnauthorizedError(err));
    }
  });
};
