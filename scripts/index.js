const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const buttonCloseEditProfile = popupEdit.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = popupEdit.querySelector('.popup__input_info_name');
const inputDescription = popupEdit.querySelector('.popup__input_info_description');
const popupEditForm = popupEdit.querySelector('.popup__form');
const buttonSubmitEdit = popupEdit.querySelector('.popup__button');
const cardTemplate = document.querySelector('#element').content;
const buttonCreateCard = document.querySelector('.profile__add-button');
const popupCreate = document.querySelector('.popup_type_card');
const buttonCloseCreateCard = popupCreate.querySelector('.popup__close');
const popupCreateForm = popupCreate.querySelector('.popup__form');
const buttonSubmitCreateCard=popupCreate.querySelector('.popup__button');
const inputTitle = popupCreate.querySelector('.popup__input_info_title');
const inputLink = popupCreate.querySelector('.popup__input_info_link');
const popupImage = document.querySelector('.popup_type_image');
const buttonCloseImage = popupImage.querySelector('.popup__close');
const image = popupImage.querySelector('.popup__image');
const figurcaptionImage = popupImage.querySelector('.popup__figurcaption');
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupKeydown);
}
const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupKeydown);
}
const closePopupKeydown = (evt) => {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
}
const handleClosePopupByOverlay = (evt) =>{
    if (evt.target === evt.currentTarget) {
        closePopup(document.querySelector('.popup_opened'));
    }
}
const openPopupEdit = () => {
    openPopup(popupEdit);
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
    buttonSubmitEdit.removeAttribute('disabled');
    
}
const closePopupEdit = () => {
    closePopup(popupEdit);    
}

const openPopupCreate = () => {
    openPopup(popupCreate);
    popupCreateForm.reset();
    buttonSubmitCreateCard.disabled ='true';
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

const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopupEdit();
}
const createCard = (cardData) => {
    const elementClone = cardTemplateElement.cloneNode(true);
    const elementImage = elementClone.querySelector('.element__image');
    elementImage.src = cardData.link;
    elementImage.alt = cardData.name;
    elementClone.querySelector('.element__place').textContent = cardData.name;
    const buttonLike = elementClone.querySelector('.element__icon');
    buttonLike.addEventListener('click', () => {
        buttonLike.classList.toggle('element__icon_active');
    });
    elementClone.querySelector('.element__trash').addEventListener('click', () => {
        elementClone.remove();
    });
    elementImage.addEventListener('click', () => {
        openPopupImage();
        image.src = cardData.link;
        image.alt = cardData.name;
        figurcaptionImage.textContent = cardData.name;
    });
    return elementClone;
}
const renderCard = (cardData) => {
    cardsContainer.prepend(createCard(cardData));
}
const handleCreateFormSubmit = (evt) => {
    evt.preventDefault();
    renderCard({
        name: inputTitle.value,
        link: inputLink.value
    });
    closePopupCreate();
}
popupEdit.addEventListener('click', handleClosePopupByOverlay);
popupCreate.addEventListener('click', handleClosePopupByOverlay);
popupImage.addEventListener('click', handleClosePopupByOverlay);
buttonEditProfile.addEventListener('click', openPopupEdit);
buttonCloseEditProfile.addEventListener('click', closePopupEdit);
popupEditForm.addEventListener('submit', handleProfileFormSubmit);
buttonCreateCard.addEventListener('click', openPopupCreate);
buttonCloseCreateCard.addEventListener('click', closePopupCreate);
buttonCloseImage.addEventListener('click', closePopupImage);
popupCreateForm.addEventListener('submit', handleCreateFormSubmit);
const cardTemplateElement = cardTemplate.querySelector('.element');
const cardsContainer = document.querySelector('.elements');
initialCards.forEach(renderCard);