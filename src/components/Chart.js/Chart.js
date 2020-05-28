import React, {useState, useEffect} from 'react';

import {fetchDailyData} from '../../api';
import {Bar, Line, Doughnut, Pie} from 'react-chartjs-2';

import './Chart.css';

export default function Chart({data: {confirmed, recovered, deaths}, country}) {

    

    const [data, setData] = useState([]);
    const [chart, setChart] = useState('pieChart');

    useEffect(() => {
        const fetchedData = async () => {
            setData(await fetchDailyData());
        }
        
        fetchedData();
        
    }, []);

    

    const handleChange = (e) => {
        setChart(e.target.value);
        console.log(e.target.value)
    }

    const pieChart = (
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
            width = {80}
            height = {60}
            options = {{
                title: {
                    display: true,
                    text: `Current state in ${country ? country : 'the world'}`
                },
            }}
        /> : null

    );
    const dailyChart = (
        data.length ? 
        <Line 
            data = {{
                labels: data.map(({reportDate}) => reportDate),
                datasets: [{
                    data: data.map(({confirmed}) => confirmed.total),
                    label: 'Confirmed',
                    borderColor: '#FFF851',
                    fill: true
                },
                {
                    data: data.map(({deaths}) => deaths.total),
                    label: 'Deaths',
                    borderColor: '#EE3D48',
                    backgroundColor: 'rgba(238, 61, 72, .5)',
                    fill: true
                }]
            }}
            width = {80}
            height = {70}
            options = {{
                title: {
                    display: true,
                    text: `Current state in the world`
                },
            }}
        /> : null
    )

    const barChart = (
        confirmed ? 
        <Bar 
            data = {{
                labels: ['Confirmed', 'Recovered', 'Deaths'],
                datasets: [{
                    label: 'People',
                    backgroundColor: ['rgba(255, 248, 81, .7)', 'rgba(91, 255, 98, .7)', 'rgba(238, 61, 72, .7)'],
                    data: [confirmed.value, recovered.value, deaths.value],
                }]
            }}
            options = {{
                legend: {display: false},
                title: {display: true, text: `Current state in ${country ? country : 'the world'}`}
            }}
        /> : null
    )


    return (
        <div className = 'chart'>
            {chart === 'pieChart' ? pieChart : null}
            {chart === 'dailyChart' ? country ? pieChart : dailyChart : null}
            {chart === 'barChart' ? barChart : null}
            <select onChange={handleChange}>
                <option value='pieChart'>Pie chart</option>
                {country ? null : <option value="dailyChart">Daily data for global</option>}
                <option value="barChart">Bar chart</option>
            </select>
        </div>
    )
}
