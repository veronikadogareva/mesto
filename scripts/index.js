const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const closeButton = popupEdit.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = popupEdit.querySelector('.popup__input_info_name');
const inputDescription = popupEdit.querySelector('.popup__input_info_description');
const saveButton = popupEdit.querySelector('.popup__form');
const elementTemplate = document.querySelector('#element').content;
const NewPlaceButton = document.querySelector('.profile__add-button');
const popupNewPlace = document.querySelector('.popup_type_card');
const closeButtonNew = popupNewPlace.querySelector('.popup__close');
const createButton = popupNewPlace.querySelector('.popup__save');
const inputTitle = popupNewPlace.querySelector('.popup__input_info_title');
const inputLink = popupNewPlace.querySelector('.popup__input_info_link');
const popupImage = document.querySelector('.popup_type_image');
const closeButtonImage = popupImage.querySelector('.popup__close');
const image = popupImage.querySelector('.popup__image');
const figurcaption = popupImage.querySelector('.popup__figurcaption');
const toggleOpenPopupEdit = () => {
    popupEdit.classList.toggle('popup_opened');
    if (popupEdit.classList.contains('popup_opened')) {
        inputName.value = profileName.textContent;
        inputDescription.value = profileDescription.textContent;
    }
}
const handleSaveButtonClick = (evt) => {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    toggleOpenPopup();
}
const toggleOpenPopupCreate = () => {
    popupNewPlace.classList.toggle('popup_opened');
    if (popupNewPlace.classList.contains('popup_opened')) {
        inputTitle.value = '';
        inputLink.value = '';
    }
}
const toggleOpenPopupImage = () => {
    popupImage.classList.toggle('popup_opened');
}
const createCards = (item) => {
    const elements = document.querySelector('.elements');
    const elementClone = elementTemplate.querySelector('.element').cloneNode(true);
    elementClone.querySelector('.element__image').src = item.link;
    elementClone.querySelector('.element__place').textContent = item.name;
    elementClone.querySelector('.element__icon').addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__icon_active');
    });
    elementClone.querySelector('.element__trash').addEventListener('click', () => {
        elementClone.remove();
    });
    elementClone.querySelector('.element__image').addEventListener('click', () => {
        toggleOpenPopupImage();
        image.src = item.link;
        figurcaption.textContent = item.name;
    });
    elements.prepend(elementClone);
}
editButton.addEventListener('click', toggleOpenPopupEdit);
closeButton.addEventListener('click', toggleOpenPopupEdit);
saveButton.addEventListener('submit', handleSaveButtonClick);
NewPlaceButton.addEventListener('click', toggleOpenPopupCreate);
closeButtonNew.addEventListener('click', toggleOpenPopupCreate);
closeButtonImage.addEventListener('click', toggleOpenPopupImage);
createButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    console.log(inputTitle.value);
    initialCards.unshift({
        name: inputTitle.value,
        link: inputLink.value
    });
    createCards(initialCards[0]);
    toggleOpenPopupCreate();
});
initialCards.forEach(createCards);
