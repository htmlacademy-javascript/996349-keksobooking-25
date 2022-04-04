const GET_DATA_URL = 'https://25.javascript.pages.academy/keksobooking/data';
const SEND_DATA_URL = 'https://25.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => {
  fetch(GET_DATA_URL)
    .then((Response) => Response.json())
    .then((adDatas) => onSuccess(adDatas))
    .catch(onFail);
};

const sendData = (onSuccess, onFail, body) => {
  fetch(SEND_DATA_URL, {
    method : 'POST',
    body: body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(onFail);
};

export {getData, sendData};
