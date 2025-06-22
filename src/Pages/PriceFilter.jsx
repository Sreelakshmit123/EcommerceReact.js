import React from 'react'

function PriceFilter() {

    return (
        <>
            <div className='pt-4'>
                <div className='slider'>
                    <div className="progress"></div>
                </div>
                <div class="range-input">
                    <input type="range" name="" id="" className='thumb range-left' min={100} max={10000} />
                    <input type="range" name="" id="" className='thumb range-right' min={100} max={10000} />
                </div>

                <div className='d-flex justify-content-between pt-4 mt-2'>
                    <select className='priceSelector' id="pricefilter" name="price">
                        <option value="100">$100</option>
                        <option value="100">$500</option>
                        <option value="100">$1000</option>
                        <option value="100">$1500</option>
                        <option value="saab">$2000</option>
                        <option value="fiat">$5000</option>
                        <option value="audi">$100000</option>
                    </select>
                    <select className='priceSelector' id="pricefilter" name="price">
                        <option value="100">$100</option>
                        <option value="100">$500</option>
                        <option value="100">$1000</option>
                        <option value="100">$1500</option>
                        <option value="saab">$2000</option>
                        <option value="fiat">$5000</option>
                        <option value="audi">$100000</option>
                    </select>
                </div>
            </div >
        </>
    )
}

export default PriceFilter