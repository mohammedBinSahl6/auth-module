# HOW_TO_RUN

## Prerequisites

Make sure the following are installed:

- Node.js >= 22
- npm >= 10

## Install Dependencies

From the repository root:

```bash
npm install
```

---

## Run Backend

Navigate to:

```bash
cd apps/backend
```

Start development server:

```bash
npm run start:dev
```

Backend will run on:

```text
http://localhost:3000
```

---

## Run Frontend

Open another terminal:

```bash
cd apps/frontend
```

Start development server:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## API Documentation

Swagger documentation:

```text
http://localhost:3000/api
```

---

## Authentication Flow

1. Register a user.
2. Sign in.
3. Receive JWT token.
4. Access protected endpoints using:

```text
Authorization: Bearer <token>
```
