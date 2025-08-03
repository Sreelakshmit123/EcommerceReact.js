import React, { useEffect, useRef, useState } from 'react'
import { Card } from 'react-bootstrap';
import Slider from 'react-slick';
import watchImg from '../assets/images/watch.png';
import monitorImg from '../assets/images/monitor.png';
import speakerImg from '../assets/images/speaker.png';
import earbudsImg from '../assets/images/earbuds.png';
import { ToastContainer, toast } from 'react-toastify';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { addToCartAPI, highlightDealsAPI } from '../Services/allAPIs';
import { SERVER_URL } from '../Services/serverUrl';
import { Link } from 'react-router-dom';


function DealsOfTheWeek() {
  const sliderRef = useRef(null);
  const [deal, setWeekDeal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('cart'));
      return Array.isArray(stored) ? stored : [];
    } catch (e) {
      return [];
    }
  });
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
    getHighlightedDeals();
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




  // add to cart the produts
  const handleAddtocartClick = async (product) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      const reqHeader = {
        'Authorization': `Bearer ${token}`,
      }

      const formData = new FormData();
      formData.append('product_id', product.id);
      formData.append('skuid', product.sku.id);
      formData.append('quantity', 1);

      const alreadyInCart = cart.some((item) => {
        const cartProductId = item?.product?.id || item?.id;
        return cartProductId === product.id;
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
            sku: product.sku,
            quantity: 1,
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
                  <Link to={`/product/${item.id}/${item.sku.id}`}>
                    <Card.Img className='imgbackground' variant="top" src={item?.mainimage?.startsWith('http') ? item.mainimage : `${SERVER_URL}${item.mainimage}`} alt='image not working' />
                  </Link>
                  <Card.Body className='cardbody'>
                    <Card.Text >

                      {item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title}
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
                      <p style={{ color: 'rgba(223, 222, 222, 1)' }} className='text-rating ps-2 '>|{item.average_rating}|</p>
                    </div>
                    <div className='d-flex mt-1 justify-content-between align-items-start'>
                      <p className='mt-1'>₹{item?.sku?.sales_rate ?? item.price}</p>
                      <button onClick={() => handleAddtocartClick(item)} className='shoppingcartbtn btn '><i class="fa-solid fa-cart-shopping"></i></button>
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
      <ToastContainer />
    </>
  )
}

export default DealsOfTheWeek