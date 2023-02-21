

const key = '1b452da07c9aa9a60476c29a53bc96e0'



function weatherForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=` + key + '&cnt=5')  
    .then(function(resp) {
        return resp.json() 
    })
    .then(function(data) {
        console.log('--->'+(JSON.stringify(data)));
        drawWeather(data);
    })
    .catch(function() {
        // catch any errors
    });
}

document.addEventListener('DOMContentLoaded', function(){

const btnSearch = document.querySelector('#search-btn');

const userInput = document.querySelector('#userInput');
btnSearch.addEventListener("click", function() {
    console.log('meow')
    console.log(userInput.value);
    weatherForecast(userInput);
})
})