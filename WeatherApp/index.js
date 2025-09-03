
const searchTab = document.querySelector("[data-searchWeather]");
const userTab = document.querySelector("[data-userWeather]");
const grantLocationAccess = document.querySelector("[data-grantLocationAccess]");
let searchInput = document.querySelector("[data-searchInput]");
const cityName = document.querySelector("[data-cityName]");
const countryIcon = document.querySelector("[data-countryIcon]");
const weatherDescription = document.querySelector("[data-weatherDescription]");
const weatherDescriptionImage = document.querySelector("[data-weatherDescriptionImage]");
const weatherTemprature = document.querySelector("[data-weatherTemprature]");
const windSpeed = document.querySelector("[data-windSpeed]");
const humidity = document.querySelector("[data-humidity]");
const clouds = document.querySelector("[data-clouds]");
//classes 
// we have to show only a afew at a point 
const grantLocationConatiner = document.querySelector(".grant-location-conatiner");
const searchForm = document.querySelector("[data-searchForm]");
const loadingConatiner = document.querySelector(".loading-container");
const showWeatherConatiner = document.querySelector(".show-weather-container");
//variables meeded
// default current tab is user tab
let currentTab = userTab;
const API_KEY="beddf8af0e41e3a6efd4fb4dc3fdbf8d";
currentTab.classList.add("current-tab");
function switchTab(clickedTab){
    if(currentTab == clickedTab)return;
    currentTab.classList.remove("current-tab");
    currentTab = clickedTab;
    currentTab.classList.add("current-tab");
    if(!searchForm.classList.contains("active")){
        grantLocationAccess.classList.remove("active");
        showWeatherConatiner.classList.remove("active");
        searchForm.classList.add("active");
    }else{
        //search to your wetaher
        searchForm.classList.remove("active");
        showWeatherConatiner.classList.remove("active");

        getFromSessionStorage();
    }
}
userTab.addEventListener('click' , () => {
    switchTab(userTab);
});
searchTab.addEventListener('click', () => {
    switchTab(searchTab);
});
// heck if location is on local storage
function getFromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        grantLocationAccess.classList.add("active");
        return;
    }
    const coordinates = JSON.parse(localCoordinates);
    fetchUserWeatherInfo(coordinates);

}
async function fetchUserWeatherInfo(coordinates){
    const {lat , lon} = coordinates;

    grantLocationAccess.classList.remove("active");
    loadingConatiner.classList.add("active");

    try{
        const response= await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await response.JSON();
        loadingConatiner.classList.remove("active");
        renderWeatherInfo(data);
        showWeatherConatiner.classList.add("active");
    }
    catch(err){

    }
}
function renderWeatherInfo(data){
    cityName.innerText = data?.name;
    weatherTemprature.innerText = data?.main?.temp;
    weatherDescription.innerText = data?.weather[0]?.description;
    clouds.innerText = data?.clouds?.all;
    windSpeed.innerText = data?.wind?.speed;   
    humidity.innerText = data?.main?.humidity;
    countryIcon.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    weatherDescriptionImage.src = `https://openweathermap.org/img/w/${data?.weather[0]?.icon}.png`;
}
grantLocationAccess.addEventListener('click' , getLocation);
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        // show an alert for no geoloation spp ava
    }
}
function showPosition(position){
    const userCod={
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates" , JSON.stringify(userCod));
    fetchUserWeatherInfo(userCod);
}

searchForm.addEventListener('sumbit' , (e)=>{
    e.preventDefault();
    if(searchInput.value === "")return;
    fetchSearchWeatherInfo(searchInput.value);
});
async function fetchSearchWeatherInfo(city){
    loadingConatiner.classList.add("active");
    showWeatherConatiner.classList.remove("active");
    grantLocationConatiner.classList.remove("active");
    try{
        const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        )
        const data = await res.json();
        loadingConatiner.classList.remove("active");
        showWeatherConatiner.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err){
        
    }
}