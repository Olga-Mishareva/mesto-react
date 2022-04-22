import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from './Main';
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from '../utils/api';
import { profileData, settings, formValidators, profileBtn, 
  avatarEditBtn, inputName, inputInfo, placeBtn } from "../utils/constants.js";

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  
  // function log() {
  //   console.log(isEditAvatarPopupOpen) // true
  // }
  // log()  // false

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
  setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
  }

  useEffect(() => {
    function handleEscClick(e) {
      if(e.key === 'Escape') {
        closeAllPopups();
      }
    }

    if(isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen) {
      document.addEventListener('keydown', handleEscClick);
      // console.log('EL ist added')
      return () => {
        // console.log('EL ist deleted')
        document.removeEventListener('keydown', handleEscClick);
      }
    }
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen]) 

// -----------------------------------------------------------





// сменить form.id & button.form на name
  return (
    <div className="page">
      <Header />

      <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} 
      onAddPlace={handleAddPlaceClick}/>

      <Footer />

      <PopupWithForm title="Обновить аватар" name="edit-avatar" isOpen={isEditAvatarPopupOpen ? 'popup_opened' : ''} 
        onClose={closeAllPopups}> 
        <input className="popup__input popup__input_type_link" type="url" required name="avatar"
          placeholder="Ссылка на картинку"/>
        <span className="popup__error popup__error_type_avatar"></span>
      </PopupWithForm>
      
      <PopupWithForm title="Редактировать профиль" name="edit-profile" isOpen={isEditProfilePopupOpen ? 'popup_opened' : ''} onClose={closeAllPopups}> 
        <input className="popup__input popup__input_type_name" type="text" required minLength="2" maxLength="40"
          name="username" placeholder="Имя"/>
        <span className="popup__error popup__error_type_username"></span>
        <input className="popup__input popup__input_type_info" type="text" required minLength="2"
          maxLength="200" name="about" placeholder="О себе"/>
        <span className="popup__error popup__error_type_about"></span>
      </PopupWithForm>

      <PopupWithForm title="Новое место" name="add-place" isOpen={isAddPlacePopupOpen ? 'popup_opened' : ''} onClose={closeAllPopups}> 
        <input className="popup__input popup__input_type_place" type="text" required minLength="2"
          maxLength="40" name="place" placeholder="Название"/>
        <span className="popup__error popup__error_type_place"></span>
        <input className="popup__input popup__input_type_link" type="url" required name="img"
          placeholder="Ссылка на картинку"/>
        <span className="popup__error popup__error_type_img"></span>
      </PopupWithForm>

      <PopupWithForm title="Вы уверены?" name="delete-place"  onClose={closeAllPopups}></PopupWithForm>

      
      <ImagePopup />
  </div>
  );
}

export default App;
