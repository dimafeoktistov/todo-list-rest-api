const errors = require("restify-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const auth = require("../auth");
const config = require("../config");

module.exports = server => {
  /**
   *
   * @api {post} /register Зарегестрировать пользователя
   * @apiVersion 1.0.0
   * @apiName register
   * @apiGroup Users
   *
   * @apiParam  {String} login required логин пользователя
   * @apiParam  {String} password required пароль пользователя
   *
   * @apiSuccess (200) {Number} iat Issued at: время выпуска токена
   * @apiSuccess (200) {Number} exp Время конца действия токена
   * @apiSuccess (200) {String} token Токен
   * @apiSuccess (200) {String} userId Уникальный идентификатор пользователя
   * @apiSuccess (200) {String} login Логин пользователя
   *
   * @apiParamExample  {JSON} Request-Example:
   * {
   *     "login" : "test",
   *     "password" : "testtest"
   * }
   *
   *
   * @apiSuccessExample {JSON} Success-Response:
   *  {
   *    "iat": 1541662808,
   *    "exp": 1541666408,
   *    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmUzZTNlZmJhZGE5NjNhM2MwMmEzMGQiLCJsb2dpbiI6InRlc3QiLCJwYXNzd29yZCI6IiQyYSQxMCREcS9wYWVHYmIzOFkxTmZqb0FyTGhPSGs1aFFkUEpyQUhrdWpiNXFmdzFDeFNrc0RwY2Q3UyIsIl9fdiI6MCwiaWF0IjoxNTQxNjYyODA4LCJleHAiOjE1NDE2NjY0MDh9.wQp6iFm26zDZxLBilXiu5WmbrCTfhLwlb92GPZsbqwA",
   *    "userId": "5be3e3efbada963a3c02a30d",
   *    "login": "test"
   *  }
   *@apiExample {axios} Пример использования:
   * axios.post('https://fast-sea-34727.herokuapp.com/register', data)
   *
   */
  server.post("/register", (req, res, next) => {
    const { login, password } = req.body;

    const user = new User({
      login,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        //Хешируем пароль
        user.password = hash;

        try {
          const newUser = await user.save();

          console.log(newUser);
          const token = jwt.sign(newUser.toJSON(), config.JWT_SECRET, {
            expiresIn: "1h"
          });

          const { iat, exp } = jwt.decode(token);

          // Отправляем токен
          res.send(201, {
            iat,
            exp,
            token,
            userId: newUser._id,
            login: newUser.login
          });
          next();
        } catch (error) {
          return next(new errors.InternalError(error.message));
        }
      });
    });
  });

  /**
   *
   * @api {post} /auth Авторизировать пользователя
   * @apiVersion 1.0.0
   * @apiName auth
   * @apiGroup Users
   *
   * @apiParam  {String} login required логин пользователя
   * @apiParam  {String} password required пароль пользователя
   *
   * @apiSuccess (200) {Number} iat Issued at: время выпуска токена
   * @apiSuccess (200) {Number} exp Время конца действия токена
   * @apiSuccess (200) {String} token Токен
   * @apiSuccess (200) {String} userId Уникальный идентификатор пользователя
   * @apiSuccess (200) {String} login Логин пользователя
   *
   * @apiParamExample  {JSON} Request-Example:
   * {
   *     "login" : "test",
   *     "password" : "testtest"
   * }
   *
   *
   * @apiSuccessExample {JSON} Success-Response:
   *  {
   *    "iat": 1541662808,
   *    "exp": 1541666408,
   *    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmUzZTNlZmJhZGE5NjNhM2MwMmEzMGQiLCJsb2dpbiI6InRlc3QiLCJwYXNzd29yZCI6IiQyYSQxMCREcS9wYWVHYmIzOFkxTmZqb0FyTGhPSGs1aFFkUEpyQUhrdWpiNXFmdzFDeFNrc0RwY2Q3UyIsIl9fdiI6MCwiaWF0IjoxNTQxNjYyODA4LCJleHAiOjE1NDE2NjY0MDh9.wQp6iFm26zDZxLBilXiu5WmbrCTfhLwlb92GPZsbqwA",
   *    "userId": "5be3e3efbada963a3c02a30d",
   *    "login": "test"
   *  }
   *@apiExample {axios} Пример использования:
   * axios.post('https://fast-sea-34727.herokuapp.com/auth', data)
   *
   */
  server.post("/auth", async (req, res, next) => {
    const { login, password } = req.body;

    try {
      // Попытка залогинить пользователя
      const user = await auth.authenticate(login, password);

      const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
        expiresIn: "1h"
      });

      const { iat, exp } = jwt.decode(token);

      // Отправляем токен
      res.send({
        iat,
        exp,
        token,
        userId: user._id,
        login: user.login
      });

      next();
    } catch (err) {
      return next(new errors.UnauthorizedError(err));
    }
  });
};
