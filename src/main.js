import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('#load-more');
const loader = document.querySelector('#loader'); // Отримуємо лоадер

let searchQuery = '';
let currentPage = 1;
const perPage = 40;

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

form.addEventListener('submit', async event => {
  event.preventDefault();
  searchQuery = event.target.elements.searchQuery.value.trim();
  currentPage = 1;
  clearGallery();
  loadMoreBtn.classList.add('is-hidden');

  if (searchQuery) {
    showLoader();
    const { images, totalHits } = await fetchImages(searchQuery, currentPage, perPage);
    hideLoader();

    if (images.length > 0) {
      renderGallery(images);
      updateLoadMoreButton(totalHits);
    } else {
      iziToast.error({ message: "Sorry, no images found!" });
    }
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  const { images, totalHits } = await fetchImages(searchQuery, currentPage, perPage);
  hideLoader();

  if (images.length > 0) {
    renderGallery(images);
    updateLoadMoreButton(totalHits);
  } else {
    loadMoreBtn.classList.add('is-hidden');
    iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
  }
});





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
  currentPage = 1;
  clearGallery();
  loadMoreBtn.classList.add('is-hidden'); 

  if (searchQuery) {
    const { images, totalHits } = await fetchImages(searchQuery, currentPage, perPage);

    if (images.length > 0) {
      renderGallery(images);
      updateLoadMoreButton(totalHits);
    } else {
      iziToast.error({ message: "Sorry, no images found!" });
    }
  }
});


loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  const { images, totalHits } = await fetchImages(searchQuery, currentPage, perPage);

  if (images.length > 0) {
    renderGallery(images);
    smoothScroll(); 
    updateLoadMoreButton(totalHits);
  } else {
    loadMoreBtn.classList.add('is-hidden');
    iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
  }
});






