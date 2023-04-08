export default class Popup {
    constructor(popupSelector) {
        this._container = document.querySelector(popupSelector);
        this._buttonClose = this._container.querySelector('.popup__close');
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        this._container.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    close() {
        this._container.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    setEventListeners() {
        this._container.addEventListener('click', (evt) => {
            this._handleOverlayClose(evt);
        });
        this._buttonClose.addEventListener('click', () => {
            this.close();
        });
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    _handleOverlayClose(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }
}