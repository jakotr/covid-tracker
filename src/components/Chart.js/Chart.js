import React, {useState, useEffect} from 'react';

import {fetchDailyData} from '../../api';
import {Bar, Line, Doughnut, Pie} from 'react-chartjs-2';

import './Chart.css';

export default function Chart({data: {confirmed, recovered, deaths}, country}) {

    

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchedData = async () => {
            setData(await fetchDailyData());
        }
        
        fetchedData();
        
    }, []);

    console.log(country)

    const doughnutChart = (
        confirmed ?
        <Pie 
            data = {{
                labels: [
                    'confirmed',
                    'recovered',
                    'deaths',
                ],
                datasets : [{
                    data: [confirmed.value, recovered.value, deaths.value],
                    backgroundColor: ['#FFF851', '#5BFF62', '#EE3D48'],
                    borderColor: '#000',
                    borderWidth: '1px',
                }],   
            }}
            options = {{
                title: {
                    display: true,
                    text: `Current state in ${country}`
                },
            }}
        /> : null

    )

    return (
        <div className = 'chart'>
            {doughnutChart}
        </div>
    )
}
