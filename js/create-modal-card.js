const TYPES_MAP = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const templateModalCard = document.querySelector('#card').content.querySelector('.popup');

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

const createCard = ({author , offer}) => {
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

  typeElement.textContent = offer.type ? TYPES_MAP[offer.type] : typeElement.remove();
  titleElement.textContent =  offer.title ?  offer.title : titleElement.remove();
  adressElement.textContent =  offer.address ?  offer.address : adressElement.remove();
  priceElement.textContent =  offer.price ? `${ offer.price} ₽/ночь` : priceElement.remove();
  capacityElement.textContent =  offer.rooms &&  offer.guests ? `${ offer.rooms} комнаты для ${ offer.guests} гостей` : capacityElement.remove();
  timeElement.textContent =  offer.checkin &&  offer.checkout ? `Заезд после ${ offer.checkin}, выезд до ${ offer.checkout}` : timeElement.remove();
  descriptionElement.textContent =  offer.description ?  offer.description : descriptionElement.remove();
  avatarElement.src = author.avatar ? author.avatar : avatarElement.remove();

  if (offer.photos) {
    const photoItems = offer.photos.map(createPhotoItem);
    photoItems.forEach((item) => photoList.append(item));
  } else {
    photoList.remove();
  }

  if (offer.features) {
    const featureItems = offer.features.map(createFeatureItem);
    featureItems.forEach((item) => featuresList.append(item));
  } else {
    featuresList.remove();
  }

  return card;
};

export {createCard};
