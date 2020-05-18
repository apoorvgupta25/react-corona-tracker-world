import React, {useState, useEffect} from 'react';
import {Line, Bar} from 'react-chartjs-2';

import {fetchDailyData} from '../../api';
import styles from './Charts.module.css';

//functional component (callback wala) we are using hooks
const Charts = ({data: {confirmed, recovered, deaths}, country}) => {
    const [dailyData, setDailyData] = useState({});
    /* for class based component
    state = {
        dailyData: {}
    }
    */

    // async function is inside the useEffect, because useEffect cannot be async
    useEffect(() => {
        const fetchAPI = async () => {
            // const dailyData = await fetchDailyData ();
            setDailyData(await fetchDailyData ());
        }

        fetchAPI();     //calling fetchAPI
    }, []);             //empty array makes the useEffect works as componentDidMount, so it happens once

    //using dailyData in line Chart - ternary statement
    const lineChart = (
        dailyData[0]    //length 0 means false, or any other number means true. Initially there is no data(check)
        ? (
            <Line
                 data={{
                     labels: dailyData.map(({ date }) => date),     //destructure date and return date
                     datasets: [{
                         data: dailyData.map(({ confirmed }) => confirmed),
                         label: 'Infected',
                         borderColor: '#3333ff',
                         fill: true
                     }, {
                         data: dailyData.map(({ deaths }) => deaths),
                         label: 'Deaths',
                         borderColor: 'red',
                         backgroundColor: 'rgba(255, 0, 0, 0.5)',
                         fill: true
                     }]
                 }}
             />) : null
    );

    //Bar for country
    const barChart = (
        confirmed          //checking null
            ? (
                <Bar
                    data={{
                      labels: ['Confirmed', 'Active', 'Recovered','Deaths'],
                      datasets: [
                        {
                          label: 'People',
                          backgroundColor: ['rgba(255, 0, 0, 0.6)','rgba(0, 0, 255, 0.6)', 'rgba(0, 255, 0, 0.6)', ,'rgba(0, 0, 0, 0.6)'],
                          data: [confirmed.value, (confirmed.value-(recovered.value+deaths.value)), recovered.value, deaths.value],       //data coming from props
                        },
                      ],
                    }}
                    options={{
                        legend: { display: false},
                        title: { display: true, text:`Current state in ${country}`},

                    }}


                />
            ) : null

    )

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Charts;

//ternary statement
// dailyData[0] ? (<Line data={{ labels: ''; datasets: [{}, {}],}} />) : null
