import { fetchBreeds, fetchCatByBreed } from './cat-api';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('#cat-info'),
};

refs.breedSelect.addEventListener('change', onBreedSelectChange);

fetchBreeds()
  .then(response => {
    if (!response.ok) {
      refs.error.classList.remove('is-hidden');
      refs.loader.classList.add('is-hidden');
    }
    return response.json();
  })
  .then(data => {
    createBreedSelectorMarkup(data);
    refs.breedSelect.classList.remove('is-hidden');
    refs.loader.classList.add('is-hidden');
  })
  .catch(error => {
    refs.error.classList.remove('is-hidden');
    refs.loader.classList.add('is-hidden');
  });

function createBreedSelectorMarkup(breedsArr) {
  const breedSelectorMarkup = breedsArr
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
  refs.breedSelect.insertAdjacentHTML('beforeend', breedSelectorMarkup);
}

function onBreedSelectChange(event) {
  refs.catInfo.innerHTML = '';
  refs.catInfo.classList.remove('cat-info');
  refs.loader.classList.remove('is-hidden');
  const breedId = event.target.value;
  fetchCatByBreed(breedId)
    .then(response => {
      if (!response.ok) {
        refs.error.classList.remove('is-hidden');
        refs.loader.classList.add('is-hidden');
      }
      return response.json();
    })
    .then(data => {
      createCatsBreedMarkup(data);
      refs.loader.classList.add('is-hidden');
    })
    .catch(error => {
      refs.error.classList.remove('is-hidden');
      refs.loader.classList.add('is-hidden');
      refs.catInfo.classList.remove('cat-info');
    });
}

function createCatsBreedMarkup(catInfoArr) {
  refs.catInfo.innerHTML = '';
  refs.catInfo.classList.add('cat-info');
  const catsBreedMarkup = `<img src="${catInfoArr[0].url}" alt="cat" width="300" height="350" class="cat-img" >
  <div class="container">
    <h2 class="cat-name">${catInfoArr[0].breeds[0].name}</h2>
    <p class="cat-descr">${catInfoArr[0].breeds[0].description}</p>
    <p class="cat-temp"><strong>Temperament:</strong> ${catInfoArr[0].breeds[0].temperament}</p>
    </div>`;
  refs.catInfo.insertAdjacentHTML('beforeend', catsBreedMarkup);
}
