// API Key constant
const API_key = "467a2abc509efb61591b3c4177c88675";

// Function to retrieve data from OpenWeatherMap
function getAPI(location) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    location
  )}&appid=${API_key}&units=metric`;
}

// Function to fetch data from url
async function getWeather() {
  const location = document.getElementById("location").value;

  // Clear previous output and show weatheroutput div
  const weatherDiv = document.getElementById("weatheroutput");
  document.getElementById("locname").innerHTML = "";
  document.getElementById("quick").innerHTML = "";
  document.getElementById("icon").src = "";
  document.getElementById("icon").alt = "";
  document.getElementById("temp").innerHTML = "";
  document.getElementById("desc").innerHTML = "";
  document.getElementById("hum").innerHTML = "";
  document.getElementById("speed").innerHTML = "";
  document.getElementById("alert").innerHTML = "";
  document.getElementById("error").classList.add("hidden");
  weatherDiv.classList.remove("hidden");

  if (location == "") {
    document.getElementById("alert").innerHTML = "Enter a location!";
    document.getElementById("error").classList.remove("hidden");
    // weatherDiv should remain visible so error is shown
    return;
  }
  weatherDiv.classList.remove("hidden");
  try {
    const response = await fetch(getAPI(location));
    const data = await response.json();

    // Display an error for location not found
    if (data.cod == 404) {
      document.getElementById("alert").innerHTML = "Error: Location Not Found!";
      document.getElementById("error").classList.remove("hidden");
    } else {
      // Display retrieved weather data in the webpage

      // Quick look
      document.getElementById("locname").innerHTML = data.name;
      let quick = `<span>${data.main.temp}&#8451; - ${data.weather[0].description}</span> <img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png' alt='${data.weather[0].description}' style='vertical-align:middle;height:48px;width:48px;'>`;
      document.getElementById("quick").innerHTML = quick;

      // Main content
      document.getElementById("temp").innerHTML =
        "Temperature: " + data.main.temp + "&#8451;";
      document.getElementById("desc").innerHTML =
        "Weather: " + data.weather[0].description;
      document.getElementById("hum").innerHTML =
        "Humidity: " + data.main.humidity + "%";
      document.getElementById("speed").innerHTML =
        "Wind Speed: " + data.wind.speed + " m/s";
    }
  } catch (err) {
    // Display an error caused during fetch
    document.getElementById("alert").innerHTML =
      "Error: Unable to fetch! Please retry!";
    document.getElementById("error").classList.remove("hidden");
  }
}
