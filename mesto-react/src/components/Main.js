function Main() {
  return (
    <main className="content">
    <section className="profile">
      <div className="profile__container">
       <div className="profile__avatar">
         <button className="profile__avatar-edit-btn"></button>
       </div>
        <div className="profile__data">
          <div className="profile__name-container">
            <h1 className="profile__name">Миссис М</h1>
            <p className="profile__info">Путешественница</p>
          </div>
          <button className="profile__edit-button" type="button"></button>
        </div>
      </div>
      <button className="profile__add-button" type="button"></button>
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