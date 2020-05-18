import React, {useState, useEffect} from 'react';
import {NativeSelect, FormControl} from '@material-ui/core';

import {fetchCountries} from '../../api';
import styles from './CountryPicker.module.css';

//functional component (callback wala)
const CountryPicker = ({handleCountryChange}) => {
    //hooks
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries ());
        };

        fetchAPI();
    }, []);
    //to change the values in the list, w/o setFetchedCountries, useEffect will run endlessly, setFetchedCountrieschanges then data is also changed

    //console.log(fetchedCountries);

// onChange={(e) => handleCountryChange(e.target.value) - here we are passing the value of the selected country that country name
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="" >Global</option>
                {fetchedCountries.map((country, i) => <option key={i} value={country}> {country} </option>)}
            </NativeSelect>
        </FormControl>
    );
};

export default CountryPicker;
