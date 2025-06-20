import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Dropdown } from 'react-bootstrap';


const valueCSS = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    gap: "2px",
    paddingTop: "10px",
};

const PriceFilter = ({
    min,
    max,
    trackColor = "#cecece",
    onChange,
    rangeColor = "#ff0303",
    valueStyle = valueCSS,
    width = "100%",
    currencyText = "$",
}) => {

    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);


    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // set the width of the range to decrease from right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        if (minVal != minValRef.current || maxVal != maxValRef.current) {
            onChange({ min: minVal, max: maxVal });
            minValRef.current = minVal;
            maxValRef.current = maxVal;
        }
    }, [minVal, maxVal, onChange]);

    return (

        <div className=' flex items-center justify-center flex-col space-y-14'>
           

            {/* Style the price range slider */}
            <div className="multi-slide-input-container mt-3" style={{ width }}>

                <input
                    type="range"
                    min={min}
                    max={max}
                    value={minVal}
                    onChange={(event) => {
                        const value = Math.min(Number(event.target.value), maxVal - 1);
                        setMinVal(value);
                    }}
                    className="thumb thumb-left"

                />

                <input
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    onChange={(event) => {
                        const value = Math.max(Number(event.target.value), minVal + 1);
                        setMaxVal(value);
                    }}
                    className="thumb thumb-right"

                />

                <div className="slider">
                    <div
                        style={{ backgroundColor: trackColor }}
                        className="track-slider"
                    />

                    <div
                        ref={range}
                        className="range-slider"
                    />

                </div>

            </div>
             <div className='d-flex justify-content-between pt-4'>
                <Dropdown>
                    <Dropdown.Toggle variant="white" id="dropdown-basic">
                        {currencyText} {minVal}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">$1000</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">$5000</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">$30000</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown >
                    <Dropdown.Toggle variant="white" id="dropdown-basic">
                      {currencyText} {maxVal}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">$20000</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">$50000</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">$200000</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

            </div>

        </div>
    )
}

export default PriceFilter