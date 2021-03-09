import React, { useState, useEffect} from 'react';
import { fetchDailyData } from '../../API';
import { Line, Bar } from 'react-chartjs-2';


const Chart = ({newdata: {confirmed, recovered, deaths}, country}) => {
    const [ dailyData, setDailyData ] = useState({});
    useEffect(()=> {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
    }, []);

    return (
        <>

        </>
    )
}
export default Chart;