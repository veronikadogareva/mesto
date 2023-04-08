export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._link = data.link;
        this._name = data.name;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }
    _generateCard() {
        this._element = this._getTemplate();
        const elementImage = this._element.querySelector('.element__image');
        elementImage.src = this._link;
        elementImage.alt = this._name;
        this._element.querySelector('.element__place').textContent = this._name;
        this._setEventListeners();
        return this._element;
    }
    // render() {
    //     const cardElement = this._generateCard();
    //     document.querySelector('.elements').prepend(cardElement);
    // }
    _setEventListeners() {
        const likeButton = this._element.querySelector('.element__icon');
        const trashButton = this._element.querySelector('.element__trash');
        const image = this._element.querySelector('.element__image');
        likeButton.addEventListener('click', () => {
            this._toggleLikeButton(likeButton);
        })
        trashButton.addEventListener('click', () => {
            this._removeCard();
        });
        image.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }
    _toggleLikeButton(element) {
        element.classList.toggle('element__icon_active');
    }
    _removeCard() {
        this._element.remove();
    }
}