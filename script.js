// Defining constants for the API key and URL
const API_key = "";
const location = document.getElementById("location").value;
const API_url = "";

// Function to fetch data from url
async function getWeather() {
    try {
        const response = await fetch(API_url);
        const data = response.json;

        /// Display an error for location not found
        if (data.cod == 404) {
            document.getElementById('alert').innerHTML = "Error: Location Not Found!";
            document.getElementById('error').classList.remove('hidden');

        }
        else {
            // Display retrieved weather data in the webpage

            // Quick look content
            document.getElementById('quick') = data.main.temp + ' - ' + data.weather[0].description;
            // document.getElementById('icon') = data.

            // Main content
            document.getElementById('temp') = "Temperature: " + data.main.temp;
            document.getElementById('desc') = "Weather: " + data.weather[0].description;
            document.getElementById('hum') = "Humidy: " + data.main.humidity;
            document.getElementById('speed') = "Wind Speed: " + data.wind.speed;
        }
    }
    catch(err) {
        // Display an error caused during fetch
        document.getElementById('alert').innerHTML = "Error: Unable to fetch! Please retry!";
        document.getElementById('error').classList.remove('hidden');
    }

    // Display an error if no location is given
    if (location == '') {
        document.getElementById('alert').innerHTML = "Enter a location!";
        document.getElementById('error').classList.remove('hidden');
    }
}