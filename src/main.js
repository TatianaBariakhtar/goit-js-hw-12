import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('#load-more');

let searchQuery = '';
let currentPage = 1;
const perPage = 40;

// Спочатку ховаємо кнопку
loadMoreBtn.classList.add('is-hidden');

/**
 * Оновлює видимість кнопки Load more
 * @param {number} totalHits - Загальна кількість зображень
 */
function updateLoadMoreButton(totalHits) {
  if (totalHits <= perPage * currentPage) {
    loadMoreBtn.classList.add('is-hidden');
  } else {
    loadMoreBtn.classList.remove('is-hidden');
  }
}

/**
 * Виконує плавний скролінг після завантаження нових картинок
 */
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

/**
 * Обробник події на сабміт форми пошуку
 */
form.addEventListener('submit', async event => {
  event.preventDefault();
  searchQuery = event.target.elements.searchQuery.value.trim();
  currentPage = 1;
  clearGallery();
  loadMoreBtn.classList.add('is-hidden');

  if (!searchQuery) {
    iziToast.warning({ message: "Please enter a search query!" });
    return;
  }

  try {
    const data = await fetchImages(searchQuery, currentPage, perPage);
    console.log('Fetched data:', data);

    if (data && Array.isArray(data.hits) && data.hits.length > 0) {
      renderGallery(data.hits);
      updateLoadMoreButton(data.totalHits);
    } else {
      iziToast.error({ message: "Sorry, no images found!" });
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({ message: "Something went wrong! Please try again later." });
  }
});

/**
 * Обробник події на кнопку Load more
 */
loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;

  try {
    const data = await fetchImages(searchQuery, currentPage, perPage);
    console.log('Fetched more data:', data);

    if (data && Array.isArray(data.hits) && data.hits.length > 0) {
      renderGallery(data.hits);
      smoothScroll();
      updateLoadMoreButton(data.totalHits);
    } else {
      loadMoreBtn.classList.add('is-hidden');
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    }
  } catch (error) {
    console.error('Error fetching more images:', error);
    iziToast.error({ message: "Something went wrong! Please try again later." });
  }
});



