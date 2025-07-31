import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { addToCartAPI, listCartAPI, listWishlistAPI, MobileProductListAPI, wishlistAPI } from '../Services/allAPIs';
import { SERVER_URL } from '../Services/serverUrl';

function MobileProductCard({ filters, category, subcategory }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mobileCategory, setmobileCategory] = useState([]);
    const [filteredProducts, setfilteredProducts] = useState([]);
    const [Wishlist, setWishlist] = useState(() => {
        try {
            const stored = JSON.parse(localStorage.getItem('wishlist'));
            return Array.isArray(stored) ? stored : [];
        } catch (e) {
            return [];
        }
    });

    const [cart, setCart] = useState(() => {
        try {
            const stored = JSON.parse(localStorage.getItem('cart'));
            return Array.isArray(stored) ? stored : [];
        } catch (e) {
            return [];
        }

    });
    // get products cards
    const getProductListCards = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.set('page', 1);

            if (category) params.set('category', category);
            if (subcategory) params.set('subcategory', subcategory);

            if (filters?.priceRange) {
                const [min, max] = filters.priceRange;
                params.set('price', `${min},${max}`);
            }

            const queryString = `?${params.toString()}`;
            console.log("Sending query:", queryString);

            const result = await MobileProductListAPI(queryString);
            console.log("API Result:", result?.data?.results);

            if (result.status === 200) {
                setmobileCategory(result.data.results);
                setfilteredProducts(result.data.results);
                setError(null);
            } else {
                setError('Failed to fetch products');
            }
        } catch (error) {
            console.error("Product list error:", error);
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        getProductListCards();
    }, [category, subcategory, filters]);

    // filter products
    useEffect(() => {
        if (!filters) return;
        const hasLocationFilter = filters.locations && filters.locations.length > 0;
        const result = mobileCategory.filter((item) => {
            const inLocation = !hasLocationFilter || filters.locations.includes(item.location);
            return inLocation;
        });

        setfilteredProducts(result);
        setError(null);
    }, [filters, mobileCategory]);


    // wishlist items
    const handleWishlistClick = async (product) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            const reqHeader = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };
            const data = {
                product_id: product.id,
                sku_id: product.sku.id,
            };
            try {
                const response = await wishlistAPI(data, reqHeader);
                if (response.status === 200) {
                    const message = response.data?.message?.toLowerCase();
                    let updatedWishlist;

                    if (message?.includes('removed')) {
                        updatedWishlist = Wishlist.filter((item) => item.product !== product.id);
                        toast.info('Removed from Wishlist');
                    } else {
                        updatedWishlist = [...Wishlist, { product: product.id }];
                        toast.success('Added to Wishlist');
                    }

                    setWishlist(updatedWishlist);
                    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
                } else {
                    toast.error('Something went wrong while updating wishlist');
                }
            } catch (err) {
                console.error(err);
                toast.error('Wishlist action failed');
            }
        } else {
            toast.warning('Please login to add your favourite!');
            navigate('/login');
        }
    };

    // get wishlist from api 
    const getWishlistFromAPI = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) return;

        const reqHeader = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        try {
            const result = await listWishlistAPI(reqHeader);
            if (result.status === 200) {
                const apiWishlist = result.data.data;
                setWishlist(apiWishlist);
                localStorage.setItem('wishlist', JSON.stringify(apiWishlist));
            }
        } catch (err) {
            console.error('Failed to sync wishlist', err);
        }
    };


    useEffect(() => {
        getWishlistFromAPI();
    }, []);

    // add to cart the produts
    const handleAddtocartClick = async (product) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            const reqHeader = {
                'Authorization': `Bearer ${token}`,
            }

            const formData = new FormData();
            formData.append('product_id', product.id);
            formData.append('skuid', product.sku.id);
            formData.append('quantity', 1);

            const alreadyInCart = cart.some((item) => {
                const cartProductId = item?.product?.id || item?.id;
                return cartProductId === product.id;
            });
            if (alreadyInCart) {
                toast.info('Item is already in the cart');
                return;
            }
            try {
                const response = await addToCartAPI(formData, reqHeader);
                if (response.status === 200 || response.status === 201) {
                    const newCartItem = {
                        ...response.data,
                        product,
                        sku: product.sku,
                        quantity: 1,
                    };
                    const updatedCart = [...cart, newCartItem];
                    setCart(updatedCart);
                    localStorage.setItem('cart', JSON.stringify(updatedCart));
                    toast.success('Added to shopping Cart');
                } else {
                    toast.error('Something went wrong while adding to shopping cart');
                }
            } catch (err) {
                console.error(err);
                toast.error('Cart action failed');
            }
        } else {
            toast.warning('Please login to add your favourite!');
            navigate('/login');
        }
    };

    return (
        <>
            {!loading && !error && filteredProducts.length === 0 && (
                <div className="text-center mb-4 fs-5 text-muted">
                    No products match the selected filters.
                </div>
            )}
            <Row id="style-3" className="overflow-content">
                {loading ? (
                    <div className="text-center mb-4 fs-5 text-danger">
                        <b>Loading...Please wait</b>
                    </div>
                ) : error ? (
                    <div className="text-center mb-4 fs-5 text-danger">
                        <b>{error}</b>
                    </div>
                ) : (
                    filteredProducts.map((item) => {
                        const isInWishlist = Wishlist.some((w) => w.product === item.id);
                        return (
                            <Col xs={12} sm={6} md={5} lg={3} key={item.id}>
                                <Card className="mobiletablet-card">
                                    <div className="image-wishlist">
                                        <Link to={`/product/${item.id}/${item.sku.id}`}>
                                            <Card.Img
                                                className="mobiletablet-image"
                                                variant="top"
                                                src={
                                                    item?.mainimage?.startsWith('http')
                                                        ? item.mainimage
                                                        : `${SERVER_URL}${item.mainimage}`
                                                } alt='productImage'
                                            />
                                        </Link>
                                        <button
                                            onClick={() => handleWishlistClick(item)}
                                            className={`mobiletablet-wishlist btn ${isInWishlist ? 'bg-danger' : 'bg-dark'
                                                }`}
                                        >
                                            <i className="fa-solid fa-heart text-light"></i>
                                        </button>
                                    </div>
                                    <Card.Body>
                                        <div className="mobiletablet-productname">
                                            <p>{item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title}</p>
                                            <p>₹{item.sku.price}</p>
                                        </div>
                                        <p className="mobiletablet-subtitle">
                                            {item.description.length > 60 ? item.description.slice(0, 60) + "..." : item.description}</p>
                                        <p className="mobiletablet-rating">
                                            {[1, 2, 3, 4, 5].map((i) => {
                                                const rating = item.average_rating;
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
                                            <span className="text-dark ms-2">
                                                ({item.reviews_count})
                                            </span>
                                        </p>


                                        <button
                                            onClick={() => handleAddtocartClick(item)}
                                            className="mobiletablet-btn btn btn-outline-dark"
                                        >
                                            <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                                        </button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })
                )}
            </Row>
            <ToastContainer />
        </>
    );
}

export default MobileProductCard;