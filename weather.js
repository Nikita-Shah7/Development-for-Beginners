// 1. API Call :: Direct GeoCoding
//      Direct geocoding allows to get geographical coordinates (lat, lon)
//      by using name of the location (city name or area name). 
// http://api.openweathermap.org/geo/1.0/direct?q={city_name},{state_code},{country_code}&limit={limit}&appid={API_key}

// 2. API Call :: Reverse GeoCoding
//      Reverse geocoding allows to get city_name, state_name and country_code 
//      from geographical coordinates (lat, lon).
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

// 3. API Call :: From ZipCode and CountryCode
// http://api.openweathermap.org/geo/1.0/zip?zip={zip_code},{country_code}&appid={API_key}


const myApiKey = "<YOUR_API_KEY>";

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const getDate = (time) => {
    let year = time.getFullYear();
    let month = ('0' + (time.getMonth() + 1)).slice(-2);  // Months are zero based. Add leading 0.
    let date = ('0' + time.getDate()).slice(-2);         // Add leading 0.
    let day = days[time.getDay()];
    let hr = time.getHours();
    let min = ('0' + time.getMinutes()).slice(-2);    // Add leading 0.
    let ampm = 'AM';

    if (hr > 12) {
        hr = hr - 12;
        ampm = 'PM';
    } else if (hr === 12) {
        hr = 12;
        ampm = 'PM';
    } else if (hr == 0) {
        hr = 12;
    }

    time = date + '-' + month + '-' + year + ', ' + day + ' ' + hr + ':' + min + ' ' + ampm;
    return time;
}

// get current TimeStamp from UNIX TimeStamp
function convertTimestamp(timestamp) {
    var date = new Date(timestamp * 1000); // Convert the passed timestamp to milliseconds
    return getDate(date);
}

let today = new Date();
console.log("\nCurrent TimeStamp::", getDate(today),"\n");


const getWeather = async (lat,lon) => {
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myApiKey}`);
    const data = await api_call.json();
    console.log("Weather:", data.weather[0].main);
    console.log("Temperature(°C): ", (data.main.temp - 273.15).toFixed(3));
    console.log("Temperature(°F): ", ((data.main.temp - 273.15) * 9 / 5 + 32).toFixed(3));
    console.log("Humidity: ", data.main.humidity, "%");
    console.log("Wind Speed:", data.wind.speed, "m/s");
    console.log("Sunrise:", convertTimestamp(data.sys.sunrise));
    console.log("Sunset:", convertTimestamp(data.sys.sunset));
    console.log("\n***THANK YOU***\n");
}

// Ahmedabad, India
let lat = 23.03386;
let lon = 72.5850;

const reverseGeocoding = async (lat, lon) => {
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myApiKey}`);
    const data = await api_call.json();
    // console.log(data);
    console.log("Latitiude: ", data.coord.lat);
    console.log("Longitude: ", data.coord.lon);
    if (data.name) console.log("City: ", data.name);
    else console.log("City: \"Not Available\"");
    if (data.state) console.log("State: ", data.state);
    else console.log("State: \"Not Available\"");
    if (data.sys.country) console.log("Country: ", data.sys.country);
    else console.log("Country: \"Not Available\"");
    getWeather(data.coord.lat,data.coord.lon);
}

// reverseGeocoding(lat, lon);

//  International Organization for Standardization ISO 3166 country codes 
// i.e. International Standard for Country Codes
const city = "Mumbai";
const state = "";
const country = "IN";
const directGeocoding = async (city, state, country) => {
    const api_call = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=${myApiKey}`)
    const data = await api_call.json();
    // console.log(data);
    console.log("Latitiude: ", data[0].lat);
    console.log("Longitude: ", data[0].lon);
    if(data[0].name) console.log("City: ", data[0].name);
    else console.log("City: \"Not Available\"");
    if (data[0].state) console.log("State: ", data[0].state);
    else console.log("State: \"Not Available\"");
    if (data[0].country) console.log("Country: ", data[0].country);
    else console.log("Country: \"Not Available\"");
    getWeather(data[0].lat,data[0].lon);
}

// directGeocoding(city,state,country);

const zip = "90210";
const fromZipCode = async (zip) => {
    const api_call = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${myApiKey}`);
    const data = await api_call.json();
    // console.log(data);
    console.log("Latitiude: ", data.lat);
    console.log("Longitude: ", data.lon);
    if (data.name) console.log("City: ", data.name);
    else console.log("City: \"Not Available\"");
    if (data.state) console.log("State: ", data.state);
    else console.log("State: \"Not Available\"");
    if (data.country) console.log("Country: ", data.country);
    else console.log("Country: \"Not Available\"");
    console.log("Zipcode:",zip);
    getWeather(data.lat,data.lon);
}

// fromZipCode(zip);

// console.log("*****WEATHER FORECASTING MENU  DRIVEN*****");
// console.log("1. Weather Forecasting of particular city.");
// console.log("2. Weather Forecasting with geoLocation.");
// console.log("3. Weather Forecasting with Postal Code.");
// console.log("0. Quit");