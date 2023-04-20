import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import renderLoading from '../utils/constants.js';
const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
const dataApi = {
    authorization: 'c4201b26-884e-4a14-8fc9-a54d84569f1b'
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

const createCard = (idUser, data) => {
    const id = data._id;
    const cardElement = new Card(idUser, data, '#element', handleCardClick, () => handleOpenPopupDelete(cardElement, id), handleLikeCard, handleDislikeCard, dataApi);
    return cardElement._generateCard();
}

const handleCardClick = (name, link) => {
    popupImage.open(name, link);
}

const handleLikeCard = (cardId, timer) => {
    api.likeCard(cardId)
        .then((result) => {
            timer.textContent = result.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
}

const handleDislikeCard = (cardId, timer) => {
    api.dislikeCard(cardId)
        .then((result) => {
            timer.textContent = result.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
}

const handleButtonClick = (cardElement, id) => {
    api.deleteCard(id)
        .then(() => {
            cardElement.removeCard();
            popupDelete.close();
        })
        .catch((err) => {
            console.log(err);
        });
}

const handleOpenPopupDelete = (cardElement, id) => {
    popupDelete.open();
    popupDelete.clickButton(cardElement, id);
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
    popupAvatarForm.avatar.value = '';
    popupAvatar.open();
    validatorAvatar.disableSubmitButton();
});
//Создание экземпляров
const cardList = new Section({
    renderer: (idUser, item) => {
        cardList.addInitialsCards(createCard(idUser, item));
    }
}, '.elements');
const api = new Api(dataApi);

const popupEdit = new PopupWithForm({
    popupSelector: '.popup_type_edit', handleFormSubmit: (formData) => {
        renderLoading(true, popupEditForm.querySelector('.popup__button'));
        api.patchUserInfo(formData)
            .then(() => {
                userInfo.setUserInfo(formData);
                popupEdit.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => renderLoading(false, popupEditForm.querySelector('.popup__button')));
    }
});
popupEdit.setEventListeners();

const userInfo = new UserInfo('.profile__name', '.profile__description');

const popupCreate = new PopupWithForm({
    popupSelector: '.popup_type_card', handleFormSubmit: (item) => {
        renderLoading(true, popupCreateForm.querySelector('.popup__button'));
        const c = api.postNewCard(item)
        Promise.all([a, c]).then(([infoUser, infoCard]) => {
            const newCard = createCard(infoUser._id, infoCard);
            cardList.addItem(newCard);
            popupCreate.close();
        })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => renderLoading(false, popupCreateForm.querySelector('.popup__button')));
    }
});
popupCreate.setEventListeners();

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

const popupAvatar = new PopupWithForm({
    popupSelector: '.popup_type_avatar', handleFormSubmit: (item) => {
        renderLoading(true, popupAvatarForm.querySelector('.popup__button'));
        api.patchUserAvatar(item.avatar)
            .then(() => {
                avatar.src = item.avatar;
                popupAvatar.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => renderLoading(false, popupAvatarForm.querySelector('.popup__button')));

    }
});
popupAvatar.setEventListeners();

const popupDelete = new PopupWithDelete('.popup_type_delete', handleButtonClick);
popupDelete.setEventListeners();

const a = api.getUserInfo();
a.then((result) => {
    avatar.src = result.avatar;
    userInfo.setUserInfo({ name: result.name, description: result.about });
})
    .catch((err) => {
        console.log(err);
    });

const b = api.getInitialCards();
Promise.all([a, b])
    .then(([infoUser, infoCard]) => {
        cardList.createCards(infoUser._id, infoCard);
    })
    .catch((err) => {
        console.log(err);
    });