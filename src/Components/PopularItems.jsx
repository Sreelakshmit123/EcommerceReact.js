import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import img1 from '../assets/images/watch.png';
import img2 from '../assets/images/monitor.png';
import img3 from '../assets/images/earbuds.png';
import img4 from '../assets/images/speaker.png';
function PopularItems() {
    const [ popularDeals , setpopularDeals ] = useState([])
    useEffect(()=>{
  const popularItems = [
        { id: 1, title: "Bluetooth Speaker", price: "$59.99", image: img4 ,offer:"50% off"},
        { id: 2, title: "BenQ Monitor", price: "$199.99", image: img2,offer:"50% off" },
        { id: 3, title: "Earbuds", price: "$29.99", image: img3,offer:"50% off" },

        { id: 4, title: "BenQ Monitor", price: "$199.99", image: img2 },
        { id: 5, title: "Smart Watch", price: "$49.99", image: img1 },
        { id: 6, title: "Bluetooth Speaker", price: "$59.99", image: img4 },

        { id: 7, title: "Earbuds", price: "$29.99", image: img3 },
        { id: 8, title: "Bluetooth Speaker", price: "$59.99", image: img4 },
        { id: 9, title: "Smart Watch", price: "$49.99", image: img1 },
    ];
    setpopularDeals(popularItems);
    },[])
  
    return (
        <>
            <h3 className='popularItems'>Popular Items</h3>
            <Row>
                {popularDeals.map((item) => {
                    return(
                        <Col xs={12} sm={7} md={5} lg={4} key={item.id} className="mb-4">
                            <Card className="popularItemsCard h-100 text-center">
                                <div className='offer-bar'>{item.offer}</div>
                                <Card.Img
                                    variant="top"
                                    src={item.image}
                                    style={{ height: '150px', objectFit: 'contain' }}
                                />
                                <Card.Body>
                                    
                                    <div className="d-flex justify-content-between">
                                        <p>{item.title}</p>
                                        <p className='text-danger'>{item.price}</p>
                                    </div>
                                     <div className="d-flex justify-content-between">
                                            <p>Shop</p>
                                            <p>125482</p>
                                    </div>
                                     <div className="d-flex justify-content-between">
                                            <p>Review</p>
                                            <p className='bottomtag-para'><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i> </p>
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