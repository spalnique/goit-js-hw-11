import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import rejectedIcon from './img/rejectedIcon.svg';
import closeIcon from './img/izitoast-close.svg';

class LoaderSpinner {
  #previousHTML;

  constructor(parentElemQuery = '') {
    this.parent = parentElemQuery;
    this.#previousHTML = '';
  }
  add() {
    this.#previousHTML = document.querySelector(`${this.parent}`).innerHTML;
    document.querySelector(`${this.parent}`).innerHTML =
      '<div id="spinner-container" style="display:flex; flex-direction:column; gap:15px; align-items:center;"><span class="js-processing-request">Loading images, please wait...</span><span class="loader"></span></div>';
  }

  remove() {
    document.querySelector(`${this.parent}`).innerHTML = this.#previousHTML;
  }
}

class Gallery {
  #markup;
  constructor(data = [], parentElemQuery = '') {
    this.parent = parentElemQuery;
    this.rawData = data;
    this.cleanData = this.#dataFilter();
    this.#markup = this.#createMarkup();
  }

  static testInput(userInput) {
    if (!userInput.trim()) {
      return false;
    }
    return /^[a-z\s]+$/gi.test(userInput.trim());
  }

  #dataFilter(...rest) {
    return this.rawData.map(obj => {
      const filtered = {};
      rest.forEach(keyName => {
        filtered[keyName] = obj[keyName];
      });
      console.log(filtered);
      return filtered;
    });
  }

  #createMarkup() {
    const markup = this.rawData
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
  renderGallery() {
    console.log(this);
    document.querySelector(`${this.parent}`).innerHTML = this.#markup;
  }
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

const spinner = new LoaderSpinner('.js-gallery');

const iziOptions = {
  class: 'js-izitoast-message',
  titleColor: '#FFFFFF',
  message: null,
  messageColor: '#FFFFFF',
  messageSize: '16px',
  position: 'topRight',
  backgroundColor: '#EF4040',
  progressBarColor: '#B51B1B',
  iconUrl: rejectedIcon,
  close: false,
  buttons: [
    [
      `<button type="button" style="background-color: transparent;"><img src=${closeIcon}></button>`,
      function (instance, toast) {
        instance.hide({ transitionOut: 'fadeOut' }, toast);
      },
    ],
  ],
  onOpening: function (instance, toast) {
    refs.container.innerHTML = '';
    refs.input.blur();
    refs.input.addEventListener(
      'focus',
      () => {
        iziToast.hide({ transitionOut: 'fadeOut' }, toast);
      },
      { once: true }
    );
  },
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  requestParams.q = refs.input.value.trim();

  if (!Gallery.testInput(refs.input.value.trim())) {
    (iziOptions.message =
      'Try something like "kitty", "best friends", "on the Moon" ;)'),
      iziToast.show(iziOptions);
    refs.form.reset();
    return;
  }

  fetch(`${requestUrl}?${new URLSearchParams(requestParams)}`)
    .then(response => {
      spinner.add();
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      return response.json();
    })
    .then(data => {
      if (!data.hits.length) {
        (iziOptions.message =
          'Sorry, there are no images matching your search query. Please try again!'),
          iziToast.show(iziOptions);
        refs.form.reset();
        return;
      }
      const lightboxInstance = new SimpleLightbox('.js-gallery a', {
        className: 'lightbox-wrapper',
      });
      const gallery = new Gallery(data.hits, '.js-gallery');
      spinner.remove();
      gallery.renderGallery();
      lightboxInstance.refresh();
      refs.form.reset();
    })
    .catch(error => console.log(error));
});
