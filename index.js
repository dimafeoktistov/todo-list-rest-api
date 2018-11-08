const restify = require("restify");
const mongoose = require("mongoose");
const config = require("./config");

const server = restify.createServer();

//Middleware
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(config.PORT, () => {
  mongoose.set("useFindAndModify", false);
  mongoose.connect(
    config.MONGODB_URI,
    { useNewUrlParser: true }
  );
});

const db = mongoose.connection;

db.on("error", err => {
  console.log(err);
});

db.once("open", () => {
  require("./routes/todos")(server);
  require("./routes/user")(server);
  console.log(`Сервер начал работу на порту ${config.PORT}`);
});