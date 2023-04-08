export default class Popup {
    constructor(popupSelector) {
        this._container = document.querySelector(popupSelector);
        this._buttonClose = this._container.querySelector('.popup__close');
    }
    open() {
        this._container.classList.add('popup_opened');
    }
    close() {
        this._container.classList.remove('popup_opened');
        // this.removeEventListeners();
    }
    setEventListeners() {
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
        this._container.addEventListener('click', (evt) => {
            this._handleOverlayClose(evt);
        });
        this._buttonClose.addEventListener('click',()=>{
            this.close();
        });
    }
    // removeEventListeners() {
    //     document.removeEventListener('keydown', (evt) => {
    //         this._handleEscClose(evt);
    //     });
    //     this._container.removeEventListener('click', (evt) => {
    //         this.__handleOverlayClose(evt);
    //     });
    //     this._buttonClose.removeEventListener('click',()=>{
    //         this.close();
    //     });
    // }
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