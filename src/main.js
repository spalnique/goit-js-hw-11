import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import rejectedIcon from './img/rejectedIcon.svg';
import closeIcon from './img/izitoast-close.svg';

class Spinner {
  constructor(parentElemQuery) {
    this.parent = parentElemQuery;
  }

  /**
   * @description Adds a spinner to the page.
   */

  add() {
    document.querySelector(this.parent).innerHTML =
      '<div id="spinner-container" style="padding-top: 25px; display:flex; flex-direction:column; gap:15px; align-items:center;"><span class="js-processing-request">Loading images, please wait...</span><span class="loader"></span></div>';
  }

  /**
   * @description Removes previously added spinner from the page.
   */

  remove() {
    document.querySelector(this.parent).innerHTML = '';
  }
}

/**
 * @param {array} data Expects an array of objects containing image data.
 * @param {string} parentElemQuery Expects a string containing DOM element query (class, id, etc).
 * @param {array} imgProperties Expects an array of three image properties to look for in data (largeImageURL, thumbnailURL, altText).
 * @param {array} descProperties Expects an array of additional description properties to look for in data (downloads, size, comments, etc).
 * @param {boolean} showDetails Expects a boolean value to render detailed information or not.
 */

class Gallery {
  #markup;
  #imgProperties;
  #descProperties;
  #imgData;
  #descData;
  #showDetails;

  constructor(
    data = [],
    parentElemQuery = '',
    imgProperties = [],
    descProperties = [],
    showDetails
  ) {
    this.rawData = data;
    this.parent = parentElemQuery;
    this.#imgProperties = imgProperties;
    this.#descProperties = descProperties;
    this.#showDetails = showDetails;
    this.#imgData = this.#dataFilter(this.rawData, this.#imgProperties);
    this.#descData = this.#dataFilter(this.rawData, this.#descProperties);
    this.#markup = this.#createMarkup(this.#imgData, this.#descData);
  }

  /**
   * @param {string} userInput Expects string value for testing.
   * @returns {boolean} Returns true or false.
   */

  static testInput(userInput) {
    if (!userInput.trim()) {
      return false;
    }
    return /^[a-z\s]+$/gi.test(userInput.trim());
  }

  /**
   * @param {string} result Accepts one of two strings: 'wrong input' | 'nothing found'.
   * @description Displays a popup area providing user with a feedback from the app.
   */

  static showPopup(result) {
    const options = {
      class: 'js-izitoast-message',
      titleColor: '#FFFFFF',
      messageColor: '#FFFFFF',
      message:
        result === 'wrong input'
          ? 'Try something like "kitty", "best friends", "on the Moon" ;)'
          : 'Sorry, there are no images matching your search query. Please try again!',
      backgroundColor: result === 'wrong input' ? '#e0c34c' : '#ef4040',
      progressBarColor: result === 'wrong input' ? '#f7e28b' : '#b51b1b',
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
    iziToast.show(options);
  }

  /**
   * @param {array} data Expects an array of objects of raw data as a result of fetch operation.
   * @param {array} propsList Expects an array of strings indicating which properties to filter out of raw data.
   * @returns {object} Returns an array of objects with requested properties only.
   */

  #dataFilter(data, propsList) {
    return data.map(obj => {
      const filtered = {};
      propsList.forEach(keyName => {
        filtered[keyName] = obj[keyName];
      });
      return filtered;
    });
  }

  /**
   * @param {array} img Expects an array of objects containing information related to each image, and alternative text to be shown.
   * @param {array} desc Expects an array of objects containing information related to each image description.
   * @returns {string} Returns a ready for use markup with or without image description.
   */

  #createMarkup(img, desc) {
    const imgDesc = this.#showDetails
      ? desc.map(
          x =>
            `<ul class="js-item-desc">
            <li class="js-desc-wrapper">
              <span class="js-desc-prop">Likes</span>
              <span class="js-desc-value">${x.likes}</span>
            </li>
            <li class="js-desc-wrapper">
              <span class="js-desc-prop">Views</span>
              <span class="js-desc-value">${x.views}</span>
            </li>
            <li class="js-desc-wrapper">
              <span class="js-desc-prop">Comments</span>
              <span class="js-desc-value">${x.comments}</span>
            </li>
            <li class="js-desc-wrapper">
              <span class="js-desc-prop">Downloads</span>
              <span class="js-desc-value">${x.downloads}</span>
            </li>
          </ul>`
        )
      : '';

    const markup = img
      .map(
        (x, i) =>
          `<li class="js-gallery-item"><a class="js-image-container" href="${
            x.largeImageURL
          }"><img class="js-item-image" src="${x.webformatURL}" alt="${
            x.tags
          }" /></a>${imgDesc ? imgDesc[i] : ''}</li>`
      )
      .join('\n\n');
    return markup;
  }

  /**
   * @description Adds new markup to the parent element.
   */

  render() {
    document.querySelector(this.parent).innerHTML = this.#markup;
    const images = document.querySelectorAll('.js-item-image');
    images.forEach((x, i) =>
      x.addEventListener('load', () => {
        document
          .querySelectorAll('.js-gallery-item')
          [i].classList.add('visible');
      })
    );
  }
}

////////////////////////////////////////////////////////////////////////

const refs = {
  form: document.querySelector('.js-search-form'),
  input: document.querySelector('.js-search-input'),
  container: document.querySelector('.js-gallery'),
  checkbox: document.querySelector('.js-search-checkbox'),
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

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  requestParams.q = refs.input.value.trim();

  if (!Gallery.testInput(refs.input.value.trim())) {
    refs.form.classList.add('centered');
    Gallery.showPopup('wrong input');
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
        refs.form.classList.add('centered');
        Gallery.showPopup('nothing found');
        refs.form.reset();
        return;
      }
      refs.form.classList.remove('centered');
      const gallery = new Gallery(
        data.hits,
        '.js-gallery',
        ['largeImageURL', 'webformatURL', 'tags'],
        ['likes', 'views', 'comments', 'downloads'],
        refs.checkbox.checked
      );
      const lightboxInstance = new SimpleLightbox('.js-gallery a', {
        className: 'lightbox-wrapper',
      });

      spinner.remove();
      gallery.render();
      lightboxInstance.refresh();
      refs.form.reset();
    })
    .catch(error => console.log(error));
});

// Код нижче був зроблений виключно у дослідницьких цілях

refs.input.addEventListener('input', e => {
  if (!/^[a-z\s]+$/gi.test(e.target.value)) {
    setTimeout(() => {
      e.target.value = e.target.value.slice(0, -1);
    }, 100);
  }
});
