export default class FormValidator {
  constructor(props, formElement) {
    this._form = formElement;
    this._formSelector = props.formSelector;
    this._inputSelector = props.inputSelector;
    this._submitButtonSelector = props.submitButtonSelector;
    this._inactiveButtonClass = props.inactiveButtonClass;
    this._inputErrorClass = props.inputErrorClass;
    this._errorClass = props.errorClass;
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitBtn = this._form.querySelector(this._submitButtonSelector);
  }
  enableValidation() {
    this._setEventListeners();
  }
  _setEventListeners() {
    this._toggleButtonState();
    this._inputs.forEach(inputElement => {
      inputElement.addEventListener('input', (evt) => this._handleInputChange(inputElement))
    })
  }
  _handleInputChange(inputElement) {
    if (this._checkValidity(inputElement)) {
      this._hideInputError(inputElement)
    } else {
      this._showInputError(inputElement, inputElement.validationMessage)
    }
    this._toggleButtonState();
  }
  _checkValidity (element) {
    if (Array.isArray(element)) {
      return element.every(item => { return item.validity.valid })
    } else {
      return element.validity.valid
    }
  }
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
  
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }
  _hideInputError (inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
  
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }
  _toggleButtonState() {
    if (this._checkValidity(this._inputs)) {
      this._submitBtn.classList.remove(this._inactiveButtonClass)
      this._submitBtn.removeAttribute('disabled');
    } else {
      this._submitBtn.classList.add(this._inactiveButtonClass);
      this._submitBtn.setAttribute('disabled', true);
    }
  }
  resetErrors(){
    this._inputs.forEach(input => {
      this._hideInputError(input);
    })
    this._toggleButtonState();
  }
}