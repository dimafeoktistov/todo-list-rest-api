# Тестовое задание на знание Node.js

Сделано API для todo list с авторизацией. API поддерживает стандартные CRUD операции. В качестве сервера был выбран restify, в качестве базы данных использована MongoDB через Moongoose, для авторизации используются библиотеки JWT и bcrypt.

## Описание задания

Необходимо реализовать на любимом стеке технологий (естественно решение должно основываться на Node.js) простой REST API для todo list с аутентификацией и авторизацией.

1. Аутентификация и авторизация должны быть простые (login, password), но не должна использвать готовые библиотеки типа passport.js, т.е. необходимо ее реализовать самостоятельно. Разрешено использовать библиотеки типа JWT;
2. В системе должны быть две сущности: Todo, User;
3. Использование базы обязательно, желательно SQL;
4. API должен позволять авторизованному пользвателю управлять своими todo.
