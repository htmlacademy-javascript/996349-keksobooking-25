const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const formAdd = document.querySelector('.ad-form');
const avatarFileChoice = formAdd.querySelector('#avatar');
const avatarPreview = formAdd.querySelector('.ad-form-header__preview img');
const houseImageChoice = formAdd.querySelector('#images');
const houseImagePreview = formAdd.querySelector('.ad-form__photo img');

const changeFileHandler = (inputFile, img) => {
  inputFile.addEventListener('change', () => {
    const file = inputFile.files[0];
    const fileName = file.name.toLowerCase();

    const matchType = FILE_TYPES.some((type) => fileName.endsWith(type));

    if (matchType) {
      img.src = URL.createObjectURL(file);
    }
  });
};

changeFileHandler(avatarFileChoice, avatarPreview);
changeFileHandler(houseImageChoice, houseImagePreview);
