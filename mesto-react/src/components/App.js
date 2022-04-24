import { useState, useEffect } from "react";
import Header from "./Header";
import Main from './Main';
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";


function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
  setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  useEffect(() => {
    function handleEscClick(e) {
      if(e.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard) {
      document.addEventListener('keydown', handleEscClick);
      return () => {
        document.removeEventListener('keydown', handleEscClick);
      }
    }
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, selectedCard]) 


  return (
    <div className="page">
      <Header />

      <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} 
      onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick}/>

      <Footer />

      <PopupWithForm title="Обновить аватар" name="edit-avatar" submitBtn="Сохранить" onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen ? 'popup_opened' : ''}> 
        <input className="popup__input popup__input_type_link" type="url" required name="avatar"
          placeholder="Ссылка на картинку"/>
        <span className="popup__error popup__error_type_avatar"></span>
      </PopupWithForm>
      
      <PopupWithForm title="Редактировать профиль" name="edit-profile" submitBtn="Сохранить" onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen ? 'popup_opened' : ''}> 
        <input className="popup__input popup__input_type_name" type="text" required minLength="2" maxLength="40"
          name="username" placeholder="Имя"/>
        <span className="popup__error popup__error_type_username"></span>
        <input className="popup__input popup__input_type_info" type="text" required minLength="2"
          maxLength="200" name="about" placeholder="О себе"/>
        <span className="popup__error popup__error_type_about"></span>
      </PopupWithForm>

      <PopupWithForm title="Новое место" name="add-place" submitBtn="Создать" onClose={closeAllPopups}
      isOpen={isAddPlacePopupOpen ? 'popup_opened' : ''}> 
        <input className="popup__input popup__input_type_place" type="text" required minLength="2"
          maxLength="40" name="place" placeholder="Название"/>
        <span className="popup__error popup__error_type_place"></span>
        <input className="popup__input popup__input_type_link" type="url" required name="img"
          placeholder="Ссылка на картинку"/>
        <span className="popup__error popup__error_type_img"></span>
      </PopupWithForm>

      <PopupWithForm title="Вы уверены?" name="delete-place" submitBtn="Да" onClose={closeAllPopups}/>

      {selectedCard && 
        <ImagePopup card={selectedCard} isOpen={selectedCard ? 'popup_opened' : ''} onClose={closeAllPopups}/>}
  </div>
  );
}

export default App;
