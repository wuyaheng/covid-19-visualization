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
        <select class="form-select" aria-label="Default select" onChange={(e) => handleCountryChange(e.target.value)}>
        <option selected value="Global">Global</option>
        {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
        </select>
    )
}
export default CountryPicker;

