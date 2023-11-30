import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_L7ZdF9fqMfHNqD7xX2fL4PNvIrTkq9doQIOl4TUHPY3rntt49N6rTPZwt2b2g2l2';

export const fetchBreeds = () => {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => console.error('Ошибка при загрузке пород', error));
};

export const fetchCatByBreed = breedId => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error =>
      console.error('Ошибка при загрузке информации о коте', error)
    );
};
