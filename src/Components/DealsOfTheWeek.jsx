import React, { useEffect, useRef, useState } from 'react'
import { Card } from 'react-bootstrap';
import Slider from 'react-slick';
import watchImg from '../assets/images/watch.png';
import monitorImg from '../assets/images/monitor.png';
import speakerImg from '../assets/images/speaker.png';
import earbudsImg from '../assets/images/earbuds.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { highlightDealsAPI } from '../Services/allAPIs';
import { SERVER_URL } from '../Services/serverUrl';


function DealsOfTheWeek() {
  const sliderRef = useRef(null);
  const [deal, setWeekDeal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const getHighlightedDeals = async () => {
    try {
      const result = await highlightDealsAPI();
      console.log("API Response:", result);
      if (result.status == 200) {
        setWeekDeal(result.data.data)
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
    getHighlightedDeals()
    // const WeekDeal = [
    //   {
    //     id: 1,
    //     title: "Smart Watch Lorem sit lorem ectetur",
    //     price: "$9.99",
    //     image: watchImg,
    //   },
    //   {
    //     id: 2,
    //     title: "BenQ Monitor Lorem sit lorem ectetur",
    //     price: "$199.99",
    //     image: monitorImg,
    //   },
    //   {
    //     id: 3,
    //     title: "Earbuds  Lorem sit lorem ectetur",
    //     price: "$29.99",
    //     image: earbudsImg,
    //   },
    //   {
    //     id: 4,
    //     title: "Bluetooth Speaker lorem ectetur",
    //     price: "$49.99",
    //     image: speakerImg,
    //   },
    //   {
    //     id: 5,
    //     title: "Smart Watch Lorem sit lorem ectetur",
    //     price: "$9.99",
    //     image: watchImg,
    //   },
    //   {
    //     id: 6,
    //     title: "BenQ Monitor Lorem sit lorem ectetur",
    //     price: "$199.99",
    //     image: monitorImg,
    //   },
    //   {
    //     id: 7,
    //     title: "Earbuds Lorem sit loremectetur",
    //     price: "$29.99",
    //     image: earbudsImg,
    //   },
    //   {
    //     id: 8,
    //     title: "Bluetooth Speaker lorem ectetur",
    //     price: "$49.99",
    //     image: speakerImg,
    //   },
    // ];
    // setWeekDeal(WeekDeal);
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
        {loading ? (
          <div className='text-center mb-4 fs-5 text-danger'><b>Loading...Please wait</b></div>
        ) : error ? (
          <div className='text-center mb-4 fs-5 text-danger'><b>{error}</b></div>
        ) : (
          deal.map((item, index) => {
            return (
              <div key={index}>
                <Card className='cardcss'>
                  <Card.Img className='imgbackground' variant="top" src={item?.mainimage?.startsWith('http') ? item.mainimage : `${SERVER_URL}${item.mainimage}`} alt='image not working' />

                  <Card.Body className='cardbody'>
                    <Card.Text >
                      {item.title}
                    </Card.Text>
                    <div className='d-flex'>
                      <p className='bottomtag-para me-1'>
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
                      <p style={{color:'rgba(223, 222, 222, 1)'}} className='text-rating ps-2 '>|{item.average_rating}|</p>
                    </div>
                    <div className='d-flex mt-1 justify-content-between align-items-start'>
                      <p className='mt-1'>₹{item?.sku?.sales_rate ?? item.price}</p>
                      <button className='shoppingcartbtn btn '><i class="fa-solid fa-cart-shopping"></i></button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            )
          }))
        }
      </Slider>
      <div className="arrow-controls">
        <CustomPrevArrow onClick={() => sliderRef.current?.slickPrev()} />
        <CustomNextArrow onClick={() => sliderRef.current?.slickNext()} />
      </div>
    </>
  )
}

export default DealsOfTheWeek