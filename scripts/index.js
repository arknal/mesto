const editButton = document.querySelector('.profile__edit-button'),
      addButton = document.querySelector('.profile__add-button'),
      popupEditProfile = document.querySelector('#popup-change-profile'),
      popupAddCard = document.querySelector('#popup-add-card'),
      popupCardImage = document.querySelector("#popup-card-image"),
      cardTemplate = document.querySelector('#card').content,
      cardGallery = document.querySelector('.gallery'),
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
  popup.classList.remove('animation_close');
  popup.classList.add('animation_open'); 
}
function hidePopup (popup, isAnimationNeeded = true) {
  if (isAnimationNeeded) {
    popup.classList.remove('animation_open');
    popup.classList.add('animation_close');
  } else {
    popup.classList.remove('animation_open');
  }
} 
function handleAddCardFormSubmit (evt) {
  const cardTitle = popupAddCard.querySelector('.edit-form__input_name'),
        cardImgLink = popupAddCard.querySelector('.edit-form__input_job');
  evt.preventDefault();
  renderCard(cardTitle.value, cardImgLink.value);
  hidePopup(popupAddCard, false);
  cardImgLink.value = '';
  cardTitle.value = '';
}

function renderCard (title, imgLink) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    card.querySelector('.card__image').src = imgLink;
    card.querySelector('.card__title').textContent = title;
    card.querySelector('.card__like-btn').addEventListener('click', event => event.target.classList.toggle('card__like-btn_liked'));
    card.querySelector('.card__image').addEventListener('click', event => {
      popupCardImage.querySelector('.popup__card-img').src = imgLink;
      popupCardImage.querySelector('.popup__card-title').textContent = title;
      showPopup(popupCardImage);
    });
    card.querySelector('.card__trash-btn').addEventListener('click', event => event.target.parentNode.parentNode.remove());
    cardGallery.prepend(card);
}
function handleProfileFormSubmit (evt) {
  const nameInput = popupEditProfile.querySelector('.edit-form__input_name'),
        jobInput = popupEditProfile.querySelector('.edit-form__input_job'),
        profileName = document.querySelector('.profile__name'),
        profileJob = document.querySelector('.profile__job');
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  hidePopup(popupEditProfile, false);
}

addButton.addEventListener('click', () => showPopup(popupAddCard));
popupAddCard.querySelector('.popup__close-btn').addEventListener('click', () => hidePopup(popupAddCard));
popupAddCard.querySelector('.edit-form').addEventListener('submit', handleAddCardFormSubmit); 

editButton.addEventListener('click', () => showPopup(popupEditProfile));
popupEditProfile.querySelector('.popup__close-btn').addEventListener('click', () => hidePopup(popupEditProfile));
popupEditProfile.querySelector('.edit-form').addEventListener('submit', handleProfileFormSubmit); 

popupCardImage.querySelector('.popup__close-btn').addEventListener('click', () => hidePopup(popupCardImage));
cardArr.forEach(item => renderCard(item.name, item.link));