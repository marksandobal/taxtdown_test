# Taxdown Challenge
Dependencies:
- Node.js
- typescript
- PostgreSQL
- Pg
- Node-pg-migrate
- Dotenv

# Install dependencies

```bash
npm install
```

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

