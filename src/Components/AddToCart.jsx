import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Col, NavDropdown, Row } from 'react-bootstrap';
import Footer from './Footer';
import { listCartAPI, moveToWishlistAPI, removeAllCartAPI, removeCartAPI } from '../Services/allAPIs';
import { SERVER_URL } from '../Services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddToCart() {
    const [cartItems, setCartItems] = useState([]);
    const [quantity, setQuantity] = useState({});
    const [showNote, setShowNote] = useState({});
    const [note, setNote] = useState({});
    const [name, setName] = useState('');
    const [logoutStatus, setLogoutStatus] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            setLogoutStatus(true);
            const firstName = localStorage.getItem("firstname");
            const userEmail = localStorage.getItem("email");
            const fallbackName = localStorage.getItem("name");
            setName(firstName || fallbackName || userEmail);
        } else {
            setLogoutStatus(false);
        }
    }, []);

    const logout = () => {
        localStorage.clear();
        navigate('/');
    };
    // getting cart list
    const getlistCart = async () => {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        };
        try {
            const result = await listCartAPI(reqHeader);
            if (result.status === 200) {
                const cartData = result?.data?.cart;

                if (!Array.isArray(cartData)) {
                    console.error("Cart data is not an array:", cartData);
                    return;
                }

                setCartItems(cartData);

                const initialQuantity = {};
                cartData.forEach(item => {
                    initialQuantity[item.id] = item.quantity || 1;
                });
                setQuantity(initialQuantity);

                localStorage.setItem("cart", JSON.stringify(cartData));
            }
        } catch (err) {
            console.error("Failed to fetch cart from API:", err);
            const stored = localStorage.getItem("cart");
            if (stored && stored !== "undefined") {
                try {
                    const parsed = JSON.parse(stored);
                    setCartItems(parsed);
                } catch (error) {
                    console.error("Failed to parse cart from localStorage:", error);
                    localStorage.removeItem("cart");
                }
            }
        }
    };

    useEffect(() => {
        getlistCart();
    }, []);

    //  cart delete section
    const handleCartDelete = async (id) => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            toast.warning("You Need To Login First For This Action");
            return;
        }

        const itemToRemove = cartItems.find(item => item.id === id);
        if (!itemToRemove) {
            toast.error("Item not found in cart");
            return;
        }

        const product_id = itemToRemove.product?.id ?? itemToRemove.product;
        const skuid = itemToRemove.sku?.id ?? itemToRemove.sku;

        if (!product_id || !skuid) {
            toast.error("Invalid product or SKU ID");
            return;
        }

        const formData = new FormData();
        formData.append("product_id", product_id);
        formData.append("skuid", skuid);

        const reqHeader = {
            Authorization: `Bearer ${token}`,
        };

        try {
            const result = await removeCartAPI(formData, reqHeader);
            if (result.status === 200) {
                const updated = cartItems.filter(item => item.id !== id);
                setCartItems(updated);
                toast.success("Item removed from cart");
                localStorage.setItem("cart", JSON.stringify(updated));
            } else {
                toast.error("Failed to remove item from cart");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    };


    // const handleCartDelete = (id) => {
    //     const updated = cartItems.filter(item => item.id !== id);
    //     setCartItems(updated);
    //     const newQuantity = { ...quantity };
    //     delete newQuantity[id];
    //     setQuantity(newQuantity);
    //     localStorage.setItem("cart", JSON.stringify(updated));
    // };
    // remove all wishlisted items
    const handleDeleteAll = async () => {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        const productitemsPayload = cartItems.map(item => ({
            product_id: item.product?.id ?? item.product,
            skuid: item.sku?.id ?? item.sku
        }));

        const reqBody = {
            products: productitemsPayload
        };

        try {
            const result = await removeAllCartAPI(reqBody, reqHeader);

            if (result.status === 200) {
                toast.success("All cart items are removed!");
                setCartItems([]);
                localStorage.setItem("cart", JSON.stringify([]));
            } else {
                toast.error("Failed to remove all items");
            }
        } catch (err) {
            console.error("Error removing all cart items", err);
            toast.error("Something went wrong");
        }
    };
    // const handleDeleteAll = () => {
    //     setCartItems([]);
    //     setQuantity({});
    //     localStorage.setItem("cart", JSON.stringify([]));
    // };

    const handleIncrement = (id) => {
        setQuantity(prev => {
            const updated = { ...prev };
            updated[id] = (prev[id] || 1) + 1;
            return updated;
        });
    };

    const handleDecrement = (id) => {
        setQuantity(prev => {
            const updated = { ...prev };
            if ((prev[id] || 1) > 1) {
                updated[id] = prev[id] - 1;
            }
            return updated;
        });
    }
    const getTotalAmount = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.product.sku?.sales_rate || 0);
            const quantities = quantity[item.id] || 1;
            return total + price * quantities;
        }, 0).toFixed(2);
    };

    // move cart items to wishlist 
    const handleMovetoWishlistClick = async (item) => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            toast.error("You must be logged in to perform this action.");
            return;
        }

        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        const alreadyinWishlist = wishlist.some(iswishlist =>
            (iswishlist.product?.id || iswishlist.product) === (item.product?.id || item.product) &&
            (iswishlist.sku?.id || iswishlist.sku) === (item.sku?.id || item.sku)
        );

        if (alreadyinWishlist) {
            toast.info("Item already in wishlist.");
            return;
        }

        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        };

        const reqBody = [
            {
                product_id: item.product?.id ?? item.product,
                skuid: item.sku?.id ?? item.sku,
            },
        ];

        try {
            const result = await moveToWishlistAPI(reqBody, reqHeader);

            if (result.status === 200) {
                toast.success("Item moved to wishlist");
                const updated = cartItems.filter(items => items.id !== item.id);
                setCartItems(updated);
                localStorage.setItem("cart", JSON.stringify(updated));
            } else {
                toast.error("Failed to move item to wishlist");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while moving item.");
        }
    };




    return (
        <>
            <div className='container-fluid' id='Container'>
                <Navbar collapseOnSelect expand="lg">
                    <Link className='text-decoration-none' to={"/"}><Navbar.Brand className='brandname fw-bold'><b>EBrands</b></Navbar.Brand></Link>
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
                            {logoutStatus ? (<Nav.Link><Link to={"/"}><button className='signUp-btn btn ' onClick={logout}> LogOut <i class="fa-solid fa-arrow-right"></i></button></Link></Nav.Link>) : (<Nav.Link><Link to={"/register"}><button className='signUp-btn btn '>Sign in <i class="fa-solid fa-arrow-right"></i></button></Link></Nav.Link>)}
                        </Nav>
                    </Navbar.Collapse>

                </Navbar>

                <div className='row add-to-cart'>
                    <div className="col-lg-9">
                        <div className='selectAllOption row'>
                            <div className='col-lg-4 checkboxes-cart'>
                                <label htmlFor="checkbox1" className="checkboxes gap-3">
                                    <input type="checkbox" id="checkbox1" className="checkbox-wishlist" /> Select All
                                </label>
                            </div>
                            <div className='col-lg-6 pt-2'>
                                <Link to={'/wishlist'}><button className='btn wishlist-btns'>SAVE FOR LATER</button></Link>
                                <button onClick={handleDeleteAll} className='btn wishlist-btns'>REMOVE</button>
                            </div>
                        </div>

                        {(!cartItems || cartItems.length === 0) ? (
                            <p className="text-center fs-1 text-danger mt-5">No items in Cart.</p>
                        ) : (
                            cartItems.map(item => (
                                <Card key={item.id} className="add-to-cart-card mb-3">
                                    <Card.Body>
                                        <Row className="align-items-center cart-row">
                                            <Col xs="auto">
                                                <input type="checkbox" className='checkbox-wishlist' />
                                            </Col>
                                            <Col xs={4} lg={2}>
                                                <img src={item.product.mainimage?.startsWith('http') ? item.product.mainimage : `${SERVER_URL}${item.product.mainimage}`} alt="" className="card-image img-fluid" />
                                            </Col>
                                            <Col>
                                                <p className='mb-4'>{item.product.title}</p>
                                                <h5 className='mt-3 fw-bold'>₹{item.product.sku?.sales_rate}</h5>
                                                <button className="add-to-cart-btn mt-3" onClick={() =>
                                                    setShowNote(prev => ({ ...prev, [item.id]: !prev[item.id] }))
                                                }>
                                                    {showNote[item.id] ? 'Hide note' : '+ Add note'}
                                                </button>
                                                {showNote[item.id] && (
                                                    <textarea
                                                        placeholder="Write your note here..."
                                                        value={note[item.id] || ""}
                                                        onChange={(e) =>
                                                            setNote(prev => ({ ...prev, [item.id]: e.target.value }))
                                                        }
                                                        className="note-input"
                                                    />
                                                )}
                                            </Col>
                                            <Col className="cart-cardEnd text-end">
                                                <small className='brand-number fw-light'>SKU <br /> {item.product.sku?.sku_code}</small>
                                                <div className="d-flex justify-content-end gap-3 fw-bold text-success mt-4">
                                                    <div className='d-flex count-cart'>
                                                        <button onClick={() => handleDecrement(item.id)} className='btn decrement-btn'><i className="fa-solid fa-minus"></i></button>
                                                        <input className='form-control' type="text" value={quantity[item.id] || 1} readOnly />
                                                        <button onClick={() => handleIncrement(item.id)} className='btn increment-btn'><i className="fa-solid fa-plus"></i></button>
                                                    </div>
                                                    <button onClick={() => handleCartDelete(item.id)} className='btn delete-btn'><i className="fa-solid fa-trash"></i></button>
                                                    <button onClick={() => handleMovetoWishlistClick(item)} className='btn wishlist-btn'><i className="fa-solid fa-heart"></i></button>
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
                                    <p>₹{getTotalAmount()}</p>
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
            </div>
            <Footer />
            <ToastContainer autoClose={3000} />

        </>
    );
}

export default AddToCart;
