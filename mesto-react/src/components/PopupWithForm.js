function PopupWithForm({ title, name, submitBtn, isOpen, onClose, children}) {

  return (
    <div className={`popup popup_type_${name} ${isOpen}`} onMouseDown={onClose}>
      <div className={`popup__container popup__container_type_${name}`} onMouseDown={(e) => e.stopPropagation()}>
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <form className="popup__form" noValidate name={name} action="#" method="post" id={name}>
          <h2 className={`popup__title popup__title_type_${name}`}>{title}</h2>
          {children}
          <button className="popup__submit-button" type="submit" form={name}>{submitBtn}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;