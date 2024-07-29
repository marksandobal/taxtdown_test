# Taxdown Challenge
Dependencies:
- Node.js
- typescript
- PostgreSQL
- Pg
- Node-pg-migrate
- Dotenv
- jest
- node-mocks-http

# Install dependencies

```bash
npm install
```
- copy .env.example to .env and set the variables
- create a database with the name of the one in the DATABASE_URL variable

# Migration

### Add new migration

```bash
npx migrate create migration_name
```
example:

```bash
npx migrate create addUsersTable
```

### Run migration in database

```bash
npx node-pg-migrate up
```

### RollBack migration

```bash
npx node-pg-migrate down
```

# Run tests

```bash
npm run jest
```

# Run dev server

```bash
npm run dev
```

# Run server

```bash
npm run start
```
# Run with Docker

```bash
docker-compose up
```
## Build docker image app - Not necesary
```bash
docker build -t taxdown-test-app .
```

## Run docker image app - Not necesary

**-d** run in background
**-p 3000:3000** map port 3000 of the container to port 3000 of the host

```bash
docker run -d -p 3000:3000 image_name
```
example:

```bash
docker run -d -p 3000:3000 taxdown-test-app
```

# Instructions

## Create a new user

```bash
curl -X POST https://taxtdown-test.onrender.com/users -H "Content-Type: application/json" -d '{"name": "John", "lastName": "Doe", "email": "john.doe@example.com", "password": "password"}'
```
## Authenticate a user

```bash
curl -X POST https://taxtdown-test.onrender.com/login -H "Content-Type: application/json" -d '{"email": "john.doe@example.com", "password": "password"}'
```

## List credits

```bash
curl -X GET https://taxtdown-test.onrender.com/credits -H "Content-Type: application/json" -H "Authorization: Bearer <token>"
```
## List customers available credits

```bash
curl -X GET https://taxtdown-test.onrender.com/users/available-credits?orderDirection=DESC -H "Content-Type: application/json" -H "Authorization: Bearer <token>"
```

## List available credits

```bash
curl -X GET https://taxtdown-test.onrender.com/available-credits -H "Content-Type: application/json" -H "Authorization: Bearer <token>"
```

## Add credit

```bash
curl -X POST https://taxtdown-test.onrender.com/credits -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"amount": 100, "name": "credit name", "active": true}'
```

## Add available credit

```bash
curl -X POST https://taxtdown-test.onrender.com/available-credits -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"amount": 100, "creditId": 1, "userId": 1, "amount": 100}'
```
