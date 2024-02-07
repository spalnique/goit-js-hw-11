import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

function createMarkup(data) {
  const markup = data
    .map(
      x => `<li class="js-gallery-item">
        <a class="js-image-container" href="${x.largeImageURL}"><img class="js-item-image" src="${x.webformatURL}" alt="${x.alt}" /></a>
        <ul class="js-item-desc">
          <li class="js-desc-wrapper"><span class="js-desc-prop">Likes</span><span class="js-desc-value">${x.likes}</span></li>
          <li class="js-desc-wrapper"><span class="js-desc-prop">Views</span><span class="js-desc-value">${x.views}</span></li>
          <li class="js-desc-wrapper"><span class="js-desc-prop">Comments</span><span class="js-desc-value">${x.comments}</span></li>
          <li class="js-desc-wrapper"><span class="js-desc-prop">Downloads</span><span class="js-desc-value">${x.downloads}</span></li>
        </ul>
      </li>`
    )
    .join('\n\n');
  return markup;
}

function renderGallery(markup) {
  refs.container.innerHTML = markup;
}

function processingRequest() {
  refs.container.innerHTML = 'Loading images, please wait...';
}

//////////////////////////////////////////////////////////////////////////////////////////

const refs = {
  form: document.querySelector('.js-search-form'),
  input: document.querySelector('.js-search-input'),
  container: document.querySelector('.js-gallery'),
};

const requestUrl = 'https://pixabay.com/api/';
const requestParams = {
  key: '42242477-df8643eaa45736c853493b589',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  q: null,
};

const iziOptions = {
  class: 'js-izitoast-message',
  titleColor: '#FFFFFF',
  message:
    'Sorry, there are no images matching your search query. Please try again!',
  messageColor: '#FFFFFF',
  messageSize: '16px',
  position: 'topRight',
  backgroundColor: '#EF4040',
  progressBarColor: '#B51B1B',
  // iconUrl: rejectedIcon,
  close: false,
  onOpening: () => {
    refs.container.innerHTML = 'Please, try a different request';
  },
};

refs.form.addEventListener('submit', e => {
  requestParams.q = refs.input.value;
  e.preventDefault();
  processingRequest();
  const gallery = new SimpleLightbox('.js-gallery a', {
    className: 'lightbox-wrapper',
  });

  fetch(`${requestUrl}?${new URLSearchParams(requestParams)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      return response.json();
    })
    .then(data => {
      if (!data.hits.length) {
        iziToast.show(iziOptions);
        return;
      }
      renderGallery(createMarkup(data.hits));
      gallery.refresh();
    })
    .catch(error => console.log(error));
  refs.form.reset();
});
