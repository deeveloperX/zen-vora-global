import { API_BASE_URL } from "./apiBase";

const HIGHLIGHTS_API_URL = `${API_BASE_URL}/api/highlights`;

async function requestHighlights(path = "", options = {}) {
  const response = await fetch(`${HIGHLIGHTS_API_URL}${path}`, options);
  const data = response.status === 204 ? null : await response.json();

  if (!response.ok) {
    throw new Error(data?.message || `Highlights request failed (${response.status})`);
  }

  return data;
}

function adminOptions(options = {}) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Your admin session has expired. Please sign in again.");
  }

  return {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  };
}

export function getHighlights() {
  return requestHighlights();
}

export function createHighlight(highlight) {
  return requestHighlights(
    "",
    adminOptions({ method: "POST", body: JSON.stringify(highlight) }),
  );
}

export function updateHighlight(id, highlight) {
  return requestHighlights(
    `/${encodeURIComponent(id)}`,
    adminOptions({ method: "PATCH", body: JSON.stringify(highlight) }),
  );
}

export function deleteHighlight(id) {
  return requestHighlights(
    `/${encodeURIComponent(id)}`,
    adminOptions({ method: "DELETE" }),
  );
}
