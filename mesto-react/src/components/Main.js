import PopupWithForm from "./PopupWithForm";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onClose, isOpen }) {


  return (
    <main className="content">
    <section className="profile">
      <div className="profile__container">
       <div className="profile__avatar">
         <button className="profile__avatar-edit-btn" onClick={onEditAvatar}></button>
       </div>
        <div className="profile__data">
          <div className="profile__name-container">
            <h1 className="profile__name">Миссис М</h1>
            <p className="profile__info">Путешественница</p>
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


          {/* <div className="popup popup_type_edit-profile">
        <div className="popup__container">
          <button className="popup__close-button" type="button"></button>
          <form className="popup__form" novalidate name="profile-form" action="#" method="post" id="save">
            <h2 className="popup__title">Редактировать профиль</h2>
            <input className="popup__input popup__input_type_name" type="text" required minlength="2" maxlength="40"
              name="username" placeholder="Имя"/>
            <span className="popup__error popup__error_type_username"></span>
            <input className="popup__input popup__input_type_info" type="text" required minlength="2"
             maxlength="200" name="about" placeholder="О себе"/>
            <span className="popup__error popup__error_type_about"></span>
            <button className="popup__submit-button" type="submit" form="save">Сохранить</button>
          </form>
        </div>
      </div> */}

      {/* <div className="popup popup_type_edit-avatar">
        <div className="popup__container popup__container_type_edit-avatar">
          <button className="popup__close-button" type="button"></button>
          <form className="popup__form" novalidate name="avatar-form" action="#" method="post" id="user-avatar">
            <h2 className="popup__title">Обновить аватар</h2>
            <input className="popup__input popup__input_type_link" type="url" required name="avatar"
              placeholder="Ссылка на картинку"/>
            <span className="popup__error popup__error_type_avatar"></span>
            <button className="popup__submit-button" type="submit" form="user-avatar">Сохранить</button>
          </form>
        </div>
      </div> */}

      {/* <div className="popup popup_type_add-place">
        <div className="popup__container">
          <button className="popup__close-button" type="button"></button>
          <form className="popup__form" novalidate name="add-form" action="#" method="post" id="add">
            <h2 className="popup__title">Новое место</h2>
            <input className="popup__input popup__input_type_place" type="text" required minlength="2"
              maxlength="40" name="place" placeholder="Название"/>
            <span className="popup__error popup__error_type_place"></span>
            <input className="popup__input popup__input_type_link" type="url" required name="img"
              placeholder="Ссылка на картинку"/>
            <span className="popup__error popup__error_type_img"></span>
            <button className="popup__submit-button popup__submit-button_disabled" type="submit" form="add">Создать</button>
          </form>
        </div>
      </div> */}

      {/* <div className="popup popup_type_delete-place">
        <div className="popup__container popup__container_type_delete-place">
          <button className="popup__close-button" type="button"></button>
          <form className="popup__form" noValidate name="delete-form" action="#" method="post" id="delete">
            <h2 className="popup__title popup__title_type_delete-place">Вы уверены?</h2>
            <button className="popup__submit-button" type="submit" form="delete">Да</button>
          </form>
        </div>
      </div> */}

  </main>
  )
}

export default Main;