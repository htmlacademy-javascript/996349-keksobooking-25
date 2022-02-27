function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (max < min) {
    return Math.floor(Math.random() * (min - max + 1) + max);
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}

getRandomInt(1, 3);

function getRandomFloatInt (min, max, float) {
  let result = 0;

  if (max < min) {
    result = Math.random() * (min - max) + max;
  } else {
    result = Math.random() * (max - min) + min;
  }

  return +result.toFixed(float);
}

getRandomFloatInt(2, 1, 5);

const SIMULAR_OBJECT_COUNT = 10;

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

function getRandomArrayElement (elements) {
  return elements[getRandomInt(0, elements.length - 1)];
}

function getRandomArrayLength (array) {
  const result = [];

  for (let i = 0; i < getRandomInt(1, array.length); i++) {
    result.push(array[i]);
  }

  return result;
}

const USER_ID = Array.from({length: SIMULAR_OBJECT_COUNT}, (val, idx) => ++idx);

function getUniqueImgNumber () {
  const imgNumber = USER_ID.splice(getRandomInt(0, USER_ID[length - 1]), 1);
  return imgNumber < 10 ? `0${imgNumber}` : `${imgNumber}`;
}

function getUserAvatar () {
  return {
    avatar: `img/avatars/user${getUniqueImgNumber()}.png`,
  };
}

function getUserOffer () {
  return {
    title: 'Title offer',
    address: `${getUserLocation().lat}, ${getUserLocation().lng}`,
    price: getRandomInt(1, 99999),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomInt(1, 5),
    guests: getRandomInt(1, 20),
    checkin: getRandomArrayElement(TIME),
    checkout: getRandomArrayElement(TIME),
    features: getRandomArrayLength(FEATURES),
    description: 'room description',
    photos: getRandomArrayLength(PHOTOS),
  };
}

function getUserLocation () {
  return {
    lat: getRandomFloatInt(35.65000, 35.70000, 5),
    lng: getRandomFloatInt(139.70000, 139.80000, 5),
  };
}

function generateObject () {
  return {
    author: getUserAvatar(),
    offer: getUserOffer(),
    location: getUserLocation(),
  };
}

const simularObject = Array.from({length: SIMULAR_OBJECT_COUNT}, generateObject);
