const errors = require("restify-errors");
const Todo = require("../models/Todo");

module.exports = server => {
  // Получить список задачь
  server.get("/todos", async (req, res, next) => {
    try {
      const todos = await Todo.find({});
      res.send(todos);
      next();
    } catch (error) {
      return next(new errors.InvalidContentError(error));
    }
  });

  // Получить одну задачу
  server.get("/todos/:id", async (req, res, next) => {
    try {
      const todo = await Todo.findById(req.params.id);
      res.send(todo);
      next();
    } catch (error) {
      return next(
        new errors.ResourceNotFoundError(`Нет задачи с ${req.params.id}`)
      );
    }
  });

  // Добавить задачу
  server.post("/todos", async (req, res, next) => {
    // Проверка на json
    if (!req.is("application/json")) {
      return next(
        new errors.InvalidContentError("Ожидалось 'application/json'")
      );
    }

    const { title, description, completed } = req.body;

    const todo = new Todo({
      title,
      description,
      completed
    });
    try {
      const newTodo = await todo.save();
      res.send(201, "новая задача добавлена");
      next();
    } catch (error) {
      return next(new errors.InternalError(error.message));
    }
  });

  //Редактировать задачу
  server.put("/todos/:id", async (req, res, next) => {
    // Проверка на json
    if (!req.is("application/json")) {
      return next(
        new errors.InvalidContentError("Ожидалось 'application/json'")
      );
    }

    try {
      const todo = await Todo.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );
      res.send(200, "задача обновлена");
      next();
    } catch (error) {
      return next(
        new errors.ResourceNotFoundError(`Нет задачи с id: ${req.params.id}`)
      );
    }
  });

  // Удалить задачу
  server.del("/todos/:id", async (req, res, next) => {
    try {
      const todo = await Todo.findOneAndRemove({ _id: req.params.id });
      res.send(204);
      next();
    } catch (error) {
      return next(
        new errors.ResourceNotFoundError(`Нет задачи с id: ${req.params.id}`)
      );
    }
  });
};
