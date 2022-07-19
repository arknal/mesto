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
function hidePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', hideOnEscape);
}
function hideOnEscape (evt) {
  const popupActive = document.querySelector(".popup_opened");
  if (evt.key === 'Escape') {
    hidePopup(popupActive);
  }
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
  const {form, popupElement} = popups.addCard,
        card = new Card ({title: form.title.value, img: form.img.value}, cardTemplateSelector, popups.cardDetails, showPopup);
  renderCard(card.createCard());
  hidePopup(popupElement);
  form.formElement.reset();
  addCardFormValidator.toggleButtonState();
} 

editButton.addEventListener('click', () => showPopup(popups.editProfile.popupElement));
addButton.addEventListener('click', () => showPopup(popups.addCard.popupElement));

popups.addCard.form.formElement.addEventListener('submit', submitAddCardForm);
const addCardFormValidator = new FormValidator(formSelectors, popups.addCard.form.formElement);
addCardFormValidator.enableValidation();

popups.editProfile.form.formElement.addEventListener('submit', submitEditProfileForm);
const editProfileFormValidator = new FormValidator(formSelectors, popups.editProfile.form.formElement);
editProfileFormValidator.enableValidation();

cardData.forEach(item => {
  const cardElement = new Card (item, cardTemplateSelector, popups.cardDetails, showPopup);
  renderCard(cardElement.createCard())
});

for (let item in popups) {
  popups[item].popupElement.addEventListener('mousedown', evt => {
    if ((evt.target.classList.contains('popup'))||(evt.target.classList.contains('popup__close-btn'))) {
      hidePopup(popups[item].popupElement);
    }});
}
