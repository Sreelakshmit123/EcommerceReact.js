import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import mobiletabletoneplus from "../assets/images/mobiletablet-oneplus.webp"
import mobiletabletoneplus2 from "../assets/images/mobiletablet-oneplus2.webp"
import mobiletabletoneplus3 from "../assets/images/mobiletablet-oneplus3.webp"
import mobiletabletoppo from "../assets/images/mobiletablet-oppo.png"
import mobiletabletiphone from "../assets/images/mobiletablet-iphone.avif"
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom'


function MobileProductCard({ filters }) {

    const [mobileCategory, setmobileCategory] = useState([])
    const [filteredProducts, setfilteredProducts] = useState([])

    const [wishlist, setWishlist] = useState(() => {
        try {
            const stored = JSON.parse(localStorage.getItem("wishlist"))
            return Array.isArray(stored) ? stored : []
        } catch (e) {
            return []
        }
    })
    const [cart, setCart] = useState(() => {
        const stored = JSON.parse(localStorage.getItem("cart"))
        return Array.isArray(stored) ? stored : []
    })
    useEffect(() => {
        const CategoryItems = [
            {
                id: 1,
                title: "Apple Headphone max",
                price: "$175.00",
                location: "Jagarta",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletoneplus,
                discountPrice: "$165.00"
            },
            {
                id: 2,
                title: "Apple Headphone max",
                price: "$175.00",
                location: "Yogyakarta",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletoppo,
                discountPrice: "$165.00"
            },
            {
                id: 3,
                title: "Apple Headphone max",
                price: "$175.00",
                location: "Bandung",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletiphone,
                discountPrice: "$165.00"

            },
            {
                id: 4,
                title: "Apple Headphone max",
                price: "$175.00",
                location: "Semarang",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletoneplus3,
                discountPrice: "$165.00"
            },
            {
                id: 5,
                title: "Apple Headphone max",
                price: "$175.00",
                location: "Sarabaya",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletoneplus2,
                discountPrice: "$165.00"
            },
            {
                id: 6,
                title: "Apple Headphone max",
                price: "$175.00",
                location: 'Sarabaya',
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletoneplus3,
                discountPrice: "$165.00"
            },
            {
                id: 7,
                title: "Apple Headphone max",
                price: "$175.00",
                location: "Jagarta",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletiphone,
                discountPrice: "$165.00"
            },
            {
                id: 8,
                title: "Apple Headphone max",
                price: "$175.00",
                location: "Yogyakarta",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletoneplus,
                discountPrice: "$165.00"
            },
            {
                id: 9,
                title: "Apple Headphone max",
                price: "$175.00",
                location: 'Bandung',
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletoneplus3,
                discountPrice: "$165.00"
            },
            {
                id: 10,
                title: "Apple Headphone max",
                price: "$175.00",
                location: 'Semarang',
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletoneplus2,
                discountPrice: "$165.00"
            },
            {
                id: 11,
                title: "Apple Headphone max",
                price: "$175.00",
                location: 'Bandung',
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletoppo,
                discountPrice: "$165.00"
            },
            {
                id: 12,
                title: "Apple Headphone max",
                price: "$175.00",
                location: "Jagarta",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletiphone,
                discountPrice: "$165.00"
            },
            {
                id: 13,
                title: "Apple Headphone max",
                price: "$175.00",
                location: "Yogyakarta",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletoneplus3,
                discountPrice: "$165.00"
            },
            {
                id: 14,
                title: "Apple Headphone max",
                price: "$575.00",
                location: "Bandung",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletoneplus,
                discountPrice: "$165.00"
            },
            {
                id: 15,
                title: "Apple Headphone max",
                price: "$975.00",
                location: "Semarang",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletoneplus2,
                discountPrice: "$165.00"
            },
            {
                id: 16,
                title: "Apple Headphone max",
                price: "$175.00",
                location: "Sarabaya",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletiphone,
                discountPrice: "$165.00"
            },

        ]
        setfilteredProducts(CategoryItems)
        setmobileCategory(CategoryItems)
    }, [])

    useEffect(() => {
        const [min, max] = filters?.priceRange || [0, 2000];
        const hasLocationFilter = filters.locations && filters.locations.length > 0;

        const result = mobileCategory.filter(item => {
            const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, ''));
            const inPriceRange = priceValue >= min && priceValue <= max;
            const inLocation = !hasLocationFilter || filters.locations.includes(item.location);
            return inPriceRange && inLocation;
        });

        setfilteredProducts(result);
    }, [filters, mobileCategory]);


    const handleWishlistClick = (product) => {
        const inWishlist = wishlist.find(item => item.id === product.id)
        let updated;

        if (inWishlist) {
            updated = wishlist.filter(item => item.id !== product.id)
        } else {
            updated = [...wishlist, product]
        }
        setWishlist(updated)
        localStorage.setItem("wishlist", JSON.stringify(updated))
    }

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
            <Row id='style-3' className='overflow-content'>
                {filteredProducts.map((item) => {
                    return (
                        <Col xs={12} sm={6} md={5} lg={3} key={item.id}>
                            <Card className='mobiletablet-card'>
                                <div className='image-wishlist'>
                                    <Link to={'/product-view'}><Card.Img className='mobiletablet-image' variant="top" src={item.image} /></Link>
                                    <button onClick={() => handleWishlistClick(item)} className={`mobiletablet-wishlist btn ${wishlist.find(wishlist => wishlist.id === item.id) ? 'bg-danger' : 'bg-dark'}`}><i className={`fa-solid fa-heart text-light`}></i></button>
                                </div>
                                <Card.Body>
                                    <div className="mobiletablet-productname">
                                        <p>{item.title}</p>
                                        <p>{item.price}</p>
                                    </div>
                                    <p className='mobiletablet-subtitle'>{item.subTitle}</p>
                                    <p className='mobiletablet-rating'>
                                        <i class="fa-solid fa-star me-1"></i><i class="fa-solid fa-star me-1"></i><i class="fa-solid fa-star me-1"></i><i class="fa-solid fa-star me-1"></i><i class="fa-solid fa-star me-1"></i>
                                        <span className='text-dark'> (121)</span>
                                    </p>
                                    <button onClick={() => handleAddtocartClick(item)} className='mobiletablet-btn btn btn-outline-dark'><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
            <ToastContainer />
        </>
    )
}

export default MobileProductCard