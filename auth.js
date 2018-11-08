const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.authenticate = (login, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Получить пользователя по логину
      const user = await User.findOne({ login });

      // Пароль совпал
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (!isMatch) reject("Пароль не совпадает");
        resolve(user);
      });
    } catch (err) {
      // пользователь не найден
      reject("Аутентификация не прошла");
    }
  });
};
