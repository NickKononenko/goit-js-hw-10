const API_KEY =
  'live_SljqN65wV2OSxulTU4GEecfwKbY4EoL0PEa4dlDUiW4OpEQTGD3vcODI6bSSWjIP';
const BASE_URL = 'https://api.thecatapi.com/v1';
const options = {
  headers: {
    'x-api-key': API_KEY,
  },
};

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds?`, options);
}

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`, options);
}
