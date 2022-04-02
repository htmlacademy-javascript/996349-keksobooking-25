const getData = (onSuccess, onFail) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((Response) => Response.json())
    .then((adDatas) => onSuccess(adDatas))
    .catch((error) => onFail(error));
};

const sendData = (onSuccess, onfail, body) => {
  fetch('https://25.javascript.pages.academ/keksobooking', {
    method : 'POST',
    body: body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onfail();
      }
    })
    .catch(() => onfail());
};

export {getData, sendData};
