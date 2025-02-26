import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('#load-more');

let searchQuery = '';
let currentPage = 1;

form.addEventListener('submit', async event => {
  event.preventDefault();
  searchQuery = event.target.elements.searchQuery.value.trim();
  currentPage = 1;
  clearGallery();
  
  if (searchQuery) {
    const data = await fetchImages(searchQuery, currentPage);
    if (data && data.hits.length > 0) {
      renderGallery(data.hits);
      loadMoreBtn.classList.remove('hidden');
    } else {
      iziToast.error({ message: "Sorry, no images found!" });
    }
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  const data = await fetchImages(searchQuery, currentPage);
  if (data && data.hits.length > 0) {
    renderGallery(data.hits);
  } else {
    loadMoreBtn.classList.add('hidden');
    iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
  }
});
