import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { SERVER_URL } from '../Services/serverUrl';
import { listCartAPI, listWishlistAPI, moveToCartAPI } from '../Services/allAPIs';

function WishlistCard({ product, onClick, removeFromWishlistUI }) {

    console.log("data", product)


    const [cart, setCart] = useState(() => {
        try {
            const stored = JSON.parse(localStorage.getItem("cart"))
            return Array.isArray(stored) ? stored : []
        } catch (e) {
            return []
        }
    })

    // const handleMovetocartClick = (product) => {
    //     const cart = JSON.parse(localStorage.getItem("cart")) || [];
    //     const alreadyInCart = cart.some(item => item.id === product.id);
    //     if (alreadyInCart) {
    //         toast.warning("Item is already in the cart.");
    //         return;
    //     }
    //     const updated = [...cart, product];
    //     setCart(updated)
    //     localStorage.setItem("cart", JSON.stringify(updated));
    // };
    // console.log("cart", cart);

    const handleMovetocartClick = async (product) => {
        const token = localStorage.getItem("access_token");

        if (!token) {
            toast.error("You must be logged in to perform this action.");
            return;
        }

        const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if item already exists in cart
        const alreadyInCart = currentCart.some(item => {
            const cartProductId = item?.product?.id || item?.id;
            return cartProductId === product.product;
        });

        if (alreadyInCart) {
            toast.info("Item is already in the cart.");
            return;
        }

        const reqHeader = {
            "Authorization": `Bearer ${token}`
        };

        const wishlist_ids = [product.id];

        try {
            const result = await moveToCartAPI(wishlist_ids, reqHeader);

            if (result.status === 200) {
                toast.success("Item moved to cart successfully");

                setTimeout(() => {
                    removeFromWishlistUI(product.id);
                }, 1000);
                const cartUpdate = await listCartAPI(reqHeader);
                if (cartUpdate.status === 200 && cartUpdate.data?.data) {
                    localStorage.setItem("cart", JSON.stringify(cartUpdate.data.data));
                    setCart(cartUpdate.data.data);

                }
            } else {
                toast.error("Failed to move item to cart.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while moving item.");
        }
    };

    return (
        <>
            <Card className="card-wishlist mb-3">
                <Card.Body>
                    <Row className="align-items-center wishlist-row">
                        <Col xs="auto">
                            <input type="checkbox" className='checkbox-wishlist' />
                        </Col>
                        <Col xs={5} lg={2} >
                            <img src={product?.mainimage?.startsWith('http') ? product.mainimage : `${SERVER_URL}${product.mainimage}`} alt="" className="card-image img-fluid" />
                        </Col>
                        <Col>

                            <p>
                                <span className='me-2 text-dark'>{product.average_rating}</span>
                                {[1, 2, 3, 4, 5].map((i) => {
                                    const rating = product.average_rating;
                                    const full = rating >= i;
                                    const half = rating >= i - 0.5 && rating < i;

                                    const iconClass = full
                                        ? "fa-solid fa-star"
                                        : half
                                            ? "fa-solid fa-star-half-stroke"
                                            : "fa-solid fa-star";

                                    const iconColor =
                                        rating === 0 ? "rgba(227, 227, 227, 1)" : "rgba(253, 199, 5, 1)";

                                    return (
                                        <i
                                            key={i}
                                            className={`me-1 ${iconClass}`}
                                            style={{ color: iconColor }}
                                        ></i>
                                    );
                                })}
                                <span className="text-muted ms-3 review-span">Review ({product.reviews_count})</span>
                            </p>
                            <h5 className='mt-3'>{product.product_name}</h5>
                            <p className="text-muted mt-4 sub-title">
                                {product.sku.title.length > 40 ? product.sku.title.slice(0, 40) + "..." : product.sku.title}
                            </p>
                            <button onClick={() => handleMovetocartClick(product)} className='wishlistCard-Add-to-card mt-3 ps-5 pe-5 pt-2 pb-2' size="sm" >
                                Add to Cart
                            </button>
                        </Col>
                        <Col className="wishlist-cardEnd text-end">
                            <div className="text-muted">
                                <del className='original-price'>₹{product.sku.price}</del>
                            </div>
                            <div className="discount-price fw-bold text-success">₹{product.sku.sales_rate}</div>
                            <button onClick={() => onClick(product.id)} className='btn wishlistRemove-button'>
                                <i class="wishlist-icon fa-solid fa-heart me-1"></i>  Remove from Wishlist
                            </button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <ToastContainer />
        </>
    );
}

export default WishlistCard;
