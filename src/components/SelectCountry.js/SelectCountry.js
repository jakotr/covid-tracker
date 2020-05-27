import React, {useState, useEffect} from 'react';
import {fetchCountryData} from '../../api';

import './SelectCountry.css';

export default function SelectCountry({handleChange}) {

    const [countryData, setCountryData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setCountryData(await fetchCountryData());
        }
        fetchData();
    }, [setCountryData]);

    return (
        <div className='selectCountry'>
            <select onChange={(e) => handleChange(e.target.value)}>
                <option value="">Global</option>
                {countryData.map((country, idx) => (
                    <option key = {idx} value = {country.name}>{country.name} </option>
                ))}
            </select>
        </div>
    )
}
