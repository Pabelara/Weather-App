let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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
  "December",
];
let currentDay = days[date.getDay()];
let currentMonth = months[date.getMonth()];
let currentDate = date.getDate();
let currentHour = date.getHours();
let currentMinutes = date.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let dateElement = document.querySelector("li.date");
dateElement.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}`;

let timeElement = document.querySelector("li.time");
timeElement.innerHTML = `${currentHour}:${currentMinutes}`;

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let searchCity = document.querySelector("#searchCity");
  cityElement.innerHTML = searchCity.value;

  let apiKey = "935d274474278d462bed68ee689c049b";
  let units = "metric";
  let city = searchCity.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  function showTemperature(response) {
    event.preventDefault();

    celsiusTemperature = response.data.main.temp;

    /* City Name */ document.querySelector("#city").innerHTML =
      response.data.name;
    /* Current Temperature */ document.querySelector(
      "#temperature"
    ).innerHTML = Math.round(celsiusTemperature);
    /* Humidity */ document.querySelector(
      "#humidity"
    ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
    /* Wind Speed */ document.querySelector(
      "#wind"
    ).innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)} km/h`;
    /* Real Feeling */ document.querySelector(
      "li.realTemp"
    ).innerHTML = `${Math.round(response.data.main.feels_like)}ºC`;
    /* Weather Description */ document.querySelector("#description").innerHTML =
      response.data.weather[0].description;

    let iconElement = document.querySelector("#icon");
    /* Icon Image */ iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    /* Icon Description */ iconElement.setAttribute(
      "alt",
      response.data.weather[0].description
    );

    let apiKey = "935d274474278d462bed68ee689c049b";
    let units = "metric";
    let city = searchCity.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  }
  axios.get(apiUrl).then(showTemperature);
}

let celsiusTemperature = null;

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = celsiusTemperature * 1.8 + 32;
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", search);
