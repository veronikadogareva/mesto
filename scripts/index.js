let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let inputName = document.querySelector('.popup__input_info_name');
let inputDescription = document.querySelector('.popup__input_info_description');
let saveButton = popup.querySelector('.popup__form');
function toggleOpenPopup() {
    popup.classList.toggle('popup_opened');
    if (popup.classList.contains('popup_opened')) {
        inputName.value = profileName.textContent;
        inputDescription.value = profileDescription.textContent;
    }
}
function handleSaveButtonClick(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    toggleOpenPopup();
}
editButton.addEventListener('click', toggleOpenPopup);
closeButton.addEventListener('click', toggleOpenPopup);
saveButton.addEventListener('submit', handleSaveButtonClick);