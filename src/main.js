import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('#load-more');
const loader = document.querySelector('#loader'); 

let searchQuery = '';
let currentPage = 1;
const perPage = 40;
let isLoading = false; 

loadMoreBtn.classList.add('is-hidden');


function showLoader() {
  loader.classList.remove('is-hidden');
}

function hideLoader() {
  loader.classList.add('is-hidden');
}


function updateLoadMoreButton(totalHits) {
  if (totalHits <= perPage * currentPage) {
    loadMoreBtn.classList.add('is-hidden');
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: "topRight",
    });
  } else {
    loadMoreBtn.classList.remove('is-hidden');
  }
}


function smoothScroll() {
  const galleryCards = document.querySelectorAll('.gallery-item');
  if (galleryCards.length > 0) {
    const cardHeight = galleryCards[0].getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}


form.addEventListener('submit', async event => {
  event.preventDefault();
  searchQuery = event.target.elements.searchQuery.value.trim();
  if (!searchQuery || isLoading) return; 

  currentPage = 1;
  clearGallery();
  loadMoreBtn.classList.add('is-hidden');

  showLoader();
  isLoading = true;

  try {
    const { images, totalHits } = await fetchImages(searchQuery, currentPage, perPage);
    if (images.length > 0) {
      renderGallery(images);
      updateLoadMoreButton(totalHits);
    } else {
      iziToast.error({ message: "Sorry, no images found!" });
    }
  } catch (error) {
    iziToast.error({ message: "Error fetching images. Please try again." });
  }

  hideLoader();
  isLoading = false;
});


loadMoreBtn.addEventListener('click', async () => {
  if (isLoading) return; 
  isLoading = true;

  currentPage += 1;
  showLoader();

  try {
    const { images, totalHits } = await fetchImages(searchQuery, currentPage, perPage);
    if (images.length > 0) {
      renderGallery(images);
      smoothScroll();
      updateLoadMoreButton(totalHits);
    } else {
      loadMoreBtn.classList.add('is-hidden');
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    }
  } catch (error) {
    iziToast.error({ message: "Error loading more images." });
  }

  hideLoader();
  isLoading = false;
});







