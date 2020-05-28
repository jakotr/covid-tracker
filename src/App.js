import React, {useState, useEffect} from 'react';

import {fetchData, fetchDailyData} from './api';
import Lists from './components/Lists.js/Lists';
import Chart from './components/Chart.js/Chart';
import SelectCountry from './components/SelectCountry.js/SelectCountry';

import './App.css';

function App() {

  const [data, setData] = useState({});
  const [country, setCountry] = useState('');

  useEffect(() => {

    const fetchedData = async () => {
      setData(await fetchData());
    }

    fetchedData();

  }, []);

  const handleChange = async (country) => {
    setData(await fetchData(country));
    setCountry(country);
  }


  return (
    <div className="App">
      <h1 className='App__title'>COVID-19 TRACKER</h1>
      <div className="section">
        <SelectCountry handleChange = {handleChange} />
        <Chart data = {data} country = {country} />
        <Lists data = {data} />
      </div>
      
    </div>
  );
}

export default App;
