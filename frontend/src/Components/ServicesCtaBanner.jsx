import { BsArrowRight } from 'react-icons/bs'
const ServicesCtaBanner = () => {
    return (
        <section className="container py-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-myPrimary text-white">
                <span className="badge bg-mySecondary text-dark align-self-start mb-3 px-3 py-2 fw-semibold">
                    End-to-End Solutions
                </span>
                <h1 className="display-5 fw-bold mb-2">Our E-Commerce Services</h1>
                <p className="text-white-50 mb-0">From strategic product sourcing and global fulfillment to complete marketplace management, we equip your online business for scalable, long-term growth.</p>
                <a href="/services#services-grid" className="btn px-0 mt-3 fw-semibold text-white d-inline-flex align-items-center gap-2" style={{ width: "fit-content" }}>
                    <span>Explore Services</span>
                    <BsArrowRight />
                </a>
            </div>
        </section>
    )
}

export default ServicesCtaBanner