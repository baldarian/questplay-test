# Questplay Setup

This repo has a **NestJS** backend in `server` and a **Next.js** frontend in `client`.

## Prerequisites

- Node.js 18+ and yarn

## Backend (`server`)

From the `server` folder:

```bash
cd server
yarn install
```

### Configure & run database seed

The backend uses **SQLite** (`database.sqlite` in the `server` folder) and seeds from `games.json`.

```bash
cd server
yarn seed
```

This will:

- Create/update `database.sqlite`
- Import all games from `games.json` into the `games` table

### Start the backend

```bash
cd server
yarn start:dev
```

The API will be available at `http://localhost:3000`.

Relevant endpoint:

- `GET /games?page=1&limit=20` – returns paginated list of games from the database.

## Frontend (`client`)

From the `client` folder:

```bash
cd client
yarn install
```

If you need to configure the backend URL, check `.env` in `client` (by default it should talk to `http://localhost:3000`).

### Start the frontend

```bash
cd client
yarn dev
```

The app will be available at `http://localhost:4000`.
