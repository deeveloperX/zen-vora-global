import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { AUTH_API_URL } from './authApi';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const requestedPath = location.state?.from;
  const returnTo =
    requestedPath &&
    typeof requestedPath.pathname === 'string' &&
    (requestedPath.pathname === '/dashboard' ||
      requestedPath.pathname.startsWith('/dashboard/'))
      ? {
          pathname: requestedPath.pathname,
          search: requestedPath.search || '',
          hash: requestedPath.hash || '',
        }
      : '/dashboard/blogs';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${AUTH_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (!data.token || data.user?.role !== 'admin') {
        throw new Error('This account does not have admin access.');
      }

      localStorage.setItem('token', data.token);
      navigate(returnTo, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body p-4 p-sm-5">
              
              {/* Header */}
              <div className="text-center mb-4">
                <h3 className="fw-bold text-dark mb-1">ZenVora Admin</h3>
                <p className="text-muted small">Sign in to manage CMS content</p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="alert alert-danger py-2 small mb-3" role="alert">
                  {error}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold small text-secondary">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-aria-control form-control"
                    id="email"
                    name="email"
                    placeholder="admin@zenvora.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-semibold small text-secondary">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-dark w-100 py-2 fw-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Authenticating...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}