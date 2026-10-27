class CardPreview {
  constructor() {
    this.cardholderNameField = document.querySelector('.cardholder-name');
    this.cardNumberField = document.querySelector('.card-number');
    this.expiryDateField = document.querySelector('.card-expiry');
    this.cvcField = document.querySelector('.card-cvc');
  }
}

class FormCardInfo {
  constructor(cardPreview) {
    this.form = document.querySelector('.form-card-info');
    this.cardPreview = cardPreview;
    this.completedState = document.querySelector('.completed-state');
    this.cardholderNameInput = document.querySelector('#input-cardholder-name');
    this.cardNumberInput = document.querySelector('#input-card-number');
    this.expiryMonthInput = document.querySelector('#input-card-expiry-mm');
    this.expiryYearInput = document.querySelector('#input-card-expiry-yy');
    this.cvcInput = document.querySelector('#input-card-cvc');
    this.cardholderNameError = document.querySelector('#error-cardholder-name');
    this.cardNumberError = document.querySelector('#error-card-number');
    this.expiryDateError = document.querySelector('#error-card-expiry');
    this.cvcError = document.querySelector('#error-card-cvc');
    this.confirmBtn = document.querySelector('.form-card-info button');
    this.continueBtn = document.querySelector('.completed-state button');
  }
  
  init() {
    this.form.addEventListener('submit', (e) => {
      this.finalValidation(e);
    });

    this.cardholderNameInput.addEventListener('input', (e) => {
      this.updateCardholderNamePreview(e.target.value);
    });

    this.cardholderNameInput.addEventListener('blur', (e) => {
      this.validateCardholderName(e.target.value);
    })

    this.cardNumberInput.addEventListener('input', (e) => {
      this.updateCardNumberPreview(e.target.value);
    });

    this.cardNumberInput.addEventListener('blur', (e) => {
      this.validateCardNumber(e.target.value);
    })

    this.expiryMonthInput.addEventListener('input', () => {
      this.updateExpiryDatePreview();
    })

    this.expiryMonthInput.addEventListener('blur', () => {
      this.validateExpiryDate();
    })

    this.expiryYearInput.addEventListener('input', () => {
      this.updateExpiryDatePreview();
    })

    this.expiryYearInput.addEventListener('blur', () => {
      this.validateExpiryDate();
    })

    this.cvcInput.addEventListener('input', (e) => {
      this.updateCardCvcPreview(e.target.value);
    })

    this.cvcInput.addEventListener('blur', (e) => {
      this.validateCardCvc(e.target.value);
    })

    this.continueBtn.addEventListener('click', () => {
      this.resetForm();
    })
  }
  
  updateCardholderNamePreview(cardholderName) {
    const cleanString = cardholderName.replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, ' ');

    this.cardholderNameInput.value = cleanString;
    this.cardPreview.cardholderNameField.textContent = cleanString.trim() ? cleanString : 'Jane Appleseed';
  }

  validateCardholderName(cardholderName) {
    if(cardholderName.trim() === '') {
      this.cardholderNameError.textContent = "Can't be blank";
      this.cardholderNameError.hidden = false;
      this.cardholderNameInput.classList.add('error-input');
      return false;
    }
    else {
      this.cardholderNameError.textContent = "";
      this.cardholderNameError.hidden = true;
      this.cardholderNameInput.classList.remove('error-input');
      return true;
    }
  }

  updateCardNumberPreview(cardNumber) {
    const cleanDigits = cardNumber.replace(/\D/g, '').substring(0, 16);

    const formattedNumber = cleanDigits ? cleanDigits.match(/.{1,4}/g).join(' ') : '0000 0000 0000 0000';

    this.cardNumberInput.value = cleanDigits ? formattedNumber : '';
    this.cardPreview.cardNumberField.textContent = formattedNumber;

    if(cleanDigits.length === 16 && document.activeElement === this.cardNumberInput)
      this.expiryMonthInput.focus();
  }

  validateCardNumber(cardNumber) {
    if(cardNumber === '')
      this.cardNumberError.textContent = "Can't be blank";
    
    else if(cardNumber.replace(/\s/g, '').length !== 16)
      this.cardNumberError.textContent = "Must be 16 digits";

    else {
      this.cardNumberError.textContent = "";
      this.cardNumberError.hidden = true;
      this.cardNumberInput.classList.remove('error-input');
      return true;
    }

    this.cardNumberError.hidden = false;
    this.cardNumberInput.classList.add('error-input');
    return false;
  }

  updateExpiryDatePreview() {
    let year = this.expiryYearInput.value;
    let month = this.expiryMonthInput.value;

    year = year.replace(/\D/g, '').substring(0, 2);
    month = month.replace(/\D/g, '').substring(0, 2);

    const monthNumber = parseInt(month);
    
    if(month === '00' || monthNumber > 12)
      month = month.substring(0, 1);
    
    this.expiryYearInput.value = year;
    this.expiryMonthInput.value = month;

    if(month.length === 2 && document.activeElement === this.expiryMonthInput)
      this.expiryYearInput.focus();
    
    if(year.length === 2 && document.activeElement === this.expiryYearInput)
      this.cvcInput.focus();


    year = year.padStart(2, '0');
    month = month.padStart(2, '0');

    this.cardPreview.expiryDateField.textContent = `${month}/${year}`;
  }

  validateExpiryDate() {
    const year = this.expiryYearInput.value;
    const month = this.expiryMonthInput.value;
    const date = new Date();

    const inputYear  = parseInt(`20${year}`);

    if(parseInt(month) < 1 || 12 < parseInt(month)) {
      this.expiryDateError.textContent = "Invalid date";
      this.expiryDateError.hidden = false;
      this.expiryMonthInput.classList.add('error-input');
      this.expiryYearInput.classList.toggle('error-input', year === '');
      return false;
    }
    else if(year === '' || month === '') {
      this.expiryDateError.textContent = "Can't be blank";
      this.expiryDateError.hidden = false;
      this.expiryYearInput.classList.toggle('error-input', year === '');
      this.expiryMonthInput.classList.toggle('error-input', month === '');      
      return false;
    }
    else if(inputYear  < date.getFullYear() || (inputYear  === date.getFullYear() && parseInt(month) < date.getMonth() + 1)) {
      this.expiryDateError.textContent = "Card has expired";
      this.expiryDateError.hidden = false;
      this.expiryMonthInput.classList.add('error-input');
      this.expiryYearInput.classList.add('error-input');
      return false;
    }
    else {
      this.expiryDateError.textContent = "";
      this.expiryDateError.hidden = true;
      this.expiryYearInput.classList.remove('error-input');
      this.expiryMonthInput.classList.remove('error-input');
      return true;
    }
  }

  updateCardCvcPreview(cvc) {
    const cleanDigits = cvc.replace(/\D/g, '').substring(0, 3);

    this.cvcInput.value = cleanDigits;
    this.cardPreview.cvcField.textContent = cleanDigits ? cleanDigits : '000';

    if(cleanDigits.length === 3 && document.activeElement === this.cvcInput)
      this.confirmBtn.focus();
  }

  validateCardCvc(cvc) {
    if(cvc === '')
      this.cvcError.textContent = "Can't be blank";
    
    else if(cvc.length !== 3)
      this.cvcError.textContent = 'Must be 3 digits';

    else {
      this.cvcError.textContent = '';
      this.cvcError.hidden = true;
      this.cvcInput.classList.remove('error-input');
      return true;
    }

    this.cvcError.hidden = false;
    this.cvcInput.classList.add('error-input');
    return false;
  }

  finalValidation(e) {
    e.preventDefault();

    const isCardholderNameValid = this.validateCardholderName(this.cardholderNameInput.value);
    const isCardNumberValid = this.validateCardNumber(this.cardNumberInput.value);
    const isExpiryDateValid = this.validateExpiryDate();
    const isCardCvcValid = this.validateCardCvc(this.cvcInput.value);

    if(isCardholderNameValid && isCardNumberValid && isExpiryDateValid && isCardCvcValid) {
      this.form.hidden = true;
      this.completedState.hidden = false;
      this.completedState.querySelector('h2').setAttribute('tabindex', '-1');
      this.completedState.querySelector('h2').focus();
    }
    else if(!isCardholderNameValid)
      this.cardholderNameInput.focus();

    else if(!isCardNumberValid)
      this.cardNumberInput.focus();

    else if(!isExpiryDateValid) {
      if(this.expiryMonthInput.classList.contains('error-input'))
        this.expiryMonthInput.focus();

      else
        this.expiryYearInput.focus();
    }
    else {
      this.cvcInput.focus();
    }
  }

  resetForm() {
    this.form.reset();

    this.updateCardholderNamePreview('');
    this.updateCardNumberPreview('');
    this.updateExpiryDatePreview();
    this.updateCardCvcPreview('');

    this.form.hidden = false;
    this.completedState.hidden = true;

    this.cardholderNameInput.focus()
  }
}

const cardPreview = new CardPreview();
const formCardInfo = new FormCardInfo(cardPreview);

formCardInfo.init();