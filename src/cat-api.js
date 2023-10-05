import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_Oiryl9hZcjoWsL43Z4gHDUXT7S11BeSgku8RiLsfFqqOJC3kmsWhLuScznWCgdA3';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';
function fetchBreeds() {
  return axios.get('breeds').then(res => res.data);
}
function fetchCatByBreed(breedId) {
  return axios.get(`images/search?breed_ids=${breedId}`).then(res => res.data);
}
export { fetchBreeds, fetchCatByBreed };
