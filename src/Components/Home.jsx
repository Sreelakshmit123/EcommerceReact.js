import React, { useEffect, useRef, useState } from 'react'
import landingImage from '../assets/images/landingImg.png'
import DealsOfTheWeek from './DealsOfTheWeek'
import DealsOfTheDay from './DealsOfTheDay'
import PopularItems from './PopularItems'
import SpotlightedItems from './SpotlightedItems'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import Slider from 'react-slick'
import { footerBannersAPI } from '../Services/allAPIs'
import { Card } from 'react-bootstrap'
import { SERVER_URL } from '../Services/serverUrl'
function Home() {
    const sliderRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [footerBanners, setFooterBanners] = useState([]);
    const CustomNextArrow = ({ onClick }) => (
        <div className="custom-arrows-footerBanner new-next ms-3" onClick={onClick}>
            <i class="fa-solid fa-angle-right"></i>
        </div>
    );

    const CustomPrevArrow = ({ onClick }) => (
        <div className="custom-arrows-footerBanner new-prev" onClick={onClick}>
            <i class="fa-solid fa-angle-left"></i>
        </div>
    );
    const handleFooterBanners = async () => {
        try {
            const result = await footerBannersAPI();
            console.log("API Response:", result);
            if (result.status == 200) {
                setFooterBanners(result.data.footer_banners)
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
        handleFooterBanners()
    }, [])

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
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
            }
        ]
    };
    return (

        <>
            <div className='container-fluid' id='Container'>
                <Header />
                {/* landing page */}

                <div className="row mt-3">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <h1 className='landingHeading1'>All <span className='spanHeading1'>Modern Style</span>
                            <br />
                            Product Available <br />
                            Here.</h1>
                        <p className='landingparagraph'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br /> Magnam, cumque delectus placeat aut nulla con <br /> rem! Obcaecati<br /></p>
                        <Link to={"/shopNow"}><button className='shopnow-btn btn'>Shop Now</button></Link>
                    </div>
                    <div className="circle-container col-lg-6 col-md-6 col-sm-12 position-relative d-flex justify-content-center">
                        <div className='circle-gradient'></div>
                        <img className='landingImg' src={landingImage} alt="landingImage" />


                        <div class="tag top-left">Get Up to 30% Off
                            <p className='tag-para'>Lorem ipsum dolor consectetur <br /> adipisicing elit. At iure ectetury <br /> consequatur omnis fugiat eum </p>
                        </div>
                        <div class="tag bottom-right">100K Trusted Reviews
                            <p className='bottomtag-para'>13 reviews</p>
                            <p className='bottomtag-para'><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></p>
                        </div>
                    </div>
                </div>

                {/* highlighted deals */}

                <h1 className='Deals-of-week'>Highlighted Deals of the Week</h1>
                <div className="row">
                    <div className=" col-lg-8">
                        <DealsOfTheWeek />
                        <PopularItems />
                    </div>
                    <div className="col-lg-4">
                        <h4 className='deal-of-day'>DEAL OF THE DAY</h4>
                        <DealsOfTheDay />
                        <h4 className='deal-of-day mt-5'>SPOTLIGHTED ITEMS</h4>
                        <SpotlightedItems />
                    </div>
                </div>
                <div className='mb-4'>
                    <div className='d-flex justify-content-between'>
                        <h4 className='footerBanners fw-bolder'>Real People, Real Savings</h4>
                        <div className="control-arrow">
                            <CustomPrevArrow onClick={() => sliderRef.current?.slickPrev()} />
                            <CustomNextArrow onClick={() => sliderRef.current?.slickNext()} />
                        </div>
                    </div>
                    <p className="footerLineWrapper">
                        <p className="footerLine"></p>
                    </p>

                    {/* cards */}
                    <Slider ref={sliderRef} {...settings}>
                        {loading ? (
                            <div className='text-center mb-4 fs-5 text-danger'><b>Loading...Please wait</b></div>
                        ) : error ? (
                            <div className='text-center mb-4 fs-5 text-danger'><b>{error}</b></div>
                        ) : (
                            footerBanners.map((item, index) => {
                                return (
                                    <div key={index} className='d-flex justify-content-between'>
                                        <Card className='cardImg d-flex justify-content-between'>
                                            <Card.Img className='w-100 h-100 rounded image' variant="top" src={item?.icon_url?.startsWith('http') ? item.icon_url : `${SERVER_URL}${item.icon_url}`} />
                                            <Card.Body className='cardsText'>
                                                <button className="footerBanner-btn d-flex justify-content-between btn btn-sm  w-100 ps-3 pe-3 p-2">Up to 50% <i class="fa-solid fa-arrow-right mt-1"></i></button>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            }))
                        }
                    </Slider>
                </div>
            </div>
            {/* footer */}

            <Footer />
        </>
    )
}

export default Home