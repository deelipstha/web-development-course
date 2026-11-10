
// Store your OpenWeatherMap API key.
const apiKey = "f61f50b8275a14c158b83a25539e31cb";

// Find the HTML elements.
const weatherData = document.getElementById("weatherdata");
const citySelect = document.getElementById("city");
const fetchButton = document.getElementById("fetchWeather");
const searchButton = document.getElementById("search");
const citySearch = document.getElementById("citysearch");

// Function to fetch weather information.
async function fetchWeather(city = "Helsinki") {

    // Display a loading message.
    weatherData.textContent = "Loading weather data...";

    // Try to fetch and process the weather data.
    try {

        // Create the API URL.
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&mode=xml&appid=${apiKey}`;

        // Send a GET request to the weather API.
        const response = await fetch(url);

        // Check whether the response is successful.
        if (!response.ok) {
            throw new Error("City not found or API error.");
        }

        // Read the response as text.
        const data = await response.text();

        // Parse the XML data.
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "text/xml");

        // Check for XML errors.
        if (xml.querySelector("parsererror") || xml.querySelector("error")) {
            throw new Error("Could not read weather information.");
        }

        // Get information from XML.
        const cityName = xml.querySelector("city").getAttribute("name");
        const temperature = xml.querySelector("temperature").getAttribute("value");
        const humidity = xml.querySelector("humidity").getAttribute("value");
        const clouds = xml.querySelector("clouds").getAttribute("value");
        const description = xml.querySelector("weather").getAttribute("value");

        // Display weather information.
        weatherData.innerHTML = `
            <h2>Weather in ${cityName}</h2>
            <p>🌡️ Temperature: ${temperature} °C</p>
            <p>💧 Humidity: ${humidity}%</p>
            <p>☁️ Cloudiness: ${clouds}%</p>
            <p>🌤️ Weather: ${description}</p>
        `;

    }

    // Handle errors.
    catch (error) {
        weatherData.textContent =
            "Sorry, something went wrong: " + error.message;
    }
}

// Fetch data button.
fetchButton.addEventListener("click", function () {
    fetchWeather(citySelect.value);
});

// City dropdown onchange event.
citySelect.addEventListener("change", function () {
    fetchWeather(citySelect.value);
});

// Search button.
searchButton.addEventListener("click", function () {

    const city = citySearch.value.trim();

    if (city === "") {
        weatherData.textContent = "Please enter a city name.";
        return;
    }

    fetchWeather(city);
});

// Allow Enter key to search.
citySearch.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        searchButton.click();
    }

});
