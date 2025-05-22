import { chooseIcon } from "./getimage";

const nextDayDashboard = document.querySelector('.ND-dashboard');


export function nextDayWeather(data) {

    const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let currentDay = new Date().getDay();
    nextDayDashboard.innerHTML = '';

    for (let i = 1; i<= 5; i++) {
        const oneDay = document.createElement('div');
        oneDay.classList.add('day-content');

        const newDay = document.createElement('h4');
        newDay.classList.add('day');
        let nextDayIndex = (currentDay + i) % 7;
        console.log(nextDayIndex);
        console.log(dayNames[nextDayIndex]);
        newDay.innerHTML = dayNames[nextDayIndex];
        

        const nextDayImg = document.createElement('img');
        nextDayImg.classList.add('ND-img');
        nextDayImg.setAttribute('alt','next day weather icon');
        chooseIcon(nextDayImg, data[i].icon, data[i].cloudcover, data[i].precip)

        const nextDayCondition = document.createElement('h4');
        nextDayCondition.classList.add('ND-condition');
        nextDayCondition.innerHTML = data[i].conditions;

        const nextDayTemp = document.createElement('div')
        nextDayTemp.classList.add('ND-temp');
        const nextDayMax = document.createElement('h4');
        nextDayMax.innerHTML = data[i].tempmax + ' °';
        const tempSeparation = document.createElement('hr');
        const nextDayMin = document.createElement('h4');
        nextDayMin.innerHTML = data[i].tempmin + ' °';

        nextDayTemp.appendChild(nextDayMax);
        nextDayTemp.appendChild(tempSeparation)
        nextDayTemp.appendChild(nextDayMin);

        oneDay.appendChild(newDay);
        oneDay.appendChild(nextDayImg)
        oneDay.appendChild(nextDayCondition)
        oneDay.appendChild(nextDayTemp)

        nextDayDashboard.appendChild(oneDay);
    }   
}

