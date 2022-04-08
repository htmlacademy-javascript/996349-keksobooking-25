const PRICE_LOW_VALUE = 10000;
const PRICE_HIGH_VALUE = 50000;
const PRICE_MIDDLE_FROM_VALUE = 10000;
const PRICE_MIDDLE_BEFORE_VALUE = 50000;
const ROOMS_ONE_VALUE = '1';
const ROOMS_TWOO_VALUE = '2';
const ROOMS_THREE_VALUE = '3';

const formFilter = document.querySelector('.map__filters');
const typeSelect = document.querySelector('#housing-type');
const priceSelect = document.querySelector('#housing-price');
const roomsSelect = document.querySelector('#housing-rooms');
const guestsSelect = document.querySelector('#housing-guests');

const filter = {
  housingType: (currentVal, popup) => {
    if (currentVal === 'any' || currentVal === popup.offer.type) {
      return true;
    }
    return false;
  },
  housingPrice: (currentVal, popup) => {
    if (currentVal === 'any' || currentVal === 'low' && popup.offer.price <= PRICE_LOW_VALUE || currentVal === 'middle' && popup.offer.price >= PRICE_MIDDLE_FROM_VALUE && popup.offer.price <= PRICE_MIDDLE_BEFORE_VALUE || currentVal === 'high' && popup.offer.price >= PRICE_HIGH_VALUE) {
      return true;
    }
    return false;
  },
  housingRooms: (currentVal, popup) => {
    if (currentVal === 'any' || currentVal === ROOMS_ONE_VALUE && +currentVal === popup.offer.rooms || currentVal === ROOMS_TWOO_VALUE && +currentVal === popup.offer.rooms || currentVal === ROOMS_THREE_VALUE && +currentVal === ROOMS_THREE_VALUE) {
      return true;
    }
    return false;
  },
  housingGuests: (currentVal, popup) => {
    if (currentVal === 'any' || currentVal === '0' && +currentVal === popup.offer.guests || currentVal === '1' && +currentVal === popup.offer.guests || currentVal === '2' && +currentVal === popup.offer.guests) {
      return true;
    }
    return false;
  },
  features: (currentVal, popup) => {
    if (currentVal.length === 0) {
      return true;
    }

    if (!popup.offer.features) {
      return false;
    }

    return currentVal.every((val) => popup.offer.features.includes(val));
  }
};

const filterPopup = (popup) => {
  const formData = new FormData(formFilter);
  const typeValue = typeSelect.value;
  const priceValue = priceSelect.value;
  const roomsValue = roomsSelect.value;
  const guestsValue = guestsSelect.value;
  const featureValues = formData.getAll('features');

  if (filter.housingType(typeValue, popup) && filter.housingPrice(priceValue, popup) && filter.housingRooms(roomsValue, popup) && filter.housingGuests(guestsValue, popup) && filter.features(featureValues, popup)) {
    return true;
  }

  return false;
};

const setChangeHandler = (element, cb) => {
  if (element) {
    element.addEventListener('change', cb);
  }
};

export {filterPopup, setChangeHandler};
