import React, { useEffect, useState } from 'react'
import Header from './Header'
import productImg from '../assets/images/product-viewImg.png'
import { Accordion } from 'react-bootstrap';
import SimilarProducts from '../Pages/SimilarProducts';
import Footer from './Footer';
import { CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/react'
import { Link, useParams } from 'react-router-dom';
import BoughtTogether from '../Pages/BoughtTogether';
import RecentlyViewed from '../Pages/RecentlyViewed';
import { addToCartAPI, MobileProductViewAPI, wishlistAPI } from '../Services/allAPIs';
import { SERVER_URL } from '../Services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductView() {
    const colors = [' rgb(111, 77, 77)', 'rgb(57, 91, 99)', 'rgb(180, 180, 180)']
    const sizes = ['S', 'M', 'L']
    const { product_id, skuId } = useParams();
    const [product, setProduct] = useState(null)
    const [selectedColor, setSelectedColor] = useState(colors[0])
    const [selectedSize, setSelectedSize] = useState('S');
    const [count, setCount] = useState(1)


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    //cart
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });
    //wishlist
    const [wishlist, setWishlist] = useState(() => {
        const storedWishlist = localStorage.getItem('wishlist');
        return storedWishlist ? JSON.parse(storedWishlist) : [];
    });
    //mobileproducts view  api 
    const MobileProductView = async () => {
        console.log("product_id:", product_id, "skuId:", skuId);
        try {
            const response = await MobileProductViewAPI(product_id, skuId);
            console.log("API response:", response); // Log full response

            if (response.status === 200) {
                setProduct(response.data?.data || response.data);
            } else {
                setError("Failed to fetch product details");
            }
        } catch (err) {
            console.error('Error fetching product details:', err);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        MobileProductView()
    }, [product_id, skuId])


    // add to cart the produts
    const handleAddtocartClick = async (product) => {
        const productId = product?.product_detail?.id;
        const sku = product?.product_detail?.sku;

        const token = localStorage.getItem('access_token');

        if (token) {
            const reqHeader = {
                'Authorization': `Bearer ${token}`,
            };

            const formData = new FormData();
            formData.append('product_id', productId);
            formData.append('skuid', sku.id);
            formData.append('quantity', count);

            const alreadyInCart = cart.some((item) => {
                const cartProductId = item?.product?.product_detail?.id || item?.product?.id;
                return cartProductId === productId;
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
                        sku,
                        quantity: count,
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
    //add to wishlist - mobileproductview page 
    const handleWishlistClick = async (product) => {
        const token = localStorage.getItem('access_token');
        const productId = product?.product_detail?.id;
        const skuId = product?.product_detail?.sku?.id;

        if (!productId || !skuId) {
            toast.error("Invalid product data.");
            return;
        }

        if (token) {
            const reqHeader = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };
            const data = {
                product_id: productId,
                sku_id: skuId,
            };
            const alreadyInWishlist = wishlist.some(item => item.product === productId);
            if (alreadyInWishlist) {
                toast.info("Item is already in your wishlist");
                return;
            }

            try {
                const response = await wishlistAPI(data, reqHeader);
                if (response.status === 200 || response.status === 201) {
                    const newWishlist = [...wishlist, { product: productId }];
                    setWishlist(newWishlist);
                    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
                    toast.success("Added to Wishlist");
                } else {
                    toast.error("Something went wrong while adding to wishlist");
                }
            } catch (err) {
                console.error(err);
                toast.error("Wishlist action failed");
            }
        } else {
            toast.warning("Please login to add to Wishlist!");
            navigate("/login");
        }
    };


    // count of product
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
                {loading ? (
                    <p className="text-center fs-4 mt-5">Loading product details...</p>
                ) : error ? (
                    <p className="text-center text-danger fs-4 mt-5">{error}</p>
                ) : product ? (
                    <>
                        <div className="row">
                            <div className="col-lg-6">
                                <img className='product-ViewImg p-5' src={product.product_detail.mainimage?.startsWith('http') ? product.product_detail.mainimage : `${SERVER_URL}${product.product_detail.mainimage}`} alt={product.product_name} />
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
                                <p className='product-id'>{product.product_detail.sku?.sku_code}</p>
                                <h2 className='productview-title'>{product.product_detail.title}<br /></h2>
                                <div className='rating d-flex mt-3'><span className='stock me-2'>{product.product_detail.sku?.status}</span> - <span className='ms-2'>
                                    {product.avg_rating}
                                    {[1, 2, 3, 4, 5].map((i) => {
                                        const rating = product.avg_rating || 0;
                                        const full = rating >= i;
                                        const half = rating >= i - 0.5 && rating < i;

                                        const iconClass = full
                                            ? "fa-solid fa-star"
                                            : half
                                                ? "fa-solid fa-star-half-stroke"
                                                : "fa-solid fa-star";

                                        const iconColor = rating === 0 ? "rgba(233, 229, 229, 1)" : "rgba(253, 199, 5, 1)";

                                        return (
                                            <i key={i} className={`ms-1 ${iconClass}`} style={{ color: iconColor }}></i>
                                        );
                                    })}
                                </span>
                                </div>
                                <p className='product-shortnote mt-2'>{product.product_detail.description}</p>

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
                                                <h5>Specification</h5>

                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi animi alias, optio vel sunt velit quam, fugit eos exercitationem, voluptatibus nostrum. Excepturi nesciunt laboriosam culpa odit beatae, quae quasi ea!</p>
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
                                            <p className='amount fs-4 '>₹{product.product_detail.sku?.sales_rate}</p>
                                        </div>

                                        <button onClick={() => { handleAddtocartClick(product) }} className='add-to-cart-viewpage-btn btn '>Add to Cart <i class="fa-solid fa-arrow-right ps-2"></i></button>
                                        <button className='shop-now-btn btn'>Shop Now <i class="fa-solid fa-arrow-right ps-2"></i></button>
                                    </div>
                                    <div className="price-section-2 ">
                                        <button className='quantity btn d-flex '>
                                            <p className='mt-2 pe-2 '>Quantity </p>
                                            <div className='d-flex mt-2'>
                                                <button onClick={handleDecrement} className='decrese-btn btn fw-bolder '><i class="fa-solid fa-minus"></i></button>
                                                <input className='quantity-form form-control' type="text" value={count} readOnly />
                                                <button onClick={handleIncrement} className='increse-btn btn fw-bolder '><i class="fa-solid fa-plus"></i></button>
                                            </div>

                                        </button>
                                        <button onClick={() => { handleWishlistClick(product) }} className='favourities btn'><i class="fa-solid fa-heart pe-1"></i> favourites</button>
                                        <button className='share btn'><i class="fa-solid fa-share-nodes pe-2"></i>Share</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-center fs-4 mt-5">Product not found.</p>
                )}



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
            <ToastContainer />
            <Footer />
        </>
    )
}

export default ProductView