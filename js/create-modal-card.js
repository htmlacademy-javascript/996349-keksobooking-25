const TYPES_MAP = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const createPhotoItem = (url) => {
  const photoItem = document.createElement('img');
  photoItem.classList.add('popup__photo');
  photoItem.src = url;
  photoItem.width = 45;
  photoItem.height = 40;
  photoItem.alt = 'Фотография жилья';
  return photoItem;
};

const createFeatureItem = (modifier) => {
  const featureItem = document.createElement('li');
  featureItem.classList.add('popup__feature');
  featureItem.classList.add(`popup__feature--${modifier}`);
  return featureItem;
};

const printData = (element, condition, content, fieldContent = 'textContent') => {
  if (condition) {
    element[fieldContent] = content;
  } else {
    element.remove();
  }
};

const printArrayData = (elements, append, createElement) => {
  if (elements) {
    elements.forEach((val) => {
      append.append(createElement(val));
    });
  } else {
    append.remove();
  }
};

const templatePopup = document.querySelector('#card').content.querySelector('.popup');

const createPopup = ({author, offer}) => {
  const popup = templatePopup.cloneNode(true);
  const typeElement = popup.querySelector('.popup__type');
  const titleElement = popup.querySelector('.popup__title');
  const adressElement = popup.querySelector('.popup__text--address');
  const priceElement = popup.querySelector('.popup__text--price');
  const capacityElement = popup.querySelector('.popup__text--capacity');
  const timeElement = popup.querySelector('.popup__text--time');
  const descriptionElement = popup.querySelector('.popup__description');
  const avatarElement = popup.querySelector('.popup__avatar');
  const featuresList = popup.querySelector('.popup__features');
  const photoList = popup.querySelector('.popup__photos');

  printData(typeElement,offer.type, TYPES_MAP[offer.type]);
  printData(titleElement, offer.title, offer.title);
  printData(adressElement, offer.address, offer.address);
  printData(descriptionElement, offer.description, offer.description);
  printData(priceElement, offer.price, `${offer.price} ₽/ночь`);
  printData(capacityElement, offer.rooms && offer.guests, `${offer.rooms} комнаты для ${offer.guests} гостей`);
  printData(timeElement, offer.checkin && offer.checkout, `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  printData(avatarElement, author.avatar, author.avatar, 'src');
  printArrayData(offer.photos, photoList, createPhotoItem);
  printArrayData(offer.features, featuresList, createFeatureItem);

  return popup;
};

export {createPopup};
