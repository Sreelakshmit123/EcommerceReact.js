import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import WishlistCard from '../Pages/WishlistCard';

function Wishlist() {
    const [wishlistedItems, setWishlistedItems] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("wishlist")
        if (stored) {
            setWishlistedItems(JSON.parse(stored))
        }
    }, []);

    const handleWishlistRemove = (id) =>{
        const updated = wishlistedItems.filter(item => item.id !== id)
        setWishlistedItems(updated)
        localStorage.setItem("wishlist", JSON.stringify(updated)) 
    }

    const handleRemoveAll = () =>{
        setWishlistedItems([]),
        localStorage.setItem("wishlist", JSON.stringify([]))
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
                            <Nav.Link><Link to={"/signin"}><button className='signUp-btn btn '>Sign in <i class="fa-solid fa-arrow-right"></i></button></Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                </Navbar>

                {/* whishlist */}
                <div className='selectAllOption row'>
                    <div className='col-lg-4 checkboxes '>
                        <label for="checkbox1" class="checkboxes gap-3 "><input type="checkbox" id="checkbox1" name="checked" value="yes" class="checkbox-wishlist" />
                            Select All</label>
                    </div>

                    <div className='col-lg-5 pt-2'>
                        <button className='btn wishlist-btns'>ADD TO CART(ALL)</button>
                        <button onClick={handleRemoveAll} className='btn wishlist-btns ms-5'>REMOVE ALL</button>
                    </div>
                    <div className="col-lg-3"></div>
                </div>

                {/* wishlist cards */}

                {wishlistedItems.length === 0 ? (
                    <p className="text-center fs-1 text-danger mt-5">No items in wishlist.</p>
                ) : (
                    wishlistedItems.map(item => (
                        <WishlistCard key={item.id} product={item} onClick={handleWishlistRemove}/>
                    ))
                )}
            </div>
        </>

    )
}

export default Wishlist