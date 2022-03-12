import {generateObjects} from './create-data.js';

const TYPES_MAP = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const modalContainer = document.querySelector('#map-canvas');
const templateModalCard = document.querySelector('#card').content.querySelector('.popup');
const modalCards = generateObjects();
const modalContainerFragment = document.createDocumentFragment();

modalCards.forEach(({author: {avatar}, offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}}) => {
  const card = templateModalCard.cloneNode(true);

  const typeElement = card.querySelector('.popup__type');
  const titleElement = card.querySelector('.popup__title');
  const adressElement = card.querySelector('.popup__text--address');
  const priceElement = card.querySelector('.popup__text--price');
  const capacityElement = card.querySelector('.popup__text--capacity');
  const timeElement = card.querySelector('.popup__text--time');
  const descriptionElement = card.querySelector('.popup__description');
  const avatarElement = card.querySelector('.popup__avatar');
  const featuresList = card.querySelector('.popup__features');
  const photoList = card.querySelector('.popup__photos');

  typeElement.textContent = type ? TYPES_MAP[type] : typeElement.remove();
  titleElement.textContent = title ? title : titleElement.remove();
  adressElement.textContent = address ? address : adressElement.remove();
  priceElement.textContent = price ? `${price} ₽/ночь` : priceElement.remove();
  capacityElement.textContent = rooms && guests ? `${rooms} комнаты для ${guests} гостей` : capacityElement.remove();
  timeElement.textContent = checkin && checkout ? `Заезд после ${checkin}, выезд до ${checkout}` : timeElement.remove();
  descriptionElement.textContent = description ? description : descriptionElement.remove();
  avatarElement.src = avatar ? avatar : avatarElement.remove();

  const createPhotoItem = (url) => {
    const photoItem = document.createElement('img');
    photoItem.classList.add('popup__photo');
    photoItem.src = url;
    photoItem.width = 45;
    photoItem.height = 40;
    photoItem.alt = 'Фотография жилья';
    return photoItem;
  };

  const createFeatureItem = (feature) => {
    const featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add(`popup__feature--${feature}`);
    return featureItem;
  };

  if (photos) {
    const photoItems = photos.map(createPhotoItem);
    photoItems.forEach((item) => photoList.append(item));
  } else {
    photoList.remove();
  }

  if (features) {
    const featureItems = features.map(createFeatureItem);
    featureItems.forEach((item) => featuresList.append(item));
  } else {
    featuresList.remove();
  }

  modalContainerFragment.append(card);
});

modalContainer.append(modalContainerFragment);
