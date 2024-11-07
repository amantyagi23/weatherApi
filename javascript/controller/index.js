import WEATHERSERVICE from "../services/weatherService.js";

window.addEventListener("DOMContentLoaded",bindEvents);

function bindEvents(){
    geoLocation();
    document.getElementById("getSearchData").addEventListener("click",getInput)
}

function geoLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( async (position)=>{
            const result = await WEATHERSERVICE.getDataFromBackendByLonAndLat(position.coords.latitude,position.coords.longitude)

            printWeatherData(result)
        })
    }
} 


async function getWeatherData(cityName){
    const result = await WEATHERSERVICE.getDataFromBackendByCityName(cityName);
    printWeatherData(result);
    
}


function getInput(){
    const input = document.getElementById("input").value
    if(input ===""){
        alert("Invalid Input")
        return
    }
    getWeatherData(input)
    document.getElementById("input").value = ""
}


function printWeatherData(result){
    console.log(result);
    const temp = document.getElementById("temperature");
    temp.innerHTML = `${parseInt(result.main.temp-273.15)}°c`
    
    const cityName = document.getElementById("location");
    cityName.innerHTML = `${result.name}`

    const windSpeed = document.getElementById("windSpeed")
    windSpeed.innerHTML = `${parseInt(result.wind.speed *3.6)} KM/H`
}