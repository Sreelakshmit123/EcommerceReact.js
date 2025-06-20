import React from 'react'
import landingImage from '../assets/images/landingimg-music-headphone.png'
import DealsOfTheWeek from './DealsOfTheWeek';
import DealsOfTheDay from './DealsOfTheDay';
import PopularItems from './PopularItems';
import SpotlightedItems from './SpotlightedItems';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function Home() {
    return (
        <>
            <div className='container-fluid' id='Container'>
                <Header/>
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
                        <img className='landingImg' src={landingImage} alt="" />


                        <div class="tag top-left">Get Up to 30% Off
                            <p className='tag-para'>Lorem ipsum dolor consectetur <br /> adipisicing elit. At iure ectetury <br /> consequatur omnis fugiat eum </p>
                        </div>
                        <div class="tag bottom-right">100K Trusted Reviews
                            <p className='bottomtag-para'>13 reviews</p>
                            <p className='bottomtag-para'><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></p>
                        </div>
                    </div>
                </div>


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
                {/* footer */}

            </div>
            <Footer />
        </>
    )
}

export default Home