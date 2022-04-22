import Header from "./Header";
import Main from './Main';
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useState } from "react";

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isOpen, setIsOpen] = useState('');
  

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    // setIsOpen('popup_opened');
  }

  function handleAddPlaceClick() {
  setIsAddPlacePopupOpen(true);
 
  }

  function handleEscClick(e) {
    if(e.key === 'Escape') {
      setIsEditAvatarPopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
    }
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
  }

  // function log() {
  //   console.log(isEditProfilePopupOpen) // true
  // }
  // log()  // false


// сменить form.id & button.form на name
  return (
    <div className="page" onKeyDown={handleEscClick}>
      <Header />

      <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} 
      onAddPlace={handleAddPlaceClick} onClose={closeAllPopups} isOpen={isOpen}/>

      <Footer />

      <PopupWithForm title="Обновить аватар" name="edit-avatar" isOpen={isEditAvatarPopupOpen ? 'popup_opened' : ''} onClose={closeAllPopups}> 
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
