function checkValidity (element) {
  if (Array.isArray(element)) {
    return element.every(item => { return item.validity.valid })
  } else {
    return element.validity.valid
  }
}
function showInputError (formElement, inputElement, errorMessage, props) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);

  inputElement.classList.add(props.inputErrorClass);
  errorElement.classList.add(props.errorClass);
  errorElement.textContent = errorMessage;
}
function hideInputError (formElement, inputElement, props) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);

  inputElement.classList.remove(props.inputErrorClass);
  errorElement.classList.remove(props.errorClass);
  errorElement.textContent = '';
}
function toggleButtonState(formElement, inputList, props) {
  const btnElement = formElement.querySelector(props.submitButtonSelector);

  if (checkValidity(inputList)) {
    btnElement.classList.remove(props.inactiveButtonClass)
  } else {
    btnElement.classList.add(props.inactiveButtonClass)
  }
}
function setEventListeners(formElement, props) {
  const inputList = Array.from(formElement.querySelectorAll(props.inputSelector));
  
  toggleButtonState(formElement, inputList, props);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', (evt) => {
      if (checkValidity(inputElement)) {
        hideInputError(formElement, inputElement, props)
      } else {
        showInputError(formElement, inputElement, inputElement.validationMessage, props)
      }
      toggleButtonState(formElement, inputList, props);
    })
  })
}


function enableValidation(props) {
  const formArr = Array.from(document.querySelectorAll(props.formSelector));
 
  formArr.forEach(formElement => setEventListeners(formElement, props))
}
enableValidation({
  formSelector: '.form', //ok
  inputSelector: '.form__input', //ok
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
}); 
