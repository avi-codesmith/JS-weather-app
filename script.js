"use strict";

const searchBar = document.querySelector("input");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const searchIcon = document.querySelector(".icon-wrapper");
const weatherIcon = document.querySelector(".weather-icon");
const cityName = document.querySelector(".city");
const weatherDeg = document.querySelector(".temp");
const wrapper = document.querySelector(".weather");
const footer = document.querySelector(".footer");
const sound = new Audio("errorSound.mp3");
const apiKey = "5af10595b772849237523885a0dcaf6c";
const loader = document.createElement("div");
const body = document.querySelector(".wrapper");

loader.classList.add("loader");

const checkWeather = async () => {
  const city = searchBar.value.trim();
  if (city === "") {
    searchBar.classList.add("move");
    searchBar.placeholder = "Place not found";
    searchBar.value = "";
    sound.play();
    setTimeout(() => {
      searchBar.classList.remove("move");
      searchBar.placeholder = "Enter place name . . .";
    }, 400);
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
  try {
    wrapper.appendChild(loader);

    const response = await fetch(apiUrl);

    if (!response.ok) throw new Error("City not found");
    let data = await response.json();
    cityName.innerHTML = data.name;
    weatherDeg.innerHTML = Math.floor(data.main.temp) + "°C";
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + " km/h";

    const weatherType = data.weather[0].main;
    if (weatherType === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (weatherType === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (weatherType === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (weatherType === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (weatherType === "Mist") {
      weatherIcon.src = "images/mist.png";
    }
    wrapper.style.display = "flex";
    footer.style.display = "flex";
  } catch (error) {
    searchBar.classList.add("move");
    searchBar.placeholder = "Place not found";
    searchBar.value = "";
    sound.play();
    setTimeout(() => {
      searchBar.classList.remove("move");
      searchBar.placeholder = "Enter place name . . .";
    }, 400);
  } finally {
    loader.remove();
  }
};

const animate = () => {
  body.style.transform = "translateY(0)";
  weatherIcon.style.transform = "translateY(0)";
  footer.style.gap = "2.5rem";
};

searchIcon.addEventListener("click", checkWeather);
searchBar.addEventListener("keypress", (e) => {
  if (e.key === "Enter") checkWeather();
});
window.addEventListener("load", animate);
