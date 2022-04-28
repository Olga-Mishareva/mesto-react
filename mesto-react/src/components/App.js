import { useState, useEffect } from "react";
import Header from "./Header";
import Main from './Main';
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Validation from "./Validation";


function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [avatarForm, setAvatarForm] = useState(null);
  const [userForm, setUserForm] = useState(null);
  const [cardForm, setCardForm] = useState(null);


  const [avatarInput, setAvatarInput] = useState('');   // заполнять и очищать инпуты
  const [nameInput, setNameInput] = useState('');
  const [infoInput, setInfoInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [imageInput, setImageInput] = useState('');
  
  
  const [errorMessage, setErrorMessage] = useState({});
  const [submitState, setSubmitState] = useState(false);
  

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    switchSubmitButtonState(avatarForm)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    switchSubmitButtonState(userForm)
  }

  function handleAddPlaceClick() {
  setIsAddPlacePopupOpen(true);
  switchSubmitButtonState(cardForm)
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setErrorMessage({});
    cleanAllInputs();
  }

  function cleanAllInputs() {
    console.log(avatarInput, nameInput, infoInput)
    setAvatarInput('');   
    setNameInput('');
    setInfoInput('');
    setTitleInput('');
    setImageInput('');
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
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, selectedCard]);

  useEffect(() => {
    setAvatarForm(document.querySelector('#edit-avatar'))
    setUserForm(document.querySelector('#edit-profile'))
    setCardForm(document.querySelector('#add-place'))
  }, [])

  function checkInputValidity(e) {
    // console.log(e.currentTarget)
    if(!e.currentTarget.checkValidity()) {
      setErrorMessage({...errorMessage, [e.target.name]: e.target.validationMessage}); 
    }
    else setErrorMessage({})
    // setErrorMessage({...errorMessage, [e.target.name]: e.target.validationMessage}); 
    // console.log(errorMessage)
    switchSubmitButtonState(e.currentTarget)
    // if(errorMessage === {}) {
    //   setSubmitState(true)
    // } else setSubmitState(false)
    // switchSubmitButtonState(e.target);
  }

  function switchSubmitButtonState(form) {
    console.log(form)
    if(form.checkValidity()) {
      setSubmitState(true)
    } else setSubmitState(false)
    
  }

  function handleAvatarInput(e) {
    setAvatarInput(e.target.value);
  }

  function handleNameInput(e) {
    setNameInput(e.target.value);
  }

  function handleInfoInput(e) {
    setInfoInput(e.target.value);
  }

  function handleTitleInput(e) {
    setTitleInput(e.target.value);
  }

  function handleImageInput(e) {
    setImageInput(e.target.value);
  }

  // function resetValidation(e) {
  //   if(e.currentTarget.name === 'edit-avatar') {
  //     setAvatarForm(e.currentTarget);
  //     switchSubmitButtonState(e.currentTarget)
  //   }
  //   if(e.currentTarget.name === 'edit-profile') {
  //     setUseravatarForm(e.currentTarget);
  //     switchSubmitButtonState(userForm)
  //   }
  //   if(e.currentTarget.name === 'add-place') {
  //     setCardavatarForm(e.currentTarget);
  //     switchSubmitButtonState(cardForm)
  //   }
  //   // console.log(e)
  //   // console.log(e.target)
  //   // console.log(e.currentTarget)
  //   // console.log(e.currentTarget.name)
  // }

  

  // function log() {
  //   if(avatarForm !== null) {
  //     console.log(avatarForm)
  //   }
  //   if(avatarForm !== null) {
  //     console.log(userForm)
  //   }
  //   if(avatarForm !== null) {
  //     console.log(cardForm)
  //   }
  // }
  // log()
    
  

  return (
    <div className="page">
      <Header />

      <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} 
      onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick}/>

      <Footer />

      <PopupWithForm 
        title="Обновить аватар" 
        name="edit-avatar" 
        submitBtn="Сохранить" 
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen} 
        isActive={submitState ? "" : "disabled"} 
        // onReset={resetValidation}
        isValid={checkInputValidity}> 
        <input className="popup__input popup__input_type_avatar" type="url" required name="avatar"
          placeholder="Ссылка на картинку" onChange={handleAvatarInput}/>
        <Validation errorMessage={errorMessage} name="avatar"/>
      </PopupWithForm>
      
      <PopupWithForm 
        title="Редактировать профиль" 
        name="edit-profile" 
        submitBtn="Сохранить" 
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
        isActive={submitState ? "" : "disabled"}
        isValid={checkInputValidity}> 
        <input className="popup__input popup__input_type_username" type="text" required minLength="2" maxLength="40"
          name="username" placeholder="Имя" onChange={handleNameInput}/>
        <Validation errorMessage={errorMessage} name="username"/>       
        <input className="popup__input popup__input_type_about" type="text" required minLength="2"
          maxLength="200" name="about" placeholder="О себе" onChange={handleInfoInput}/>
        <Validation errorMessage={errorMessage} name="about"/>
      </PopupWithForm>

      <PopupWithForm 
        title="Новое место" 
        name="add-place" 
        submitBtn="Создать" 
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        isActive={submitState ? "" : "disabled"}
        isValid={checkInputValidity}> 
        <input className="popup__input popup__input_type_place" type="text" required minLength="2"
          maxLength="40" name="place" placeholder="Название" onChange={handleTitleInput}/>
        <Validation errorMessage={errorMessage} name="place"/>
        <input className="popup__input popup__input_type_img" type="url" required name="img"
          placeholder="Ссылка на картинку" onChange={handleImageInput}/>
        <Validation errorMessage={errorMessage} name="img"/>
      </PopupWithForm>

      <PopupWithForm title="Вы уверены?" name="delete-place" submitBtn="Да" onClose={closeAllPopups}/>

      {selectedCard && 
        <ImagePopup card={selectedCard} isOpen={selectedCard ? 'popup_opened' : ''} onClose={closeAllPopups}/>}
  </div>
  );
}

export default App;
