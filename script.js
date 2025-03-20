"use strict";

const apiKey = "5af10595b772849237523885a0dcaf6c";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=banglore";

const checkWeather = async () => {
  const response = await fetch(apiUrl + `&appid=${apiKey}`);
  let data = await response.json();
  console.log(data);
};
