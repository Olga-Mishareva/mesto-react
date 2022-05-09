import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import Validation from "./Validation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, loading, isValid, isActive, errorMessage }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen])


  return (
    <PopupWithForm 
        title="Обновить аватар" name="edit-avatar" 
        onClose={onClose} isValid={isValid} isOpen={isOpen} isActive={isActive}
        submitBtn={loading ? 'Сохраниение...' : 'Сохранить'}
        onSubmit={handleSubmit}> 

        <input ref={avatarRef} className="popup__input popup__input_type_avatar" 
          type="url" required name="avatar" placeholder="Ссылка на картинку"/>
        <Validation errorMessage={errorMessage} name="avatar"/>
      </PopupWithForm>
  ) 
}

export default EditAvatarPopup;