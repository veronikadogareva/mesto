export default class Card {
    constructor(idUser, data, templateSelector, handleCardClick, handleOpenPopupDelete, handleLikeCard, handleDislikeCard) {
        this._data = data;
        this._link = data.link;
        this._name = data.name;
        this._likes = data.likes;
        this._cardId = data._id;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleOpenPopupDelete = handleOpenPopupDelete;
        this._handleLikeCard =handleLikeCard;
        this._handleDislikeCard = handleDislikeCard;
        this._ownerId = data.owner._id;
        this._myId = idUser;

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
        const timer = this._element.querySelector('.element__counter');
        elementImage.src = this._link;
        elementImage.alt = this._name;
        this._element.querySelector('.element__place').textContent = this._name;
        timer.textContent = this._likes.length;
        this._setEventListeners();
        this._isOwner();
        this._likes.forEach((item) => {
            if (item._id === this._myId) {
                this._toggleLikeButton();
            }
        });
        return this._element;
    }

    _setEventListeners() {
        this._likeButton = this._element.querySelector('.element__icon');
        const trashButton = this._element.querySelector('.element__trash');
        const image = this._element.querySelector('.element__image');
        const timer = this._element.querySelector('.element__counter');
        this._likeButton.addEventListener('click', () => {
            this._toggleLikeButton();
            if (this._likeButton.classList.contains('element__icon_active')) {
                this._handleLikeCard(this._cardId, timer);

            } else {
                this._handleDislikeCard(this._cardId, timer);
            }
        });
        trashButton.addEventListener('click', () => {
            this._handleTrashClick();
        });
        image.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }
    _handleTrashClick() {
        this._handleOpenPopupDelete(this, this._data);
    }
    _toggleLikeButton() {
        this._likeButton.classList.toggle('element__icon_active');
    }
    removeCard() {
        this._element.remove();
    }
    _isOwner() {
        const trashButton = this._element.querySelector('.element__trash');
        if (this._ownerId !== this._myId) {
            trashButton.remove();
        }
    }
}