
const API_KEY="beddf8af0e41e3a6efd4fb4dc3fdbf8d";
let city = "goa";
async function showWeather(){
    
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    ).then(
        response => response.json()
    ).then(
        data=>{console.log(data)}
    )
}