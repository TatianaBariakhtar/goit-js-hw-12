import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('#load-more');

let searchQuery = '';
let currentPage = 1;
const perPage = 40; // Кількість зображень на сторінку

// Ховаємо кнопку при старті
loadMoreBtn.classList.add('is-hidden');

// Функція для перевірки та оновлення стану кнопки "Load more"
function updateLoadMoreButton(totalHits) {
  if (totalHits <= perPage * currentPage) {
    loadMoreBtn.classList.add('is-hidden');
  } else {
    loadMoreBtn.classList.remove('is-hidden');
  }
}

// Функція для плавного скролу
function smoothScroll() {
  const galleryCards = document.querySelectorAll('.gallery-item'); // Отримуємо всі картки
  if (galleryCards.length > 0) {
    const cardHeight = galleryCards[0].getBoundingClientRect().height; // Висота однієї картки
    window.scrollBy({
      top: cardHeight * 2, // Прокручуємо на дві висоти картки
      behavior: 'smooth', // Плавний скрол
    });
  }
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  searchQuery = event.target.elements.searchQuery.value.trim();
  currentPage = 1;
  clearGallery();
  loadMoreBtn.classList.add('is-hidden'); // Ховаємо кнопку при новому запиті

  if (searchQuery) {
    const data = await fetchImages(searchQuery, currentPage, perPage);

    if (data && data.hits.length > 0) {
      renderGallery(data.hits);
      updateLoadMoreButton(data.totalHits);
    } else {
      iziToast.error({ message: "Sorry, no images found!" });
    }
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  const data = await fetchImages(searchQuery, currentPage, perPage);

  if (data && data.hits.length > 0) {
    renderGallery(data.hits);
    smoothScroll(); // Викликаємо функцію для плавного скролу
    updateLoadMoreButton(data.totalHits);
  } else {
    loadMoreBtn.classList.add('is-hidden');
    iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
  }
});


