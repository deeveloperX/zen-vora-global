import { API_BASE_URL } from "./apiBase";

const FAQ_API_URL = `${API_BASE_URL}/api/faqs`;

async function requestFaqs(path = "", options = {}) {
  const response = await fetch(`${FAQ_API_URL}${path}`, options);
  const data = response.status === 204 ? null : await response.json();

  if (!response.ok) {
    throw new Error(data?.message || `FAQ request failed (${response.status})`);
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

export function getFaqs() {
  return requestFaqs();
}

export function getAdminFaqs() {
  return requestFaqs("/admin", adminOptions());
}

export function createFaq(faq) {
  return requestFaqs(
    "",
    adminOptions({ method: "POST", body: JSON.stringify(faq) }),
  );
}

export function updateFaq(id, faq) {
  return requestFaqs(
    `/${encodeURIComponent(id)}`,
    adminOptions({ method: "PATCH", body: JSON.stringify(faq) }),
  );
}

export function deleteFaq(id) {
  return requestFaqs(
    `/${encodeURIComponent(id)}`,
    adminOptions({ method: "DELETE" }),
  );
}
