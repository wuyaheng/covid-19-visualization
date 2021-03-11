import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchCountryDetail = async (country) => {
    let changeableUrl = url;

    if(country) {
        changeableUrl = `${url}/countries/${country}`
    }
    try {
        const { data: {recovered, confirmed, deaths } } = await axios.get(changeableUrl);

        return {
            recovered,
            confirmed,
            deaths
        }
        
    } catch (error) {
        console.log(error)
    }
}


export const fetchCountries = async () => {
    try {
        const {data: { countries }} = await axios.get(`${url}/countries`);
        return countries.map((country) => [country.name, country.iso3]);
    } catch (error) {
        console.log(error)
    }
}


