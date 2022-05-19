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

function showPopup (popup, isFormResetNeeded) {
  if (isFormResetNeeded) {
    formArr.forEach(form => {
      if ((popup === form.closest('.popup'))&&(popup.id === 'popup-add-card')) {
        form.reset();
      } else if ((popup === form.closest('.popup'))&&(popup.id === 'popup-change-profile')) {
        form['profile-name'].value = profileName.textContent;
        form.job.value = profileJob.textContent;
      }
    })
  }
  popup.classList.add('popup_opened');
  popup.addEventListener('keydown', hideOnEscape);
}
function hidePopup (popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('keydown', hideOnEscape);
}
function hideOnEscape (evt) {
  if (evt.key === 'Escape') {
    hidePopup(this);
  }
} 
function createCard (title, imgLink) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true),
          cardImg = cardElement.querySelector('.card__image'),
          cardTitle = cardElement.querySelector('.card__title'),
          cardLikeBtn = cardElement.querySelector('.card__like-btn'),
          cardTrashBtn = cardElement.querySelector('.card__trash-btn');

    cardImg.src = imgLink;
    cardImg.alt = title;
    cardTitle.textContent = title;
    cardLikeBtn.addEventListener('click', event => event.target.classList.toggle('card__like-btn_liked'));
    cardImg.addEventListener('click', () => {
      popupImg.src = imgLink;
      popupImg.alt = title;
      popupTitle.textContent = title;
      showPopup(popupWithCardImg);
    });
    cardTrashBtn.addEventListener('click', () => cardElement.remove());
    
    return cardElement;
}
function renderCard (card) {
  cardGallery.prepend(card);
}
function handleFormSubmit (evt) {
  evt.preventDefault();
  submitForm(this, this.closest('.popup'));
}
function submitForm (formElement, popup) {
  switch (formElement.name) {
    case 'edit-profile':
      profileName.textContent = formElement['profile-name'].value;
      profileJob.textContent = formElement.job.value;
      hidePopup(popup);
      break;
    case 'add-card':
      renderCard(createCard(formElement.title.value, formElement.link.value));
      hidePopup(popup);
      formElement.reset();
      break;
  }
}
function handleEnterPress(formElement) {
  const btnElement = formElement['submit-btn'];

  btnElement.addEventListener('click', evt => {
    evt.preventDefault();
    if (!btnElement.classList.contains('form__submit-btn_disabled')) {
      submitForm(formElement, formElement.closest('.popup'));
  }
  })
}

editButton.addEventListener('click', () => showPopup(popupEditProfile, true));
addButton.addEventListener('click', () => showPopup(popupAddCard, true));

formArr.forEach(form => {
  form.addEventListener('submit', handleFormSubmit);
  handleEnterPress(form);
})
cardArr.forEach(item => renderCard(createCard(item.name, item.link)));

popupArr.forEach(popup => {
  popup.addEventListener('click', evt => {
    if ((evt.target.classList.contains('popup'))||(evt.target.classList.contains('popup__close-btn'))) {
      hidePopup(popup);
    }});
})