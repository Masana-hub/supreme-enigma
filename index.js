function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let seconds = now.getSeconds();
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  document.getElementById(
    `date`
  ).innerHTML = `${day}, ${month} ${date}, ${year} <br>
   ${hour} : ${minute} : ${seconds}`;
}
let date = new Date();
formatDate(date);

function displayCelsius() {
  let degree = document.querySelector("#degree");
  degree.innerHTML = "19";
}
let celsiusTemp = document.querySelector("#celsius-link");
celsiusTemp.addEventListener("click", displayCelsius);

function displayFahrenheit() {
  let degree = document.querySelector("#degree");
  degree.innerHTML = "66";
}
let fahrenheitTemp = document.querySelector("#fahrenheit-link");
fahrenheitTemp.addEventListener("click", displayFahrenheit);

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search-bar");
  search(cityInput.value);
}

function search(city) {
  let units = "metric";
  let apiKey = "fe1483f743b581b5520a1b725af03a49";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", searchCity);

function showTemperature(response) {
  console.log({ response });
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#degree");
  cityTemp.innerHTML = `${temp}`;
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "fe1483f743b581b5520a1b725af03a49";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lon=${lon}&lat=${lat}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

search("Johannesburg");
