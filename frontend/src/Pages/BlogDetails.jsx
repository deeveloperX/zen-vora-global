import { useParams, Link } from 'react-router';
import { blogPosts } from '../data/BlogsData';
import { BsArrowRightShort } from "react-icons/bs";


const BlogDetails = () => {
  const { id } = useParams();
  
  // Find article matching the route param
  const post = blogPosts.find((item) => item.id === id);

  // Fallback if blog post is not found
  if (!post) {
    return (
      <div className="container py-5 text-center min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <h2 className="fw-bold text-dark mb-3">Article Not Found</h2>
        <p className="text-secondary mb-4">The blog post you are looking for doesn't exist or has been removed.</p>
        <Link to="/blogs" className="btn btn-primary rounded-pill px-4">
          &larr; Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <article className="py-4 bg-white min-vh-100">
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            
            {/* Navigation Back */}
            <Link to="/blogs" className="text-decoration-none text-secondary fw-semibold d-inline-flex align-items-center gap-1 mb-4">
              &larr; Back to all blogs
            </Link>

            {/* Category & Meta */}
            <div className="d-flex align-items-center gap-3 mb-3">
              <span className="badge bg-warning text-dark fw-bold px-3 py-1 rounded-pill">
                {post.category}
              </span>
              <small className="text-muted">{post.date}</small>
              <small className="text-muted">• {post.readTime}</small>
            </div>

            {/* Main Title */}
            <h1 className="fw-bold display-5 text-dark mb-4" style={{ lineHeight: '1.2' }}>
              {post.title}
            </h1>

            {/* Author Info */}
            <div className="d-flex align-items-center gap-3 pb-4 mb-4 border-bottom">
              <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '42px', height: '42px' }}>
                ZV
              </div>
              <div>
                <p className="fw-bold text-dark mb-0">{post.author}</p>
                <small className="text-secondary">Sourcing & E-commerce Strategy</small>
              </div>
            </div>

            {/* Main Featured Image */}
            <div className="ratio ratio-16x9 rounded-4 overflow-hidden mb-5 shadow-sm">
              <img src={post.image} alt={post.title} className="object-fit-cover w-100 h-100" />
            </div>

            {/* Article Content */}
            <div 
              className="lh-lg text-secondary fs-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Call To Action Box at Bottom of Article */}
            <div className="p-4 p-md-5 rounded-4 bg-light mt-5 text-center border">
              <h4 className="fw-bold text-dark mb-2">Ready to Source Products Globally?</h4>
              <p className="text-secondary mb-4 col-md-10 mx-auto">
                Zen Vora connects you directly with top suppliers and marketplaces like Amazon, eBay, and Walmart.
              </p>
              <Link to="/" className="btn btn-warning rounded-pill px-4 py-2 text-white fw-bold shadow-sm bg-mySecondary">
                Get Started Today <BsArrowRightShort />

              </Link>
            </div>

          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogDetails;