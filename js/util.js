const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (max < min) {
    return Math.floor(Math.random() * (min - max + 1) + max);
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomFloatInt = (min, max, float) => {
  let result = 0;

  if (max < min) {
    result = Math.random() * (min - max) + max;
  } else {
    result = Math.random() * (max - min) + min;
  }

  return +result.toFixed(float);
};

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const getRandomArrayLength = (array) => array.slice(0, getRandomInt(1, array.length));

const showErrorAlert = (messege) => {
  const alert = document.createElement('span');
  alert.style.zIndex = 100;
  alert.style.position = 'fixed';
  alert.style.left = 0;
  alert.style.top = 0;
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

export {getRandomInt, getRandomFloatInt, getRandomArrayElement, getRandomArrayLength, showErrorAlert};
