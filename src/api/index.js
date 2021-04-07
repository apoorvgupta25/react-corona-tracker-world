import axios from 'axios'   //to make api requests

const url = 'https://covid19.mathdro.id/api';    //url of api

//`${url}/countries/${country.toUpperCase()}`

// asynchronous function for CARDS
// fetchData is called twice with and without country
// when fetchData is called without the country(parameter), - for cards
// country will be undefined and if statement is false and changeableUrl is not changed that is it is default url
// when fetchData is called with country, then the if statement is true and the url is changed according to country(name);
// Eg. https://covid19.mathdro.id/api/countries/India
// And for both the times we get the same data i.e confirmed, recovered, deaths, lastUpdate


export const fetchData = async (country) => {          //we call this function in App.js

    let changeableUrl = url;

    if(country){
        changeableUrl = `${url}/countries/${country.toUpperCase()}`;
    }

    try {
        //destructuring
        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableUrl);

        const modifiedData = {confirmed, recovered, deaths, lastUpdate};

        return modifiedData;

    } catch (e) {
        return e;
    }
}

//Charts
export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`); //to access the second part of url
        //console.log(data);      //to see this console.log(data) we need to call the function in chart.js

        //extracting the important data, data is an array therefore we loop overit and return an object
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }))

        return modifiedData;
    } catch (e) {

    }
}

//Country Picker - country data
export const fetchCountries = async () => {
    try {
        //destructure the data then destructure the country and then map to all the countries to get the map
        const {data: { countries }} = await axios.get(`${url}/countries`);

        // const countryNames = countries.map((country) => country.name);
        // return countryNames;

        return countries.map((country) => country.name);

    } catch (e) {
        return e;
    }
}




/* //see response(checking)
const response = await axios.get(`${url}/countries`);
console.log(response);
*/

/* //destructuring
const {data} = await axios.get(url);
// response.data - can also be used
const modifiedData = {
    confirmed: data.confirmed,
    recovered: data.recovered,
    deaths: data.deaths,
    lastUpdate: data.lastUpdate

}
//1. as we destructure the data we can also destructure properties from the data
//2. if the value and key have same name then we can omit the value
// confirmed: confirmed, is same as confirmed,
*/
