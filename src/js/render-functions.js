import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a');

export function renderGallery(images) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <div class="gallery-item">
        <a href="${largeImageURL}" class="gallery-link">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery-image" />
        </a>
        <div class="info">
          <p class="info-item"><b>❤️ Likes:</b> ${likes}</p>
          <p class="info-item"><b>👀 Views:</b> ${views}</p>
          <p class="info-item"><b>💬 Comments:</b> ${comments}</p>
          <p class="info-item"><b>📥 Downloads:</b> ${downloads}</p>
        </div>
      </div>
    `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

