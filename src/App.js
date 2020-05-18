import React from 'react';
// import PropTypes from 'prop-types'

/*components
import Cards from './components/Cards/Cards'
import Chart from './components/Chart/Chart'
import CountryPicker from './components/CountryPicker/CountryPicker'
//importing from components/index.js where we are collection all the files , there is no need to specify index.js it is understood by react
*/
import { Cards, Charts, CountryPicker} from './components'
import styles from './App.module.css'
// import coronaImages from './image/image.png';
import {fetchData} from './api';

// we set that country in the state of the App because the App is parent component of Card, CountryPicker and Chart
// And we want to change the data of all the three card, countryPicker and Chart when the country is changed
// Now we can pass these to cards, charts to change their data

// <div className={styles.container}>   ensures there is not interference with anyother css file
class App extends React.Component {

    //constructor created automaticaly in background
    state = {
        data: {},
        country: '',
    }

    //fetching data
    async componentDidMount() {
        const fetchedData = await fetchData();      //request to fetch data
        // console.log(fetchedData);                //overall details

        this.setState({data: fetchedData});
    }

    //method to change the state of the country
    handleCountryChange = async (country) => {
        console.log(country);    //country name
        //fetch the data for the country
        const fetchedData = await fetchData(country);
        console.log(fetchedData);    //country details

        //set the state
        this.setState({data: fetchedData, country: country});

    }

    render () {
        const {data, country} = this.state;      //destructuring
        // passing data as props in the cards components, see Cards.js
        // passing method as prop to CountryPicker
        // <img className={styles.image} src={coronaImages} alt="COVID-19" height="65px"/>
        return (
            <div className={styles.container}>
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Charts data={data} country={country}/>
            </div>
        )
    }
}

export default App;
