import Card from './Card.js';
import FormValidator from './FormValidator.js';

const cardData = [
  {
    title: 'Киото',
    img: './images/Kyoto.jpg'
  },
  {
    title: 'Байкал',
    img: './images/Baikal.jpg'
  },
  {
    title: 'Бали',
    img: './images/Bali.jpg'
  },
  {
    title: 'Сидней',
    img: './images/Sidney.jpg'
  },
  {
    title: 'Нью-Йорк',
    img: './images/NewYork.jpg'
  },
  {
    title: 'Магдебург',
    img: './images/Magdeburg.jpg'
  }
];

const popups = {
  editProfile: {
    popupElement: document.querySelector('#popup-change-profile'),
    form: {
      formElement: document.querySelector('#edit-profile'),
      name: document.querySelector('#nameInput'),
      job: document.querySelector('#jobInput')
    },
  },
  cardDetails: {
    popupElement: document.querySelector('#popup-card-image'),
    data: {
      img: document.querySelector('.popup__card-img'),
      title: document.querySelector('.popup__card-title')
    }
  },
  addCard: {
    popupElement: document.querySelector('#popup-add-card'),
    form: {
      formElement: document.querySelector('#add-card'),
      title: document.querySelector('#cardTitleInput'),
      img: document.querySelector('#cardImgLinkInput'),
    },

  }
}

const profile = {
  name: document.querySelector('.profile__name'),
  job: document.querySelector('.profile__job')
}
const formSelectors = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
}

const editButton = document.querySelector('.profile__edit-button'),
      addButton = document.querySelector('.profile__add-button'),
      cardTemplateSelector = '#card',
      cardGallery = document.querySelector('.gallery')

function showPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', hideOnEscape);
}
function handleOpenImage(props) {
  const {data, popupElement} = popups.cardDetails;
  data.title.textContent = props.title;
  data.img.alt = props.title;
  data.img.src = props.img;

  showPopup(popupElement);
}
function hidePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', hideOnEscape);
}
function hideOnEscape (evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector(".popup_opened");
    hidePopup(popupActive);
  }
}
function createCard (props, cardTemplateSelector, handleOpenImage) {
  const card = new Card (props, cardTemplateSelector, handleOpenImage);
  return card.createCard();
}
function renderCard (card) {
  cardGallery.prepend(card);
}
function submitEditProfileForm (evt) {
  evt.preventDefault();
  const {form, popupElement} = popups.editProfile;

  profile.name.textContent = form.name.value;
  profile.job.textContent = form.job.value;
  hidePopup(popupElement);
}
function submitAddCardForm (evt) {
  evt.preventDefault();
  const {form, popupElement} = popups.addCard;
  renderCard(createCard ({'title': form.title.value, 'img': form.img.value}, cardTemplateSelector, handleOpenImage));
  hidePopup(popupElement);
  form.formElement.reset();
} 

editButton.addEventListener('click', () => {
  const {popupElement, form} = popups.editProfile;
  form.name.value = profile.name.textContent;
  form.job.value = profile.job.textContent;
  editProfileFormValidator.resetErrors();
  showPopup(popupElement)
});
addButton.addEventListener('click', () => {
  const {popupElement, form} = popups.addCard;
  form.img.value = '';
  form.title.value = '';
  addCardFormValidator.resetErrors();
  showPopup(popupElement)
});

popups.addCard.form.formElement.addEventListener('submit', submitAddCardForm);
const addCardFormValidator = new FormValidator(formSelectors, popups.addCard.form.formElement);
addCardFormValidator.enableValidation();

popups.editProfile.form.formElement.addEventListener('submit', submitEditProfileForm);
const editProfileFormValidator = new FormValidator(formSelectors, popups.editProfile.form.formElement);
editProfileFormValidator.enableValidation();

cardData.forEach(item => {
  renderCard(createCard (item, cardTemplateSelector, handleOpenImage))
});

for (let item in popups) {
  popups[item].popupElement.addEventListener('mousedown', evt => {
    if ((evt.target.classList.contains('popup'))||(evt.target.classList.contains('popup__close-btn'))) {
      hidePopup(popups[item].popupElement);
    }});
}
