function formatDate(timestamp) {
  let date = new Date(timestamp);

  let weekDays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  let day = weekDays[date.getDay()];

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}:`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour} ${minute}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"];
  return days[day];
}

function displayForecast(response) {
  let forecasts = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecasts.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="weather-days">${formatDay(forecastDay.dt)}</div>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="42"
              />
              <div class="weather-temp">
                <span class="weather-temp-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="weather-temp-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>
            </div>
          `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  // console.log(coordinates);
  // let apiKey = "d446fa0ebd9dc77a04d4d3078efe036c";
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  // console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function weatherLocation(response) {
  // console.log(response.data);
  let cityElement = document.querySelector("#town");
  let tempElement = document.querySelector("#temperatureElement");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#date");

  celsius = response.data.main.temp;
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsius);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "d446fa0ebd9dc77a04d4d3078efe036c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherLocation);
}

function displayWeather(event) {
  event.preventDefault();
  let city = document.querySelector("#text-input");
  // console.log(city);
  search(city.value);
}

function displayCelsius(event) {
  event.preventDefault();
  celsiusElement.classList.add("active");
  fahrenheitElement.classList.remove("active");
  let tempElement = document.querySelector("#temperatureElement");
  tempElement.innerHTML = Math.round(celsius);
}
function displayFahrenheit(event) {
  event.preventDefault();

  celsiusElement.classList.remove("active");
  fahrenheitElement.classList.add("active");
  let tempElement = document.querySelector("#temperatureElement");
  let fahrenheitTemperature = (celsius * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsius = null;

let celsiusElement = document.querySelector("#celsius-link");
celsiusElement.addEventListener("click", displayCelsius);

let fahrenheitElement = document.querySelector("#fahrenheit-link");
fahrenheitElement.addEventListener("click", displayFahrenheit);

let form = document.querySelector("#search-input");
form.addEventListener("submit", displayWeather);

search("lagos");
