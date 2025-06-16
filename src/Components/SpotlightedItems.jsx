import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Slider from 'react-slick';
import watch from '../assets/images/spotlighted-watch.jpg';
import watchSaleImg from '../assets/images/watchSaleImg.jpg';
import speakerImg from '../assets/images/speaker.png';
import earbudsImg from '../assets/images/earbuds.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function SpotlightedItems() {
        const sliderRef = useRef(null);
        const [deals, setDeals] = useState([]);
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
        useEffect(() => {
            const WeekDeals = [
                {
                    id: 1,
                    title: "Shoes orem sit ipsum sit ipsum sit ament ectetur",
                    price: "$9.99",
                    image: watchSaleImg,
                },
                {
                    id: 2,
                    title: "BenQ Monitor Lorem sit ipsum sit amet ectetur",
                    price: "$199.99",
                    image: watch,
                },
                {
                    id: 3,
                    title: "Earbuds  Lorem sit ipsum sit amet ectetur",
                    price: "$29.99",
                    image: earbudsImg,
                },
                {
                    id: 4,
                    title: "Bluetooth Speaker Lorem sit ipsum amet ectetur",
                    price: "$49.99",
                    image: speakerImg,
                },
                {
                    id: 5,
                    title: "Smart Watch Lorem sit ipsum sit amet ectetur",
                    price: "$9.99",
                    image: watchSaleImg,
                },
                {
                    id: 6,
                    title: "BenQ Monitor Lorem sit ipsum sit amet ectetur",
                    price: "$199.99",
                    image: watch,
                },
                {
                    id: 7,
                    title: "Earbuds Lorem sit ipsum sit amet ectetur",
                    price: "$29.99",
                    image: earbudsImg,
                },
                {
                    id: 8,
                    title: "Bluetooth Speaker Lorem sit ipsum sit amet ectetur",
                    price: "$49.99",
                    image: speakerImg,
                },
            ];
            setDeals(WeekDeals);
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
                {deals.map((item, index) => {
                    return (
                        <div key={index}>
                            <Card className='cardImg'>
                                <Card.Img className='image' variant="top" src={item.image} />
                                <Card.Body className='cardsText'>
                                    <div className="row">
                                        <div className="col-lg-8 bar">
                                            <div className="base-bar"></div>
                                            <div className="base-bar calories-bar"></div>

                                        </div>
                                        <div className="col-lg-4 ">
                                            <span className='spantext ms-3'>sold: 12/20</span>
                                        </div>
                                    </div>
                                    <Card.Text >
                                        {item.title}
                                    </Card.Text>
                                    <div className='d-flex '>
                                        <p className='bottomtag-para'><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                        </p>
                                        <p className='ps-2 text-secondary'>|5.0|</p>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-start'>
                                        <p>{item.price}</p>
                                        <button className='shoppingcartbtn btn '><i class="fa-solid fa-cart-shopping"></i></button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    )
                })}
            </Slider>
            <div className="arrow-control">
                <CustomPrevArrow onClick={() => sliderRef.current?.slickPrev()} />
                <CustomNextArrow onClick={() => sliderRef.current?.slickNext()} />
            </div>
    </>
  )
}

export default SpotlightedItems