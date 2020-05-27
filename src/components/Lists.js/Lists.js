import React from 'react';

import './Lists.css';

export default function Lists({data: {confirmed, recovered, deaths, lastUpdate}}) {

    if(!lastUpdate) {
        return 'loading...';
    }

    return (
        <div className = 'lists'>
            <div className="lists__item byellow">
                <h3>Confirmed</h3>
                <h2>{confirmed.value} </h2>
                <h3>Active cases of COVID-19</h3>
                <p>Last Update: {new Date(lastUpdate).toDateString()}. </p>
            </div>
            <div className="lists__item bgreen">
                <h3>Recovered</h3>
                <h2>{recovered.value} </h2>
                <h3>Recovered cases of COVID-19</h3>
                <p>Last Update: {new Date(lastUpdate).toDateString()}. </p>
            </div>
            <div className="lists__item bred">
                <h3>Deaths</h3>
                <h2>{deaths.value} </h2>
                <h3>People who died due to COVID-19</h3>
                <p>Last Update: {new Date(lastUpdate).toDateString()}. </p>
            </div>
        </div>
    )
}
