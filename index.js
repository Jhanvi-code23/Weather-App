const form=document.getElementById("form");
const cityInput=document.getElementById("city");

const cityName=document.getElementById("cityname");
const temp=document.getElementById("temperature-value");
const datetime=document.getElementById("datetime");
const weatherIcon=document.getElementById("weather-icon");
const weatherDescription=document.getElementById("weather");
const feelsLike=document.getElementById("feelslike-value");
const humidity=document.getElementById("humidity-value");
const windSpeed=document.getElementById("wind-value");
const pressure=document.getElementById("pressure-value");
const visibility=document.getElementById("visibility-value");
const highTemp=document.getElementById("high-value");
const lowTemp=document.getElementById("low-value");
const suggestion=document.getElementById("suggestion");
const currentLocationBtn=document.getElementById("current-location");

const container=document.getElementById("container");
const body=document.body;


const apiKey="9db9f960427667c84ad46e7830ab0dab";

form.addEventListener("submit", async function(e){
    e.preventDefault();

const city=cityInput.value.trim();
if(city===""){
    alert("Please enter a city name");
    return;
}


const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

const response=await fetch(url);

const data=await response.json();
if(!response.ok){
    alert("City not found. Please enter a valid city name.");
    return;
}

const cityData=data.name;
const temperature=data.main.temp;
const condition=data.weather[0].main;
const humidityValue=data.main.humidity;
const windSpeedValue=data.wind.speed;
const pressureValue=data.main.pressure;
const visibilityValue=data.visibility;
const highTemperature=data.main.temp_max;
const lowTemperature=data.main.temp_min;
const feelsLikeValue=data.main.feels_like;



cityName.textContent=cityData;
temp.textContent=`${Math.round(temperature)} °C`;
datetime.textContent=new Date().toLocaleString();
weatherDescription.textContent=condition;
feelsLike.textContent=`${Math.round(feelsLikeValue)} °C`;
humidity.textContent=`${humidityValue} %`;
windSpeed.textContent=`${windSpeedValue} m/s`;
pressure.textContent=`${Math.round(pressureValue)} hPa`;
visibility.textContent=`${Math.round(visibilityValue/1000)} km`;
highTemp.textContent=`${Math.round(highTemperature)} °C`;
lowTemp.textContent=`${Math.round(lowTemperature)} °C`;

changeweatherIcon(condition);

changeBackground(condition);

changeSuggestion(condition);
});



function changeweatherIcon(condition){
    if(condition==="Clear"){
        weatherIcon.className="fa-solid fa-cloud-sun" ;
        weatherIcon.style.color="rgb(255, 212, 59)";
    }

    else if(condition==="Clouds"){
        weatherIcon.className="fa-solid fa-cloud" ;
        weatherIcon.style.color="rgb(255, 255, 255)";
    }

    else if(condition==="Rain" || condition==="Drizzle"){
        weatherIcon.className="fa-solid fa-cloud-showers-heavy" ;
        weatherIcon.style.color="rgb(227, 227, 255)";
    }

    else if(condition==="Snow"){
        weatherIcon.className="fa-solid fa-snowflake" ;
        weatherIcon.style.color="rgb(0, 255, 255)";
    }

    else if(condition==="Thunderstorm" || condition==="Squall" || condition==="Tornado"){
        weatherIcon.className="fa-solid fa-bolt" ;
        weatherIcon.style.color="rgb(255, 255, 0)";
    }

    else if(condition==="Mist" || condition==="Fog" || condition==="Haze" || condition==="Smoke" || condition==="Dust" || condition==="Sand" || condition==="Ash"){
        weatherIcon.className="fa-solid fa-smog" ;
        weatherIcon.style.color="rgb(128, 128, 128)";
    }
}






function changeBackground(condition){
    const hour = new Date().getHours();
    const timeOfDay = hour >= 5 && hour < 18 ? "day" : "night";

    if (condition==="Clear" && timeOfDay==="day") {
        container.style.backgroundImage=`url('images-weather/clear-sky-day.jpg')`;
    }
    else if (condition==="Clear" && timeOfDay==="night") {
        container.style.backgroundImage=`url('images-weather/clear-sky-night-.jpg')`;
    }

    else if (condition==="Clouds" && timeOfDay==="day") {
        container.style.backgroundImage=`url('images-weather/cloudy-sky-day.avif')`;
    }
    else if (condition==="Clouds" && timeOfDay==="night") {
        container.style.backgroundImage=`url('images-weather/cloudy-sky-night.jpg')`;
    }

    else if ((condition==="Rain" || condition==="Drizzle") && timeOfDay==="day") {
        container.style.backgroundImage=`url('images-weather/rainy bg-day.jpg')`;
    }
    else if ((condition==="Rain" || condition==="Drizzle") && timeOfDay==="night") {
        container.style.backgroundImage=`url('images-weather/rainy-sky-night.jpg')`;
    }

    else if (condition==="Snow" && timeOfDay==="day") {
        container.style.backgroundImage=`url('images-weather/snow bg-day.webp')`;
    }
    else if (condition==="Snow" && timeOfDay==="night") {
        container.style.backgroundImage=`url('images-weather/snow-night.jpg')`;
    }

    else if ((condition==="Thunderstorm" || condition==="Squall" || condition==="Tornado") && timeOfDay==="day") {
        container.style.backgroundImage=`url('images-weather/thunderstorm-day.jpg')`;
    }
    else if ((condition==="Thunderstorm" || condition==="Squall" || condition==="Tornado") && timeOfDay==="night") {
        container.style.backgroundImage=`url('images-weather/thunderstorm bg-night.jpg')`;
    }

    else if ((condition==="Mist" || condition==="Fog" || condition==="Haze" || condition==="Smoke" || condition==="Dust" || condition==="Sand" || condition==="Ash") && timeOfDay==="day") {
        container.style.backgroundImage=`url('images-weather/foggy bg-day.jpg')`;
    }
    else if ((condition==="Mist" || condition==="Fog" || condition==="Haze" || condition==="Smoke" || condition==="Dust" || condition==="Sand" || condition==="Ash") && timeOfDay==="night") {
        container.style.backgroundImage=`url('images-weather/foggy-night.jpg')`;
    }
}




function changeSuggestion(condition){
    if(condition==="Clear"){
        suggestion.textContent="It's a bright day! Stay hydrated, wear sunglasses, and don't forget sunscreen.";
    }
    else if(condition==="Clouds"){
        suggestion.textContent="Pleasant weather for a walk or outdoor activities. You may want to carry a light jacket.";
    }
    else if(condition==="Rain" || condition==="Drizzle"){
        suggestion.textContent="Don't forget your umbrella! Stay dry and be cautious of slippery surfaces.";
    }
    else if(condition==="Snow"){
        suggestion.textContent="Bundle up! It's snowing. Watch out for icy roads and sidewalks.";
    }
    else if(condition==="Thunderstorm" || condition==="Squall" || condition==="Tornado"){
        suggestion.textContent="Seek shelter immediately! Avoid open areas and electrical equipment.";
    }
    else if(condition==="Mist" || condition==="Fog" || condition==="Haze" || condition==="Smoke" || condition==="Dust" || condition==="Sand" || condition==="Ash"){
        suggestion.textContent="Drive carefully! Visibility is reduced. Turn on your headlights.";
    }
}
