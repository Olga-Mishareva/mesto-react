import { useState, useEffect } from "react";
import Header from "./Header";
import Main from './Main';
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import api from "../utils/api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState({});

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [toRemove, setToRemove] = useState(null);
  
  const [avatarForm, setAvatarForm] = useState(null); 
  const [userForm, setUserForm] = useState(null);
  const [cardForm, setCardForm] = useState(null);

  const [errorMessage, setErrorMessage] = useState({});  
  const [submitState, setSubmitState] = useState(false);
  const submitButtonState = submitState ? "" : "disabled";

  // ============================ AVATAR ======================================

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    switchSubmitButtonState(avatarForm);
  }

  function handleUpdateAvatar(avatar) {
    setLoading(true);
    api.editUserAvatar(avatar) 
      .then(data => {
        setCurrentUser({ ...currentUser,
          userAvatar: data.avatar
        })
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
    closeAllPopups(); 
  }

  // ============================ PROFILE ======================================

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    console.log(userForm)
    switchSubmitButtonState(userForm);
  }

  useEffect(() => {
    api.getUserData()
      .then(data => {
        setCurrentUser({ ...currentUser, 
          userName: data.name, 
          userInfo: data.about, 
          userAvatar: data.avatar,
          userId: data._id
        })
      })
      .catch(err => console.log(err));
  }, []);

  function handleUpdateUser(data) {
    setLoading(true);                 
    api.editUserData({ data })
      .then(data => {
        setCurrentUser({ ...currentUser,
          userName: data.name,
          userInfo: data.about
        })
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
    closeAllPopups();  
  }

  // ============================ CARD ======================================

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    switchSubmitButtonState(cardForm);
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

  function handleAddPlaceSubmit(elem) {
    setLoading(true); 
    api.addNewCard({ elem })
      .then(newCard => {
        setCards([{
          name: newCard.name,
          link: newCard.link,
          cardId: newCard._id,
          likes: newCard.likes,
          ownerId: newCard.owner._id,
        }, ...cards]);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
    closeAllPopups();  
  }

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
    setLoading(true);
    api.deleteUserCard(card.cardId)
      .then(res => {
        setCards(() => cards.filter(el => el.cardId !== card.cardId));
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
    closeAllPopups();  
  }

  function handleDeleteClick(card) {
    setToRemove(card);
    setIsConfirmPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

// ============================ ALL POPUPS ======================================

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
    setErrorMessage({});
  }

  useEffect(() => {
    function handleEscClick(e) {
      if(e.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isEditAvatarPopupOpen || isEditProfilePopupOpen 
      || isAddPlacePopupOpen || isConfirmPopupOpen || selectedCard) {
      document.addEventListener('keydown', handleEscClick);
      return () => {
        document.removeEventListener('keydown', handleEscClick);
      }
    }
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, isConfirmPopupOpen, selectedCard]);


  // ============================ VALIDATION ======================================


  function setForms(form) {
    console.log(form)
    if(form.name === 'edit-avatar') setAvatarForm(form);
    if(form.name === 'edit-profile') setUserForm(form);
    if(form.name === 'add-place') setCardForm(form);
  }

  function checkInputValidity(e) {
    if(!e.currentTarget.checkValidity()) {
      setErrorMessage({...errorMessage, [e.target.name]: e.target.validationMessage}); 
    }
    else setErrorMessage({})
    switchSubmitButtonState(e.currentTarget);
  }
 
  function switchSubmitButtonState(form) {
    if(form.checkValidity()) {
      setSubmitState(true);
    } else setSubmitState(false);
  }

 // ===========================================================================================
  
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
      onConfirmDelete={handleDeleteClick}/>

      <Footer />

      <EditAvatarPopup 
        onClose={closeAllPopups} 
        isOpen={isEditAvatarPopupOpen}
        onUpdateAvatar={handleUpdateAvatar}
        loading={loading}
        errorMessage={errorMessage}
        isValid={checkInputValidity} 
        onSetForms={setForms}
        isActive={submitButtonState}>
      </EditAvatarPopup>

      <EditProfilePopup 
        onClose={closeAllPopups} 
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        loading={loading}
        errorMessage={errorMessage}
        isValid={checkInputValidity} 
        onSetForms={setForms}
        isActive={submitButtonState}>
      </EditProfilePopup>

      <AddPlacePopup 
        onClose={closeAllPopups} 
        isOpen={isAddPlacePopupOpen}
        onAddCard={handleAddPlaceSubmit}
        loading={loading}
        errorMessage={errorMessage}
        isValid={checkInputValidity}
        onSetForms={setForms} 
        isActive={submitButtonState}>
      </AddPlacePopup>

      {isConfirmPopupOpen &&
        <ConfirmPopup 
          card={toRemove}
          onClose={closeAllPopups} 
          isOpen={isConfirmPopupOpen}
          onDeleteCard={handleCardDelete}
          onSetForms={setForms}
          loading={loading}>
        </ConfirmPopup>}

      {selectedCard && 
        <ImagePopup card={selectedCard} onClose={closeAllPopups}
          isOpen={selectedCard ? 'popup_opened' : ''}/>
      }
  </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
