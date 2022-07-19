export default class Card {
  constructor(props, templateSelector, popup, showPopup) {
    this._title = props.title;
    this._img = props.img;
    this._templateSelector = templateSelector;
    this._popup = popup;
    this._showPopup = showPopup;
  }
  _getTemplate() {
    return document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true)
  }
  _setData() {
    this._card.querySelector('.card__title').textContent = this._title;
    this._card.querySelector('.card__image').alt = this._title;
    this._card.querySelector('.card__image').src = this._img;
  }
  _setEventListeners() {
    this._card.querySelector('.card__like-btn').addEventListener('click', this._handleLike);
    this._card.querySelector('.card__trash-btn').addEventListener('click', () => this._handleCardRemove());
    this._card.querySelector('.card__image').addEventListener('click', () => this._handleOpenPopup());
  }
  _handleLike(event) {
    event.target.classList.toggle('card__like-btn_liked')
  }
  _handleCardRemove() {
    this._card.remove();
  }
  _handleOpenPopup() {
      const {data, popupElement} = this._popup;
      data.title.textContent = this._title;
      data.img.alt = this._title;
      data.img.src = this._img;

      this._showPopup(popupElement);
  }
  createCard() {
    this._card = this._getTemplate();
    this._setEventListeners();
    this._setData();

    return this._card;
  }
}