const errors = require("restify-errors");
const Todo = require("../models/Todo");

module.exports = server => {
  /**
   * @api {get} /todos Получить список задач
   * @apiVersion 1.0.0
   * @apiName getTodos
   * @apiGroup Todos
   *
   *
   * @apiParam  {String} userId позволяет получать список todo задач
   *  по id пользователя (включать <strong>обязательно</strong>)
   *
   * @apiSuccess (200) {Object[]} todos Массив состоящий из объектов todo задач
   *
   * @apiSuccessExample {Array} Success-Response:
   * [ todo, todo, todo, ... ]
   *
   * @apiExample {axios} Пример использования:
   *  axios.get('http://localhost:5000/todos?userId=${userId}${token}')
   */
  server.get("/todos", async (req, res, next) => {
    try {
      const todos = await Todo.find({
        userId: { $regex: req.query.userId, $options: "i" }
      });
      res.send(todos);
      next();
    } catch (error) {
      return next(new errors.InvalidContentError(error));
    }
  });

  /**
   * @api {get} /todos/:id Получить задачу по id
   * @apiVersion 1.0.0
   * @apiName getOneTodo
   * @apiGroup Todos
   *
   *
   * @apiParam  {String} :id позволяет получить конкретную задачю с id равном :id
   *
   * @apiSuccess (200) {JSON} todo Задача со всеми выходными данными
   *
   * @apiSuccessExample {JSON} Success-Response:
   * {
   *  "completed": false,
   *  "_id": "5be3f073b41d1e450c09dfa3",
   *  "title": "755453",
   *  "description": "dscx",
   *  "userId": "5be3e3efbada963a3c02a30d",
   *  "updatedAt": "2018-11-08T08:14:43.936Z",
   *  "createdAt": "2018-11-08T08:14:43.936Z",
   * }
   *
   * @apiExample {axios} Пример использования:
   *  axios.get('http://localhost:5000/todos/5be3f073b41d1e450c09dfa3')
   */
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

  /**
   *
   * @api {post} /todos Добавить задачу
   * @apiVersion 1.0.0
   * @apiName postTodo
   * @apiGroup Todos
   *
   *
   * @apiParam  {String} title Название задачи. Обязательный параметр.
   * @apiParam  {String} description Текст задачи. Обязательный параметр.
   * @apiParam  {Boolean} completed Выполнена задача или нет. Не обязательный параметр. По умолчанию false.
   * @apiParam  {String} userId id пользователя который добавил задачу. Обязательный параметр.
   *
   * @apiParamExample {JSON} Request-example:
   *  {
   *   	"title": "755453",
   *   	"description": "dscx",
   *   	"userId": "5be3e3efbada963a3c02a30d"
   *   }
   *
   * @apiSuccess (200) {JSON} todo Задача со всеми выходными данными
   *
   * @apiSuccessExample {JSON} Success-Response:
   * {
   *  "completed": false,
   *  "_id": "5be3f073b41d1e450c09dfa3",
   *  "title": "755453",
   *  "description": "dscx",
   *  "userId": "5be3e3efbada963a3c02a30d",
   *  "updatedAt": "2018-11-08T08:14:43.936Z",
   *  "createdAt": "2018-11-08T08:14:43.936Z",
   * }
   *
   * @apiExample {axios} Пример использования:
   *  axios.post('http://localhost:5000/todos', data)
   */
  server.post("/todos", async (req, res, next) => {
    // Проверка на json
    if (!req.is("application/json")) {
      return next(
        new errors.InvalidContentError("Ожидалось 'application/json'")
      );
    }

    const { title, description, completed, userId } = req.body;

    const todo = new Todo({
      title,
      description,
      completed,
      userId
    });
    try {
      const newTodo = await todo.save();
      res.send(201, newTodo);
      next();
    } catch (error) {
      return next(new errors.InternalError(error.message));
    }
  });

  /**
   * @api {put} /todos/:id Редактировать задачу
   * @apiVersion 1.0.0
   * @apiName putTodo
   * @apiGroup Todos
   *
   *
   * @apiParam  {String} title Название задачи. Необязательный параметр.
   * @apiParam  {String} description Текст задачи. Необязательный параметр.
   * @apiParam  {Boolean} completed Выполнена задача или нет. Не обязательный параметр. По умолчанию false.
   *
   * @apiParamExample {JSON} Request-example:
   *  {
   *   	"completed": true
   *  }
   *
   * @apiSuccess (200) {JSON} todo Отредактированная задача со всеми выходными данными
   *
   * @apiSuccessExample {JSON} Success-Response:
   * {
   *  "completed": true,
   *  "_id": "5be3f073b41d1e450c09dfa3",
   *  "title": "755453",
   *  "description": "dscx",
   *  "userId": "5be3e3efbada963a3c02a30d",
   *  "updatedAt": "2018-11-08T08:14:43.936Z",
   *  "createdAt": "2018-11-08T08:14:43.936Z",
   * }
   *
   * @apiExample {axios} Пример использования:
   *                     axios.put('http://localhost:5000/todos/5be3f073b41d1e450c09dfa3', data)
   */
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
      res.send(200, todo);
      next();
    } catch (error) {
      return next(
        new errors.ResourceNotFoundError(`Нет задачи с id: ${req.params.id}`)
      );
    }
  });

  /**
   *
   * @api {delete} /todos/:id Удалить задачу
   * @apiVersion 1.0.0
   * @apiName deleteTodo
   * @apiGroup Todos
   *
   *
   * @apiParam  {String} :id Id удаляемой задачи.
   *
   * @apiSuccess (204) {String} response Задача удалена
   *
   *
   * @apiExample {axios} Пример использования:
   *  axios.delete('http://localhost:5000/todos/5be3f073b41d1e450c09dfa3')
   */
  server.del("/todos/:id", async (req, res, next) => {
    try {
      const todo = await Todo.findOneAndRemove({ _id: req.params.id });
      res.send(204, "Задача удалена");
      next();
    } catch (error) {
      return next(
        new errors.ResourceNotFoundError(`Нет задачи с id: ${req.params.id}`)
      );
    }
  });
};
