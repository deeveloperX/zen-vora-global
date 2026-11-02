export function readAdminContent(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function writeAdminContent(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
