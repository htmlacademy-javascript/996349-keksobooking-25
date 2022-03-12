const formAdd = document.querySelector('.ad-form');
const formAddChailds = formAdd.children;
const formMapFilter = document.querySelector('.map__filters');
const formMapFilterChailds = formMapFilter.children;

const switchInActiveState = () => {
  formAdd.classList.add('ad-form--disabled');
  formMapFilter.classList.add('map__filters--disabled');

  for (let i = 0; i < formAddChailds.length; i++) {
    formAddChailds[i].setAttribute('disabled', 'disabled');
  }

  for (let i = 0; i < formMapFilterChailds.length; i++) {
    formMapFilterChailds[i].setAttribute('disabled', 'disabled');
  }
};

const switchActiveState = () => {
  formAdd.classList.remove('ad-form--disabled');
  formMapFilter.classList.remove('map__filters--disabled');

  for (let i = 0; i < formAddChailds.length; i++) {
    formAddChailds[i].removeAttribute('disabled');
  }

  for (let i = 0; i < formMapFilterChailds.length; i++) {
    formMapFilterChailds[i].removeAttribute('disabled');
  }
};

export {switchInActiveState, switchActiveState};
