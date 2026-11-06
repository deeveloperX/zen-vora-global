import { API_BASE_URL } from "./apiBase";

const SERVICE_API_URL = `${API_BASE_URL}/api/services`;

async function requestServices(path = "", options = {}) {
  const response = await fetch(`${SERVICE_API_URL}${path}`, options);
  const data = response.status === 204 ? null : await response.json();

  if (!response.ok) {
    throw new Error(data?.message || `Service request failed (${response.status})`);
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

export function getServices() {
  return requestServices();
}

export function createService(service) {
  return requestServices(
    "",
    adminOptions({ method: "POST", body: JSON.stringify(service) }),
  );
}

export function updateService(id, service) {
  return requestServices(
    `/${encodeURIComponent(id)}`,
    adminOptions({ method: "PATCH", body: JSON.stringify(service) }),
  );
}

export function deleteService(id) {
  return requestServices(
    `/${encodeURIComponent(id)}`,
    adminOptions({ method: "DELETE" }),
  );
}
