import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.wrapper');

loadPage();

function loadPage() {
  loader.classList.remove('is-hidden');
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
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      loader.classList.add('is-hidden');
    });
}

function handleClick(event) {
  loader.classList.remove('is-hidden');
  catInfo.style.display = 'none';
  fetchCatByBreed(event.target.value)
    .then(([data]) => {
      const { url, breeds } = data;
      const { name, description, temperament } = breeds[0];
      catInfo.innerHTML = `<img src="${url}" alt="${name}"/><h1>${name}</h1><p>${description}</p><p><b>Temperament:</b>${temperament}</p>`;
      catInfo.style.display = 'block';
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      catInfo.style.display = 'none';
    })
    .finally(() => {
      loader.classList.add('is-hidden');
    });
}
