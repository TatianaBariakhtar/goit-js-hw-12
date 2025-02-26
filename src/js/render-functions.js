import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a');

export function renderGallery(images) {
  const markup = images
    .map(
      img => `
      <a href="${img.largeImageURL}" class="gallery-item">
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
      </a>
    `
    )
    .join('');
    
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}
