import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import Card from "./Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  
  
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
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}/>
              )
            })
          }
        </ul>
      </section>
    </main>
  )
}

export default Main;

