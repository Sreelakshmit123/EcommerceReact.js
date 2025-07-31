import React, { useEffect, useRef, useState } from 'react'
import { Card } from 'react-bootstrap';
import Slider from 'react-slick';
import watchSaleImg from '../assets/images/watchSaleImg.jpg';
import watch from '../assets/images/spotlighted-watch.jpg';
import Gagets from '../assets/images/fridayGagets.jpg';
import SaleOffer from '../assets/images/fridaySale.avif';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { spotlightedAPI } from '../Services/allAPIs';
import { SERVER_URL } from '../Services/serverUrl';


function SpotlightedItems() {
    const sliderRef = useRef(null);
    const [spotlightedItems, setspotlightedItems] = useState([]);
    const CustomNextArrow = ({ onClick }) => (
        <div className="custom-arrow new-next ms-4" onClick={onClick}>
            <i class="fa-solid fa-arrow-right"></i>
        </div>
    );

    const CustomPrevArrow = ({ onClick }) => (
        <div className="custom-arrow new-prev" onClick={onClick}>
            <i class="fa-solid fa-arrow-left"></i>
        </div>
    );
    const getSpolightedItems = async () => {
        try {
            const result = await spotlightedAPI();
            console.log("API Response:", result);
            if (result.status == 200) {
                setspotlightedItems(result.data.data)
            } else {
                console.error("Failed to fetch deals:", result);
            }
        } catch (error) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getSpolightedItems()
        // const spotlightedDeals = [
        //     {
        //         id: 1,
        //         title: "Shoes orem sit ipsum sit ipsum sit ament ectetur",
        //         price: "$9.99",
        //         image: watchSaleImg,
        //     },
        //     {
        //         id: 2,
        //         title: "BenQ Monitor Lorem sit ipsum sit amet ectetur",
        //         price: "$199.99",
        //         image: Gagets,
        //     },
        //     {
        //         id: 3,
        //         title: "Earbuds  Lorem sit ipsum sit amet ectetur",
        //         price: "$29.99",
        //         image: watch,
        //     },
        //     {
        //         id: 4,
        //         title: "Bluetooth Speaker Lorem sit ipsum amet ectetur",
        //         price: "$49.99",
        //         image: SaleOffer,
        //     },
        //     {
        //         id: 5,
        //         title: "Smart Watch Lorem sit ipsum sit amet ectetur",
        //         price: "$9.99",
        //         image: Gagets,
        //     },
        //     {
        //         id: 6,
        //         title: "BenQ Monitor Lorem sit ipsum sit amet ectetur",
        //         price: "$199.99",
        //         image: watch,
        //     },
        //     {
        //         id: 7,
        //         title: "Earbuds Lorem sit ipsum sit amet ectetur",
        //         price: "$29.99",
        //         image: SaleOffer,
        //     },
        //     {
        //         id: 8,
        //         title: "Bluetooth Speaker Lorem sit ipsum sit amet ectetur",
        //         price: "$49.99",
        //         image: Gagets,
        //     },
        // ];
        // setspotlightedItems(spotlightedDeals);
    }, []);


    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,

    };

    return (
        <>
            <Slider ref={sliderRef} {...settings}>
                {spotlightedItems.map((item, index) => {
                    return (
                        <div key={index}>
                            <Card className='cardImg'>
                                <Card.Img className='image' variant="top" src={item?.mainimage?.startsWith('http') ? item.mainimage : `${SERVER_URL}${item.mainimage}`} />
                                <Card.Body className='cardsText'>
                                    <div className="row">
                                        <div className="col-lg-9 bar">
                                            <div className="base-bar"></div>
                                            <div className="base-bar sold-bar"></div>

                                        </div>
                                        <div className="col-lg-3">
                                            <span className='spantext ms-3'>sold: 12/{item.sku.stock}</span>
                                        </div>
                                    </div>
                                    <Card.Text > 
                                        {item.title.length > 50 ? item.title.slice(0, 50) + "..." : item.title}
                                    </Card.Text>
                                    <div className='d-flex '>
                                        <p className='bottomtag-para me-1 '>
                                            {[1, 2, 3, 4, 5].map((i) => {
                                                const rating = item.average_rating || 0;
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
                                        </p>
                                        <p style={{ color: 'rgba(223, 222, 222, 1)' }} className='text-rating ps-2 '>|{item.average_rating}|</p>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-start mt-1'>
                                        <p>₹{item.sku.sales_rate} <del className='actualprice '>₹{item.sku.price}</del></p>
                                        <button className='shoppingcartbtn btn '><i class="fa-solid fa-cart-shopping"></i></button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    )
                })}
            </Slider>
            <div className="arrow-control mb-5">
                <CustomPrevArrow onClick={() => sliderRef.current?.slickPrev()} />
                <CustomNextArrow onClick={() => sliderRef.current?.slickNext()} />
            </div>
        </>
    )
}

export default SpotlightedItems