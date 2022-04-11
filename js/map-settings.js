import {printAdressFieldCoordinate} from './form-validate.js';
import {getData} from './ajax.js';
import {showErrorAlert, debounce} from './util.js';
import {createPopup} from './create-popup.js';
import {filterPopup, setChangeHandler} from './filter-popups.js';

const MAP_ZOOM = 13;
const MAIN_ICON_URL = './img/main-pin.svg';
const MAIN_ICON_SIZE = [52, 52];
const MAIN_ICON_ANCHOR = [26, 52];
const SIMULAR_ICON_URL = './img/pin.svg';
const SIMULAR_ICON_SIZE = [40, 40];
const SIMULAR_ICON_ANCHOR = [20, 40];
const QUALITY_SIMULAR_POPUPS = 10;
const PRINT_POPUPS_DELAY = 500;

const COORDINATES_TOKIO = {
  lat: 35.681729,
  lng: 139.753927
};

const formAdd = document.querySelector('.ad-form');
const formAddChailds = formAdd.children;
const formMapFilter = document.querySelector('.map__filters');
const formMapFilterChailds = formMapFilter.children;
const typeSelect = document.querySelector('#housing-type');
const priceSelect = document.querySelector('#housing-price');
const roomsSelect = document.querySelector('#housing-rooms');
const guestsSelect = document.querySelector('#housing-guests');
const featuresCheckboxWrapper = document.querySelector('#housing-features');

const switchAttribute = (elements, isDisabled) => {
  Array.from(elements).forEach((element) => {
    element.disabled = isDisabled;
  });
};

const switchInActiveState = () => {
  formAdd.classList.add('ad-form--disabled');
  formMapFilter.classList.add('map__filters--disabled');

  switchAttribute(formAddChailds, true);
  switchAttribute(formMapFilterChailds, true);
};

const switchActiveStateAddForm = () => {
  formAdd.classList.remove('ad-form--disabled');
  switchAttribute(formAddChailds, false);
};

const switchActiveStateFilterForm = () => {
  formMapFilter.classList.remove('map__filters--disabled');
  switchAttribute(formMapFilterChailds, false);
};

switchInActiveState();

const map = L.map('map-canvas');

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

const markerGroup = L.layerGroup().addTo(map);

markerMain.on('move', (evt) => {
  const currenCoordinanate = evt.target.getLatLng();

  printAdressFieldCoordinate(currenCoordinanate.lat, currenCoordinanate.lng);
});

const renderPopups = ({author, offer, location: {lat, lng}}) => {
  const markerPopop = L.marker(
    {
      lat,
      lng
    },
    {
      icon: markerSimularIcon
    }
  );

  markerPopop.addTo(markerGroup).bindPopup(createPopup({author, offer}));
};

const printPopups = (popupsSimular) => {
  markerGroup.clearLayers();

  popupsSimular
    .filter(filterPopup)
    .slice(0, QUALITY_SIMULAR_POPUPS)
    .forEach(renderPopups);
};

map.on('load', () => {
  switchActiveStateAddForm();

  getData(
    (popupsSimular) => {
      printPopups(popupsSimular);
      setChangeHandler(typeSelect, debounce(() => printPopups(popupsSimular)), PRINT_POPUPS_DELAY);
      setChangeHandler(priceSelect, debounce(() => printPopups(popupsSimular)), PRINT_POPUPS_DELAY);
      setChangeHandler(roomsSelect, debounce(() => printPopups(popupsSimular)), PRINT_POPUPS_DELAY);
      setChangeHandler(guestsSelect, debounce(() => printPopups(popupsSimular)), PRINT_POPUPS_DELAY);
      setChangeHandler(featuresCheckboxWrapper, debounce(() => printPopups(popupsSimular)), PRINT_POPUPS_DELAY);
    },
    (error) => {
      formMapFilter.classList.add('map__filters--disabled');
      switchAttribute(formMapFilterChailds, true);
      showErrorAlert(`При загрузке данных произошла ошибка: ${error}`);
    }
  );

  switchActiveStateFilterForm();
}).setView(COORDINATES_TOKIO, MAP_ZOOM);

export {COORDINATES_TOKIO , markerMain, printPopups};
