import React, { useEffect, useRef, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import img1 from '../assets/images/camera.png';
import img5 from '../assets/images/smartwatch.png';
import img2 from '../assets/images/monitor.png';
import img3 from '../assets/images/earbuds.png';
import img4 from '../assets/images/speaker.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

function RelatedProducts() {
    const sliderRef = useRef(null);
    const [relatedProduct, setrelatedProduct] = useState([])
    useEffect(() => {
        const RelatedItems = [
            { id: 1, title: "Bluetooth Speaker", price: "$59.99", image: img5, para2: "50% off", para1: "lorem" },
            { id: 2, title: "BenQ Monitor", price: "$199.99", image: img2, para2: "50% off", para1: "lorem " },
            { id: 3, title: "Earbuds", price: "$29.99", image: img3, para2: "50% off", para1: "lorem " },

            { id: 4, title: "BenQ Monitor", price: "$199.99", image: img2, para2: "50% off", para1: "lorem " },
            { id: 5, title: "Smart Watch", price: "$49.99", image: img1, para2: "50% off", para1: "lorem " },
            { id: 6, title: "Bluetooth Speaker", price: "$59.99", image: img4, para2: "50% off", para1: "lorem " },

            { id: 7, title: "Earbuds", price: "$29.99", image: img3, para2: "50% off", para1: "lorem " },
            { id: 8, title: "Bluetooth Speaker", price: "$59.99", image: img4, para2: "50% off", para1: "lorem " },
            { id: 9, title: "Smart Watch", price: "$49.99", image: img1, para2: "50% off", para1: "lorem" },
        ];
        setrelatedProduct(RelatedItems);
    }, [])

    let settings = {
        dots: false,
        infinite: true,
        dots: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <>
            <h4 className='related-products'><span>RELATED PRODUCTS</span></h4>
            <div className="relatedProduct-slider">
                <Slider ref={sliderRef} {...settings} className='mb-5 '>
                    {relatedProduct.map((item, index) => {
                        return (
                            <div key={index} className='cardslider'>
                                <Card className='related-productcard mb-5'>
                                    <Card.Img className='relatedproduct-img' variant="top" src={item.image} />
                                    <Card.Body className='relatedproduct-cardbody text-center '>

                                        <p className='relatedproduct-price fs-5'> {item.price}</p>
                                        <p className='relatedproduct-para1 '> {item.para1}</p>
                                        <p > {item.title}</p>

                                        <p> {item.para2}</p>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </>
    )
}

export default RelatedProducts