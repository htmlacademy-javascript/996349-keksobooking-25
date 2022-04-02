import {printAdressFieldCoordinate} from './form-validate.js';
import {getData} from './ajax.js';
import {showErrorAlert} from './util.js';
import {createPopup} from './create-modal-card.js';

const MAP_ZOOM = 13;
const MAIN_ICON_URL = './img/main-pin.svg';
const MAIN_ICON_SIZE = [52, 52];
const MAIN_ICON_ANCHOR = [26, 52];
const SIMULAR_ICON_URL = './img/pin.svg';
const SIMULAR_ICON_SIZE = [40, 40];
const SIMULAR_ICON_ANCHOR = [20, 40];

const COORDINATES_TOKIO = {
  lat: 35.681729,
  lng: 139.753927
};

const formAdd = document.querySelector('.ad-form');
const formAddChailds = formAdd.children;
const formMapFilter = document.querySelector('.map__filters');
const formMapFilterChailds = formMapFilter.children;

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

const map = L.map('map-canvas')
  .on('load', () => {
    switchActiveState();
  })
  .setView(COORDINATES_TOKIO, MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const getMarker = (ulr, size, anchor) => {
  const iconSettings = {
    iconUrl: ulr,
    iconSize: size,
    iconAnchor: anchor,
  };

  return iconSettings;
};

const markerMainIcon = L.icon(getMarker(MAIN_ICON_URL, MAIN_ICON_SIZE, MAIN_ICON_ANCHOR));
const markerSimularIcon = L.icon(getMarker(SIMULAR_ICON_URL, SIMULAR_ICON_SIZE, SIMULAR_ICON_ANCHOR));

const markerMain = L.marker(
  {
    lat: COORDINATES_TOKIO.lat,
    lng: COORDINATES_TOKIO.lng,
  },
  {
    draggable: true,
    icon: markerMainIcon,
    riseOnHover: true
  },
);

markerMain.addTo(map);

getData((markersSimular) => {
  markersSimular.forEach(({author, offer, location: {lat, lng}}) => {
    const markerSimularAd = L.marker(
      {
        lat,
        lng
      },
      {
        icon: markerSimularIcon
      }
    );

    markerSimularAd.addTo(map).bindPopup(createPopup({author, offer}));
  });
}, (error) => showErrorAlert(`При загрузке данных произошла ошибка: ${error}`));

markerMain.on('moveend', (evt) => {
  const currenCoordinanate = evt.target.getLatLng();

  printAdressFieldCoordinate(currenCoordinanate.lat, currenCoordinanate.lng);
});

export {COORDINATES_TOKIO , markerMain};
