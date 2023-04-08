import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
const initialCards = [
    {
        name: 'Томск',
        link: 'https://dn1.vtomske.ru/a/6a4107808c0f7360ebd4f30e219e57a9_lg8bed08.jpg'
    },
    {
        name: 'Силиври',
        link: 'https://upload.wikimedia.org/wikipedia/commons/5/58/SilivriPedestrianBridge.jpg'
    },
    {
        name: 'Тараз',
        link: 'https://spk-taraz.kz/wp-content/uploads/2021/05/Sofosbuvir-Taraz.jpg'
    },
    {
        name: 'Мармара Эреглиси',
        link: 'https://i.ytimg.com/vi/d7y2Ac6AVNg/maxresdefault.jpg'
    },
    {
        name: 'Усолье-Сибирское',
        link: 'https://rossaprimavera.ru/static/files/dd368f33002a.jpg'
    },
    {
        name: 'Султан Кёй',
        link: 'https://daeu.eu/images/mram31.jpg'
    }
];
const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditForm = document.querySelector('.popup_type_edit').querySelector('.popup__form');
const buttonCreateCard = document.querySelector('.profile__add-button');
const popupCreateForm = document.querySelector('.popup_type_card').querySelector('.popup__form');
const validatorEditProfile = new FormValidator(validationConfig, popupEditForm);
const validatorCreateCard = new FormValidator(validationConfig, popupCreateForm);
const createCard = (item, func) => {
    const cardElement = new Card(item, '#element', func);
    return cardElement._generateCard();
}
const handleCardClick = (name, link) => {
    popupImage.open(name, link);
}
//валидация форм
validatorEditProfile.enableValidation();
validatorCreateCard.enableValidation();
// добавление слушателей
buttonEditProfile.addEventListener('click', () => {
    const { name, description } = userInfo.getUserInfo();
    popupEditForm.name.value = name;
    popupEditForm.description.value = description;
    popupEdit.open();
    validatorEditProfile.enableSubmitButton();
});

buttonCreateCard.addEventListener('click', () => {
    popupCreate.open();
    validatorCreateCard.disableSubmitButton();
});
//Создание экземпляров
const cardList = new Section({
    items: initialCards, renderer: (item) => {
        cardList.addItem(createCard(item, handleCardClick));
    }
}, '.elements');

const popupEdit = new PopupWithForm({
    popupSelector: '.popup_type_edit', handleFormSubmit: (formData) => {
        userInfo.setUserInfo(formData);
        popupEdit.close();
    }
});
popupEdit.setEventListeners();
const userInfo = new UserInfo('.profile__name', '.profile__description');

const popupCreate = new PopupWithForm({
    popupSelector: '.popup_type_card', handleFormSubmit: (item) => {
        const newCard = createCard({ name: item.title, link: item.link }, handleCardClick);
        cardList.addItem(newCard);
        popupCreate.close();
    }
});
popupCreate.setEventListeners();
const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();
cardList.createCards();