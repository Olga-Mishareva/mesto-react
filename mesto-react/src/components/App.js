import { useState, useEffect } from "react";
import Header from "./Header";
import Main from './Main';
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
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
    switchSubmitButtonState(userForm)
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
    api.deleteUserCard(card.cardId)
      .then(res => {
        setCards(() => cards.filter(el => el.cardId !== card.cardId));
      })
      .catch(err => console.log(err));
  }

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
        onAddCard={handleAddPlaceSubmit}
        loading={loading}
        errorMessage={errorMessage}
        isValid={checkInputValidity} 
        isActive={submitState ? "" : "disabled"}>
      </AddPlacePopup>

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
