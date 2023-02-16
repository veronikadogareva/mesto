const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const closeEditButton = popupEdit.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = popupEdit.querySelector('.popup__input_info_name');
const inputDescription = popupEdit.querySelector('.popup__input_info_description');
const popupEditForm = popupEdit.querySelector('.popup__form');
const elementTemplate = document.querySelector('#element').content;
const createButton = document.querySelector('.profile__add-button');
const popupCreate = document.querySelector('.popup_type_card');
const closeCreateButton = popupCreate.querySelector('.popup__close');
const popupCreateForm = popupCreate.querySelector('.popup__form');
const inputTitle = popupCreate.querySelector('.popup__input_info_title');
const inputLink = popupCreate.querySelector('.popup__input_info_link');
const popupImage = document.querySelector('.popup_type_image');
const closeButtonImage = popupImage.querySelector('.popup__close');
const image = popupImage.querySelector('.popup__image');
const figurcaption = popupImage.querySelector('.popup__figurcaption');
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
}
const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
}
const openPopupEdit = () => {
    openPopup(popupEdit);
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
}
const closePopupEdit = () => {
    closePopup(popupEdit);
}
const handlePopupEditFormClick = (evt) => {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopupEdit();
}
const openPopupCreate = () => {
    openPopup(popupCreate);
    popupCreateForm.reset();
}
const closePopupCreate = () => {
    closePopup(popupCreate);
}
const openPopupImage = () => {
    openPopup(popupImage);
}
const closePopupImage = () => {
    closePopup(popupImage);
}
const createCard = (item) => {
    const elementClone = elementTemplate.querySelector('.element').cloneNode(true);
    elementClone.querySelector('.element__image').src = item.link;
    elementClone.querySelector('.element__image').alt = item.name;
    elementClone.querySelector('.element__place').textContent = item.name;
    elementClone.querySelector('.element__icon').addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__icon_active');
    });
    elementClone.querySelector('.element__trash').addEventListener('click', () => {
        elementClone.remove();
    });
    elementClone.querySelector('.element__image').addEventListener('click', () => {
        openPopupImage();
        image.src = item.link;
        image.alt = item.name;
        figurcaption.textContent = item.name;
    });
    return elementClone;
}
const createCards = (item) => {
    const elements = document.querySelector('.elements');
    elements.prepend(createCard(item));
}
editButton.addEventListener('click', openPopupEdit);
closeEditButton.addEventListener('click', closePopupEdit);
popupEditForm.addEventListener('submit', handlePopupEditFormClick);
createButton.addEventListener('click', openPopupCreate);
closeCreateButton.addEventListener('click', closePopupCreate);
closeButtonImage.addEventListener('click', closePopupImage);
popupCreateForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    createCards({
        name: inputTitle.value,
        link: inputLink.value
    });
    closePopupCreate();
});
initialCards.forEach(createCards);
