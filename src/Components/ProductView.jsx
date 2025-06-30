import React, { useEffect, useState } from 'react'
import Header from './Header'
import productImg from '../assets/images/product-viewImg.png'
import { Accordion } from 'react-bootstrap';
import SimilarProducts from '../Pages/SimilarProducts';
import Footer from './Footer';
import { CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/react'
import { Link } from 'react-router-dom';
import BoughtTogether from '../Pages/BoughtTogether';
import RecentlyViewed from '../Pages/RecentlyViewed';

function ProductView() {
    const colors = [' rgb(111, 77, 77)', 'rgb(57, 91, 99)', 'rgb(180, 180, 180)']
    const sizes = ['S', 'M', 'L']

    const [selectedColor, setSelectedColor] = useState(colors[0])
    const [selectedSize, setSelectedSize] = useState('S');
    const [count, setCount] = useState(1)

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
            <div className='container-fluid' id='Container'>
                <Header />

                <div className='product-flex d-flex align-items-center  mt-5'>
                    <p className='pe-2 mt-3 '>Products</p> /
                    <p className='pe-2 ms-2  mt-3'>sitting Room</p> /
                    <button className='details-btn btn ms-2'>Details</button>
                </div>
                {/* product view row and col */}

                <div className="row">
                    <div className="col-lg-6">
                        <img className='product-ViewImg' src={productImg} alt="" />
                        <div className='d-flex mt-3'>
                            <button className='product-subImg btn p-0 '><img className='product-subImg border border-2 active' src={productImg} alt="" /></button>
                            <button className='product-subImg btn p-0 '><img className='product-subImg' src={productImg} alt="" /></button>
                            <button className='product-subImg btn p-0'><img className='product-subImg' src={productImg} alt="" /></button>
                            <button className='product-subImg btn p-0'><img className='product-subImg' src={productImg} alt="" /></button>
                            <button className='product-subImg btn p-0'><img className='product-subImg' src={productImg} alt="" /></button>
                            <button className='product-subImg btn p-0'><img className='product-subImg' src={productImg} alt="" /></button>
                        </div>
                    </div>
                    <div className="col-lg-6 product-view-details">
                        <p className='product-id'>hlcy-8546</p>
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
                            {/* specification / description / Review */}


                            <CTabs defaultActiveItemKey={1}>
                                <CTabList variant="underline">
                                    <CTab aria-controls="home-tab-pane" itemKey={1}>Description</CTab>
                                    <CTab aria-controls="profile-tab-pane" itemKey={2}>Specification</CTab>
                                    <CTab aria-controls="contact-tab-pane" itemKey={3}>Review</CTab>
                                </CTabList>
                                <CTabContent>
                                    <CTabPanel className="p-3" aria-labelledby="home-tab-pane" itemKey={1}>
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
                                                <div className="color-options mb-3">
                                                    {colors.map((color) => (
                                                        <div
                                                            key={color}
                                                            className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                                                            style={{ backgroundColor: color }}
                                                            onClick={() => setSelectedColor(color)}
                                                        > </div>
                                                    ))}
                                                </div>

                                            </div>
                                            <div className="block ms-5">
                                                <div className="size-selector">
                                                    <h5 className='fw-bolder'>Size</h5>
                                                    <div className="size-options">
                                                        {sizes.map((size) => (
                                                            <button
                                                                key={size}
                                                                className={`size-box ${selectedSize === size ? 'active' : ''}`}
                                                                onClick={() => setSelectedSize(size)}>
                                                                {size}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CTabPanel>
                                    <CTabPanel className="p-3" aria-labelledby="profile-tab-pane" itemKey={2}>
                                        <h5>model</h5>

                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto illum minus iusto magnam porro quo dicta illo alias esse ea voluptatibus, numquam vero accusamus reiciendis quia error non, doloribus minima</p>
                                    </CTabPanel>
                                    <CTabPanel className="p-3" aria-labelledby="contact-tab-pane" itemKey={3}>
                                        <h5>model</h5>

                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto illum minus iusto magnam porro quo dicta illo alias esse ea voluptatibus, numquam vero accusamus reiciendis quia error non, doloribus minima</p>
                                    </CTabPanel>
                                </CTabContent>
                            </CTabs>

                        </div>

                        {/* price / quantity / addtocart / favourites / share /shopnow */}

                        <div className='price-section'>
                            <div className='price-section-1'>
                                <div className="d-block">
                                    <small>Price</small>
                                    <p className='amount fs-4 '>$3,200</p>
                                </div>

                                <Link to={'/shoppingCart'}><button className='add-to-cart-viewpage-btn btn '>Add to Cart <i class="fa-solid fa-arrow-right ps-2"></i></button></Link>
                                <button className='shop-now-btn btn'>Shop Now <i class="fa-solid fa-arrow-right ps-2"></i></button>
                            </div>
                            <div className="price-section-2 ">
                                <button className='quantity btn d-flex'>
                                    <p className='pt-2 pe-2'>Quantity </p>
                                    <div className='d-flex mt-2'>
                                        <button onClick={handleDecrement} className='decrese-btn btn fw-bolder '><i class="fa-solid fa-minus"></i></button>
                                        <input className='quantity-form form-control' type="text" value={count} readOnly />
                                        <button onClick={handleIncrement} className='increse-btn btn fw-bolder '><i class="fa-solid fa-plus"></i></button>
                                    </div>

                                </button>
                                <Link to={'/wishlist'}> <button className='favourities btn'><i class="fa-solid fa-heart pe-1"></i> favourites</button></Link>
                                <button className='share btn'><i class="fa-solid fa-share-nodes pe-2"></i>Share</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Frequently asked Questions */}

                <p className='faq-head'>FAQs</p>
                <h4 className='related-products mb-4 mt-4'><span>FREQUENTLY ASKED QUESTIONS</span></h4>
                <p className="faq-sub-title mb-5">New questions? where here to help you.</p>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header className='active-faq'>What are the advantages of shark?</Accordion.Header>
                        <Accordion.Body className='faq-answers '>
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

                {/* similar products */}

                <div className='pb-2 pt-4'>
                    <h4 className='related-products'><span>SIMILAR PRODUCT</span></h4>
                    <SimilarProducts />
                </div>

                {/* bought together */}

                <div className='pb-2'>
                    <h4 className='related-products'><span>BOUGHT TOGETHER</span></h4>
                    <BoughtTogether />
                </div>

                {/* recently viewed */}

                <div className='pb-2'>
                    <h4 className='related-products'><span>RECENTLY VIEWED</span></h4>
                    <RecentlyViewed />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ProductView