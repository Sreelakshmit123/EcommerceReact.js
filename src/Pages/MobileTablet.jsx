import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import MobileProductCard from './MobileProductCard'
import MobileSliderFilter from './MobileSliderFilter'
import FavoriteBrands from './FavoriteBrands'
import RelatedProducts from './RelatedProducts'
import { useSearchParams } from 'react-router-dom';
function MobileTablet() {
    

    const [filters, setFilters] = useState(null);
    const [searchParams] = useSearchParams();

    const categoryId = searchParams.get("category");
    const subcategoryId = searchParams.get("subcategory");

    const handleApplyFilter = (priceRange, locations) => {
        setFilters({ priceRange, locations });
    };
    return (
        <>
            <div className='container-fluid' id='Container'>
                <Header />
                {/* side categories || side bar*/}
                <div className="row mobile-tablet">
                    <div className="sidebar-categories col-lg-2">
                        <MobileSliderFilter onApplyFilter={handleApplyFilter} 
                         selectedCategory={categoryId}
                        selectedSubcategory={subcategoryId}
                        />
                    </div>
                    <div className="col-lg-10">
                        <MobileProductCard  filters={filters}
                         category={categoryId}
                        subcategory={subcategoryId}
                        />
                    </div>
                </div>
                <FavoriteBrands />
                <RelatedProducts />
            </div>
            <Footer />
        </>
    )
}

export default MobileTablet