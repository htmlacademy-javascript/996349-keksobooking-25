const showErrorAlert = (messege) => {
  const alert = document.createElement('span');
  alert.style.zIndex = '100';
  alert.style.position = 'fixed';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.width = '100%';
  alert.style.padding = '10px';
  alert.style.textAlign = 'center';
  alert.style.fontSize = '20px';
  alert.style.color = '#000';
  alert.style.backgroundColor = '#ff0000';

  alert.textContent = messege;

  document.body.append(alert);

  setTimeout(() => alert.remove(), 5000);
};

const debounce = function (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {showErrorAlert, debounce};
