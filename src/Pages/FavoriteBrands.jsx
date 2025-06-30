import React, { useEffect, useRef, useState } from 'react'
import { Card } from 'react-bootstrap';
import Slider from 'react-slick';
import favbrand1 from '../assets/images/favbrand1.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function FavoriteBrands() {
  const sliderRef = useRef(null);
  const [favBrands, setfavBrands] = useState([]);
  const CustomNextArrow = ({ onClick }) => (
    <div className="custom-arrows new-next ms-3" onClick={onClick}>
      <i class="fa-solid fa-arrow-right"></i>
    </div>
  );

  const CustomPrevArrow = ({ onClick }) => (
    <div className="custom-arrows new-prev" onClick={onClick}>
      <i class="fa-solid fa-arrow-left"></i>
    </div>
  );
  useEffect(() => {
    const FavBrand = [
      {
        id: 1,
        image:favbrand1,
      },
      {
        id: 2,
        image:favbrand1,
      },
      {
        id: 3,
        image:favbrand1,
      },
      {
        id: 4,
        image:favbrand1,
      },
      {
        id: 5,
        image:favbrand1,
      },
      {
        id: 6,
        image:favbrand1,
      },
      {
        id: 7,
        image:favbrand1,
      },
      {
        id: 8,
        image:favbrand1,
      },
    ];
    setfavBrands(FavBrand);
  }, []);


  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    
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
    <h4 className='favBrandsHead'><span>YOUR FAVORITE BRANDS</span></h4>
      <div className="control-arrow">
        <CustomPrevArrow onClick={() => sliderRef.current?.slickPrev()} />
        <CustomNextArrow onClick={() => sliderRef.current?.slickNext()} />
      </div>
     <div className='fav-slider'>
        <Slider ref={sliderRef} {...settings}>
          {favBrands.map((item, index) => {
            return (
              <div key={index}>
                <Card className='favCard'>
                 <Card.Img className='favbrand1' variant="top" src={item.image} />
                </Card>
              </div>
            )
          })}
        </Slider>
     </div>
    
    </>
  )
}

export default FavoriteBrands