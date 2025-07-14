import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { Card, Col, NavDropdown, Row } from 'react-bootstrap';
import Footer from './Footer';


function AddToCart() {
    const [count, setCount] = useState(1)
    const [cartItems, setCartItems] = useState([]);
    const [showNote, setshowNote] = useState({});
    const [note, setNote] = useState({});

    useEffect(() => {
        const stored = localStorage.getItem("cart")
        if (stored) {
            setCartItems(JSON.parse(stored))
        }
    }, []);

    const handleCartRemove = (id) => {
        const updated = cartItems.filter(item => item.id !== id)
        setCartItems(updated)
        localStorage.setItem("cart", JSON.stringify(updated))
    }

    const handleRemoveAll = () => {
        setCartItems([]),
            localStorage.setItem("cart", JSON.stringify([]))
    }

    const handleIncrement = () => {
        setCount(prev => prev + 1)
    }
    const handleDecrement = () => {
        if (count > 1) {
            setCount(prev => prev - 1)
        }
    }
    return (
        <>
            {/* Navbar */}
            <div className='container-fluid' id='Container'>
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

                {/* add to cart */}
                <div className='row add-to-cart'>
                    <div className="col-lg-9">
                        <div className='selectAllOption row'>
                            <div className='col-lg-4 checkboxes-cart '>
                                <label for="checkbox1" class="checkboxes gap-3 "><input type="checkbox" id="checkbox1" name="checked" value="yes" class="checkbox-wishlist" />
                                    Select All</label>
                            </div>

                            <div className='col-lg-6 pt-2'>
                                <Link to={'/wishlist'}>
                                    <button className='btn wishlist-btns'>SAVE FOR LATER</button>
                                </Link>
                                <button onClick={handleRemoveAll} className='btn wishlist-btns'>REMOVE</button>
                            </div>
                            <div className="col-lg-2"></div>
                        </div>

                        {cartItems.length === 0 ? (
                            <p className="text-center fs-1 text-danger mt-5">No items in Cart.</p>
                        ) : (
                            cartItems.map(item => (
                                <Card key={item.id} className="add-to-cart-card mb-3">
                                    <Card.Body>
                                        <Row className="align-items-center cart-row">
                                            <Col xs="auto">
                                                <input type="checkbox" className='checkbox-wishlist' />
                                            </Col>
                                            <Col xs={4} lg={2} >
                                                <img src={item.image} alt="" className="card-image img-fluid" />
                                            </Col>
                                            <Col>
                                                <h5>{item.title}</h5>
                                                <h4 className='mt-3'>{item.discountPrice}</h4>
                                                <button className="add-to-cart-btn mt-3" onClick={() =>
                                                    setshowNote((prev) => ({ ...prev, [item.id]: !prev[item.id], }))}>{showNote[item.id] ? 'Hide note' : '+ Add note'}
                                                </button>

                                                {showNote[item.id] && (
                                                    <textarea placeholder="Write your note here..." value={note[item.id] || ""} onChange={(e) => setNote((prev) => ({ ...prev, [item.id]: e.target.value, }))} className="note-input" />)}
                                            </Col>
                                            <Col className="cart-cardEnd text-end">
                                                <div className="d-block">
                                                    <p className='brand-number'>SKU <br /> 123411245</p>
                                                </div>
                                                <div className="d-flex justify-content-end gap-3 fw-bold text-success">
                                                    <div className='d-flex count-cart'>
                                                        <button onClick={handleDecrement} className='btn decrement-btn fw-bolder'><i class="decrement-btn fa-solid fa-minus"></i></button>
                                                        <input className='form-control' type="text" value={count} readOnly />
                                                        <button onClick={handleIncrement} className='btn increment-btn fw-bolder'><i class="increment-btn fa-solid fa-plus"></i></button>
                                                    </div>
                                                    <button onClick={() => handleCartRemove(item.id)} className='btn delete-btn'><i class="fa-solid fa-trash"></i></button>
                                                    <Link to={'/wishlist'} className='continueShopping'> <button className='btn wishlist-btn'><i class="fa-solid fa-heart"></i></button></Link>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            ))
                        )}

                    </div>

                    <div className="col-lg-3">
                        <Card className="add-to-cart-card ">
                            <Card.Body>
                                <Row className="align-items-center cart-row p-2">
                                    <Col>
                                        <p className='summary'><span>Summary</span></p>
                                    </Col>
                                </Row>
                                <div className='d-flex justify-content-between p-2'>
                                    <p className='total'>Total</p>
                                    <p>$568.00</p>
                                </div>
                                <Link to={''} className='continueShopping'>
                                    <div className='d-grid'>
                                   <Link className='checkout' to={'/payment-page'}><button className='btn checkout-btn'>  Checkout</button></Link>
                                    </div>
                                </Link>
                                <Link to={'/mobiletablet'} className='continueShopping'>
                                    <div className='d-grid mt-3' >
                                        <button className='btn continueShopping-btn'>Continue Shopping</button>
                                    </div></Link>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                {/* add-to-cart */}
            </div>
            <Footer />

        </>
    )
}

export default AddToCart