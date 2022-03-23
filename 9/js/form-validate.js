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

const formAdd = document.querySelector('.ad-form');
const formAddChailds = formAdd.children;
const formMapFilter = document.querySelector('.map__filters');
const formMapFilterChailds = formMapFilter.children;
const titleField = formAdd.querySelector('#title');
const priceField = formAdd.querySelector('#price');
const typeField = formAdd.querySelector('#type');
const roomsField = formAdd.querySelector('#room_number');
const capacityField = formAdd.querySelector('#capacity');
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

typeField.addEventListener('change', () => {
  priceField.placeholder = PRICE_MIN_VALUE[typeField.value];
});

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

const switchInActiveState = () => {
  formAdd.classList.add('ad-form--disabled');
  formMapFilter.classList.add('map__filters--disabled');

  for (let i = 0; i < formAddChailds.length; i++) {
    formAddChailds[i].setAttribute('disabled', 'disabled');
  }

  for (let i = 0; i < formMapFilterChailds.length; i++) {
    formMapFilterChailds[i].setAttribute('disabled', 'disabled');
  }
};

const switchActiveState = () => {
  formAdd.classList.remove('ad-form--disabled');
  formMapFilter.classList.remove('map__filters--disabled');

  for (let i = 0; i < formAddChailds.length; i++) {
    formAddChailds[i].removeAttribute('disabled');
  }

  for (let i = 0; i < formMapFilterChailds.length; i++) {
    formMapFilterChailds[i].removeAttribute('disabled');
  }
};

export {switchInActiveState, switchActiveState};
