import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PriceFilter from './PriceFilter'
import { filterPriceListAPI, HomeListAPI } from '../Services/allAPIs'

function MobileSliderFilter({ selectedCategory, selectedSubcategory, onApplyFilter }) {

    const [values, setValues] = useState([0, 50000])
    const locations = ['Jagarta', 'Yogyakarta', 'Bandung', 'Semarang', 'Sarabaya'];
    const [checkedLocations, setCheckedLocations] = useState({});
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [homeList, setHomeList] = useState([]);

    const handleCheckboxChange = (location) => {
        setCheckedLocations((prev) => ({
            ...prev,
            [location]: !prev[location],
        }));
    }

    const toggleCategory = (categoryId) => {
        setExpandedCategory(prev => prev === categoryId ? null : categoryId);
    };

    const handleSubmitFilter = () => {
        const selectedLocations = Object.keys(checkedLocations).filter(loc => checkedLocations[loc]);
        onApplyFilter(values, selectedLocations);
    }

    const handleResetFilter = () => {
        const resetValues = [0, 50000];
        setCheckedLocations({});
        setValues(resetValues);
        onApplyFilter(resetValues, []);
    }
    // price filter
    const getPriceList = async () => {
        try {
            const response = await filterPriceListAPI();
            if (response.status === 200) {
                const data = response.data;
                const min = parseInt(data.min_price);
                const max = parseInt(data.max_price);

                setValues([min, max]);
            }
        } catch (err) {
            console.log("Error fetching price range", err);
        }
    };

    useEffect(() => {
        getPriceList()
        const HomeListCategories = async () => {
            try {
                const res = await HomeListAPI();
                if (res.status === 200) {
                    setHomeList(res.data.main_categories || []);
                }
            } catch (err) {
                console.log("Error fetching categories", err);
            }
        };
        HomeListCategories();
    }, []);


    return (
        <>
            <p className='fw-bolder mb-4'>All Categories</p>
            <div className='All-categories d-block' id='style-1'>
                {homeList.map(cat => (
                    <div key={cat.id} className="mb-2">
                        <div
                            onClick={() => toggleCategory(cat.id)}
                            style={{ cursor: 'pointer' }}
                            className={`category-link d-flex justify-content-between  align-items-center ${selectedCategory == cat.id ? 'selected' : ''}`}
                        >
                            <span>
                                {cat.name}
                            </span>
                            <i className={`fa-solid me-3 ${expandedCategory === cat.id ? 'fa-chevron-up' : 'fa-chevron-down'}`} />
                        </div>

                        {/* Show subcategories only when expanded */}
                        {expandedCategory === cat.id && cat.subcategories?.length > 0 && (
                            <div className='ps-3 mt-1'>
                                {cat.subcategories.map(sub => (
                                    <div key={sub.id} className="mb-1">
                                        <Link 
                                            to={`/mobiletablet?category=${cat.id}&subcategory=${sub.id}`}
                                            className={`subcategory-link ${selectedSubcategory == sub.id ? 'selected' : ''}`}
                                        >
                                            {sub.name}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

            </div>
            <p className='horizontal-line0' />
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header className='filterHead-text'>Filter by Price</Accordion.Header>
                    <Accordion.Body>
                        <PriceFilter values={values} setValues={setValues} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <p className='horizontal-line1 mt-4' />

            <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header className='filterHead-text mb-3'>Filter by Location</Accordion.Header>
                    <Accordion.Body>
                        <div className='filter-input'>
                            {locations.map((location) => (
                                <div className='filter-input pb-3' key={location}>
                                    <input className='checkbox-filter' type="checkbox" checked={!!checkedLocations[location]}
                                        onChange={() => handleCheckboxChange(location)}
                                    />
                                    <span className='ms-3' style={{ color: checkedLocations[location] ? ' rgb(136, 60, 249)' : 'black' }}>
                                        {location}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <p className='horizontal-line2' />
            <Accordion alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Filter by Rating</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do

                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Accordion className='mt-4'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Filter by Rating</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do

                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Accordion className='mt-4' >
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Filter by Rating</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do

                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Accordion className='mt-4'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Filter by Rating</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className='filter-button-div'>
                <button className='filter-button btn' onClick={handleSubmitFilter}>Filter</button>
            </div>
            <div className='filter-button-div'>
                <button className='reset-button btn mt-3' onClick={handleResetFilter}>Reset Filter</button>
            </div>
        </>
    )
}

export default MobileSliderFilter