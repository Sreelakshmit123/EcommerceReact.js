import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

function WishlistCard({ product, onClick }) {

    console.log("data", product)


    const [cart, setCart] = useState(() => {
        try {
            const stored = JSON.parse(localStorage.getItem("cart"))
            return Array.isArray(stored) ? stored : []
        } catch (e) {
            return []
        }
    })

    const handleAddtocartClick = (product) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const alreadyInCart = cart.some(item => item.id === product.id);
        if (alreadyInCart) {
            toast.warning("Item is already in the cart.");
            return;
        }
        const updated = [...cart, product];
        setCart(updated)
        localStorage.setItem("cart", JSON.stringify(updated));
    };
    console.log("cart", cart);
    return (
        <>

            <Card className="card-wishlist mb-3">
                <Card.Body>
                    <Row className="align-items-center wishlist-row">
                        <Col xs="auto">
                            <input type="checkbox" className='checkbox-wishlist' />
                        </Col>
                        <Col xs={5} lg={2} >
                            <img src={product.image} alt="" className="card-image img-fluid" />
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
                            <h5 className='mt-3'>{product.title}</h5>
                            <p className="text-muted mt-4">
                                {product.subTitle}
                            </p>
                            <button onClick={() => handleAddtocartClick(product)} className='wishlistCard-Add-to-card mt-3' size="sm" >
                                Add to Cart
                            </button>
                        </Col>
                        <Col className="wishlist-cardEnd text-end">
                            <div className="text-muted">
                                <del className='original-price'>{product.price}</del>
                            </div>
                            <div className="discount-price fw-bold text-success">{product.discountPrice}</div>
                            <button onClick={() => onClick(product.id)} className='btn wishlistRemove-button'>
                                <i class="wishlist-icon fa-solid fa-heart me-1"></i>  Remove from Wishlist
                            </button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <ToastContainer/>
        </>
    );
}

export default WishlistCard;
