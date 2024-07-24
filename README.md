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

Add new migration

```bash
npx migrate create migration_name
```
example: 

```bash
npx migrate create addUsersTable
```

Run migration in database

```bash
npx node-pg-migrate up
```

# Run tests

```bash
npm run test
```

# Run dev server

```bash
npm run dev
```

# Instructions

## Create a new user

```bash
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john.doe@example.com", "password": "password"}'
```
## Authenticate a user

```bash
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"email": "john.doe@example.com", "password": "password"}'
```

## List credits

```bash
curl -X GET http://localhost:3000/credits -H "Content-Type: application/json" -H "Authorization: Bearer <token>"
```
## List customers available credits

```bash
curl -X GET http://localhost:3000/users/available-credits?orderDirection=DESC -H "Content-Type: application/json" -H "Authorization: Bearer <token>"
```

## List available credits

```bash
curl -X GET http://localhost:3000/available-credits -H "Content-Type: application/json" -H "Authorization: Bearer <token>"
```

## Add credit

```bash
curl -X POST http://localhost:3000/credits -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"amount": 100, "name": "credit name", "active": true}'
```

## Add available credit

```bash
curl -X POST http://localhost:3000/available-credits -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"amount": 100, "creditId": 1, "userId": 1, "amount": 100}'
```
