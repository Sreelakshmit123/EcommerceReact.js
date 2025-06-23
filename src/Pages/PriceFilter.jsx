import React, { useState } from 'react'
import { getTrackBackground, Range } from 'react-range';


function PriceFilter({
    min = 0,
    max = 2000,
    step = 100
}) {
    const [values, setValues] = useState([min, max]);


    const handleSelect = (index, e) => {
        const newValue = Number(e.target.value);
        const updatedValues = [...values];
        updatedValues[index] = newValue;

        if (updatedValues[0] > updatedValues[1]) {
            if (index === 0) updatedValues[1] = newValue;
            else updatedValues[0] = newValue;
        }

        setValues(updatedValues);
    };

    const generateOptions = () => {
        const options = [];
        for (let i = min; i <= max; i += step) {
            options.push(i);
        }
        return options;
    };

    const priceOptions = generateOptions();
    return (

        <>

            <div className='pt-4'>
                <Range
                    label="Select your value"
                    step={step}
                    min={min}
                    max={max}
                    values={values}
                    onChange={(values) => setValues(values)}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: "6px",
                                width: "100%",
                                border: '1px soild',
                                borderRadius: "20px",
                                background: getTrackBackground({
                                    values: values,
                                    colors: ["#ccc", "rgb(136, 60, 249)", "#ccc"],
                                    min,
                                    max,

                                })
                            }}
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props }) => (
                        <div
                            {...props}
                            key={props.key}
                            style={{
                                ...props.style,
                                height: "20px",
                                width: "20px",
                                backgroundColor: "rgb(207, 2, 200)",
                                border: '1px soild',
                                borderRadius: '50%',
                                cursor:'pointer'
                            }}
                        />
                    )}
                />

                <div className='d-flex justify-content-between pt-4 mt-2'>

                    <select className='priceSelector' value={values[0]} onChange={(e) => handleSelect(0, e)}>
                        {priceOptions.map((price) => (
                            <option key={price} value={price}>
                                ${price}
                            </option>
                        ))}
                    </select>

                    <select className='priceSelector' value={values[1]} onChange={(e) => handleSelect(1, e)}>
                        {priceOptions.map((price) => (
                            <option key={price} value={price}>
                                ${price}
                            </option>
                        ))}
                    </select>
                </div>
            </div >

        </>
    )
}

export default PriceFilter