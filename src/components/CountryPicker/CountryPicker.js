import React, { useState, useEffect } from 'react';
import { fetchCountries } from '../../API';

const CountryPicker = ({ handleCountryChange }) => {
    const [fetchedCountries, setFetchedCountries] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries());
        }
        fetchAPI();
    }, [setFetchedCountries]);

    return (
        <select className="form-select" aria-label="Default select" onChange={(e) => handleCountryChange(e.target.value)}>
        <option value="">Global</option>
        {fetchedCountries.map((country, i) => <option key={i} value={country[0]}>{country[0]}</option>)}
        </select>
    )
}
export default CountryPicker;

