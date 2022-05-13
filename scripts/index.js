const editButton = document.querySelector('.profile__edit-button'),
      addButton = document.querySelector('.profile__add-button'),
      popupEditProfile = document.querySelector('#popup-change-profile'),
      popupEditProfileForm = popupEditProfile.querySelector('.edit-form'),
      nameInput = popupEditProfile.querySelector('.edit-form__input_name'),
      jobInput = popupEditProfile.querySelector('.edit-form__input_job'),
      popupAddCard = document.querySelector('#popup-add-card'),
      popupAddCardForm = popupAddCard.querySelector('.edit-form'),
      cardTitle = popupAddCardForm.querySelector('.edit-form__input_name'),
      cardImgLink = popupAddCardForm.querySelector('.edit-form__input_job'),
      popupWithCardImg = document.querySelector('#popup-card-image'),
      popupImg = popupWithCardImg.querySelector('.popup__card-img'),
      popupTitle = popupWithCardImg.querySelector('.popup__card-title'),
      cardTemplate = document.querySelector('#card').content,
      cardGallery = document.querySelector('.gallery'),
      profileName = document.querySelector('.profile__name'),
      profileJob = document.querySelector('.profile__job'),
      closeBtns = document.querySelectorAll('.popup__close-btn'),
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

function showPopup (popup) {
  popup.classList.add('popup_opened');
}
function hidePopup (popup) {
  popup.classList.remove('popup_opened');
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
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  hidePopup(popupEditProfile);
}
function handleAddCardFormSubmit (evt) {
  evt.preventDefault();
  renderCard(createCard(cardTitle.value, cardImgLink.value));
  hidePopup(popupAddCard);
  popupAddCardForm.reset();
}

addButton.addEventListener('click', () => showPopup(popupAddCard));
popupAddCardForm.addEventListener('submit', handleAddCardFormSubmit); 
editButton.addEventListener('click', () => showPopup(popupEditProfile));
popupEditProfileForm.addEventListener('submit', handleProfileFormSubmit); 
cardArr.forEach(item => renderCard(createCard(item.name, item.link)));
closeBtns.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => hidePopup(popup));
});
