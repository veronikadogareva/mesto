import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._container.querySelector('.popup__image');
        this._popupImageFigcaption = this._container.querySelector('.popup__figurcaption');

    }
    open(name, link) {
        super.open();
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupImageFigcaption.textContent = name;
    }
}