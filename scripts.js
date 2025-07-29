// Fetches and displays weather data for the entered city
async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "516bbc56c2d7e4dd14cf646273ed9de6"; // OpenWeatherMap API key

  try {
    // Fetch weather data from API
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    // Show weather card
    document.getElementById("weatherCard").classList.remove("hidden");

    // Set current day and weather icon
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    document.getElementById("day").innerText = today.toUpperCase();
    document.getElementById("weatherIcon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // Update weather details
    document.getElementById("tempMax").innerText = `${Math.round(data.main.temp_max)}°`;
    document.getElementById("tempMin").innerText = `${Math.round(data.main.temp_min)}°`;
    document.getElementById("description").innerText = data.weather[0].description;
    document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").innerText = `Wind: ${data.wind.speed} km/h`;

    document.getElementById("error").innerText = ""; // Clear previous errors
  } 
  catch (error) 
  {
    // Handle errors (e.g., invalid city)
    document.getElementById("weatherCard").classList.add("hidden");
    document.getElementById("error").innerText = error.message;
  }
}
