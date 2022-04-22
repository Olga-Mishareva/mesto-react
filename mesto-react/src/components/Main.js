import { useState, useEffect } from "react";
import api from "../utils/api";

function Main({ onEditAvatar, onEditProfile, onAddPlace }) {

  const [userName, setUserName] = useState();
  const [userDescription, setUserDescription] = useState();
  const [userAvatar, setUserAvatar] = useState();

  useEffect(() => {
    api.getUserData()
      .then(res => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
        <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }}>
          <button className="profile__avatar-edit-btn" onClick={onEditAvatar}></button>
        </div>
          <div className="profile__data">
            <div className="profile__name-container">
              <h1 className="profile__name">{userName}</h1>
              <p className="profile__info">{userDescription}</p>
            </div>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>

      <section className="place-grid">
        <ul className="place-grid__places page__list">
          
        </ul>

        <template id="card">
          <li className="place">
            <button className="place__trash place__trash_type_active" type="button"></button>
            <img className="place__image" src="#" alt=""/>
            <div className="place__title-container">
              <h2 className="place__title"></h2>
              <div className="place__like-container">
                <button className="place__stroke" type="button"></button>
                <span className="place__like-counter"></span>
              </div>
            </div>
          </li>
        </template>
      </section>
    </main>
  )
}

export default Main;