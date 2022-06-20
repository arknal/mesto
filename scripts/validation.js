function checkValidity (element) {
  if (Array.isArray(element)) {
    return element.every(item => { return item.validity.valid })
  } else {
    return element.validity.valid
  }
}
function showInputError (formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
}
function hideInputError (formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}
function toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass) {
  const btnElement = formElement.querySelector(submitButtonSelector);

  if (checkValidity(inputList)) {
    btnElement.classList.remove(inactiveButtonClass)
    btnElement.removeAttribute('disabled');
  } else {
    btnElement.classList.add(inactiveButtonClass);
    btnElement.setAttribute('disabled', true);
  }
}
function setEventListeners(formElement, props) {
  const inputList = Array.from(formElement.querySelectorAll(props.inputSelector));
  
  toggleButtonState(formElement, inputList, props.submitButtonSelector, props.inactiveButtonClass);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', (evt) => {
      if (checkValidity(inputElement)) {
        hideInputError(formElement, inputElement, props.inputErrorClass, props.errorClass)
      } else {
        showInputError(formElement, inputElement, inputElement.validationMessage, props.inputErrorClass, props.errorClass)
      }
      toggleButtonState(formElement, inputList, props.submitButtonSelector, props.inactiveButtonClass);
    })
  })
}


function enableValidation(props) {
  const formArr = Array.from(document.querySelectorAll(props.formSelector));
 
  formArr.forEach(formElement => setEventListeners(formElement, props))
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
}); 
