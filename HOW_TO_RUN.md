# How to Run My Pet Service

## Prerequisites

- Node.js (see package.json for version)
- Yarn or npm
- Docker (for database)

## 1. Clone the repository

```sh
git clone <repo-url>
cd my-pet-service
```

## 2. Install dependencies

```sh
yarn install
# or
npm install
```

## 3. Set up the database

The project uses PostgreSQL. You can start a local database using Docker Compose:

```sh
cd app-setup
docker-compose -f docker-compose.dev.yml --env-file .env.dev up -d
cd ..
```

- The database credentials are in `app-setup/.env.dev`.
- Data will persist in the `postgres-data` folder.

## 4. Configure environment variables

Copy the example environment file and adjust as needed:

```sh
cp app-setup/.env.dev .env
```
