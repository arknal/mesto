let editButton = document.querySelector('.profile__edit-button'),
    popup = document.querySelector('.popup'),
    formElement = document.querySelector('.edit-form'),
    nameInput = formElement.querySelector('.edit-form__input_name'),
    jobInput = formElement.querySelector('.edit-form__input_job'),
    submitButton = formElement.querySelector('.edit-form__submit-btn'),
    resetButton = formElement.querySelector('.edit-form__reset-btn'),
    profileName = document.querySelector('.profile__name'),
    profileJob = document.querySelector('.profile__job');

function showPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
function hidePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', showPopup);
resetButton.addEventListener('click', hidePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value
  hidePopup()
}

formElement.addEventListener('submit', formSubmitHandler); 