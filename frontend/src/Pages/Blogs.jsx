import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getPublicBlogs } from "../api/blogs";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getPublicBlogs();
        // Map backend coverImage to image for frontend rendering
        const formattedPosts = data.map((post) => ({
          ...post,
          image: post.coverImage || post.image,
        }));
        setPosts(formattedPosts);
      } catch (err) {
        console.error("Failed to fetch public blogs:", err);
        setError("Failed to load blog posts at the moment. Please check your connection or server status.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="py-4 bg-light min-vh-100">
      <div className="container py-4">
        {/* Page Header */}
        <div className="text-center mb-5">
          <p
            className="fw-semibold text-uppercase mb-2 text-mySecondary"
            style={{ letterSpacing: "1px", fontSize: "0.9rem" }}
          >
            — Blogs & News —
          </p>
        </div>

        {/* Blog Cards Grid */}
        {loading ? (
          <div className="text-center py-5">
            <p className="text-muted">Loading articles...</p>
          </div>
        ) : error ? (
          <div className="text-center py-5">
            <p className="text-danger" role="alert">{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">No blog posts available right now.</p>
          </div>
        ) : (
          <div className="row g-4 justify-content-center">
            {posts.map((post) => (
              <div key={post._id} className="col-12 col-md-6 col-lg-6">
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                  {/* Blog Image */}
                  <div className="ratio ratio-16x9">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="object-fit-cover w-100 h-100"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="card-body p-4 d-flex flex-column justify-content-between">
                    <div>
                      {/* Category & Read Time */}
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="badge bg-primary-subtle text-primary fw-semibold px-3 py-1 rounded-pill">
                          {post.category}
                        </span>
                        <small className="text-muted">{post.readTime}</small>
                      </div>

                      {/* Blog Title */}
                      <h4 className="card-title fw-bold text-dark my-2">
                        {post.title}
                      </h4>

                      {/* Excerpt */}
                      <p className="card-text text-secondary mb-4">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Card Footer: Meta & Action Link */}
                    <div className="d-flex align-items-center justify-content-between pt-3 border-top">
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold"
                          style={{
                            width: "32px",
                            height: "32px",
                            fontSize: "0.8rem",
                          }}
                        >
                          ZV
                        </div>
                        <small className="fw-semibold text-dark">
                          {post.author}
                        </small>
                      </div>

                      {/* Use post.slug for routing */}
                      <Link
                        to={`/blogs/${post.slug}`}
                        className="btn btn-outline-dark btn-sm rounded-pill px-3 fw-semibold"
                      >
                        Read Article &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;