import { chooseIcon } from './getimage'
import { nextDayWeather } from './next-days';

const currentImg = document.querySelector('.CW-img');
const currentCity = document.querySelector('.CW-city');
const currentTemperature = document.querySelector('.CW-temperature');
const currentCondition = document.querySelector('.CW-condition');
const currentHigh = document.querySelector('.CW-high');
const currentLow = document.querySelector('.CW-low');
const searchInput = document.querySelector('.search-input');

const currentSensation = document.querySelector('.CW-sensation');
const currentPrecipitation = document.querySelector('.CW-precipitation');
const currentHumidity = document.querySelector('.CW-humidity');
const currentWind = document.querySelector('.CW-wind');
const currentUV = document.querySelector('.CW-UV');


async function getCityCondition() {
  let searchRes = searchInput.value;
  console.log(searchRes);

  if (searchRes === "") {
    searchRes = 'rio%20de%20janeiro';
  }

  try {

    const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+ searchRes + '?unitGroup=metric&key=N22W8GQGK6GZG2E7V9NA254DA&contentType=json', {mode: 'cors'});
    console.log(response);

    const cityData = await response.json();
    console.log(cityData);

    chooseIcon(currentImg, cityData.currentConditions.icon, cityData.currentConditions.cloudcover, cityData.currentConditions.precip);

    currentCity.innerHTML = cityData.resolvedAddress;
    currentTemperature.innerHTML = cityData.currentConditions.temp + ' °C';
    currentCondition.innerHTML = cityData.currentConditions.conditions;
    if (cityData.days[0].tempmax < cityData.currentConditions.temp) {
      currentHigh.innerHTML = 'max: ' + cityData.currentConditions.temp + ' °C';
    } else {
      currentHigh.innerHTML = 'max: ' + cityData.days[0].tempmax + ' °C';
    }
    if (cityData.days[0].tempmin > cityData.currentConditions.temp) {
      currentLow.innerHTML = '  min: ' + cityData.currentConditions.temp + ' °C';
    } else {
      currentLow.innerHTML = '  min: ' + cityData.days[0].tempmin + ' °C';
    }

    currentSensation.innerHTML = cityData.currentConditions.feelslike + ' °C';
    currentPrecipitation.innerHTML = cityData.currentConditions.precipprob + ' %';
    currentHumidity.innerHTML = cityData.currentConditions.humidity + ' %';
    currentWind.innerHTML = cityData.currentConditions.windspeed + ' km/h';
    if (cityData.currentConditions.uvindex <= 2) {
      currentUV.innerHTML = cityData.currentConditions.uvindex + ' Low';
    } 
    if (cityData.currentConditions.uvindex > 2 && cityData.currentConditions.uvindex <= 5) {
      currentUV.innerHTML = cityData.currentConditions.uvindex + ' Moderate';
    }
    if (cityData.currentConditions.uvindex > 5 && cityData.currentConditions.uvindex <= 7) {
      currentUV.innerHTML = cityData.currentConditions.uvindex + ' High';
    } 
    if (cityData.currentConditions.uvindex > 7 && cityData.currentConditions.uvindex <= 10) {
      currentUV.innerHTML = cityData.currentConditions.uvindex + '  Very High';
    }
    if (cityData.currentConditions.uvindex > 10) {
      currentUV.innerHTML = cityData.currentConditions.uvindex + '  Extreme';
    }

    nextDayWeather(cityData.days);

  } catch (error) {
      console.error('Error while retrieving data', error);
  }
  
  
};

export {getCityCondition} 