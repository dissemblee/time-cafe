# Time Cafe Backend

Laravel API для клиентского приложения и панели управления Time Cafe. Сервис хранит данные залов и столиков, меню, игр, клиентов и персонала, создаёт бронирования, рассчитывает их стоимость и ведёт транзакции демонстрационной оплаты.

## Стек

PHP 8.2, Laravel 12, Laravel Sanctum, PostgreSQL 17, Firebase PHP-JWT, PHPUnit. Для контейнерного запуска используется PHP-FPM и Nginx из корня репозитория.

## Локальная настройка

Требуются PHP 8.2+, Composer и PostgreSQL либо Docker Compose из корня проекта.

```bash
cp .env.example .env
composer install
php artisan key:generate
```

Для PostgreSQL внесите в `.env` как минимум следующие значения. При запуске через Docker хост БД — `db`; при локальном запуске укажите адрес своего PostgreSQL.

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

Затем создайте схему и демо-данные:

```bash
php artisan migrate --seed
```

Запуск без Docker:

```bash
php artisan serve
```

При запуске из Docker используйте команды из [корневого README](../README.md#быстрый-старт-в-docker).

## API

Базовый URL: `/api`.

Публично доступны `POST /register`, `POST /login`, чтение `/food-items`, `/board-games`, `/rooms`, `/tables`, `/room-layout-items`, а также проверка ссылки регистрации. Остальные операции требуют `auth:sanctum`.

| Группа | Назначение |
| --- | --- |
| `food-items`, `board-games` | каталог меню и игр |
| `rooms`, `tables`, `room-layout-items` | помещения, столики и элементы схемы |
| `bookings` | создание, просмотр, отмена и список бронирований текущего клиента (`/bookings/my-bookings`) |
| `payments/create-session`, `transactions` | создание платёжной сессии и работа с транзакциями |
| `users`, `clients`, `staffs`, `roots` | управление пользователями и персоналом |
| `registration-links` | выпуск и проверка временных ссылок для регистрации |

Полный перечень и HTTP-методы определены в [routes/api.php](routes/api.php).

## Бизнес-правила

- при создании бронирования длительность округляется вверх до целого часа;
- стоимость рассчитывается как число часов × `min_price` зала;
- при отмене бронирования столик возвращается в состояние `FREE`;
- тестовый callback оплаты с вероятностью 90% подтверждает транзакцию; при неуспехе бронирование отменяется.

## Проверки

```bash
php artisan test
```

## Безопасность

Не коммитьте `.env`, реальный `JWT_SECRET`, пароли БД и учётные данные, создаваемые сидерами. Демо-платёжный callback не является интеграцией с реальным платёжным провайдером и не должен использоваться для приёма платежей.
