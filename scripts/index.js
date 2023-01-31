let editButton=document.querySelector('.profile-info__edit-button');
let popupEdit=document.querySelector('.popup-edit');
let closeButton=popupEdit.querySelector('.popup-edit__close');
let profileName=document.querySelector('.profile-info__name');
let profileDescription=document.querySelector('.profile-info__description');
let inputName=document.querySelector('[name="name"]');
let inputDescription=document.querySelector('[name="description"]');
let saveButton=popupEdit.querySelector('.popup-edit__save');
function toggleOpenPopup (){
    popupEdit.classList.toggle('popup-edit_active');
}
function handleSaveButtonClick(evt){
    evt.preventDefault();
    profileName.textContent=`${inputName.value}`; 
    profileDescription.textContent=`${inputDescription.value}`; 
    toggleOpenPopup ();
}
editButton.addEventListener('click',toggleOpenPopup);
closeButton.addEventListener('click',toggleOpenPopup);
saveButton.addEventListener('click',handleSaveButtonClick);
console.log();