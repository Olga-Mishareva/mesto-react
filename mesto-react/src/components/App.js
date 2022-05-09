import { useState, useEffect } from "react";
import Header from "./Header";
import  Main from './Main';
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Validation from "./Validation";
import EditProfilePopup from "./EditProfilePopup";
import api from "../utils/api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';



function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [avatarForm, setAvatarForm] = useState(null);
  const [userForm, setUserForm] = useState(null);
  const [cardForm, setCardForm] = useState(null);

  const [avatarInput, setAvatarInput] = useState(''); 
  // const [nameInput, setNameInput] = useState('');
  // const [infoInput, setInfoInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [imageInput, setImageInput] = useState('');
  
  const [errorMessage, setErrorMessage] = useState({});  // сделать контекстом??
  const [submitState, setSubmitState] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getUserData()
      .then(res => {
        setCurrentUser({ ...currentUser, 
          userName: res.name, 
          userInfo: res.about, 
          userAvatar: res.avatar,
          userId: res._id
        })
      })
      .catch(err => console.log(err));
  }, [])


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    switchSubmitButtonState(avatarForm)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    switchSubmitButtonState(userForm)
    // setNameInput(currentUser.userName);
    // setInfoInput(currentUser.userInfo);
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

  function cleanAllInputs() {  // передать очистку инпутов в компонент
    setAvatarInput('');   
    // setNameInput('');
    // setInfoInput('');
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


  // ------------------- валидация -------------------------------

  useEffect(() => {
    setAvatarForm(document.querySelector('#edit-avatar'))
    setUserForm(document.querySelector('#edit-profile'))
    setCardForm(document.querySelector('#add-place'))
  }, [])

  function checkInputValidity(e) {
    if(!e.currentTarget.checkValidity()) {
      setErrorMessage({...errorMessage, [e.target.name]: e.target.validationMessage}); 
    }
    else setErrorMessage({})

    switchSubmitButtonState(e.currentTarget)
  }
 

  function switchSubmitButtonState(form) {
    // console.log(form)
    if(form.checkValidity()) {
      setSubmitState(true)
    } else setSubmitState(false) 
  }

  // собирают инфо с инпутов
  function handleAvatarInput(e) {
    setAvatarInput(e.target.value);
  }
  // function handleNameInput(e) {
  //   setNameInput(e.target.value);
  // }
  // function handleInfoInput(e) {
  //   setInfoInput(e.target.value);
  // }
  function handleTitleInput(e) {
    setTitleInput(e.target.value);
  }
  function handleImageInput(e) {
    setImageInput(e.target.value);
  }

    
  return (
    <CurrentUserContext.Provider value={currentUser}>   {/* значение, которое передается всем дочерним элементам */}
    <div className="page">
      <Header />

      <Main onEditAvatar={handleEditAvatarClick} 
      onEditProfile={handleEditProfileClick} 
      onAddPlace={handleAddPlaceClick} 
      onCardClick={handleCardClick}/>

      <Footer />

      <PopupWithForm 
        title="Обновить аватар" name="edit-avatar" submitBtn="Сохранить" 
        onClose={closeAllPopups} isValid={checkInputValidity} isOpen={isEditAvatarPopupOpen}
        isActive={submitState ? "" : "disabled"}> 

        <input className="popup__input popup__input_type_avatar" value={avatarInput} type="url" required name="avatar"
          placeholder="Ссылка на картинку" onChange={handleAvatarInput}/>
        <Validation errorMessage={errorMessage} name="avatar"/>
      </PopupWithForm>

      <EditProfilePopup onClose={closeAllPopups} 
        isValid={checkInputValidity} 
        isOpen={isEditProfilePopupOpen}
        errorMessage={errorMessage}
        isActive={submitState ? "" : "disabled"} >
      </EditProfilePopup>
      
      {/* <PopupWithForm 
        title="Редактировать профиль" name="edit-profile" submitBtn="Сохранить" 
        onClose={closeAllPopups} isValid={checkInputValidity} isOpen={isEditProfilePopupOpen}
        isActive={submitState ? "" : "disabled"}>

        <input className="popup__input popup__input_type_username" value={nameInput} type="text" required minLength="2" maxLength="40"
          name="username" placeholder="Имя" onChange={handleNameInput}/>
        <Validation errorMessage={errorMessage} name="username"/>       
        <input className="popup__input popup__input_type_about" value={infoInput} type="text" required minLength="2"
          maxLength="200" name="about" placeholder="О себе" onChange={handleInfoInput}/>
        <Validation errorMessage={errorMessage} name="about"/>
      </PopupWithForm> */}

      <PopupWithForm 
        title="Новое место" name="add-place" submitBtn="Создать" 
        onClose={closeAllPopups} isValid={checkInputValidity} isOpen={isAddPlacePopupOpen}
        isActive={submitState ? "" : "disabled"}> 

        <input className="popup__input popup__input_type_place" value={titleInput} type="text" required minLength="2"
          maxLength="40" name="place" placeholder="Название" onChange={handleTitleInput}/>
        <Validation errorMessage={errorMessage} name="place"/>
        <input className="popup__input popup__input_type_img" value={imageInput} type="url" required name="img"
          placeholder="Ссылка на картинку" onChange={handleImageInput}/>
        <Validation errorMessage={errorMessage} name="img"/>
      </PopupWithForm>

      <PopupWithForm title="Вы уверены?" name="delete-place" submitBtn="Да" onClose={closeAllPopups}/>

      {selectedCard && 
        <ImagePopup card={selectedCard} onClose={closeAllPopups}
        isOpen={selectedCard ? 'popup_opened' : ''}/>
      }
  </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
