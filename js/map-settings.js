import {COORDINATES_TOKIO, switchActiveState, printCoordinate} from './form-validate.js';
import {generateObjects} from './create-data.js';
import {createPopup} from './create-modal-card.js';

const MAP_ZOOM = 13;
const MAIN_ICON_URL = './img/main-pin.svg';
const MAIN_ICON_SIZE = [52, 52];
const MAIN_ICON_ANCHOR = [26, 52];
const SIMULAR_ICON_URL = './img/pin.svg';
const SIMULAR_ICON_SIZE = [40, 40];
const SIMULAR_ICON_ANCHOR = [20, 40];

const map = L.map('map-canvas')
  .on('load', () => {
    switchActiveState();
  })

  .setView({
    lat: COORDINATES_TOKIO.lat,
    lng: COORDINATES_TOKIO.lng,
  }, MAP_ZOOM);

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
  },
);

markerMain.addTo(map);

const pointsSimularAd = generateObjects();

pointsSimularAd.forEach(({author, offer, location: {lat, lng}}) => {
  const markerSimularAd = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: markerSimularIcon,
    },
  );

  markerSimularAd.addTo(map).bindPopup(createPopup({author, offer}));
});

markerMain.on('moveend', (evt) => {
  const currenCoordinanate = evt.target.getLatLng();

  printCoordinate(currenCoordinanate.lat, currenCoordinanate.lng);
});
