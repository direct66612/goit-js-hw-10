import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

fetchBreeds()
  .then(data => {
    data.map(elem => {
      select.innerHTML += `<option value="${elem.id}">${elem.name}</option>`;
      select.addEventListener('change', handleClick);
    });
    new SlimSelect({
      select: '.breed-select',
    });
  })
  .catch(error => {
    Notiflix.Notify.failure('Qui timide rogat docet negare');
  });
function handleClick(event) {
  fetchCatByBreed(event.target.value).then(([data]) => {
    const { url, breeds } = data;
    const { name, description, temperament } = breeds[0];
    catInfo.innerHTML = `<img src="${url}" alt="${name}"/><h1>${name}</h1><p>${description}</p><p><b>Temperament:</b>${temperament}</p>`;
  });
}
