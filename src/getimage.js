// const img = document.querySelector('.CW-img');

const images = {};
const context = require.context('./assets/weathers/', false, /\.(png|jpe?g|svg)$/);

context.keys().forEach((key) => {
  const filename = key.replace('./', ''); // ex: 'sunny.png'
  images[filename] = context(key);        // ex: images['sunny.png'] = '/img/weathers/sunny.png'
});

// export function getWeatherImage(weather) {
//   const filename = `${weather}.svg`; // on suppose que les fichiers ont une extension .png
//   return images[filename] || null;   // retourne l'image ou null si non trouvée
// }
const getWeatherImage = (weather) => {
  const filename = `${weather}.svg`; // on suppose que les fichiers ont une extension .png
  return images[filename] || null;   // retourne l'image ou null si non trouvée
}


export function chooseIcon (img, weather, cloudLevel, rainLevel) {
   if(weather == "partly-cloudy-day") {
    if (cloudLevel >= 20 && cloudLevel <= 40) {
      img.src = getWeatherImage('cloudy-day-1');
    } else if (cloudLevel > 40 && cloudLevel <=70) {
          img.src = getWeatherImage('cloudy-day-2');
    }  else if (cloudLevel > 71) {
      img.src = getWeatherImage('cloudy-day-3');
    }  
  }
  if(weather == "partly-cloudy-night") {
    if (cloudLevel >= 25 && cloudLevel <= 40) {
      img.src = getWeatherImage('cloudy-night-1');
    } else if (cloudLevel > 40 && cloudLevel <= 70) {
          img.src = getWeatherImage('cloudy-night-2');
    }  else if  (cloudLevel > 70) {
      img.src = getWeatherImage('cloudy-night-3');
    }  
  }
  if(weather == "rain") {
    if (rainLevel <= 10) {
      img.src = getWeatherImage('rainy-5');
    } else if (rainLevel > 10) {
          img.src = getWeatherImage('rainy-6');
    }  
  }
  if (weather == "clear-day") {
    img.src = getWeatherImage('day');
  }
  if (weather == "clear-night") {
    img.src = getWeatherImage('night');
  }
  if (weather == "cloudy") {
    img.src = getWeatherImage('cloudy');
  }
  if (weather == "snow") {
    img.src = getWeatherImage('snowy-5');
  }
}
