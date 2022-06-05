const editButton = document.querySelector('.profile__edit-button'),
      addButton = document.querySelector('.profile__add-button'),
      popupEditProfile = document.querySelector('#popup-change-profile'),
      editProfileForm = popupEditProfile.querySelector('.form'),
      popupAddCard = document.querySelector('#popup-add-card'),
      addCardForm = popupAddCard.querySelector('.form'),
      addCardFormSubmitBtn = addCardForm.querySelector('.form__submit-btn'),
      popupWithCardImg = document.querySelector('#popup-card-image'),
      popupImg = popupWithCardImg.querySelector('.popup__card-img'),
      popupTitle = popupWithCardImg.querySelector('.popup__card-title'),
      cardTemplate = document.querySelector('#card').content,
      cardGallery = document.querySelector('.gallery'),
      profileName = document.querySelector('.profile__name'),
      profileJob = document.querySelector('.profile__job'),
      popupArr = [popupEditProfile, popupAddCard, popupWithCardImg],
      cardArr = [
        {
          name: 'Киото',
          link: './images/Kyoto.jpg'
        },
        {
          name: 'Байкал',
          link: './images/Baikal.jpg'
        },
        {
          name: 'Бали',
          link: './images/Bali.jpg'
        },
        {
          name: 'Сидней',
          link: './images/Sidney.jpg'
        },
        {
          name: 'Нью-Йорк',
          link: './images/NewYork.jpg'
        },
        {
          name: 'Магдебург',
          link: './images/Magdeburg.jpg'
        }
      ];
function refreshInputValues () {
  editProfileForm['profile-name'].value = profileName.textContent;
  editProfileForm['job'].value = profileJob.textContent;
}
function showPopup (popup) {
  if (popup.id === 'popup-change-profile') {
    refreshInputValues();
    console.log("refreshInputValues()");
  }
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
function createCard (props) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true),
          cardImg = cardElement.querySelector('.card__image'),
          cardTitle = cardElement.querySelector('.card__title'),
          cardLikeBtn = cardElement.querySelector('.card__like-btn'),
          cardTrashBtn = cardElement.querySelector('.card__trash-btn');

    cardImg.src = props.imgLink;
    cardImg.alt = props.title;
    cardTitle.textContent = props.title;
    cardLikeBtn.addEventListener('click', event => event.target.classList.toggle('card__like-btn_liked'));
    cardImg.addEventListener('click', () => {
      popupImg.src = props.imgLink;
      popupImg.alt = props.title;
      popupTitle.textContent = props.title;
      showPopup(popupWithCardImg);
    });
    cardTrashBtn.addEventListener('click', () => cardElement.remove());
    
    return cardElement;
}
function renderCard (card) {
  cardGallery.prepend(card);
}
function submitEditProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = editProfileForm['profile-name'].value;
  profileJob.textContent = editProfileForm.job.value;
  hidePopup(popupEditProfile);
}
function submitAddCardForm (evt) {
  evt.preventDefault();
  renderCard(createCard({
    title: addCardForm.title.value, 
    imgLink: addCardForm.link.value
  }));
  addCardForm.reset();
  addCardFormSubmitBtn.classList.add('form__submit-btn_disabled');
  addCardFormSubmitBtn.setAttribute('disabled', true);
  hidePopup(popupAddCard);
}

editButton.addEventListener('click', () => showPopup(popupEditProfile));
addButton.addEventListener('click', () => showPopup(popupAddCard));

editProfileForm.addEventListener('submit', submitEditProfileForm);
addCardForm.addEventListener('submit', submitAddCardForm);

cardArr.forEach(item => renderCard(createCard({
  title: item.name, 
  imgLink: item.link
})));

popupArr.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if ((evt.target.classList.contains('popup'))||(evt.target.classList.contains('popup__close-btn'))) {
      hidePopup(popup);
    }});
});