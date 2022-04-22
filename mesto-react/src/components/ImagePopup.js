function ImagePopup() {
  return (
    <div className="popup popup_type_show-image">
      <div className="popup__illustration">
        <button className="popup__close-button popup__close-button_type_show" type="button"></button>
        <img className="popup__image" src="#" alt=""/>
        <p className="popup__caption"></p>
      </div>
    </div>
  )
}

export default ImagePopup;