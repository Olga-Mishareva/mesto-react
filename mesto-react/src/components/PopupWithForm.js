function PopupWithForm({ title, name, submitBtn, isOpen, onClose, isActive, isValid, onSubmit, children }) {

  

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onMouseDown={onClose} >
      <div className={`popup__container popup__container_type_${name}`} onMouseDown={(e) => e.stopPropagation()}>
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <form className="popup__form" noValidate name={name} action="#" method="post" id={name} 
          onChange={isValid} onSubmit={onSubmit}>
          <h2 className={`popup__title popup__title_type_${name}`}>{title}</h2>
          {children}
          <button className={`popup__submit-button popup__submit-button_${isActive}`}  type="submit" form={name}>{submitBtn}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;