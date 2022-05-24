const editButton = document.querySelector('.profile__edit-button'),
      addButton = document.querySelector('.profile__add-button'),
      popupEditProfile = document.querySelector('#popup-change-profile'),
      popupAddCard = document.querySelector('#popup-add-card'),
      popupWithCardImg = document.querySelector('#popup-card-image'),
      popupImg = popupWithCardImg.querySelector('.popup__card-img'),
      popupTitle = popupWithCardImg.querySelector('.popup__card-title'),
      cardTemplate = document.querySelector('#card').content,
      cardGallery = document.querySelector('.gallery'),
      profileName = document.querySelector('.profile__name'),
      profileJob = document.querySelector('.profile__job'),
      formArr = Array.from(document.forms),
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
  document.forms['edit-profile']['profile-name'].value = profileName.textContent;
  document.forms['edit-profile']['job'].value = profileJob.textContent;
}
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
function submitEditProfileForm (formElement) {
  profileName.textContent = formElement['profile-name'].value;
  profileJob.textContent = formElement.job.value;
  hidePopup(formElement.closest('.popup'));
}
function submitAddCardForm (formElement) {
  renderCard(createCard({
    title: formElement.title.value, 
    imgLink: formElement.link.value
  }));
  formElement.reset();
  formElement['submit-btn'].classList.add('form__submit-btn_disabled');
  hidePopup(formElement.closest('.popup'));
}
function handleFormSubmit (evt) {
  evt.preventDefault();
  if (!evt.target['submit-btn'].classList.contains('form__submit-btn_disabled')) {
    switch (evt.target.name) {
      case 'add-card':
        submitAddCardForm(evt.target);
        break;
      case 'edit-profile':
        submitEditProfileForm(evt.target);
        break;
    }
  }
}

editButton.addEventListener('click', () => showPopup(popupEditProfile));
addButton.addEventListener('click', () => showPopup(popupAddCard));

formArr.forEach(form => {
  form.addEventListener('submit', handleFormSubmit);
});
cardArr.forEach(item => renderCard(createCard({
  title: item.name, 
  imgLink: item.link})));

popupArr.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if ((evt.target.classList.contains('popup'))||(evt.target.classList.contains('popup__close-btn'))) {
      hidePopup(popup);
      if (popup.id === 'popup-change-profile') {
        refreshInputValues();
      }
    }});
});
refreshInputValues();