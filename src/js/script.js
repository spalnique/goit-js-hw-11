class Gallery {
  constructor() {}

  static testInput(e) {
    const target = e.target.value;

    if (!target.trim() || !/^[a-z\s]+$/gi.test(target.trim())) {
      refs.button.disabled = true;
      refs.canSubmit = false;
    } else {
      refs.button.disabled = false;
      refs.canSubmit = true;
    }
  }

  static fetchImages(e) {}

  static postImages(data) {}
}

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.search-input'),
  button: document.querySelector('.search-button'),
  canSubmit: false,
};

refs.input.addEventListener('input', Gallery.testInput);
