import React from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import landingImage from '../assets/images/landingimg-music-headphone.png'
import DealsOfTheWeek from './DealsOfTheWeek';
import DealsOfTheDay from './DealsOfTheDay';
import PopularItems from './PopularItems';
import SpotlightedItems from './SpotlightedItems';

function Home() {
    return (
        <>
            <Container id='Container'>
                {/* Navbar */}
                <Navbar collapseOnSelect expand="lg">

                    <Navbar.Brand className='home fw-bold' href="#home"><b>EBrands</b></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="navsection  me-auto ">
                            <Nav.Link className='navsection active' href="#features">Home</Nav.Link>
                            <Nav.Link className='navsection' href="#pricing">Collection</Nav.Link>
                            <Nav.Link className='navsection' href="#pricing">Sale</Nav.Link>
                            <Nav.Link className='navsection' href="#pricing">FAQ</Nav.Link>
                        </Nav>
                        <Nav className=''>
                            <Nav.Link href="#deets"><button className='cartbtn btn btn-outline-dark '><i className="fa-solid fa-cart-shopping me-2"></i>ShoppingCart</button></Nav.Link>
                            <Nav.Link href="#deets"><button className='Whishlistbtn btn btn-outline-dark '>Wishlist</button></Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets"><button className='signUp-btn btn '>Sign in <i class="fa-solid fa-arrow-right"></i></button></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                </Navbar>
                {/* search bar */}

                <div className='row'>
                    <div className='col-lg-6'>
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            className="searchbar mr-sm-2"
                        />
                    </div>
                    <div className="desginbox col-lg-1">
                    </div>
                    <div className="desginbox1 col-lg-1">
                    </div>
                    <div className="col-lg-4"></div>
                </div>

                {/* category button */}

                <div className='row'>
                    <div className='categoryButton col-lg-6'>
                        <button className='Categorybtn btn btn-outline-dark'>category</button>
                        <button className='Categorybtn btn btn-outline-dark'>category</button>
                        
                        <button className='Categorybtn btn btn-outline-dark'>category</button>
                        <button className='Categorybtn btn btn-outline-dark'>category</button>
                    </div>
                </div>

                {/* landing page */}

                <div className="row mt-3">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <h1 className='landingHeading1'>All <span className='spanHeading1'>Modern Style</span>
                            <br />
                            Product Available <br />
                            Here.</h1>
                        <p className='landingparagraph'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br /> Magnam, cumque delectus placeat aut nulla con <br /> rem! Obcaecati<br /></p>
                        <button className='shopnow-btn btn'>Shop Now</button>
                    </div>
                    <div className="circle-container col-lg-6 col-md-6 col-sm-12 position-relative d-flex justify-content-center">
                        <div className='circle-gradient'></div>
                        <img className='landingImg' src={landingImage} alt="" />


                        <div class="tag top-left">Get Up to 30% Off
                            <p className='tag-para'>Lorem ipsum dolor consectetur <br /> adipisicing elit. At iure ectetury <br /> consequatur omnis fugiat eum </p>
                        </div>
                        <div class="tag bottom-right">100K Trusted Reviews
                            <p className='bottomtag-para'>13 reviews</p>
                            <p className='bottomtag-para'><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></p>
                        </div>
                    </div>
                </div>


                <h1 className='Deals-of-week'>Highlighted Deals of the Week</h1>
                <div className="row">
                    <div className=" col-lg-9">
                        <DealsOfTheWeek />
                        <PopularItems/>
                    </div>
                    <div className="col-lg-3">
                        <h4 className='deal-of-day'>DEAL OF THE DAY</h4>
                        <DealsOfTheDay />
                        <h4 className='deal-of-day mt-5'>SPOTLIGHTED ITEMS</h4>
                        <SpotlightedItems/>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Home