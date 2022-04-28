const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitBtn = this._formElement.querySelector(this._submitButtonSelector);
  }

  // включает валидацию
  enableValidation() {
    this._setEventListeners();
  }

  // в кажд. форме находит все инпуты и на кажд. вешает обработчик события input
  // для кажд. нового нажатия вызывает ф.валидации и ф.контроля кнопки submit
  _setEventListeners() {
    this._switchSubmitButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._switchSubmitButtonState();
      });
    });
  }

  // отключает submit, если есть хоть одно невалидное поле
  _switchSubmitButtonState() {
    if(!this._formElement.checkValidity()) {
      this._submitBtn.classList.add(this._inactiveButtonClass);
      this._submitBtn.setAttribute('disabled', '');
    }
    else {
      this._submitBtn.classList.remove(this._inactiveButtonClass);
      this._submitBtn.removeAttribute('disabled');
    }
  }

  // проверяет валидность каждого нажатия
  _checkInputValidity(inputElement) {
    if(!inputElement.checkValidity()) {
      this._showErrors(inputElement, inputElement.validationMessage);
    }
    else {
      this._hideErrors(inputElement);
    }
  }

  // показывает span с ошбками, включает выделение невалидного поля
  _showErrors(inputElement, errorMassage) {
    this._error = this._formElement.querySelector(`.popup__error_type_${inputElement.name}`);
    inputElement.classList.add(this._inputErrorClass);
    this._error.classList.add(this._errorClass);
    this._error.textContent = errorMassage;
  }

  // скрывает span с ошбками, выключает выделение невалидного поля
  _hideErrors(inputElement) {
    this._error = this._formElement.querySelector(`.popup__error_type_${inputElement.name}`);
    inputElement.classList.remove(this._inputErrorClass);
    this._error.classList.remove(this._errorClass);
    this._error.textContent = '';
  }

  // проверяет состояние кнопки и отключает прежнюю валидацию при открытии попапа
  resetValidation() {
    this._switchSubmitButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideErrors(inputElement);
    })
  }
}

const formValidators = {};

const formList = Array.from(document.querySelectorAll(".popup__form"));
// console.log(formList)
formList.forEach((formElement) => {
  // console.log(formElement.name)

  const validator = new FormValidator(settings, formElement);
  const formName = formElement.getAttribute("name");
  formValidators[formName] = validator;
  validator.enableValidation();
});

  // function log() {
  //   console.log(formValidators)
  // }
  // log()

export default formValidators;










