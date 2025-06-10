import _, { debounce } from 'lodash';
import './style.css';
import { getCityCondition} from './API';
import { showCities, chooseCity } from './search';

const searchInput = document.querySelector('.search-input');
const suggestionList = document.querySelector('.suggestions-list');

const debouncedShowCities = debounce(showCities, 500);

function showResult() {
  debouncedShowCities();
}

searchInput.addEventListener('input', showResult);
suggestionList.addEventListener ('click', (e) => {
  chooseCity(e);
  getCityCondition();
});
window.onload = getCityCondition;
