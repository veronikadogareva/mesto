export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    createCards(idUser, data) {
        data.forEach((item) => {
            this._renderer(idUser,item);
        });
    }
    addInitialsCards(element){
        this._container.append(element);
    }
    addItem(element) {
        this._container.prepend(element);
    }
}