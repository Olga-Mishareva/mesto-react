import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.ownerId === currentUser.userId;
  const trashButton = `place__trash ${isOwn ? 'place__trash_type_active' : ''}`;

  const isLiked = card.likes.some(like => like._id === currentUser.userId);
  const strokeButton = `place__stroke ${isLiked ? 'place__stroke_liked' : ''}`;

  const likeCounter = `place__like-counter ${card.likes.length > 0 ? 'place__like-counter_visible' : ''}`

  // console.log(card)


  function handleCardClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="place">
      <button className={trashButton} type="button" onMouseDown={handleDeleteClick}></button>
      <img className="place__image" src={card.link} alt={card.name} onMouseDown={handleCardClick}/>
        <div className="place__title-container">
            <h2 className="place__title">{card.name}</h2>
              <div className="place__like-container">
                <button className={strokeButton} type="button" onMouseDown={handleLike}></button>
                <span className={likeCounter}>{card.likes.length}</span>
              </div>
        </div>
    </li>
  )
}

export default Card;