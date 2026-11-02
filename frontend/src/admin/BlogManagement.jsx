import { useState } from "react";
import { blogPosts } from "../data/BlogsData";
import { readAdminContent, writeAdminContent } from "../data/AdminContent";

const BLOG_STORAGE_KEY = "zenvora-admin-blogs";

export default function BlogManagement() {
  const [blogs, setBlogs] = useState(() =>
    readAdminContent(BLOG_STORAGE_KEY, blogPosts),
  );

  // Modal & Form State
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);

  const initialFormState = {
    title: "",
    category: "",
    excerpt: "",
    content: "",
    author: "",
    readTime: "",
    image: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open modal for Create
  const handleOpenCreate = () => {
    setIsEditing(false);
    setFormData(initialFormState);
    setShowModal(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (blog) => {
    setIsEditing(true);
    setCurrentBlogId(blog._id ?? blog.id);
    setFormData({
      title: blog.title || "",
      category: blog.category || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      author: blog.author || "",
      readTime: blog.readTime || "",
      image: blog.image || "",
    });
    setShowModal(true);
  };

  // Submit form (Create or Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const nextBlogs = isEditing
      ? blogs.map((blog) =>
          (blog._id ?? blog.id) === currentBlogId
            ? { ...blog, ...formData }
            : blog,
        )
      : [
          ...blogs,
          {
            ...formData,
            id: `demo-${Date.now()}`,
            date: new Date().toLocaleDateString(),
          },
        ];
    setBlogs(nextBlogs);
    writeAdminContent(BLOG_STORAGE_KEY, nextBlogs);
    setShowModal(false);
    setSubmitting(false);
  };

  // Delete blog post
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?"))
      return;
    const nextBlogs = blogs.filter((blog) => (blog._id ?? blog.id) !== id);
    setBlogs(nextBlogs);
    writeAdminContent(BLOG_STORAGE_KEY, nextBlogs);
  };

  return (
    <div className="container-fluid p-0">
      {/* Header section with Create Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1">Blog Management</h2>
          <p className="text-muted small mb-0">
            Create, edit, and delete your website blog posts.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="btn btn-dark fw-semibold px-3"
        >
          <i className="bi bi-plus-lg me-2"></i> Add New Blog
        </button>
      </div>

      {/* Error Alert */}
      <div className="alert alert-info py-2 small">
        Sample posts from the data folder. Changes are saved in this browser.
      </div>

      {/* Main Table Card */}
      <div className="card border-0 shadow-sm rounded-3">
        <div className="card-body p-0">
          {blogs.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted mb-0">
                No blog posts found. Create your first one!
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light text-secondary small uppercase">
                  <tr>
                    <th className="py-3 ps-4">Title</th>
                    <th className="py-3">Category</th>
                    <th className="py-3">Author</th>
                    <th className="py-3">Read Time</th>
                    <th className="py-3 text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog._id ?? blog.id}>
                      <td
                        className="ps-4 fw-semibold text-dark"
                        style={{ maxWidth: "300px" }}
                      >
                        <div className="text-truncate">{blog.title}</div>
                        <small className="text-muted fw-normal text-truncate d-block">
                          {blog.excerpt}
                        </small>
                      </td>
                      <td>
                        <span className="badge bg-light text-primary border border-primary-subtle px-2 py-1">
                          {blog.category || "General"}
                        </span>
                      </td>
                      <td className="text-muted small">
                        {blog.author || "Admin"}
                      </td>
                      <td className="text-muted small">
                        {blog.readTime || "5 min"}
                      </td>
                      <td className="text-end pe-4">
                        <button
                          onClick={() => handleOpenEdit(blog)}
                          className="btn btn-sm btn-outline-secondary me-2 px-2 py-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id ?? blog.id)}
                          className="btn btn-sm btn-outline-danger px-2 py-1"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow rounded-3">
              <div className="modal-header border-bottom px-4 py-3">
                <h5 className="modal-title fw-bold">
                  {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-semibold small text-secondary">
                        Blog Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-secondary">
                        Category
                      </label>
                      <input
                        type="text"
                        name="category"
                        className="form-control"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-secondary">
                        Author
                      </label>
                      <input
                        type="text"
                        name="author"
                        className="form-control"
                        value={formData.author}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-secondary">
                        Read Time (e.g., "5 min read")
                      </label>
                      <input
                        type="text"
                        name="readTime"
                        className="form-control"
                        value={formData.readTime}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-secondary">
                        Cover Image URL
                      </label>
                      <input
                        type="text"
                        name="image"
                        className="form-control"
                        value={formData.image}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold small text-secondary">
                        Excerpt / Short Description
                      </label>
                      <textarea
                        name="excerpt"
                        className="form-control"
                        rows="2"
                        value={formData.excerpt}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold small text-secondary">
                        Full Content
                      </label>
                      <textarea
                        name="content"
                        className="form-control"
                        rows="5"
                        value={formData.content}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-top px-4 py-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-dark px-4 fw-semibold"
                    disabled={submitting}
                  >
                    {submitting
                      ? "Saving..."
                      : isEditing
                        ? "Update Post"
                        : "Publish Post"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
