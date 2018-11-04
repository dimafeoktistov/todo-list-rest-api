module.exports = {
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,
  URL: process.env.BASE_URL || "http://localhost:5000",
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb://testuser!1:testuser!1@ds151523.mlab.com:51523/todo_api",
  JWT_SECRET: process.env.JWT_SECRET || "секрет"
};
