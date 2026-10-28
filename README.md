```markdown
# ZenVora Global Ventures

The web application for ZenVora Global Ventures, built with React and Vite. The frontend source, app routes, and project-specific setup details are in [`frontend/`](./frontend/).

## Getting started

Requirements: Node.js `^20.19.0`, `^22.12.0`, or newer, and npm.

From the repository root:

```sh
cd frontend
npm ci
npm run dev
```

Vite prints the local development URL in the terminal.

## Available commands

Run these from `frontend/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Create a production build in `frontend/dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint. |

See the [frontend README](./frontend/README.md) for the app’s pages and deployment details.

## Admin access

Public account registration is disabled. Only accounts with the `admin` role can log in or access protected admin endpoints.

To create an administrator or reset an existing administrator’s password, run this from `backend/` with the MongoDB connection available in `MONGO_URI`:

```sh
ADMIN_NAME="Your Name" \
ADMIN_EMAIL="example@example.com" \
ADMIN_PASSWORD="use-a-unique-password-of-at-least-6-characters" \
npm run create-admin
```

The command updates the account matching `ADMIN_EMAIL` to have the supplied name, password, and admin role, or creates it if it does not exist. Keep these credentials private.
```
