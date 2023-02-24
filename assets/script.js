document.addEventListener('DOMContentLoaded', function(){

const key1 = '1b452da07c9aa9a60476c29a53bc96e0'

const key2 = 'c104444fef0ab36c01a47c59b6cd9d04'

// current weather

function currentWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=` + key2 + '&units=metric')
    .then(function(resp) {
        return resp.json()
    })
    .then(function(data) {
        console.log('--->'+(JSON.stringify(data)));
        showCurrentWeatherData(data)
    })
    .catch(function(error) {
        console.log(error)
    })
}

function showCurrentWeatherData(data) {
    const currentDate = document.querySelector('.current-date')
    const currentWeather = document.querySelector('.current-temp')
    const currentWind = document.querySelector('.current-wind')
    const currentHumid = document.querySelector('.current-humid')

    currentDate.textContent = data.dt_txt;
    currentWeather.textContent = data.main.temp;
    currentWind.textContent = data.wind.speed;
    currentHumid.textContent = data.main.humidity;

}
// 5 day forecast

function weatherForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=40&appid=` + key1 + '&units=metric')  
    .then(function(resp) {
        return resp.json() 
    })
    .then(function(data) {
        console.log('--->'+(JSON.stringify(data)));
        showWeatherData(data);
    })
    .catch(function() {
        // catches errors
    });
}

function showWeatherData(data) {
    const date = document.querySelector('.date');
    const temp = document.querySelector('.temp');
    const wind = document.querySelector('.wind');
    const humid = document.querySelector('.humid');
    
    date.textContent = data.list[8].dt_txt;
    temp.textContent = data.list[8].main.temp;
    wind.textContent = data.list[8].wind.speed;
    humid.textContent = data.list[8].main.humidity;

    const date2 = document.querySelector('.date1');
    const temp2 = document.querySelector('.temp1');
    const wind2 = document.querySelector('.wind1');
    const humid2 = document.querySelector('.humid1');

    date2.textContent = data.list[16].dt_txt;
    temp2.textContent = data.list[16].main.temp;
    wind2.textContent = data.list[16].wind.speed;
    humid2.textContent = data.list[16].main.humidity;

    const date3 = document.querySelector('.date2');
    const temp3 = document.querySelector('.temp2');
    const wind3 = document.querySelector('.wind2');
    const humid3 = document.querySelector('.humid2');

    date3.textContent = data.list[24].dt_txt;
    temp3.textContent = data.list[24].main.temp;
    wind3.textContent = data.list[24].wind.speed;
    humid3.textContent = data.list[24].main.humidity;

    const date4 = document.querySelector('.date3');
    const temp4 = document.querySelector('.temp3');
    const wind4 = document.querySelector('.wind3');
    const humid4 = document.querySelector('.humid3');

    date4.textContent = data.list[32].dt_txt;
    temp4.textContent = data.list[32].main.temp;
    wind4.textContent = data.list[32].wind.speed;
    humid4.textContent = data.list[32].main.humidity;

    const date5 = document.querySelector('.date4');
    const temp5 = document.querySelector('.temp4');
    const wind5 = document.querySelector('.wind4');
    const humid5 = document.querySelector('.humid4');

    date5.textContent = data.list[33].dt_txt;
    temp5.textContent = data.list[33].main.temp;
    wind5.textContent = data.list[33].wind.speed;
    humid5.textContent = data.list[33].main.humidity;
}

const forecastDisplay = document.querySelectorAll('.forecast-container') 

const currentWeatherDisplay = document.querySelector('.current-weather')

const btnSearch = document.querySelector('#search-btn');

const cityWeather = [];

const userInput = document.querySelector('#userInput');

btnSearch.addEventListener("click", function() {
    for (let i = 0; i < forecastDisplay.length; i++) {
        forecastDisplay[i].style.display = 'block';
    }

    currentWeatherDisplay.style.display = 'block';
    console.log(userInput.value);
    const latestCity = userInput.value;
    currentWeather(userInput.value);
    weatherForecast(userInput.value);
    cityWeather.push(latestCity); // add user's input to the cityWeather array
    localStorage.setItem('cityHistory', JSON.stringify(cityWeather));
    
    console.log(cityWeather);

const uniqueCities = new Set(cityWeather);
    const uniqueCityArray = Array.from(uniqueCities);
     // convert set back to array
    cityHistory(uniqueCityArray);
});


function cityHistory () {
    const historyTab = document.querySelector('.history');
    const btnWrapper = document.createElement('div');
    const uniqueCities = new Set(cityWeather); 
    uniqueCities.forEach(city => {
      const btn = document.createElement('button');
      btn.className = 'city-history';
      btn.textContent = city;
      btnWrapper.appendChild(btn); // append the button to the wrapper
    });
  
    historyTab.innerHTML = '';
    historyTab.appendChild(btnWrapper);
  }
  
})

