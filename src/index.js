import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

function displayCatInfo(cat) {
  catInfoDiv.innerHTML = `
    <div class="cat-image" style="flex: 1;">
      <img src="${cat.url}" alt="Image of ${cat.breeds[0].name}" style="max-width: 300px; height: auto;">
    </div>
    <div class="cat-details" style="flex: 2;">
      <h2>${cat.breeds[0].name}</h2>
      <p>${cat.breeds[0].description}</p>
    </div>
  `;
}

function toggleLoader(show) {
  loader.style.display = show ? 'block' : 'none';
  catInfoDiv.style.display = show ? 'none' : 'block';
  error.style.display = 'none';
}

function showError(show) {
  error.style.display = show ? 'block' : 'none';
  loader.style.display = 'none';
  catInfoDiv.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  toggleLoader(true);
  fetchBreeds()
    .then(breeds => {
      toggleLoader(false);
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
    })
    .catch(() => showError(true));
});

breedSelect.addEventListener('change', event => {
  toggleLoader(true);
  fetchCatByBreed(event.target.value)
    .then(cat => {
      toggleLoader(false);
      displayCatInfo(cat);
    })
    .catch(() => showError(true));
});
