let day = document.querySelector(".day");
let date = document.querySelector(".date");
let weatherLocation = document.querySelector(".location");
let tempNum = document.querySelector(".num");
let weatherImg = document.querySelector(".weatherImg img");
let condition = document.querySelector(".custom");
let iconImg = document.querySelector(".icon-hero img");
let img = document.querySelector(".info span p");
let windKm = document.querySelector("#windKm");
let windDir = document.querySelector("#windDir");
let todayDay = document.querySelector("#today .day");
let todayDate = document.querySelector("#today .date span");
let todayDateMonth = document.querySelector("#today .date p");
// Second day
let maxTemp = document.querySelector(".next-day .maxTemp");
let minTemp = document.querySelector(".minTemp");
let nextDayCondition = document.querySelector("#current .custom");
let nextDay = document.querySelector("#tomorrow .day");
// Third day
let weatherImgThird = document.querySelector("#thirdDayIcon");
let maxTempThird = document.querySelector("#maxTemp");
let minTempThird = document.querySelector("#thirdDay .minTemp");
let weatherConditionThird = document.querySelector("#thirdDay .custom");
let thirdDay = document.querySelector("#afterTomorrow .day");
// search input
let searchInput = document.getElementById("search");

async function getWeather(city) {
let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=542c50a0dac94521a6f183519241201&q=${city}&days=3`);
let myData = await response.json();
return myData;
}

function displayToday(weather) {
let currentDate = new Date(weather.forecast.forecastday[0].date);
weatherLocation.innerHTML = weather.location.name;
tempNum.innerHTML = weather.current.temp_c + "<sup>o</sup> C";
iconImg.setAttribute("src", weather.current.condition.icon);
condition.innerHTML = weather.current.condition.text;
img.innerHTML = weather.current.humidity + "%";
windKm.innerHTML = weather.current.wind_kph + "km/h";
windDir.innerHTML = weather.current.wind_dir;
todayDay.innerHTML = currentDate.toLocaleDateString("en-us", {
weekday: "long",});
todayDate.innerHTML = currentDate.getDate();
todayDateMonth.innerHTML = currentDate.toLocaleDateString("en-us", {
month: "long",});
}
function displaySecond(weather) {
let currentDate = new Date(weather.forecast.forecastday[1].date);
let x = weather.forecast.forecastday[1];
weatherImg.setAttribute("src", x.day.condition.icon);
maxTemp.innerHTML = x.day.maxtemp_c + "<sup>o</sup> C";
minTemp.innerHTML = x.day.mintemp_c + "<sup>o</sup> C";

nextDayCondition.innerHTML = x.day.condition.text;
nextDay.innerHTML = currentDate.toLocaleDateString("en-us", {
weekday: "long",
});
}
function displayThird(weather) {
let currentDate = new Date(weather.forecast.forecastday[2].date);
let x = weather.forecast.forecastday[2];
weatherImgThird.setAttribute("src", x.day.condition.icon);
maxTempThird.innerHTML = x.day.maxtemp_c + "<sup>o</sup> C";
minTempThird.innerHTML = x.day.mintemp_c + "<sup>o</sup> C";
weatherConditionThird.innerHTML = x.day.condition.text;
thirdDay.innerHTML = currentDate.toLocaleDateString("en-us", {
weekday: "long",
});
}
async function StartApplication(city = "london") {
let data = await getWeather(city);
if (!data.error) {
displayToday(data);
displaySecond(data);
displayThird(data);
}
}
StartApplication();


searchInput.addEventListener("keyup", function () {
StartApplication(searchInput.value);
});
