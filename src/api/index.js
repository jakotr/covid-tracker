import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let queryUrl = url;

    if(country) {
        queryUrl = `${url}/countries/${country}`;
    }

    try {
        const {data} = await axios.get(queryUrl);

        return data;
    } catch(err) {
        throw Error(err);
    }
}

export const fetchDailyData = async () => {
    try {
        const {data} = await axios.get(`${url}/daily`);

        return data;
    } catch(err) {
        throw Error(err);
    }
}

export const fetchCountryData = async () => {
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`);

        return countries;
    } catch(err) {
        throw Error(err);
    }
}