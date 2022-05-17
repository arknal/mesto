const editButton = document.querySelector('.profile__edit-button'),
      addButton = document.querySelector('.profile__add-button'),
      popupEditProfile = document.querySelector('#popup-change-profile'),
      editProfileForm = document.forms['edit-profile'],
      popupAddCard = document.querySelector('#popup-add-card'),
      addCardForm = document.forms['add-card'],
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
  profileName.textContent = editProfileForm.name.value;
  profileJob.textContent = editProfileForm.job.value;
  hidePopup(popupEditProfile);
}
function handleAddCardFormSubmit (evt) {
  evt.preventDefault();
  renderCard(createCard(addCardForm.title.value, addCardForm.link.value));
  hidePopup(popupAddCard);
  addCardForm.reset();
}

addButton.addEventListener('click', () => showPopup(popupAddCard));
addCardForm.addEventListener('submit', handleAddCardFormSubmit); 
editButton.addEventListener('click', () => showPopup(popupEditProfile));
editProfileForm.addEventListener('submit', handleProfileFormSubmit); 
cardArr.forEach(item => renderCard(createCard(item.name, item.link)));

popupArr.forEach(popup => {
  popup.addEventListener('click', evt => {
    if ((evt.target.classList.contains('popup'))||(evt.target.classList.contains('popup__close-btn'))) {
      hidePopup(popup);
    }});
  popup.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
      hidePopup(popup);
    }
  });
})