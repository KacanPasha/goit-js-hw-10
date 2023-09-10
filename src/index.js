import SlimSelect from "slim-select";
import "slim-select/dist/slimselect.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";

const elements = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

elements.select.addEventListener('change', onChangeSelect);
getBreeds();

function onChangeSelect(evt) {
  elements.catInfo.classList.remove('is-visible');
  elements.loader.classList.remove('is-hidden');
  const breedId = evt.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(breed => {
      elements.catInfo.innerHTML = createMarkupCat(breed);
      elements.loader.classList.add('is-hidden');
      elements.catInfo.classList.add('is-visible');
    })
    .catch(handleError);
}

function getBreeds() {
  fetchBreeds()
    .then(breeds => {
      elements.select.insertAdjacentHTML("beforeend", createSelectBreeds(breeds));
      elements.select.classList.add('is-visible');
      elements.loader.classList.add('is-hidden');
      new SlimSelect({
        select: '.breed-select',
      });
    })
    .catch(handleError);
}

function createSelectBreeds(breeds) {
  return breeds.map(({ id, name }) =>
    `<option value="${id}">${name}</option>`
  ).join('');
}

function createMarkupCat(breed) {
  if (breed.length === 0) return null;

  const [{ url, breeds: [{ name, description, temperament }] }] = breed;
  return `<img class="cat-img" src="${url}" alt="" width="600"/>
    <div class="wrap-descr">
    <h1 class="title">${name}</h1>
    <p class="descr">${description}</p>
    <p class="temperament-txt">
    <span class="temperament">Temperament:</span>
    ${temperament}</p>
    </div>`;
}

function handleError(error) {
  console.error("Ошибка:", error);
  showErrorMessage();
  elements.loader.classList.add('is-hidden');
  elements.select.classList.add('is-hidden');
}

function showErrorMessage() {
  Notify.warning("Oops! Something went wrong! Try reloading the page!", {
    warning: {
      background: '#ff5e1a',
      textColor: '#000',
      notiflixIconColor: '#000',
    },
    width: '700px',
    fontSize: '26px',
    position: 'center-center',
  });
}