// import { FiShoppingCart  } from "react-icons/fi";
import { useRef } from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../assets/android-chrome-192x192.png';

const Navbar = () => {
    const collapseRef = useRef(null);
    const togglerRef = useRef(null);

    const handleNavigationClick = (event) => {
        const target = event.target;
        if (
            target instanceof Element &&
            target.closest('a') &&
            !target.closest('[data-bs-toggle="dropdown"]') &&
            window.matchMedia('(max-width: 991.98px)').matches &&
            collapseRef.current?.classList.contains('show')
        ) {
            togglerRef.current?.click();
        }
    };

    return (
        <>
            <nav onClick={handleNavigationClick} className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
                <div className="container-fluid px-md-4 px-lg-5">
                    <Link to={`/`} className="navbar-brand d-flex align-items-center gap-1">
                        <img alt="logo" src={Logo} style={{ width: "80px" }} />
                        <div>
                            <h3 className="m-0 fw-bold text-center text-myPrimary">Zen Vora</h3>
                            <p className="m-0 text-center text-myPrimary" style={{ fontSize: "14px" }}>Global Ventures</p>
                        </div>
                    </Link>
                    <button ref={togglerRef} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div ref={collapseRef} className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
                            <li className="nav-item">
                                <NavLink to={"/"} className="nav-link px-4" aria-current="page">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/about"} className="nav-link px-4">About</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link px-4 dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Our Services
                                </Link>
                                <ul className="dropdown-menu nav-custom-dropdown">
                                    <li><Link to={`/services`} className="dropdown-item">Product Sourcing</Link></li>
                                    <li><Link to={`/services`} className="dropdown-item">Dropshipping Services</Link></li>
                                    <li><Link to={`/services`} className="dropdown-item">E-commerce Support</Link></li>
                                    <li><Link to={`/services`} className="dropdown-item">International Shipping</Link></li>
                                    <li><Link to={`/services`} className="dropdown-item">Business Growth</Link></li>
                                </ul>
                            </li>
                            {/* <li className="nav-item dropdown">
                                <Link className="nav-link px-4 dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Global Marketplaces
                                </Link>
                                <ul className="dropdown-menu nav-custom-dropdown">
                                    <li><Link to={"#"} className="dropdown-item">Amazon</Link></li>
                                    <li><Link to={"#"} className="dropdown-item">EBay</Link></li>
                                    <li><Link to={"#"} className="dropdown-item">Walmart</Link></li>
                                    <li><Link to={"#"} className="dropdown-item">AliBaba</Link></li>
                                    <li><Link to={"#"} className="dropdown-item">AliExpress</Link></li>
                                </ul>
                            </li> */}
                            <li className="nav-item">
                                <NavLink to={"/faqs"} className="nav-link px-4" aria-current="page">FAQs</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/blogs"} className="nav-link px-4" aria-current="page">Blog</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/support"} className="nav-link px-4" aria-current="page">Contact</NavLink>
                            </li>
                        </ul>
                        {/* <Link to="#" className="ms-lg-5 text-dark position-relative">
                            <FiShoppingCart size={24} />
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                0
                                <span className="visually-hidden">unread messages</span>
                            </span>
                        </Link> */}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;