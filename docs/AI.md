# AI Usage

## Backend

AI was used to:

- Generate initial NestJS auth scaffolding.
- Create DTO validation rules.
- Configure JWT strategy and guards.
- Generate Swagger decorators.

Corrections made:

- Adjusted password regex.
- Refactored generated services to keep controllers thin.
- Improved exception handling.
- Removed unnecessary duplication.

---

## Frontend

AI was used to:

- Generate form schemas using Zod.
- Create React Hook Form integration.
- Build route guards.
- Generate API layer examples.

Corrections made:

- Simplified component structure.
- Improved TypeScript types.
- Refactored repeated code into reusable components.
- Fixed loading and error states.

---

## Effective prompts

The most effective prompts were:

- "Act as a senior NestJS engineer."
- "Keep controllers thin and move business logic to services."
- "Follow production-ready best practices."
- "Use strong TypeScript typing and avoid any."

---

## Human decisions

- Chose feature-based architecture.
- Chose React Hook Form + Zod.
- Chose TanStack Query for server state.
- Added Swagger documentation.
- Added centralized error handling.
- Prioritized maintainability over excessive abstraction.
