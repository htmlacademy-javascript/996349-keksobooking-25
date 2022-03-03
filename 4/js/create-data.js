import {getRandomInt, getRandomFloatInt, getRandomArrayElement, getRandomArrayLength} from './util.js';

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const FLOAT = 5;
const PRICE_MIN = 1;
const PRICE_MAX = 99999;
const ROOMS_MIN = 1;
const ROOMS_MAX = 5;
const GUESTS_MIN = 1;
const GUESTS_MAX = 20;
const TWO_DIGITS_NUMBER = 10;
const QUANTITY_OBJECTS = 10;

const getImgNumber = (number) => number < TWO_DIGITS_NUMBER ? `0${number}` : number;

const generateObject = (val, idx) => {
  const location = {
    lat: getRandomFloatInt(MIN_LAT, MAX_LAT, FLOAT),
    lng: getRandomFloatInt(MIN_LNG, MAX_LNG, FLOAT),
  };

  return {
    author: {
      avatar: `img/avatars/user${getImgNumber(idx + 1)}.png`,
    },
    offer: {
      title: 'Title offer',
      address: `${location.lat}, ${location.lng}`,
      price: getRandomInt(PRICE_MIN, PRICE_MAX),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInt(ROOMS_MIN, ROOMS_MAX),
      guests: getRandomInt(GUESTS_MIN, GUESTS_MAX),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features: getRandomArrayLength(FEATURES),
      description: 'room description',
      photos: getRandomArrayLength(PHOTOS),
    },
    location,
  };
};

const generateObjects = () => Array.from({length: QUANTITY_OBJECTS}, generateObject);

export {generateObjects};
