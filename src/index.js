import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_L7ZdF9fqMfHNqD7xX2fL4PNvIrTkq9doQIOl4TUHPY3rntt49N6rTPZwt2b2g2l2';

const fetchBreeds = () => {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => console.error('Ошибка при загрузке пород', error));
};

const fetchCatByBreed = breedId => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error =>
      console.error('Ошибка при загрузке информации о коте', error)
    );
};

const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

// Загрузка пород при инициализации
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

function displayCatInfo(cat) {
  catInfoDiv.innerHTML = `
    <h2>${cat.breeds[0].name}</h2>
    <p>${cat.breeds[0].description}</p>
    <img src="${cat.url}" alt="${cat.breeds[0].name}" style="max-width: 200px; height: auto;">
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
