import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import rejectedIcon from './img/rejectedIcon.svg';
import closeIcon from './img/izitoast-close.svg';

class Spinner {
  #previousHTML;

  constructor(parentElemQuery = '') {
    this.parent = parentElemQuery;
  }
  add() {
    document.querySelector(this.parent).innerHTML =
      '<div id="spinner-container" style="display:flex; flex-direction:column; gap:15px; align-items:center;"><span class="js-processing-request">Loading images, please wait...</span><span class="loader"></span></div>';
  }

  remove() {
    document.querySelector(this.parent).innerHTML = '';
  }
}

class Gallery {
  #markup;
  constructor(data = [], requiredProperties = [''], parentElemQuery = '') {
    this.parent = parentElemQuery;
    this.rawData = data;
    this.cleanData = this.#dataFilter(requiredProperties);
    this.#markup = this.#createMarkup();
  }

  static testInput(userInput) {
    if (!userInput.trim()) {
      return false;
    }
    return /^[a-z\s]+$/gi.test(userInput.trim());
  }

  #dataFilter(requiredProps) {
    return this.rawData.map(obj => {
      const filtered = {};
      requiredProps.forEach(keyName => {
        filtered[keyName] = obj[keyName];
      });
      return filtered;
    });
  }

  #createMarkup() {
    const markup = this.cleanData
      .map(
        x => `<li class="js-gallery-item">
        <a class="js-image-container" href="${x.largeImageURL}"><img class="js-item-image" src="${x.webformatURL}" alt="${x.tags}" /></a>
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
    document.querySelector(this.parent).innerHTML = this.#markup;
    console.log(this);
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

const spinner = new Spinner('.js-gallery');

const iziOptions = {
  class: 'js-izitoast-message',
  titleColor: '#FFFFFF',
  messageColor: '#FFFFFF',
  messageSize: '16px',
  position: 'topRight',
  displayMode: 'replace',
  pauseOnHover: false,
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
  onOpening: function (_, toast) {
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
  onClosed: function (_, toast) {
    refs.input.removeEventListener(
      'focus',
      () => {
        iziToast.hide({ transitionOut: 'fadeOut' }, toast);
      },
      { once: true }
    );
  },
};

// Код нижче був зроблений виключно у дослідницьких цілях

refs.input.addEventListener('input', e => {
  if (!/^[a-z\s]+$/gi.test(e.target.value)) {
    setTimeout(() => {
      e.target.value = e.target.value.slice(0, -1);
    }, 100);
  }
});

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  requestParams.q = refs.input.value.trim();

  if (!Gallery.testInput(refs.input.value.trim())) {
    iziOptions.message =
      'Try something like "kitty", "best friends", "on the Moon" ;)';
    iziOptions.backgroundColor = '#e0c34c';
    iziOptions.progressBarColor = '#f7e28b';
    iziToast.show(iziOptions);
    refs.form.reset();
    return;
  }
  spinner.add();

  fetch(`${requestUrl}?${new URLSearchParams(requestParams)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      return response.json();
    })
    .then(data => {
      if (!data.hits.length) {
        iziOptions.message =
          'Sorry, there are no images matching your search query. Please try again!';
        iziOptions.backgroundColor = '#EF4040';
        iziOptions.progressBarColor = '#B51B1B';
        iziToast.show(iziOptions);
        refs.form.reset();
        return;
      }
      const gallery = new Gallery(
        data.hits,
        [
          'largeImageURL',
          'webformatURL',
          'tags',
          'likes',
          'views',
          'comments',
          'downloads',
        ],
        '.js-gallery'
      );
      const lightboxInstance = new SimpleLightbox('.js-gallery a', {
        className: 'lightbox-wrapper',
      });

      spinner.remove();
      gallery.renderGallery();
      lightboxInstance.refresh();
      refs.form.reset();
    })
    .catch(error => console.log(error));
});
