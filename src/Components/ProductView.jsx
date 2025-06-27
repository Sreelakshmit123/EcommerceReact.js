import React, { useEffect, useState } from 'react'
import Header from './Header'
import productImg from '../assets/images/product-viewImg.png'
import { Tab, Nav, Row, Col, Container, Accordion } from 'react-bootstrap';
import SimilarProducts from '../Pages/SimilarProducts';
import Footer from './Footer';

function ProductView() {

    return (
        <>
            <div className='container-fluid' id='Container'>
                <Header />

                <div className='product-flex d-flex align-items-center  mt-5'>
                    <p className='pe-2 mt-3 '>Products</p> /
                    <p className='pe-2 ms-2  mt-3'>sitting Room</p> /
                    <button className='details-btn btn ms-2'>Details</button>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <img className='product-ViewImg' src={productImg} alt="" />
                        <div className='d-flex mt-3'>
                            <img className='product-subImg border border-2' src={productImg} alt="" />
                            <img className='product-subImg' src={productImg} alt="" />
                            <img className='product-subImg' src={productImg} alt="" />
                            <img className='product-subImg' src={productImg} alt="" />
                            <img className='product-subImg' src={productImg} alt="" />
                            <img className='product-subImg' src={productImg} alt="" />

                        </div>

                    </div>
                    <div className="col-lg-6 product-view-details">
                        <h2 className='productview-title'>DAMARIC - SITTING ROOM LORE <br />
                            CHAIRDAMARIC - SITTING ROOM <br />
                            CHAIR DAMARIC - SITTING ROOM</h2>
                        <div className='rating d-flex mt-3'><span className='stock me-2'>in Stock</span> - <span className='ms-2'>  4.8 <i className="rating-color fa-solid fa-star"></i>
                            <i className="rating-color fa-solid fa-star"></i>
                            <i className="rating-color fa-solid fa-star"></i>
                            <i className="rating-color fa-solid fa-star"></i>
                            <i className="rating-color fa-solid fa-star"></i></span>
                        </div>
                        <p className='product-shortnote mt-2'>Lorem ipsum dolor, sit amet consectetur adipisicing elitsdf. Molestiae magni eum, ipsam quae fugit vel, recusandae eligendi illum obcaecati reprehenderit sed aut. Debitis eius labore veniam nulla quaerat neque unde?</p>
                        <div>
                            <Container className="mt-4">
                                <Tab.Container defaultActiveKey="Description">
                                    <Row>
                                        <Col>
                                            <Nav variant="pills" className="mb-3" id="pills-tab">
                                                <Nav.Item>
                                                    <Nav.Link className='description-heading' eventKey="Description">Description</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link className='specification-heading' eventKey="Specification">Specification</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="Review">Review</Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="Description">
                                                    <h5 className='fw-bolder'>Model</h5>
                                                    <p className='description'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas ullam architecto quae est a, vero error tempore veniam rerum, magni labore recusandae iste praesentium vel tenetur magnam ea sapiente qui.</p>
                                                    <ul className='list-of-description'>
                                                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,ectetur adipisicing elit. Iure, </li>
                                                        <li>Lorem ipsum dolor sit ame, </li>
                                                        <li>Lorem ipsum dolor sit amet consectetur  </li>
                                                        <li>Lorem ipsum dolor sit amet consectetur adip </li>
                                                    </ul>
                                                    <h5 className="fw-bolder" >Additional Info</h5>
                                                    <p className='addi-info'>min Width : 64cm | min Width : 64cm</p>
                                                    <p className='addi-info'>min Width : 64cm | min Width : 64cm</p>
                                                    <div className='d-flex'>
                                                        <div className="block">
                                                            <h5 className='fw-bolder'>Colors</h5>
                                                            <div className="d-flex ">
                                                                <p className='border-color-1 active'>  <p className='color-1'></p></p>    <p className='border-color-2 ms-2'>  <p className='color-2'></p></p>
                                                                <p className='border-color-3 ms-2'>  <p className='color-3'></p></p>
                                                            </div>
                                                        </div>
                                                        <div className="block ms-5">
                                                            <h5 className='fw-bolder'>Size</h5>
                                                            <div className="d-flex">
                                                                <button className='size-button ms-2'>S</button>
                                                                <button className='size-button ms-2'>M</button>
                                                                <button className='size-button ms-2'>L</button>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Specification">
                                                    <h5>model</h5>
                                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto illum minus iusto magnam porro quo dicta illo alias esse ea voluptatibus, numquam vero accusamus reiciendis quia error non, doloribus minima</p>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Review">
                                                    <h5>model</h5>
                                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim tempora impedit itaque nesciunt odio incidunt id saepe at ipsam quidem a, dolores maiores possimus quo fugit quasi repellendus, sit recusandae.</p>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
                            </Container>
                        </div>
                        <div className='price-section'>
                            <div className='price-section-1'>
                                <div className="d-block">
                                    <small>Price</small>
                                    <p className='amount fs-4 '>$3,200</p>
                                </div>

                                <button className='add-to-cart-viewpage-btn btn '>Add to Cart <i class="fa-solid fa-arrow-right ps-2"></i></button>
                                <button className='shop-now-btn btn'>Shop Now <i class="fa-solid fa-arrow-right ps-2"></i></button>
                            </div>
                            <div className="price-section-2 ">
                                <div className='quantity d-flex'>
                                    <p className='pt-2 pe-2'>Quantity </p>
                                    <div className='d-flex mt-2'>
                                        <button  className='decrese-btn btn fw-bolder '><i class="fa-solid fa-minus"></i></button>
                                        <input className='quantity-form form-control' type="text" value="1" readOnly />
                                        <button  className='increse-btn btn fw-bolder '><i class="fa-solid fa-plus"></i></button>
                                    </div>

                                </div>
                                <button className='favourities btn'><i class="fa-solid fa-heart pe-1"></i> favourites</button>
                                <button className='share btn'><i class="fa-solid fa-share-nodes pe-2"></i>Share</button>
                            </div>
                        </div>
                    </div>

                </div>
                <p className='faq-head'>FAQs</p>
                <h4 className='related-products'><span>FREQUENTLY ASKED QUESTIONS</span></h4>
                <p className="faq-sub-title mb-5">New questions? where here to help you.</p>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header className='active-faq'>What are the advantages of shark?</Accordion.Header>
                        <Accordion.Body className='faq-answers'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        </Accordion.Body>
                        <hr />
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>In shark available globally?</Accordion.Header>
                        <Accordion.Body className='faq-answers'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        </Accordion.Body>
                        <hr />
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>How is shark so useful and unique?</Accordion.Header>
                        <Accordion.Body className='faq-answers'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        </Accordion.Body>
                        <hr />
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Do i get account in the shark multiple times?</Accordion.Header>
                        <Accordion.Body className='faq-answers'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        </Accordion.Body>
                        <hr />
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>How to verify shark account?</Accordion.Header>
                        <Accordion.Body className='faq-answers'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        </Accordion.Body>
                        <hr />
                    </Accordion.Item>
                </Accordion>

                <div className='pb-2 pt-4'>
                    <h4 className='related-products'><span>SIMILAR PRODUCT</span></h4>
                    <SimilarProducts />
                </div>
                <div className='pb-2'>
                    <h4 className='related-products'><span>BOUGHT TOGETHER</span></h4>
                    <SimilarProducts />
                </div>
                <div className='pb-2'>
                    <h4 className='related-products'><span>RECENTILY VIEWED</span></h4>
                    <SimilarProducts />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ProductView