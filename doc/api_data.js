define({ "api": [
  {
    "type": "delete",
    "url": "/todos/:id",
    "title": "Удалить задачу",
    "version": "1.0.0",
    "name": "deleteTodo",
    "group": "Todos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>Id удаляемой задачи.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>Задача удалена</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Пример использования:",
        "content": "axios.delete('http://localhost:5000/todos/5be3f073b41d1e450c09dfa3')",
        "type": "axios"
      }
    ],
    "filename": "routes/todos.js",
    "groupTitle": "Todos"
  },
  {
    "type": "get",
    "url": "/todos/:id",
    "title": "Получить задачу по id",
    "version": "1.0.0",
    "name": "getOneTodo",
    "group": "Todos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>позволяет получить конкретную задачю с id равном :id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "JSON",
            "optional": false,
            "field": "todo",
            "description": "<p>Задача со всеми выходными данными</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"completed\": false,\n \"_id\": \"5be3f073b41d1e450c09dfa3\",\n \"title\": \"755453\",\n \"description\": \"dscx\",\n \"userId\": \"5be3e3efbada963a3c02a30d\",\n \"updatedAt\": \"2018-11-08T08:14:43.936Z\",\n \"createdAt\": \"2018-11-08T08:14:43.936Z\",\n}",
          "type": "JSON"
        }
      ]
    },
    "examples": [
      {
        "title": "Пример использования:",
        "content": "axios.get('http://localhost:5000/todos/5be3f073b41d1e450c09dfa3')",
        "type": "axios"
      }
    ],
    "filename": "routes/todos.js",
    "groupTitle": "Todos"
  },
  {
    "type": "get",
    "url": "/todos",
    "title": "Получить список задач",
    "version": "1.0.0",
    "name": "getTodos",
    "group": "Todos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>позволяет получать список todo задач по id пользователя (включать <strong>обязательно</strong>)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "todos",
            "description": "<p>Массив состоящий из объектов todo задач</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[ todo, todo, todo, ... ]",
          "type": "Array"
        }
      ]
    },
    "examples": [
      {
        "title": "Пример использования:",
        "content": "axios.get('http://localhost:5000/todos?userId=${userId}${token}')",
        "type": "axios"
      }
    ],
    "filename": "routes/todos.js",
    "groupTitle": "Todos"
  },
  {
    "type": "post",
    "url": "/todos",
    "title": "Добавить задачу",
    "version": "1.0.0",
    "name": "postTodo",
    "group": "Todos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Название задачи. Обязательный параметр.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Текст задачи. Обязательный параметр.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "completed",
            "description": "<p>Выполнена задача или нет. Не обязательный параметр. По умолчанию false.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>id пользователя который добавил задачу. Обязательный параметр.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-example:",
          "content": "{\n \t\"title\": \"755453\",\n \t\"description\": \"dscx\",\n \t\"userId\": \"5be3e3efbada963a3c02a30d\"\n }",
          "type": "JSON"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "JSON",
            "optional": false,
            "field": "todo",
            "description": "<p>Задача со всеми выходными данными</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"completed\": false,\n \"_id\": \"5be3f073b41d1e450c09dfa3\",\n \"title\": \"755453\",\n \"description\": \"dscx\",\n \"userId\": \"5be3e3efbada963a3c02a30d\",\n \"updatedAt\": \"2018-11-08T08:14:43.936Z\",\n \"createdAt\": \"2018-11-08T08:14:43.936Z\",\n}",
          "type": "JSON"
        }
      ]
    },
    "examples": [
      {
        "title": "Пример использования:",
        "content": "axios.post('http://localhost:5000/todos', data)",
        "type": "axios"
      }
    ],
    "filename": "routes/todos.js",
    "groupTitle": "Todos"
  },
  {
    "type": "put",
    "url": "/todos/:id",
    "title": "Редактировать задачу",
    "version": "1.0.0",
    "name": "putTodo",
    "group": "Todos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Название задачи. Необязательный параметр.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Текст задачи. Необязательный параметр.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "completed",
            "description": "<p>Выполнена задача или нет. Не обязательный параметр. По умолчанию false.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-example:",
          "content": "{\n \t\"completed\": true\n}",
          "type": "JSON"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "JSON",
            "optional": false,
            "field": "todo",
            "description": "<p>Отредактированная задача со всеми выходными данными</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"completed\": true,\n \"_id\": \"5be3f073b41d1e450c09dfa3\",\n \"title\": \"755453\",\n \"description\": \"dscx\",\n \"userId\": \"5be3e3efbada963a3c02a30d\",\n \"updatedAt\": \"2018-11-08T08:14:43.936Z\",\n \"createdAt\": \"2018-11-08T08:14:43.936Z\",\n}",
          "type": "JSON"
        }
      ]
    },
    "examples": [
      {
        "title": "Пример использования:",
        "content": "axios.put('http://localhost:5000/todos/5be3f073b41d1e450c09dfa3', data)",
        "type": "axios"
      }
    ],
    "filename": "routes/todos.js",
    "groupTitle": "Todos"
  },
  {
    "type": "post",
    "url": "/auth",
    "title": "Авторизировать пользователя",
    "version": "1.0.0",
    "name": "auth",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "login",
            "description": "<p>required логин пользователя</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>required пароль пользователя</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"login\" : \"test\",\n    \"password\" : \"testtest\"\n}",
          "type": "JSON"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "iat",
            "description": "<p>Issued at: время выпуска токена</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "exp",
            "description": "<p>Время конца действия токена</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Токен</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>Уникальный идентификатор пользователя</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "login",
            "description": "<p>Логин пользователя</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"iat\": 1541662808,\n  \"exp\": 1541666408,\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmUzZTNlZmJhZGE5NjNhM2MwMmEzMGQiLCJsb2dpbiI6InRlc3QiLCJwYXNzd29yZCI6IiQyYSQxMCREcS9wYWVHYmIzOFkxTmZqb0FyTGhPSGs1aFFkUEpyQUhrdWpiNXFmdzFDeFNrc0RwY2Q3UyIsIl9fdiI6MCwiaWF0IjoxNTQxNjYyODA4LCJleHAiOjE1NDE2NjY0MDh9.wQp6iFm26zDZxLBilXiu5WmbrCTfhLwlb92GPZsbqwA\",\n  \"userId\": \"5be3e3efbada963a3c02a30d\",\n  \"login\": \"test\"\n}",
          "type": "JSON"
        }
      ]
    },
    "examples": [
      {
        "title": "Пример использования:",
        "content": "axios.post('http://localhost:5000/auth', data)",
        "type": "axios"
      }
    ],
    "filename": "routes/user.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Зарегестрировать пользователя",
    "version": "1.0.0",
    "name": "register",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "login",
            "description": "<p>required логин пользователя</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>required пароль пользователя</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"login\" : \"test\",\n    \"password\" : \"testtest\"\n}",
          "type": "JSON"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Уникальный идентификатор пользователя</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "login",
            "description": "<p>Логин пользователя</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Пароль пользователя</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"userId\" : \"Id\",\n     \"login\" : \"Логин\",\n}",
          "type": "JSON"
        }
      ]
    },
    "examples": [
      {
        "title": "Пример использования:",
        "content": "axios.post('http://localhost:5000/register', data)",
        "type": "axios"
      }
    ],
    "filename": "routes/user.js",
    "groupTitle": "Users"
  }
] });
