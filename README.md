## Users API

## Описание

Пример API для работы с пользователями, написанный на NestJS

## Установка

1. Установить все зависимости
```bash
$ npm install
```

2. В файле .env указать ссылку на сервер PostgreSQL и выбрать порт для HTTP-сервера
```
TYPEORM_URL=postgres://main:255655@localhost/test
PORT=8000
```

## Запуск сервера

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
