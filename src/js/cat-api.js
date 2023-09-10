import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_TVdbr8h6s9oUuuKcbXItQrexIPhLphXM0Dxgs0rtaB0H41oUn3jZ9g2ZqBvDNiSA";
axios.defaults.baseURL = "https://api.thecatapi.com/v1";

function fetchBreeds() {
  return axios.get("/breeds")
    .then(({ data }) => data);
}

function fetchCatByBreed(breedId) {
  return axios.get(`/images/search?breed_ids=${breedId}`)
    .then(({ data }) => data);
}

export { fetchBreeds, fetchCatByBreed };