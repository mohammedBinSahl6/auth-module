# guide.md

# Engineering Guidelines

This document defines the conventions and architectural rules used across the project.

These rules are strict and should always be followed.

---

# Core Principles

Follow:

- SOLID principles.
- DRY (Don't Repeat Yourself).
- KISS (Keep It Simple).
- Separation of Concerns.
- Composition over inheritance.
- Explicit over implicit.
- Strong typing everywhere.
- Prefer maintainability over clever code.

---

# General Rules

## Never

- Use `any`.
- Duplicate business logic.
- Put API calls inside UI components.
- Put validation inside components.
- Put business logic inside controllers.
- Create giant files.
- Mix concerns.
- Export everything from index files unnecessarily.
- Hardcode configuration values.

---

## Always

- Write self-explanatory code.
- Keep functions small.
- Keep components focused.
- Use TypeScript strictly.
- Prefer readonly when possible.
- Use interfaces for contracts.
- Use descriptive names.

---

# Naming Convention

## Variables

Use camelCase.

Good:

```ts
userProfile;
accessToken;
isAuthenticated;
```

Bad:

```ts
User_Profile;
token_data;
```

---

## Functions

Use verbs.

Good:

```ts
createUser();
validatePassword();
getProfile();
```

Bad:

```ts
userData();
password();
```

---

## Boolean Variables

Must start with:

```ts
is;
has;
can;
should;
```

Examples:

```ts
isLoading;
hasPermission;
canEdit;
shouldRedirect;
```

---

## Constants

UPPER_SNAKE_CASE

```ts
JWT_EXPIRATION;
MAX_PASSWORD_LENGTH;
```

---

## Types

PascalCase.

```ts
User;
UserResponse;
AuthPayload;
```

---

# Folder Structure

Use feature-based architecture.

Never organize by file type.

Bad:

```txt
components/
hooks/
services/
pages/
```

Good:

```txt
features/
    auth/
        components/
        hooks/
        api/
        schemas/
        types/
```

---

# File Naming

Use kebab-case.

Good:

```txt
sign-in-form.tsx
auth-service.ts
jwt-auth.guard.ts
```

Bad:

```txt
SignInForm.tsx
AuthService.ts
```

---

# React Rules

---

## Components

One responsibility only.

Avoid components bigger than 150 lines.

Split when necessary.

---

## Component Names

PascalCase.

```tsx
SignInForm;
ProtectedRoute;
PasswordInput;
```

---

## Hooks

Must start with:

```ts
useAuth;
useLoginMutation;
useCurrentUser;
```

---

## Forms

Use:

- React Hook Form
- Zod

Never use useState for forms.

---

## API Calls

Must live inside:

```txt
features/auth/api/
```

Never:

```tsx
useEffect(() => {
 axios.post(...)
})
```

inside components.

---

## Server State

Use TanStack Query.

Never manually manage loading states if React Query can do it.

---

## Reusable Components

Shared UI:

```txt
components/ui/
```

Feature-specific components:

```txt
features/auth/components/
```

---

# Backend Rules

---

## Controller

Controllers are thin.

Only:

- receive request
- call service
- return response

Never put business logic in controllers.

Bad:

```ts
@Post()
async register() {
  // hash password
  // validate user
  // generate token
}
```

Good:

```ts
@Post()
register() {
  return this.authService.register();
}
```

---

## Service

Contains business logic.

Responsible for:

- validation
- hashing
- database interaction
- token generation

---

## DTO

Validation belongs here.

Use:

```ts
class-validator
```

Never validate inside services.

---

## Repository Layer

Database access must be isolated.

Never query mongoose directly inside controllers.

---

# Error Handling

Never:

```ts
throw new Error();
```

Always:

```ts
throw new BadRequestException();
throw new UnauthorizedException();
throw new NotFoundException();
```

Global exception filter should be used.

---

# Security

Passwords:

- bcrypt hashing.
- never store plain text.

JWT:

- expiration required.
- secret from env.

Never expose:

```ts
password;
refreshToken;
```

in responses.

---

# Environment Variables

All config must come from:

```txt
.env
```

through ConfigModule.

Never:

```ts
const secret = "123";
```

---

# Dependency Injection

Always use dependency injection.

Never instantiate services manually.

Bad:

```ts
new UserService();
```

Good:

```ts
constructor(
    private readonly userService: UserService
) {}
```

---

# Logging

Use Logger service.

Never:

```ts
console.log();
```

---

# Testing

Arrange.

Act.

Assert.

Mock external dependencies.

Test business logic only.

---

# Imports

Order:

1. External packages.
2. Shared modules.
3. Feature modules.
4. Relative imports.

Example:

```ts
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { login } from "../api/login";

import "./styles.css";
```

---

# Complexity Rules

Maximum:

- component ≈ 150 lines.
- function ≈ 30 lines.
- nesting depth ≤ 3.
- one responsibility per file.

---

# Architecture

Presentation Layer

↓

Application Layer

↓

Domain Layer

↓

Infrastructure Layer

Dependencies flow downward only.

No circular dependencies.

---

# Goal

Code should be:

- scalable
- maintainable
- testable
- predictable
- production-ready

Prioritize readability over cleverness.
