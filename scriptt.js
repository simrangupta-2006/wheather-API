async function getWeather() {
    const apiKey = 'YOUR_API_KEY_HERE';
    const city = document.getElementById('city-input').value.trim();

    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weather-output').innerHTML = `
            <p style="color: red;">❌ Error: ${error.message}</p>
        `;
    }
}

function displayWeather(data) {
    const { name, sys, main, weather } = data;

    const weatherHTML = `
        <h2>${name}, ${sys.country}</h2>
        <p><strong>Temperature:</strong> ${main.temp}°C</p>
        <p><strong>Feels Like:</strong> ${main.feels_like}°C</p>
        <p><strong>Weather:</strong> ${weather[0].main} - ${weather[0].description}</p>
        <p><strong>Humidity:</strong> ${main.humidity}%</p>
    `;

    document.getElementById('weather-output').innerHTML = weatherHTML;
}