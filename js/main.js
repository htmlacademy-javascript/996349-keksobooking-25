function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (max < min) {
    return Math.floor(Math.random() * (min - max + 1) + max);
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}

getRandomInt(1, 3);

function getRandomFloatInt (min, max, float) {
  let result = 0;

  if (max < min) {
    result = Math.random() * (min - max) + max;
  } else {
    result = Math.random() * (max - min) + min;
  }

  return +result.toFixed(float);
}

getRandomFloatInt(2, 1, 5);
