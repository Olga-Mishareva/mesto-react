function Card({ card, isVisible }) {

  return (
    <li className="place">
      <button className="place__trash place__trash_type_active" type="button"></button>
      <img className="place__image" src={card.link} alt={card.name}/>
        <div className="place__title-container">
            <h2 className="place__title">{card.name}</h2>
              <div className="place__like-container">
                <button className="place__stroke" type="button"></button>
                <span className={`place__like-counter ${isVisible}`}>{card.likes.length}</span>
              </div>
        </div>
    </li>
  )
}

export default Card;