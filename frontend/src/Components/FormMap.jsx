const FormMap = () => {
  return (
    <div className="col-12 col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 d-flex flex-column">
              <div className="FormMap-wrapper flex-grow-1 min-h-250">
                <iframe
                  title="Office Location Map"
                  src="https://maps.google.com/maps?q=Nasheman-e-Iqbal%20Phase%202%2C%20Lahore&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '280px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="p-4 bg-dark-blue text-myPrimary">
                <h5 className="fw-bold mb-2">Global Operations</h5>
                <p className="small text-myPrimary mb-0">
                  Supporting clients across USA, UK, UAE, and Asian supplier markets with 24/7 client portal accessibility.
                </p>
              </div>
            </div>
          </div>
  )
}

export default FormMap