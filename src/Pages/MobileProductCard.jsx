import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import mobiletabletoneplus from "../assets/images/mobiletablet-oneplus.webp"
import mobiletabletoneplus2 from "../assets/images/mobiletablet-oneplus2.webp"
import mobiletabletoneplus3 from "../assets/images/mobiletablet-oneplus3.webp"
import mobiletabletoppo from "../assets/images/mobiletablet-oppo.png"
import mobiletabletiphone from "../assets/images/mobiletablet-iphone.avif"

function MobileProductCard() {
    const [mobileCategory, setmobileCategory] = useState([])

    useEffect(() => {
        const CategoryItems = [
            {
                id: 1,
                title: "Apple Headphone max",
                price: "$175.00",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletoneplus,
            },
            {
                id: 2,
                title: "Apple Headphone max",
                price: "$175.00",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletoppo,
            },
            {
                id: 3,
                title: "Apple Headphone max",
                price: "$175.00",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletiphone,
            },
            {
                id: 4,
                title: "Apple Headphone max",
                price: "$175.00",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletoneplus3,
            },
            {
                id: 5,
                title: "Apple Headphone max",
                price: "$175.00",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletoneplus2,
            },
            {
                id: 6,
                title: "Apple Headphone max",
                price: "$175.00",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletoneplus3,
            },
            {
                id: 7,
                title: "Apple Headphone max",
                price: "$175.00",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletiphone,
            },
            {
                id: 8,
                title: "Apple Headphone max",
                price: "$175.00",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletoneplus,
            },
            {
                id: 9,
                title: "Apple Headphone max",
                price: "$175.00",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletoneplus3,
            },
            {
                id: 10,
                title: "Apple Headphone max",
                price: "$175.00",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletoneplus2,
            },
            {
                id: 11,
                title: "Apple Headphone max",
                price: "$175.00",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletoppo,
            },
            {
                id: 12,
                title: "Apple Headphone max",
                price: "$175.00",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletiphone,
            },
            {
                id: 13,
                title: "Apple Headphone max",
                price: "$175.00",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletoneplus3,
            }, {
                id: 14,
                title: "Apple Headphone max",
                price: "$175.00",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletoneplus,
            },
            {
                id: 15,
                title: "Apple Headphone max",
                price: "$175.00",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletoneplus2,
            },
            {
                id: 16,
                title: "Apple Headphone max",
                price: "$175.00",
                subTitle: "Lorem ipsum, dolor sit amet cdsatur adipisicing quis odio",
                image: mobiletabletiphone,
            },

        ]
        setmobileCategory(CategoryItems)
    }, [])
    return (
        <>
            <Row id='style-3' className='overflow-content'>
                {mobileCategory.map((item) => {
                    return (
                        <Col xs={12} sm={6} md={5} lg={3} key={item.id}>
                            <Card className='mobiletablet-card'>
                                <div className='image-wishlist'> 
                                    <Card.Img className='mobiletablet-image' variant="top" src={item.image} />
                                    <button className='mobiletablet-wishlist btn '><i class="fa-solid fa-heart"></i></button>
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
                                    <button className='mobiletablet-btn btn btn-outline-dark'><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}

export default MobileProductCard