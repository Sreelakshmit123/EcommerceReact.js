import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import img1 from '../assets/images/watch.png';
import img2 from '../assets/images/monitor.png';
import img3 from '../assets/images/earbuds.png';
import img4 from '../assets/images/speaker.png';
import { popularProductsAPI } from '../Services/allAPIs';
import { SERVER_URL } from '../Services/serverUrl';
function PopularItems() {
    const [popularDeals, setpopularDeals] = useState([])
    const getPopularItems = async () => {
        try {
            const result = await popularProductsAPI();
            console.log("API Response:", result);
            if (result.status == 200) {
                setpopularDeals(result.data.data)
            } else {
                console.error("Failed to fetch deals:", result);
            }
        } catch (error) {
            setError("Something went wrong");
        }
    }
    useEffect(() => {
        getPopularItems()
        //   const popularItems = [
        //         { id: 1, title: "Bluetooth Speaker", price: "$59.99", image: img4 ,offer:"50% off"},
        //         { id: 2, title: "BenQ Monitor", price: "$199.99", image: img2,offer:"50% off" },
        //         { id: 3, title: "Earbuds", price: "$29.99", image: img3,offer:"50% off" },

        //         { id: 4, title: "BenQ Monitor", price: "$199.99", image: img2 },
        //         { id: 5, title: "Smart Watch", price: "$49.99", image: img1 },
        //         { id: 6, title: "Bluetooth Speaker", price: "$59.99", image: img4 },

        //         { id: 7, title: "Earbuds", price: "$29.99", image: img3 },
        //         { id: 8, title: "Bluetooth Speaker", price: "$59.99", image: img4 },
        //         { id: 9, title: "Smart Watch", price: "$49.99", image: img1 },
        //     ];
        //     setpopularDeals(popularItems);
    }, [])

    return (
        <>
            <h3 className='popularItems'>Popular Items</h3>
            <Row>
                {popularDeals.map((item) => {
                    return (
                        <Col xs={12} sm={7} md={5} lg={4} key={item.id} className="mb-4">
                            <Card className="popularItemsCard text-center">
                                <div className='offer-bar'>{item?.sku?.discount}%off</div>
                                <Card.Img
                                    variant="top"
                                    src={item?.mainimage?.startsWith('http') ? item.mainimage : `${SERVER_URL}${item.mainimage}`}
                                    style={{ height: '150px', objectFit: 'contain' }}
                                />
                                <Card.Body>

                                    <div className="d-flex justify-content-between ">
                                        <p className='popularitems-text'>{item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title}</p>
                                        <p className='popularitems-text text-danger'>₹{item?.sku?.sales_rate ?? item.price}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className='popularitems-text'>Shop</p>
                                        <p className='popularitems-text'>{item.pcode}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className='popularitems-text'>Review</p>
                                        <p className='bottomtag-para'>
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
                                    </div>


                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}

export default PopularItems