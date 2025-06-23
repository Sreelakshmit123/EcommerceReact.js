import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PriceFilter from './PriceFilter'

function MobileSliderFilter() {

    const locations = ['Jagarta', 'Yogyakarta', 'Bandung', 'Semarang', 'Sarabaya'];
    const [checkedLocations, setCheckedLocations] = useState({});

    const handleCheckboxChange = (location) => {
        setCheckedLocations((prev) => ({
            ...prev,
            [location]: !prev[location],
        }));
    }

    const handleSubmitFilter = () =>{
        
    }
    return (
        <>
            <p className='fw-bolder mb-4'>All Categories</p>
            <div className='All-categories d-block' id='style-1'>
                <p><Link to={"/"} className='category-link'>Computer & Laptop <span>(25)</span></Link></p>
                <p><Link to={"/mobiletablet"} className='category-link'>Mobile & Tablet <span>(125)</span></Link></p>
                <p><Link to={"/"} className='category-link'>Camera <span>(150)</span></Link></p>
                <p><Link to={"/"} className='category-link'>Tv & Smart Box <span>(75)</span></Link></p>
                <p><Link to={"/"} className='category-link'>Home Appliance <span>(75)</span></Link></p>
                <p><Link to={"/"} className='category-link'>Smart Watch <span>(45)</span></Link></p>
                <p><Link to={"/"} className='category-link'>Microphone & Audio <span>(55)</span></Link></p>
                <p><Link to={"/"} className='category-link'>Gaming  <span>(45)</span></Link></p>
                <p><Link to={"/"} className='category-link'>Printer <span>(14)</span></Link></p>
                <p><Link to={"/"} className='category-link'>Accessories <span>(32)</span></Link></p>
                <p><Link to={"/"} className='category-link'>More Categories <span>(10)</span></Link></p>
                <p><Link to={"/"} className='category-link'>Computer & Laptop <span>(25)</span></Link></p>
                <p><Link to={"/"} className='category-link'>Computer & Laptop <span>(25)</span></Link></p>
                <p><Link to={"/"} className='category-link'>Computer & Laptop <span>(25)</span></Link></p>
                <p><Link to={"/"} className='category-link'>Computer & Laptop <span>(25)</span></Link></p>
            </div>
            <p className='horizontal-line0' />
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Filter by Price</Accordion.Header>
                    <Accordion.Body>
                        <PriceFilter />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <p className='horizontal-line1' />

            <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Filter by Location</Accordion.Header>
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
                <button onClick={handleSubmitFilter()} className='filter-button btn'>Filter</button>
                </div>
            <p className='filter-EndPara'>Lorem ipsum</p>
        </>
    )
}

export default MobileSliderFilter