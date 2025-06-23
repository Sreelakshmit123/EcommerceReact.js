// src/components/WishlistCard.jsx
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import mobiletabletoppo from "../assets/images/mobiletablet-oppo.png"

function WishlistCard() {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Row className="align-items-center wishlist-row">
                    <Col xs="auto">
                        <input type="checkbox" className='checkbox-wishlist' />
                    </Col>
                    <Col xs={2} >
                        <img src={mobiletabletoppo} alt="" className="card-image img-fluid" />
                    </Col>
                    <Col>
                        <small>5.0</small>
                        <small className='text-warning ms-3'>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </small>
                        <small className="text-muted ms-3">Review (12)</small>
                        <h5 className='mt-3'>product title</h5>
                        <p className="text-muted mt-4" style={{ fontSize: '0.85rem' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing <br /> elitectetur adipiscing electetur adipiscing el.
                        </p>
                        <button className='wishlistCard-Add-to-card mt-3' size="sm" >
                            Add to Cart
                        </button>
                    </Col>
                    <Col xs="auto" className="text-end pe-5 pt-5 mt-5">
                        <div className="text-muted">
                            <del>$175</del>
                        </div>
                        <div className="discount-price fw-bold text-success">$165</div>
                        <button className='btn wishlistRemove-button'>
                            <i class="wishlist-icon fa-solid fa-heart me-1"></i>  Remove from Wishlist
                        </button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default WishlistCard;
