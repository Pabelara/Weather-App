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
dateElement.innerHTML = ` Last Updated: ${currentDay}, ${currentMonth} ${currentDate}`;

let timeElement = document.querySelector("li.time");
timeElement.innerHTML = `${currentHour}:${currentMinutes}`;

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let realFeelingElement = document.querySelector("li.realTemp");

  celsiusTemperature = response.data.main.temp;
  celsiusRealTemperature = response.data.main.feels_like;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windSpeedElement.innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )} Km/H`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  /* Icon Description */ iconElement.setAttribute(
    "alt",
    response.data.weather[0].description
  );
  realFeelingElement.innerHTML = `${Math.round(celsiusRealTemperature)}ºC`;
}

function search(city) {
  let apiKey = "935d274474278d462bed68ee689c049b";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#searchCity");
  search(cityInputElement.value);
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", handleSubmit);

function showPosition(position) {
  let apiKey = "935d274474278d462bed68ee689c049b";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#currentLocationButton");
currentLocation.addEventListener("click", getCurrentLocation);

let celsiusTemperature = null;
let celsiusRealTemperature = null;

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = celsiusTemperature * 1.8 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function convertToRealFahrenheit(event) {
  event.preventDefault();
  let realTemperatureElement = document.querySelector("#realTemp");
  let fahrenheitRealTemperature = celsiusRealTemperature * 1.8 + 32;
  realTemperatureElement.innerHTML = `${Math.round(
    fahrenheitRealTemperature
  )}ºF`;
}

let realFahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToRealFahrenheit);

function convertToRealCelsius(event) {
  event.preventDefault();
  let realTemperatureElement = document.querySelector("#realTemp");
  realTemperatureElement.innerHTML = `${Math.round(celsiusRealTemperature)}ºC`;
}

let realCelsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToRealCelsius);

search("Madrid");
