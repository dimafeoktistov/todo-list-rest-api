const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.authenticate = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Получить пользователя по email'у
      const user = await User.findOne({ email });

      // Пароль совпал
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (!isMatch) reject("Пароль не совпадает");
        resolve(user);
      });
    } catch (err) {
      // Email не найден или пароль не совпадает
      reject("Аутентификация не прошла");
    }
  });
};
