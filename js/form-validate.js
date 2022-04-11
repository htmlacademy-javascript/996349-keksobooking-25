import {getData ,sendData} from './ajax.js';
import {markerMain , COORDINATES_TOKIO, printPopups} from './map-settings.js';
import {showErrorAlert} from './util.js';

const DEFAULT_PREVIEW_PICTURE = 'img/muffin-grey.svg';
const TITLE_MAX_VALUE = 100;
const TITLE_MIN_VALUE = 30;
const PRICE_MAX_VALUE = 100000;
const PRICE_MIN_VALUE = {
  'bungalow' : 0,
  'flat' : 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const ROMS_PLACES_MAP = {
  '1' : ['1'],
  '2' : ['1', '2'],
  '3' : ['1', '2', '3'],
  '100' : ['0'],
};

const formFilter = document.querySelector('.map__filters');
const formAdd = document.querySelector('.ad-form');
const titleField = formAdd.querySelector('#title');
const priceField = formAdd.querySelector('#price');
const typeField = formAdd.querySelector('#type');
const roomsField = formAdd.querySelector('#room_number');
const capacityField = formAdd.querySelector('#capacity');
const adressField = formAdd.querySelector('#address');
const priceSlider = formAdd.querySelector('.ad-form__slider');
const timeInField = formAdd.querySelector('#timein');
const timeOutField = formAdd.querySelector('#timeout');
const submitButton = formAdd.querySelector('.ad-form__submit');
const avatarPreview = formAdd.querySelector('.ad-form-header__preview img');
const houseImagePreview = formAdd.querySelector('.ad-form__photo img');

const successMessege = document.querySelector('#success').content.querySelector('.success');
const errorMassege = document.querySelector('#error').content.querySelector('.error');
const errorMassegeButton = errorMassege.querySelector('.error__button');
const resetButton = formAdd.querySelector('.ad-form__reset');

timeInField.addEventListener('change', (evt) => {
  timeOutField.value = evt.target.value;
});

timeOutField.addEventListener('change', (evt) => {
  timeInField.value = evt.target.value;
});

const pristine = new Pristine(formAdd, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error',
});

const validateTitleField = (val) => val.length >= TITLE_MIN_VALUE && val.length <= TITLE_MAX_VALUE;
const validatePriceField = (val) => val >= PRICE_MIN_VALUE[typeField.value] && val <= PRICE_MAX_VALUE;
const validateRoomsCapacityField = () => ROMS_PLACES_MAP[roomsField.value].includes(capacityField.value);

const getTypeFieldErrorMassege = () => {
  if (priceField.value >= PRICE_MAX_VALUE) {
    return `Максимальное значение ${PRICE_MAX_VALUE}`;
  }

  if (priceField.value <= PRICE_MIN_VALUE[typeField.value]) {
    return `Минимальное значение ${PRICE_MIN_VALUE[typeField.value]}`;
  }
};

const getRoomsCapacityFieldErrorMassege = () => {
  switch(roomsField.value) {
    case '1':
      return '1 комната — для 1 гостя';
    case '2':
      return '2 комнаты — для 2 гостей или для 1 гостя';
    case '3':
      return '3 комнаты — для 3 гостей, для 2 гостей или для 1 гостя';
    case '100':
      return '100 комнат — не для гостей';
  }
};

pristine.addValidator(titleField, validateTitleField, `От ${TITLE_MIN_VALUE} до ${TITLE_MAX_VALUE} символов`);
pristine.addValidator(priceField, validatePriceField, getTypeFieldErrorMassege);
pristine.addValidator(roomsField, validateRoomsCapacityField, getRoomsCapacityFieldErrorMassege);
pristine.addValidator(capacityField, validateRoomsCapacityField, getRoomsCapacityFieldErrorMassege);

const switchAttributeSubmitBtn = (isDisabled) => {
  submitButton.disabled = isDisabled;
};

const closeMessege = (element, handler) => {
  element.remove();
  document.removeEventListener('keydown', handler);
};

const successMessegeKeydownHandler = (evt) => {
  if (evt.key === 'Escape') {
    closeMessege(successMessege, successMessegeKeydownHandler);
  }
};

const showSuccesMessege = () => {
  document.body.append(successMessege);

  successMessege.addEventListener('click', (() => {
    closeMessege(successMessege, successMessegeKeydownHandler);
  }));

  document.addEventListener('keydown', successMessegeKeydownHandler);
};

const failMessegeKeydownHendler = (evt) => {
  if (evt.key === 'Escape') {
    closeMessege(errorMassege, failMessegeKeydownHendler);
  }
};

const showFailMessege = () => {
  document.body.append(errorMassege);
  document.addEventListener('keydown', failMessegeKeydownHendler);

  errorMassege.addEventListener('click', (() => {
    closeMessege(errorMassege, failMessegeKeydownHendler);
  }));

  errorMassegeButton.addEventListener('click', (() => {
    closeMessege(errorMassege, failMessegeKeydownHendler);
  }));
};

const printAdressFieldCoordinate = (lat, lng) => {
  adressField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

printAdressFieldCoordinate(COORDINATES_TOKIO.lat, COORDINATES_TOKIO.lng);

noUiSlider.create(priceSlider, {
  range: {
    min: 0,
    max: PRICE_MAX_VALUE,
  },
  start: PRICE_MIN_VALUE['flat'],
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

priceSlider.noUiSlider.on('update', () => {
  priceField.value = priceSlider.noUiSlider.get();
  pristine.validate(priceField);
});

typeField.addEventListener('change', () => {
  const currentVal = PRICE_MIN_VALUE[typeField.value];
  priceField.value = currentVal;

  priceSlider.noUiSlider.updateOptions({
    start: currentVal,
  });
});

priceField.addEventListener('change', () => {
  priceSlider.noUiSlider.updateOptions({
    start: priceField.value,
  });
});

const clearAdForm = () => {
  formAdd.reset();
  formFilter.reset();

  formAdd.querySelector('#images');

  priceSlider.noUiSlider.updateOptions({
    start: PRICE_MIN_VALUE['flat'],
  });

  printAdressFieldCoordinate(COORDINATES_TOKIO.lat, COORDINATES_TOKIO.lng);

  markerMain.setLatLng(COORDINATES_TOKIO);

  avatarPreview.src = DEFAULT_PREVIEW_PICTURE;
  houseImagePreview.src = DEFAULT_PREVIEW_PICTURE;

  getData(
    (popupsSimular) => {
      printPopups(popupsSimular);
    },
    (error) => showErrorAlert(`При загрузке данных произошла ошибка: ${error}`)
  );
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  clearAdForm();
});


formAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    switchAttributeSubmitBtn(true);
    sendData(
      () => {
        clearAdForm();
        // showMessege(successMassege);
        showSuccesMessege();
        switchAttributeSubmitBtn(false);
      },
      () => {
        showFailMessege();
        // showMessege(errorMassege, errorMassegeButton);
        switchAttributeSubmitBtn(false);
      },
      new FormData(evt.target)
    );
  }
});

export {printAdressFieldCoordinate};
