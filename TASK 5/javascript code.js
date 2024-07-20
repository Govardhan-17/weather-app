document.getElementById('locationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let locationInput = document.getElementById('locationInput').value.trim();
    if (locationInput) {
        getWeather(locationInput);
    }
});

document.getElementById('locationBtn').addEventListener('click', function() {
    getLocation();
});

async function getWeather(location) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const weatherData = await response.json();

        // Process the weather data
        const { name, main, weather } = weatherData;
        const temperature = main.temp;
        const weatherDescription = weather[0].description;

        // Update the DOM
        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML = `
            <h2>Current Weather in ${name}</h2>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Description:</strong> ${weatherDescription}</p>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again.');
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            try {
                const response = await fetch(apiUrl);
                const weatherData = await response.json();

                // Process the weather data
                const { name, main, weather } = weatherData;
                const temperature = main.temp;
                const weatherDescription = weather[0].description;

                // Update the DOM
                const weatherInfo = document.getElementById('weatherInfo');
                weatherInfo.innerHTML = `
                    <h2>Current Weather in ${name}</h2>
                    <p><strong>Temperature:</strong> ${temperature}°C</p>
                    <p><strong>Description:</strong> ${weatherDescription}</p>
                `;
            } catch (error) {
                console.error('Error fetching weather data:', error);
                alert('Failed to fetch weather data. Please try again.');
            }
        }, function(error) {
            console.error('Error getting location:', error);
            alert('Error getting your location. Please try again or enter a location manually.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

