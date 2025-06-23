import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { NavDropdown } from 'react-bootstrap';

function Header() {
    return (
        <>
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
                        <Nav.Link><Link to={"/signin"}><button className='signUp-btn btn '>Sign in <i class="fa-solid fa-arrow-right"></i></button></Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>

            </Navbar>
            {/* search bar */}

            <div className='searchbarSection '>
                <div className='search-wrapper '>
                    <FaSearch id="search-icon" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="searchbar mr-sm-2" />
                </div>
                <button className='navbarbtns btn'><i className="fontBtnPopular fa-solid fa-fire me-2"></i> Most Popular</button>
                <button className='navbarbtns btn'><i class="fontBtnfilter fa-solid fa-sliders me-2"></i> Filters</button>

            </div>

            {/* category button */}

            <div className='row'>
                <div className='categoryButton  col-lg-6 '>
                    <Link to={"/category1"}><button className='Categorybtn btn btn-outline-dark'>category</button></Link>
                    <Link to={"/category2"}><button className='Categorybtn btn btn-outline-dark'>category</button></Link>
                    <Link to={"/category3"}><button className='Categorybtn btn btn-outline-dark'>category</button></Link>
                    <Link to={"/category4"}><button className='Categorybtn btn btn-outline-dark'>category</button></Link>
                </div>
            </div>

        </>
    )
}

export default Header