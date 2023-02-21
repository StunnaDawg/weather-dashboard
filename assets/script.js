document.addEventListener('DOMContentLoaded', function(){

const key = '1b452da07c9aa9a60476c29a53bc96e0'



function weatherForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=` + key + '&cnt=5')  
    .then(function(resp) {
        return resp.json() 
    })
    .then(function(data) {
        console.log('--->'+(JSON.stringify(data)));
        
        const tempData = data.list[0].main.temp;
        const forcastDate = data.list[0].dt_txt;
        const windData = data.list[0].wind.speed;
        const  humidData = data.list[0].main.humidity;

        console.log(tempData, forcastDate, windData, humidData);
        showWeatherData(data);
    })
    .catch(function() {
        // catch any errors
    });
}

function showWeatherData(data) {
    const date = document.querySelector('.date');
    const temp = document.querySelector('.temp');
    const wind = document.querySelector('.wind');
    const humid = document.querySelector('.humid');

    date.textContent = data.list[0].dt_txt;
    temp.textContent = data.list[0].main.temp;
    wind.textContent = data.list[0].wind.speed;
    humid.textContent = data.list[0].main.humidity;

}


const btnSearch = document.querySelector('#search-btn');

const userInput = document.querySelector('#userInput');
btnSearch.addEventListener("click", function() {
    console.log('meow')
    console.log(userInput.value);
    weatherForecast(userInput.value);
})
})