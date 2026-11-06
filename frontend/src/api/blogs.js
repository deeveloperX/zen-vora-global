import { API_BASE_URL } from "./apiBase";

const BLOGS_URL = `${API_BASE_URL}/api/blogs`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const getAdminBlogs = async () => {
  const res = await fetch(`${BLOGS_URL}/admin/all`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch admin blogs");
  return res.json();
};

export const getPublicBlogs = async () => {
  const res = await fetch(BLOGS_URL);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
};

export const createBlogPost = async (postData) => {
  const res = await fetch(BLOGS_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(postData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create blog post");
  return data;
};

export const updateBlogPost = async (id, postData) => {
  const res = await fetch(`${BLOGS_URL}/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(postData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update blog post");
  return data;
};

export const deleteBlogPost = async (id) => {
  const res = await fetch(`${BLOGS_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete blog post");
  return true;
};