const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

if (!configuredApiUrl && import.meta.env.PROD) {
  throw new Error(
    "VITE_API_URL is required for production builds. Set it to the backend URL in the deployment environment.",
  );
}

export const API_BASE_URL = (
  configuredApiUrl || (import.meta.env.DEV ? "http://localhost:5000" : "")
).replace(/\/+$/, "");
