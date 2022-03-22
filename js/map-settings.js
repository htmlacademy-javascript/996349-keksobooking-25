import {CENTER_TOKIO, switchActiveState, printCoordinate} from './form-validate.js';
import {generateObjects} from './create-data.js';
import {createCard} from './create-modal-card.js';

const MAP_ZOOM = 13;

const map = L.map('map-canvas')
  .on('load', () => {
    switchActiveState();
  })

  .setView({
    lat: CENTER_TOKIO.lat,
    lng: CENTER_TOKIO.lng,
  }, MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const markerMainIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const markerSimularAdIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerMain = L.marker(
  {
    lat: CENTER_TOKIO.lat,
    lng: CENTER_TOKIO.lng,
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
      icon: markerSimularAdIcon,
    },
  );

  markerSimularAd.addTo(map).bindPopup(createCard({author, offer}));
});

markerMain.on('moveend', (evt) => {
  const currenCoordinanate = evt.target.getLatLng();

  printCoordinate(currenCoordinanate.lat, currenCoordinanate.lng);
});
