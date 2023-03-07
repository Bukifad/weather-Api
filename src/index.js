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

function weatherLocation(response) {
  console.log(response.data);
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
