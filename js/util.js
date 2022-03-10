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

export {getRandomInt, getRandomFloatInt, getRandomArrayElement, getRandomArrayLength};
