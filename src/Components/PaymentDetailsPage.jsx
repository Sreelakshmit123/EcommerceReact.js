import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { Col, Form, NavDropdown, Row } from 'react-bootstrap';
import Footer from './Footer';
import AddAddress from '../Pages/AddAddress';
import EditAddress from '../Pages/EditAddress';
import googlepay from '../assets/images/Google_Pay.png'
import AxisBank from '../assets/images/Axis_Bank-Logo.png'
import icicBank from '../assets/images/icic_bank.avif'
import YesBank from '../assets/images/yes_bank.png'
import HDFC from '../assets/images/hdfc_bank.webp'


function PaymentDetailsPage() {
    
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('upi');
    const [selectedBank, setSelectedBank] = useState('');
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }


    return (
        <>
            <div className='container-fluid' id='Container'>
                {/* Navbar */}
                <Navbar collapseOnSelect expand="lg">
                    <Navbar.Brand className='brandname fw-bold' href="#home"><b>EBrands</b></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="navsection  me-auto ">
                            <Nav.Link><Link to={"/"} className='navsection'>Home</Link></Nav.Link>
                            <NavDropdown title="Collection" id="basic-nav-dropdown" className='navsection'>
                                <NavDropdown.Item ><Link to={"/Computer-Laptop"} className='navsection-dropdown'>Computer & Laptop</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to={"/mobiletablet"} className='navsection-dropdown'>Mobile & Tablet</Link></NavDropdown.Item>
                                <NavDropdown.Item ><Link to={"/camera"} className='navsection-dropdown'>Camera</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to={"/tv-smartphone"} className='navsection-dropdown'>TV and Smart Box</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to={"/home-appliance"} className='navsection-dropdown'>Home Appliance</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to={"/smart-watch"} className='navsection-dropdown'>Smart watch</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to={"/microphone-audio"} className='navsection-dropdown'>Microphone & Audio</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to={"/gaming"} className='navsection-dropdown'>Gaming</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to={"/printer"} className='navsection-dropdown'>Printer</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to={"/accessories"} className='navsection-dropdown'>Accessories</Link></NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link><Link to={"/sale"} className='navsection'>Sale</Link></Nav.Link>
                            <Nav.Link><Link to={"/faq"} className='navsection'>FAQ</Link></Nav.Link>
                        </Nav>
                        <Nav className=''>
                            <Nav.Link><Link to={"/shoppingCart"}><button className='cartbtn btn btn-outline-dark '><i className="fa-solid fa-cart-shopping me-2"></i>ShoppingCart</button></Link></Nav.Link>
                            <Nav.Link><Link to={"/wishlist"}><button className='Whishlistbtn btn btn-outline-dark '>Wishlist</button></Link></Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link><Link to={"/sign-up"}><button className='signUp-btn btn '>Sign in <i class="fa-solid fa-arrow-right"></i></button></Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <p className='mt-5'>Delivery Address</p>
                <div className="row">
                    <div className="payment-col col-lg-8">
                        <div className='address-form'>
                            <p className='m-2'>Jishnu unnikrishnan 123lorem, Newyork city, United States (USA) - 123465</p>
                            <button className='change-address btn'>Change</button>
                        </div>
                        <AddAddress />
                        <div className='delivery-address-list mb-5 pt-3 p-2'>
                            <div className='d-flex justify-content-between align-items-start '>
                                <input className='address-radio ms-2  mt-2' type="radio" name="address" id="" />
                                <p className='address-para ms-4 '>Jishnu unnikrishnan +91 7356784195  <p>123lorem, Newyork city, United States (USA) - 123465 </p>
                                    <button className='delivery-Here-btn btn'>Delivery Here</button>
                                </p>
                            </div>
                            {/* edit and delete buttons */}
                            <div className='d-flex icons align-items-center'>
                                <EditAddress />
                                <button className='address-delete btn'><i class="fa-regular fa-trash-can"></i> Delete</button>
                            </div>
                        </div>
                        <div className='delivery-address-list mb-5 pt-3 p-2'>
                            <div className='d-flex justify-content-between align-items-start '>
                                <input className='address-radio ms-2  mt-2' type="radio" name="address" id="" />
                                <p className='address-para ms-4 '>Jishnu unnikrishnan +91 7356784195  <p>123lorem, Newyork city, United States (USA) - 123465 </p>
                                    <button className='delivery-Here-btn btn'>Delivery Here</button>
                                </p>
                            </div>
                            {/* edit and delete buttons */}
                            <div className='d-flex icons align-items-center'>
                                <EditAddress />
                                <button className='address-delete btn'><i class="fa-regular fa-trash-can"></i> Delete</button>
                            </div>
                        </div>
                        <p className='recipient'>Add Recipient</p>
                        <Row className="gap-3 mb-4">
                            <Col md>
                                <p className='recipient-name mb-0'>Name</p>
                                <input type="text" className='form-text' placeholder='Enter Your Name' />
                            </Col>
                            <Col md>
                                <p className='recipient-mobile mb-0'>Mobile Number</p>
                                <input type="text" className='form-text' placeholder='Enter Your Number' />
                            </Col>
                        </Row>
                        <p className='payment-option'>Payment Option</p>
                        <div className='payment-time text-white mb-4 p-1'>
                            <p className='payment-text ps-2 m-2'>Complete Payment in  <i class="fa-solid fa-stopwatch ms-2 me-2"></i> 00 : 12 : 54</p>
                        </div>
                        <div className='googlepay-upi mb-4'>
                            <div className=' d-flex' >
                                <input className='address-radio ms-1 m-1' type="radio" name="payment" id="upiPay" checked={selectedMethod === 'upiPay'} onChange={() => setSelectedMethod('upiPay')} />
                                <img className='goole-pay-icon ms-2 m-1' src={googlepay} alt="google-pay-icon" />
                                <span className='payment-upi-text ms-2'>Google Pay UPI</span>
                                <span className='payment-email ms-2'>jishnuunni@qweraxis</span>
                            </div>
                        </div>
                        <div className='googlepay-upi mb-4'>
                            <div className=' d-flex mb-3' >
                                <input className='address-radio ms-1 m-1' type="radio" name="payment" id="upiApp" checked={selectedMethod === 'upiApp'} onChange={() => setSelectedMethod('upiApp')}
                                />
                                <img className='goole-pay-icon ms-2 m-1' src={googlepay} alt="google-pay-icon" />
                                <span className='payment-upi-text ms-2'>UPI</span>
                                <span className='ms-3'>Pay by Any UPI App</span>
                            </div>
                            <p className='choose-option ps-2 mb-1'>Choose an option</p>
                            <Form className='choose-option ps-2'>
                                <input className='address-radio '
                                    type="radio"
                                    id="option1"
                                    name="radioGroup"
                                    value="value1"
                                    checked={selectedValue === 'value1'}
                                    onChange={handleChange}
                                /> <label for="option1" className='m-1'>PhonePe</label>
                                <br />
                                <input className='address-radio'
                                    type="radio"
                                    id="option2"

                                    name="radioGroup"
                                    value="value2"
                                    checked={selectedValue === 'value2'}
                                    onChange={handleChange}
                                /><label for="option2" className='m-1'>Phone UPI ID</label>
                            </Form>

                            <div className='row'>
                                <div className="col-lg-5 form-row">
                                    <input className='form-row-input ps-2 p-2' type="text" placeholder="Enter UPI ID" />
                                    <button className="verify-btn me-2">Verify</button>
                                </div>
                                <div className='col-lg-4'><button className="pay-btn-upi">Pay $1297.00</button></div>
                                <div className="col-lg-3"></div>
                            </div>
                        </div>


                        {/* Credit/Debit Card Section */}

                        <div className="payment-card">
                            <div className="section-header">
                                <input
                                    type="radio"
                                    id="card"
                                    name="payment"
                                    checked={selectedMethod === 'card'}
                                    onChange={() => setSelectedMethod('card')}
                                />
                                <label htmlFor="card">Credit Card / Debit Card</label>
                            </div>

                            <div className='row'>
                                <div className="card-options col-lg-6">
                                    <input className='card-number' type="text" placeholder="Enter Card Number" />
                                    <div className="form-rows ms-0">
                                        <div className="card-expiry-wrapper">
                                            <label className="expiry-label">Valid Thru</label>
                                            <div className="expiry-dropdowns">
                                                <Form.Select className='MM-selector' aria-label="Default select example">
                                                    <option >MM</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                </Form.Select>

                                                <Form.Select className='yy-selector' aria-label="Default select example">
                                                    <option>YY</option>
                                                    <option value="2017">2017</option>
                                                    <option value="2018">2018</option>
                                                    <option value="2019">2019</option>
                                                    <option value="2020">2020</option>
                                                    <option value="2021">2021</option>
                                                    <option value="2022">2022</option>
                                                    <option value="2023">2023</option>
                                                    <option value="2024">2024</option>
                                                    <option value="2025">2025</option>
                                                    <option value="2026">2026</option>
                                                    <option value="2026">2027</option>
                                                    <option value="2028">2028</option>
                                                    <option value="2029">2029</option>
                                                    <option value="2030">2030</option>
                                                    <option value="2031">2031</option>
                                                    <option value="2032">2032</option>
                                                </Form.Select>
                                            </div>
                                        </div>
                                        <input className='cvv-input' type="text" placeholder="CVV" />
                                        <i className="cvv-icon fa-solid fa-clock"></i>
                                    </div>

                                    <button className="pay-btn mt-2">Pay $1297.00</button>
                                </div>
                                <div className="col-lg-6"></div>
                            </div>

                        </div>
                        {/* Net banking */}
                        <div className="payment-card">
                            <div className="section-header">
                                <input type="radio" id="netbanking" name="payment" checked={selectedMethod === 'netbanking'} onChange={() => setSelectedMethod('netbanking')}
                                />
                                <label htmlFor="netbanking">Net Banking</label>
                            </div>
                            <div className="netbanking-options ">
                                <p className='mb-0'>Popular Banks</p>
                                <div className="popular-banks ">
                                    <label><input type="radio" name="bank" value="axis" /> <img className='bank-logs mb-2' src={AxisBank} alt="axis-bank-logo" /></label>
                                    <label><input type="radio" name="bank" value="icici" />  <img className='bank-logs mb-2' src={icicBank} alt="icic-bank-logo" /></label>
                                    <label><input type="radio" name="bank" value="yes" /> <img className='bank-logs mb-2' src={YesBank} alt="yes-bank-logo" /></label>
                                    <label><input type="radio" name="bank" value="hdfc" /><img className='bank-logs ms-2 mb-1' src={HDFC} alt="hdfc-bank-logo" /></label>
                                </div>
                                <p className=' mb-0'>Other Banks</p>
                                <div className='row'>
                                    <div className='col-lg-3'>
                                        <Form.Select onChange={(e) => setSelectedBank(e.target.value)} value={selectedBank} aria-label="Default select example">
                                            <option>Select Bank</option>
                                            <option value="1">SBI</option>
                                            <option value="2">Bank of Baroda</option>
                                            <option value="3">Kotak</option>
                                        </Form.Select>
                                        <button className="pay-btn mt-3">Pay $1297.00</button>
                                    </div>
                                    <div className="col-lg-6"></div>
                                    <div className="col-lg-3"></div>
                                </div>
                            </div>
                        </div>

                        <div className='googlepay-upi mb-5'>
                            <div className=' d-flex' >
                                <input className='address-radio ms-1 m-1' type="radio" name="payment"
                                    checked={selectedMethod === 'cashOnDelivery'}
                                    onChange={() => setSelectedMethod('cashOnDelivery')} />
                                <span className='ms-2'>Cash on Delivery</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 pe-4 mb-5">
                        <div className="order-summary">
                            <p className="order-summary-title">Your Order Summary</p>

                            <div className="summary-item mb-3">
                                <span>1x <span className='summary-item-text'>Extra Bass Speaker With High Quality</span></span>
                                <span>$276.00</span>
                            </div>
                            <div className="summary-item mb-3">
                                <span>1x<span className='summary-item-text'> 18 Inch Laptop With NVME SSD</span></span>
                                <span>$576.00</span>
                            </div>
                            <div className="summary-item mb-4">
                                <span>1x<span className='summary-item-text'> Joystick Dual Pro X88</span></span>
                                <span>$46.00</span>
                            </div>

                            <hr className="horizontal-line" />

                            <div className="summary-item mb-3">
                                <span>Subtotal</span>
                                <span>$622.00</span>
                            </div>
                            <div className="summary-item mb-3">
                                <span>Shipping</span>
                                <span>$15.00</span>
                            </div>
                            <div className="summary-item mb-3">
                                <span>Tax</span>
                                <span>$10.00</span>
                            </div>
                            <div className="summary-item coupon">
                                <span><strong className='coupon-font'>Coupon Applied</strong></span>
                                <span className="coupon-amount">-$50.00</span>
                            </div>

                            <hr className="horizontal-line mb-2" />

                            <div className="summary-item total ">
                                <span><strong>Total</strong></span>
                                <span><strong>$1297.00</strong></span>
                            </div>
                            <hr className="horizontal-line mt-4 mb-4" />

                            <button className="payment-btn">Continue Payment</button>
                            <Link to={'/shoppingCart'}><button className="backtocart-btn">Back to Cart</button></Link>
                        </div>
                    </div>
                </div>

            </div >
            {/* footer */}
            <Footer />
        </>
    )
}

export default PaymentDetailsPage