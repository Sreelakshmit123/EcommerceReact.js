import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <>
            <>
                {/* Newsletter Section */}
                <section className="newsletter text-white text-center">
                    <div className="section-container container">   
                                <div className='d-flex'>
                                 <i className="newsletter-icon fa-solid fa-newspaper"></i>
                                   <div>
                                        <h2 className="newsletter-para mt-2 fw-bolder ps-3">Join our newsletter now!</h2>
                                        <small>Register now and get our latest updates and promos.</small>
                                   </div>
                                </div>
                            <div className="position-relative d-flex justify-content-center flex-wrap mt-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="newsletter-input me-1 mb-2 mb-sm-0"
                                />
                                <button className="btn-join">Join</button>
                            </div>
                        </div>
                </section>

                {/* Footer Section */}
                <footer className="footer">
                    <div className="footer-container container">
                        <div className="row">
                            {/* Column 1 */}
                            <div className="col-lg-3 col-md-3 mb-4">
                                <h5 className='brandname'>EBrands</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                <p><Link to={"/"}><i className="fonticon me-2 fa-solid fa-phone"></i></Link> +1234567890</p>
                                <p><Link to={"/"}><i className="fonticon me-2 fa-solid fa-envelope"></i></Link>lovia@support.com</p>
                            </div>
                            <div className="col-lg-2 col-md-2 mb-4"></div>
                            {/* Column 2 */}
                            <div className="col-lg-2 col-md-2 mb-4">
                                <h5>Company</h5>
                                <ul className="list-unstyled">
                                    <li>About</li>
                                    <li>Products</li>
                                    <li>Contact</li>
                                    <li>Blog</li>
                                    <li>Careers</li>
                                </ul>
                            </div>

                            {/* Column 3 */}
                            <div className="col-lg-2 col-md-2 mb-4">
                                <h5>Information</h5>
                                <ul className="list-unstyled">
                                    <li>Help Center</li>
                                    <li>Payment Methods</li>
                                    <li>Return & Refund</li>
                                    <li>Privacy Policy</li>
                                </ul>
                            </div>

                            {/* Column 4 */}
                            <div className="col-lg-2 col-md-2 mb-4">
                                <h5>Follow Us</h5>
                                <div className="socialMedia-icons">
                                    <Link to={"/"}><i className="icon-instagram fa-brands fa-instagram"></i></Link>
                                    <Link to={"/"}><i className="icon-twitter fa-brands fa-twitter"></i></Link>
                                    <Link to={"/"}><i className="icon-facebook fa-brands fa-square-facebook"></i></Link>
                                </div>
                            </div>
                        </div>

                        {/* Bottom */}
                        <div className="footer-bottom text-center mt-4">
                            <p>Copyright &copy; 2021 Tronix.All Rights Reserved</p>
                            <div>
                              <Link to={"/"}><i className="pay-icon me-2 fa-solid fa-infinity"></i></Link>
                              <Link to={"/"}><i className="pay-icon me-2 fa-brands fa-paypal"></i></Link>
                              <Link to={"/"}><i className="pay-icon me-2 fa-brands fa-cc-visa"></i></Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </>
        </>
    )
}

export default Footer