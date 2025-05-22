// import { createElement } from "react";

const searchInput = document.querySelector('.search-input');
const headerSearch = document.querySelector('.header-search');
const suggestionList = document.querySelector('.suggestions-list');


// const suggestionList = document.createElement('ul');
// suggestionList.className = 'suggestions-list';
// headerSearch.appendChild(suggestionList)

// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function showCities() {
    suggestionList.classList.replace('invisible', 'visible');
    const query = searchInput.value.trim().toLowerCase(); 
    suggestionList.innerHTML = '';
    if (query === '') return;
    console.log(query);

    try {

        const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5&offset=0&types=CITY&minPopulation=10000&sort=-population`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'def74b0a85msh1cb54b695f39a16p107558jsnff1d2946e4bc',
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        });

        const data = await response.json();
        console.log(data);
        const matches = data.data;
        console.log(matches);
        // const matches = cities
        // .filter(city => city.toLowerCase().startsWith(query))
        // .slice(0, 5);

        matches.forEach(city => {
            const li = document.createElement('li');
            // li.textContent = city;
            li.textContent = `${city.city}, ${city.country}`;
            suggestionList.appendChild(li);
        });


    } catch (error) {
        console.error('Error while choosing the city', error);
    }
}


const chooseCity = (e) => {
    searchInput.value = e.target.textContent;
    suggestionList.innerHTML = '';
    suggestionList.classList.replace('visible', 'invisible');

}


export {chooseCity, showCities}