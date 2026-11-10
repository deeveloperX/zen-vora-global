import { API_BASE_URL } from "./apiBase";

const LEGAL_URL = `${API_BASE_URL}/api/legal`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Get a single legal document by slug (e.g., 'privacy-policy' or 'terms-conditions')
export const getLegalDocBySlug = async (slug) => {
  const response = await fetch(`${LEGAL_URL}/${slug}`);
  if (!response.ok) {
    throw new Error("Failed to fetch legal document");
  }
  return response.json();
};

// Update an existing legal document by ID (Admin only)
export const updateLegalDoc = async (id, documentData) => {
  const response = await fetch(`${LEGAL_URL}/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(documentData),
  });
  if (!response.ok) {
    throw new Error("Failed to update legal document");
  }
  return response.json();
};