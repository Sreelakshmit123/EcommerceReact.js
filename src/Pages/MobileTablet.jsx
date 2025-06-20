import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import MobileProductCard from './MobileProductCard'
import MobileSliderFilter from './MobileSliderFilter'
import FavoriteBrands from './FavoriteBrands'
import RelatedProducts from './RelatedProducts'
function MobileTablet() {
    
    return (
        <>
            <div className='container-fluid' id='Container'>
                <Header />
                {/* side categories || side bar*/}
                <div className="row mobile-tablet">
                    <div className="sidebar-categories col-lg-2">
                        <MobileSliderFilter/>
                    </div>
                    <div className="col-lg-10">
                      <MobileProductCard/>
                    </div>
                </div>
                <FavoriteBrands/>
                <RelatedProducts/>
            </div>
            <Footer/>
        </>
    )
}

export default MobileTablet