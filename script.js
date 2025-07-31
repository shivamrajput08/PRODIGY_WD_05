// script.js
const apiKey = "1241a8b1d8a513bb6a2e1cf4eb96c17a"; 



const searchBtn = document.getElementById("searchBtn");
const locateBtn = document.getElementById("locateBtn");
const locationInput = document.getElementById("locationInput");
const weatherCard = document.querySelector(".weather-card");
const cityName = document.getElementById("cityName");
const description = document.getElementById("description");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

// Fetch weather by city name
async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayWeather(data);
  } catch (error) {
    alert("Error fetching weather data.");
  }
}

// Display weather data
function displayWeather(data) {
  if (data.cod !== 200) {
    alert("City not found!");
    return;
  }

  cityName.textContent = `📍 ${data.name}`;
  description.textContent = `🌤️ ${data.weather[0].description}`;
  temperature.textContent = `🌡️ Temperature: ${data.main.temp}°C`;
  humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
  wind.textContent = `💨 Wind Speed: ${data.wind.speed} m/s`;

  weatherCard.classList.remove("hidden");
}

// Search by city
searchBtn.addEventListener("click", () => {
  const city = locationInput.value.trim();
  if (city) fetchWeather(city);
  else alert("Please enter a city name!");
});

// Detect location
locateBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        displayWeather(data);
      } catch (error) {
        alert("Error fetching weather data.");
      }
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
});
