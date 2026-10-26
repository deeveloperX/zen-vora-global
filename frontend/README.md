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