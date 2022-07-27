export default class Card {
  constructor(props, templateSelector, handleOpenImage) {
    this._title = props.title;
    this._img = props.img;
    this._templateSelector = templateSelector;
    this._handleOpenImage = handleOpenImage;
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
    this._card.querySelector('.card__image').addEventListener('click', () => this._handleOpenImage({'title':this._title, 'img':this._img}));
  }
  _handleLike(event) {
    event.target.classList.toggle('card__like-btn_liked')
  }
  _handleCardRemove() {
    this._card.remove();
  }
  createCard() {
    this._card = this._getTemplate();
    this._setEventListeners();
    this._setData();

    return this._card;
  }
}