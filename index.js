const apiKey = "9e92e8681cbffeb1774736d69ab967ed";

const cityInputEl = document.getElementById("city-input");
const weatherData = document.getElementById("weather-data");

const formEl = document.querySelector("form");
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;

  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // console.log(data);to know the response
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const cityName = data.name;
    // console.log(cityName);
    const details = [
      `Feels like : ${Math.round(data.main.feels_like)}°C`,
      `Humidity:${data.main.humidity}%`,
      `Wind speed:${data.wind.speed}m/s`,
    ];
    weatherData.querySelector(".cityName").textContent = cityName;
    weatherData.querySelector(".icon").innerHTML = ` <img
            src="http://openweathermap.org/img/wn/${icon}.png"
            alt="weather Icon"
          />`;

    weatherData.querySelector(".temperature").textContent = `${temperature}°C`;
    weatherData.querySelector(".description").textContent = `${description}`;
    weatherData.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherData.querySelector(".cityName").textContent = "";
    weatherData.querySelector(".icon").innerHTML = "";

    weatherData.querySelector(".temperature").textContent = "";
    weatherData.querySelector(".description").textContent =
      "An erro happened please try again later";
    weatherData.querySelector(".details").innerHTML = "";
  }
}
