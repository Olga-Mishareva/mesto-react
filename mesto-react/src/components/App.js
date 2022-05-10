import { useState, useEffect } from "react";
import Header from "./Header";
import  Main from './Main';
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Validation from "./Validation";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';



function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [loading, setLoading] = useState(false);
  
  const [currentUser, setCurrentUser] = useState({});

  // ============================ AVATAR ======================================

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    switchSubmitButtonState(avatarForm)
  }

  function handleUpdateAvatar(avatar) {
    setLoading(true);
    api.editUserAvatar(avatar) 
      .then(res => {
        setCurrentUser({ ...currentUser,
          userAvatar: res.avatar
        })
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
    closeAllPopups(); 
  }

  // ============================ PROFILE ======================================

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    switchSubmitButtonState(userForm)
  }

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
  }, []);

  function handleUpdateUser(data) {
    setLoading(true);                 
    api.editUserData({ data })
      .then(res => {
        setCurrentUser({ ...currentUser,
          userName: res.name,
          userInfo: res.about
        })
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
    closeAllPopups();  
  }

  // ============================ CARD ======================================

  const [cards, setCards] = useState([]);

  function handleAddPlaceClick() {
  setIsAddPlacePopupOpen(true);
  switchSubmitButtonState(cardForm)
  }

  useEffect(() => {
    api.getUsersCards()
      .then(res => {
        const usersCards = res.map(card => {
          return {
            name: card.name,
            link: card.link,
            cardId: card._id,
            likes: card.likes,
            ownerId: card.owner._id,
          }
        });
        setCards(usersCards);
      })
      .catch(err => console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser.userId);
    api.changeLikeCardStatus(card.cardId, isLiked)
      .then(res => {
        setCards(() => cards.map(el => {
          if(el.cardId === res._id) {
            return {
              name: res.name,
              link: res.link,
              cardId: res._id,
              likes: res.likes,
              ownerId: res.owner._id
            }
          } 
          else return el;
        }));
        // перебираем массив cards и заменяем в стейте только одну карточку, 
        // id которой совпадает с лайкнутой картой
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteUserCard(card.cardId)
      .then(res => {
        setCards(() => cards.filter(el => el.cardId !== card.cardId));
      })
      .catch(err => console.log(err));
  }
  // console.log(cards)

  function handleCardClick(card) {
    setSelectedCard(card);
  }

// ============================ ALL POPUPS ======================================

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setErrorMessage({});
    // cleanAllInputs();
  }

  // function cleanAllInputs() {  // передать очистку инпутов в компонент
  //   setTitleInput('');
  //   setImageInput('');
  // }

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


  // ============================ VALIDATION ======================================

  const [avatarForm, setAvatarForm] = useState(null); // подумать еще, как лучше достать формы
  const [userForm, setUserForm] = useState(null);
  const [cardForm, setCardForm] = useState(null);

  const [errorMessage, setErrorMessage] = useState({});  // сделать контекстом??
  const [submitState, setSubmitState] = useState(false);

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

  
  return (
    <CurrentUserContext.Provider value={currentUser}> {/* значение, которое передается всем дочерним элементам */}
    <div className="page">
      <Header />

      <Main cards={cards}
      onEditAvatar={handleEditAvatarClick} 
      onEditProfile={handleEditProfileClick} 
      onAddPlace={handleAddPlaceClick} 
      onCardClick={handleCardClick}
      onCardLike={handleCardLike} 
      onCardDelete={handleCardDelete}/>

      <Footer />

      <EditAvatarPopup
      onClose={closeAllPopups} 
      isOpen={isEditAvatarPopupOpen}
      onUpdateAvatar={handleUpdateAvatar}
      loading={loading}
      errorMessage={errorMessage}
      isValid={checkInputValidity} 
      isActive={submitState ? "" : "disabled"}>
      </EditAvatarPopup>

      <EditProfilePopup 
        onClose={closeAllPopups} 
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        loading={loading}
        errorMessage={errorMessage}
        isValid={checkInputValidity} 
        isActive={submitState ? "" : "disabled"}>
      </EditProfilePopup>

      <AddPlacePopup 
        onClose={closeAllPopups} 
        isOpen={isAddPlacePopupOpen}
        // onAddCard={handleAddCard}
        loading={loading}
        errorMessage={errorMessage}
        isValid={checkInputValidity} 
        isActive={submitState ? "" : "disabled"}>
      </AddPlacePopup>

      {/* <PopupWithForm 
        title="Новое место" name="add-place" submitBtn="Создать" 
        onClose={closeAllPopups} isValid={checkInputValidity} 
        isOpen={isAddPlacePopupOpen}
        isActive={submitState ? "" : "disabled"}> 

        <input className="popup__input popup__input_type_place" value={titleInput} type="text" required minLength="2"
          maxLength="40" name="place" placeholder="Название" onChange={handleTitleInput}/>
        <Validation errorMessage={errorMessage} name="place"/>
        <input className="popup__input popup__input_type_img" value={imageInput} type="url" required name="img"
          placeholder="Ссылка на картинку" onChange={handleImageInput}/>
        <Validation errorMessage={errorMessage} name="img"/>
      </PopupWithForm> */}

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
