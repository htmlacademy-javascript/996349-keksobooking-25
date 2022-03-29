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

const COORDINATES_TOKIO = {lat: 35.681729, lng: 139.753927};

const formAdd = document.querySelector('.ad-form');
const formAddChailds = formAdd.children;
const formMapFilter = document.querySelector('.map__filters');
const formMapFilterChailds = formMapFilter.children;
const titleField = formAdd.querySelector('#title');
const priceField = formAdd.querySelector('#price');
const typeField = formAdd.querySelector('#type');
const roomsField = formAdd.querySelector('#room_number');
const capacityField = formAdd.querySelector('#capacity');
const adressField = formAdd.querySelector('#address');
const priceSlider = formAdd.querySelector('.ad-form__slider');
const timeInField = formAdd.querySelector('#timein');
const timeOutField = formAdd.querySelector('#timeout');

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

formAdd.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
});

const printCoordinate = (lat, lng) => {
  adressField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

printCoordinate(COORDINATES_TOKIO.lat, COORDINATES_TOKIO.lng);

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

const switchAttribute = (elements, isDisabled) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = isDisabled;
  }
};

const switchInActiveState = () => {
  formAdd.classList.add('ad-form--disabled');
  formMapFilter.classList.add('map__filters--disabled');

  switchAttribute(formAddChailds, true);
  switchAttribute(formMapFilterChailds, true);
};

const switchActiveState = () => {
  formAdd.classList.remove('ad-form--disabled');
  formMapFilter.classList.remove('map__filters--disabled');

  switchAttribute(formAddChailds, false);
  switchAttribute(formMapFilterChailds, false);
};

switchInActiveState();

export {switchInActiveState, switchActiveState, COORDINATES_TOKIO, printCoordinate};
