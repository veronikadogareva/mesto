import Popup from './Popup.js';
export default class PopupWithDelete extends Popup {
    constructor( popupSelector, handleButtonClick ) {
        super(popupSelector);
        this._button = this._container.querySelector('.popup__button');
        this._handleButtonClick = handleButtonClick;
    }
    clickButton(cardElement, id){
        this._button.addEventListener('click', () => {
            this._handleButtonClick(cardElement, id);
        });
    }
}