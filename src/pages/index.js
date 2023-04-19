import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
const dataApi = {
    authorization: 'c4201b26-884e-4a14-8fc9-a54d84569f1b',
    _myId: '4525ffd30e4120030d1983c5'
}
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditForm = document.querySelector('.popup_type_edit').querySelector('.popup__form');
const buttonCreateCard = document.querySelector('.profile__add-button');
const popupCreateForm = document.querySelector('.popup_type_card').querySelector('.popup__form');
const avatar = document.querySelector('.profile__avatar');
const popupAvatarForm = document.querySelector('.popup_type_avatar').querySelector('.popup__form');
const validatorEditProfile = new FormValidator(validationConfig, popupEditForm);
const validatorCreateCard = new FormValidator(validationConfig, popupCreateForm);
const validatorAvatar = new FormValidator(validationConfig, popupAvatarForm);
const createCard = (data) => {
    const id = data._id;
    const cardElement = new Card(data, '#element', handleCardClick, () => handleOpenPopupDelete(cardElement, id), api, dataApi);
    return cardElement._generateCard();
}
const handleCardClick = (name, link) => {
    popupImage.open(name, link);
}
const handleOpenPopupDelete = (cardElement, id) => {
    const popupDelete = new PopupWithDelete({
        popupSelector: '.popup_type_delete', handleButtonClick: () => {
            api.deleteLikeCard(id)
                .then(() => {
                    cardElement.removeCard();
                })
            popupDelete.close();
        }
    });
    popupDelete.open();
    popupDelete.setEventListeners();
}
const renderLoading = (isLoading, button) => {
    if (isLoading) {
        if (button.textContent.length >= 9) {
            button.textContent = 'Сохранение...';
        } else {
            button.textContent = 'Создание...';
        }

    } else {
        if (button.textContent.length >= 12) {
            button.textContent = 'Сохранить';
        } else {
            button.textContent = 'Создать';
        }
    }
}
//валидация форм
validatorEditProfile.enableValidation();
validatorCreateCard.enableValidation();
validatorAvatar.enableValidation();
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
avatar.addEventListener('click', () => {
    popupAvatarForm.avatar.value = avatar.src;
    popupAvatar.open();
    validatorAvatar.enableSubmitButton();
});
//Создание экземпляров
const cardList = new Section({
    renderer: (item) => {
        cardList.addItem(createCard(item));
    }
}, '.elements');
const api = new Api(dataApi);
const popupEdit = new PopupWithForm({
    popupSelector: '.popup_type_edit', handleFormSubmit: (formData) => {
        userInfo.setUserInfo(formData);
        renderLoading(true, popupEditForm.querySelector('.popup__button'));
        api.patchUserInfo(formData)
            .catch((err) => {
                console.log(err);
            });
        renderLoading(false, popupEditForm.querySelector('.popup__button'));
        popupEdit.close();
    }
});
popupEdit.setEventListeners();
const userInfo = new UserInfo('.profile__name', '.profile__description');

const popupCreate = new PopupWithForm({
    popupSelector: '.popup_type_card', handleFormSubmit: (item) => {
        renderLoading(true, popupCreateForm.querySelector('.popup__button'));
        api.postNewCard(item)
            .then((result) => {
                const newCard = createCard(result);
                cardList.addItem(newCard);
            })
            .catch((err) => {
                console.log(err);
            });
        renderLoading(false, popupCreateForm.querySelector('.popup__button'));
        popupCreate.close();
    }
});
popupCreate.setEventListeners();
const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

const popupAvatar = new PopupWithForm({
    popupSelector: '.popup_type_avatar', handleFormSubmit: (item) => {
        avatar.src = item.avatar;
        renderLoading(true, popupAvatarForm.querySelector('.popup__button'));
        api.patchUserAvatar(item.avatar)
        .then((res)=>console.log(res))
            .catch((err) => {
                console.log(err);
            });
        renderLoading(false, popupAvatarForm.querySelector('.popup__button'));
        popupAvatar.close();
    }
});
popupAvatar.setEventListeners();

api.getUserInfo()
    .then((result) => {
        avatar.src = result.avatar;
        userInfo.setUserInfo({ name: result.name, description: result.about });
    })
    .catch((err) => {
        console.log(err);
    });

api.getInitialCards()
    .then((result) => {
        cardList.createCards(result);
    })
    .catch((err) => {
        console.log(err);
    });