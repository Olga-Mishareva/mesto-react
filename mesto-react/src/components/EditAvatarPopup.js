import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import Validation from "./Validation";

function EditAvatarPopup({ isOpen, onClose, onUpdateUser, loading, isValid, isActive, errorMessage }) {
  const [avatar, setAvatar] = useState(''); 

  function handleAvatarInput(e) {
    setAvatar(e.target.value);
  }

  return (
    <PopupWithForm 
        title="Обновить аватар" name="edit-avatar" 
        onClose={onClose} isValid={isValid} isOpen={isOpen} isActive={isActive}
        submitBtn={loading ? 'Сохраниение...' : 'Сохранить'}> 

        <input className="popup__input popup__input_type_avatar" value={avatar} type="url" required name="avatar"
          placeholder="Ссылка на картинку" onChange={handleAvatarInput}/>
        <Validation errorMessage={errorMessage} name="avatar"/>
      </PopupWithForm>
  ) 
}

export default EditAvatarPopup;