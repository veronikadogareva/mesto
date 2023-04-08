import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._form = this._container.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._form.querySelectorAll('.popup__input');
    }
    close() {
        super.close();
        this._form.reset();
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
    _getInputValues() {
        this._inputsValues = {};
        this._inputList.forEach((input) => {
            this._inputsValues[input.name] = input.value;
        });
        return this._inputsValues;
    }
}