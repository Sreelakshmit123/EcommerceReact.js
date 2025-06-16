import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Slider from 'react-slick';
import watchImg from '../assets/images/watch.png';
import monitorImg from '../assets/images/monitor.png';
import speakerImg from '../assets/images/speaker.png';
import earbudsImg from '../assets/images/earbuds.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function DealsOfTheWeek() {
  const sliderRef = useRef(null);
  const [deals, setWeekDeals] = useState([]);
  const CustomNextArrow = ({ onClick }) => (
    <div className="custom-arrow new-next" onClick={onClick}>
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
        title: "Smart Watch Lorem sit ipsum sit amet ectetur",
        price: "$9.99",
        image: watchImg,
      },
      {
        id: 2,
        title: "BenQ Monitor Lorem sit ipsum sit amet ectetur",
        price: "$199.99",
        image: monitorImg,
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
        image: watchImg,
      },
      {
        id: 6,
        title: "BenQ Monitor Lorem sit ipsum sit amet ectetur",
        price: "$199.99",
        image: monitorImg,
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
    setWeekDeals(WeekDeals);
  }, []);


  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
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
      <Slider ref={sliderRef} {...settings}>
        {deals.map((item, index) => {
          return (
            <div key={index}>
              <Card className='cardcss' style={{ width: "15.5 rem" }}>
                <Card.Img className='imgbackground' variant="top" src={item.image} />
                <Card.Body className='cardbody'>
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
      <div className="arrow-controls">
        <CustomPrevArrow onClick={() => sliderRef.current?.slickPrev()} />
        <CustomNextArrow onClick={() => sliderRef.current?.slickNext()} />
      </div>
    </>
  )
}

export default DealsOfTheWeek