# ZenVora Global Ventures

The frontend for the ZenVora Global Ventures website. It is a single-page application built with React and Vite, with client-side routing for the company’s information, services, support, blog, FAQ, and legal pages.

## Requirements

- Node.js `^20.19.0`, `^22.12.0`, or newer
- npm

## Getting started

Run these commands from the `frontend` directory:

```sh
npm ci
npm run dev
```

Vite prints the local development URL in the terminal when the server starts.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Serve the production build locally for preview. |
| `npm run lint` | Run ESLint across the frontend. |

## Pages

| Path | Page |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/support` | Contact and support |
| `/blogs` | Blog listing |
| `/blogs/:id` | Blog details |
| `/faqs` | Frequently asked questions |
| `/privacy-policy` | Privacy policy |
| `/terms-conditions` | Terms and conditions |

## Deployment

The Vercel configuration rewrites incoming paths to `index.html`, allowing the client-side router to serve direct visits to application routes. Build the site with `npm run build`; the generated static files are in `dist/`.

The frontend API uses `VITE_API_URL` as the backend origin; it defaults to `http://localhost:5000` for local development. Create `frontend/.env.local` with:

```env
VITE_API_URL=http://localhost:5000
```

Restart Vite after changing this value. In production, set it to the deployed backend origin in the frontend build environment and configure the backend's `FRONTEND_ORIGINS` environment variable with the exact frontend origin (comma-separated if multiple origins are needed).

Public FAQs and services are loaded from `GET /api/faqs` and `GET /api/services`. Admin content management requires an administrator account. Create or reset one from `backend/` by setting `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in the environment and running `npm run create-admin`; the backend must also have `MONGO_URI` configured.

To insert the original five sample services into an empty database, run `npm run seed-services` from `backend/` with `MONGO_URI` configured. The command refuses to add records if the service collection is not empty. Services support a title, description, image URL, icon key, and display order.
Public FAQs are loaded from `GET /api/faqs`. Admin FAQ management uses the protected `/api/faqs/admin` endpoint and requires an administrator account. Create or reset one from `backend/` by setting `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in the environment and running `npm run create-admin`; the backend must also have `MONGO_URI` configured.
