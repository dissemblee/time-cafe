# Time Cafe

Веб-система для управления тайм-кафе: гости знакомятся с залами, меню и настольными играми, выбирают столик и бронируют время; сотрудники управляют данными заведения из административной панели. В проекте также есть имитация платёжного шлюза для полного сценария бронирования без подключения внешнего эквайринга.

## Возможности

- публичный каталог залов, меню и настольных игр;
- регистрация и вход, разделение ролей клиента и администратора;
- визуальный билдер схемы зала: стены, диваны и столики с параметрами, а также просмотр схемы при бронировании;
- расчёт стоимости по длительности и минимальной цене зала;
- история бронирований клиента, отмена и демонстрационная оплата;
- администрирование залов, столиков, схем помещений, меню, игр, клиентов, персонала, бронирований и транзакций.

## Состав репозитория

| Каталог | Назначение | Технологии |
| --- | --- | --- |
| `time-cafe-frontend` | Клиентское приложение и панель администратора | Next.js 15, React 19, TypeScript, Redux Toolkit, SCSS |
| `timcafe-backend` | REST API и бизнес-логика | Laravel 12, PHP 8.2, Sanctum, PostgreSQL |
| `nginx` | Конфигурация веб-сервера для API | Nginx |

Подробности по каждому приложению: [frontend README](time-cafe-frontend/README.md) и [backend README](timcafe-backend/README.md).

## Быстрый старт в Docker

Требуются Docker Desktop и Node.js 20+ (Node.js нужен для фронтенда, который запускается отдельно).

1. Создайте `timcafe-backend/.env` на основе `.env.example` и задайте параметры PostgreSQL:

   ```dotenv
   APP_URL=http://localhost
   DB_CONNECTION=pgsql
   DB_HOST=db
   DB_PORT=5432
   DB_DATABASE=timcafe
   DB_USERNAME=postgres
   DB_PASSWORD=secret
   SESSION_DRIVER=file
   JWT_SECRET=replace-with-a-long-random-secret
   ```

2. Поднимите API, PostgreSQL, Nginx и pgAdmin:

   ```bash
   docker compose up --build -d
   ```

3. Сгенерируйте ключ Laravel, создайте таблицы и, при необходимости, заполните демо-данными:

   ```bash
   docker compose exec app php artisan key:generate
   docker compose exec app php artisan migrate --seed
   ```

4. Создайте `time-cafe-frontend/.env.local`:

   ```dotenv
   NEXT_PUBLIC_BACKEND_URL=http://localhost/api
   NEXT_PUBLIC_JWT_SECRET=replace-with-the-same-value-as-JWT_SECRET
   ```

5. В отдельном терминале запустите интерфейс:

   ```bash
   cd time-cafe-frontend
   npm ci
   npm run dev
   ```

После запуска: интерфейс доступен на `http://localhost:3000`, API — на `http://localhost/api`, pgAdmin — на `http://localhost:8080`. Учётные данные pgAdmin заданы в `docker-compose.yml`; перед публикацией замените стандартные пароли и не используйте демо-сидеры в рабочем окружении.

## Разработка и проверка

```bash
# фронтенд
cd time-cafe-frontend
npm run lint
npm run build

# бэкенд (в контейнере)
docker compose exec app php artisan test
```

## Важные замечания

- Docker Compose публикует PostgreSQL на порт `5433`, поэтому локальные подключения к БД используют `localhost:5433`.
- Проверка JWT выполняется и на фронтенде, и на API: `NEXT_PUBLIC_JWT_SECRET` и `JWT_SECRET` должны совпадать. Поскольку переменная с префиксом `NEXT_PUBLIC_` попадает в браузерный код, текущая схема подходит для учебного/демонстрационного проекта; для production следует перенести проверку токена на сервер и не раскрывать секрет.
- Платёжный шлюз намеренно тестовый: результат оплаты моделируется, реальный провайдер не подключён.

## Лицензия

Лицензия не указана. До повторного использования кода согласуйте условия с автором проекта.
