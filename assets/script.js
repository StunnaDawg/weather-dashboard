document.addEventListener('DOMContentLoaded', function(){ 
//function ensures the html DOM is loaded before the code is executed

const key1 = '1b452da07c9aa9a60476c29a53bc96e0'

const key2 = 'c104444fef0ab36c01a47c59b6cd9d04'

const cityName = document.querySelector('#city-name');
// current weather

const newUser = document.querySelector('#select-weather'); 

//If the user has nothing stored in local storage then 'Search for a City' appears

if (localStorage.getItem('cityHistory') === null) { 
    newUser.textContent = 'Search for a City!';
  }

//current weather fetches the currentWeather api call and makes sure the data is in metric units

function currentWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=` + key2 + '&units=metric')
    .then(function(resp) {
        if (resp.status === 404) {
            throw new Error('Data not found');
          }
          return resp.json();

})
    .then(function(data) {
        console.log('--->'+(JSON.stringify(data)));
        showCurrentWeatherData(data)
        cityName.textContent = city
        document.getElementById("current-weather-icon").setAttribute("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
        localStorage.setItem('lastCity', city);
    })
    
    .catch(function(err)  {
        console.log(err);
    })
    
}

//This function displays the current weather

function showCurrentWeatherData(data) { 
    
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d = new Date(data.dt * 1000);
    let dayName = days[d.getDay()];

    const currentDate = document.querySelector('.current-date');
    const currentWeather = document.querySelector('.current-temp');
    const currentWind = document.querySelector('.current-wind');
    const currentHumid = document.querySelector('.current-humid');
    

    currentDate.textContent = 'Current weather:';
   
    currentWeather.textContent = data.main.temp + ' degrees celsius';
    currentWind.textContent = data.wind.speed;
    currentHumid.textContent = data.main.humidity;
    
}
// This api fetch, fetches the 5 day forecast and once again transforms the units to metric 
//the icons are also fetched

function weatherForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=40&appid=` + key1 + '&units=metric')  
    .then(function(resp) {
        if (resp.status === 404) {
            throw new Error('Data not found');
          }
          return resp.json();
    })
    .then(function(data) {
        console.log('--->'+(JSON.stringify(data)));
        showWeatherData(data); 
        cityName.textContent = city
        document.getElementById("day1-img").setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[8].weather[0].icon + "@2x.png")
        document.getElementById("day2-img").setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[16].weather[0].icon + "@2x.png")
        document.getElementById("day3-img").setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[24].weather[0].icon + "@2x.png")
        document.getElementById("day4-img").setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[32].weather[0].icon + "@2x.png")
        document.getElementById("day5-img").setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[39].weather[0].icon + "@2x.png")
        localStorage.setItem('lastCity', city);
    })
    .catch(function(err)  {
        console.log(err);
    });
   
}


//showWeatherData takes the data from the apis and displays them for every day

function showWeatherData(data) {
    const date = document.querySelector('.date');
    const temp = document.querySelector('.temp');
    const wind = document.querySelector('.wind');
    const humid = document.querySelector('.humid');

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d1 = new Date(data.list[8].dt * 1000);
    let dayName1 = days[d1.getDay()];
  
    date.textContent = dayName1;
    temp.textContent = data.list[8].main.temp + ' degrees celsius';
    wind.textContent = data.list[8].wind.speed;
    humid.textContent = data.list[8].main.humidity;

    const date2 = document.querySelector('.date1');
    const temp2 = document.querySelector('.temp1');
    const wind2 = document.querySelector('.wind1');
    const humid2 = document.querySelector('.humid1');

    let d2 = new Date(data.list[16].dt * 1000);
    let dayName2 = days[d2.getDay()];

    date2.textContent = dayName2;
    temp2.textContent = data.list[16].main.temp + ' degrees celsius';
    wind2.textContent = data.list[16].wind.speed;
    humid2.textContent = data.list[16].main.humidity;

    const date3 = document.querySelector('.date2');
    const temp3 = document.querySelector('.temp2');
    const wind3 = document.querySelector('.wind2');
    const humid3 = document.querySelector('.humid2');

    let d3 = new Date(data.list[24].dt * 1000);
    let dayName3 = days[d3.getDay()];

    date3.textContent = dayName3;
    temp3.textContent = data.list[24].main.temp + ' degrees celsius';
    wind3.textContent = data.list[24].wind.speed;
    humid3.textContent = data.list[24].main.humidity;

    const date4 = document.querySelector('.date3');
    const temp4 = document.querySelector('.temp3');
    const wind4 = document.querySelector('.wind3');
    const humid4 = document.querySelector('.humid3');

    let d4 = new Date(data.list[32].dt * 1000);
    let dayName4 = days[d4.getDay()];

    date4.textContent = dayName4;
    temp4.textContent = data.list[32].main.temp + ' degrees celsius';
    wind4.textContent = data.list[32].wind.speed;
    humid4.textContent = data.list[32].main.humidity;

    const date5 = document.querySelector('.date4');
    const temp5 = document.querySelector('.temp4');
    const wind5 = document.querySelector('.wind4');
    const humid5 = document.querySelector('.humid4');

    let d5 = new Date(data.list[39].dt * 1000);
    let dayName5 = days[d5.getDay()];

    date5.textContent = dayName5;
    temp5.textContent = data.list[39].main.temp + ' degrees celsius';
    wind5.textContent = data.list[39].wind.speed;
    humid5.textContent = data.list[39].main.humidity;
}




const forecastDisplay = document.querySelectorAll('.forecast-container') 

const currentWeatherDisplay = document.querySelector('.current-weather')

const btnSearch = document.querySelector('#search-btn');

let cityWeather = JSON.parse(localStorage.getItem('cityHistory')) || [];

const userInput = document.querySelector('#userInput');

//The search button checks multiple possible errors
//It first checks to see if the user input has already been stored. If it has it just diplays the data
//Also if the data entry is empty then it does not call
//If the user passes the input then the new input is added to the local storage

btnSearch.addEventListener("click", function() { 
    if (cityWeather.includes(userInput.value)) {
        for (let i = 0; i < forecastDisplay.length; i++) {
            forecastDisplay[i].style.display = 'flex';
        }
        currentWeatherDisplay.style.display = 'flex';
        currentWeather(userInput.value);
        weatherForecast(userInput.value);
        return;
    }  
    if (userInput.value === '') {
        return;
    }
    for (let i = 0; i < forecastDisplay.length; i++) {
        forecastDisplay[i].style.display = 'flex';
    }

  

    currentWeatherDisplay.style.display = 'flex';
    console.log(userInput.value);
    const latestCity = userInput.value;
    const formattedCity = latestCity.charAt(0).toUpperCase() + latestCity.slice(1).toLowerCase();
    currentWeather(formattedCity);
    weatherForecast(formattedCity);
    cityWeather.push(formattedCity); // add user's input to the cityWeather array
    localStorage.setItem('cityHistory', JSON.stringify(cityWeather));
    
    console.log(cityWeather);
    const uniqueCities = new Set(cityWeather);
    const uniqueCityArray = Array.from(uniqueCities);
     // convert set back to array
    currentCityHistory(uniqueCityArray);  
});


const historyTab = document.querySelector('.history');
const btnWrapper = document.createElement('div');

//the currentCity History takes the current cities and creates only 1 button for each
//there should never be any duplicates

function currentCityHistory (cities) {
    btnWrapper.innerHTML = '';


    cities.forEach(city => {
        const btn = document.createElement('button');
        btn.className = 'city-history';
        btn.textContent = city;
        btnWrapper.appendChild(btn); // append the button to the wrapper

        btn.addEventListener('click', () => {
            for (let i = 0; i < forecastDisplay.length; i++) {
                forecastDisplay[i].style.display = 'flex';
            }
        
            currentWeatherDisplay.style.display = 'flex';
            
            currentWeather(city);
            weatherForecast(city);
          });
    });
  
    historyTab.innerHTML = '';
    historyTab.appendChild(btnWrapper);
}
currentCityHistory(cityWeather);
  

//getCityHistory looks at local storage and creates the buttons

function getCityHistory () {
    const parsedCityHistory = JSON.parse(localStorage.getItem('cityHistory')) || [];
    cityWeather = parsedCityHistory;
    currentCityHistory(parsedCityHistory);
}

getCityHistory();

// the last city displays the last city searched when the page is reloaded

let lastCity = localStorage.getItem('lastCity');
if (lastCity) {
    for (let i = 0; i < forecastDisplay.length; i++) {
        forecastDisplay[i].style.display = 'flex';
    }

    currentWeatherDisplay.style.display = 'flex';
  // If lastCity is found in localStorage, display its weather data
  currentWeather(lastCity);
  weatherForecast(lastCity);
}
  } )


