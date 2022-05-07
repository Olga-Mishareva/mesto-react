import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import Card from "./Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);

  // console.log(currentUser)

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

  
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
        <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.userAvatar})`}}>
          <button className="profile__avatar-edit-btn" onMouseDown={onEditAvatar}></button>
        </div>
          <div className="profile__data">
            <div className="profile__name-container">
              <h1 className="profile__name">{currentUser.userName}</h1>
              <p className="profile__info">{currentUser.userInfo}</p>
            </div>
            <button className="profile__edit-button" type="button" onMouseDown={onEditProfile}></button>
          </div>
        </div>
        <button className="profile__add-button" type="button" onMouseDown={onAddPlace}></button>
      </section>

      <section className="place-grid">
        <ul className="place-grid__places page__list">
          {
            cards.map(card => {
              return (
                <Card 
                key={card.cardId} card={card} 
                onCardClick={onCardClick} 
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}/>
              )
            })
          }
        </ul>
      </section>
    </main>
  )
}

export default Main;

