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
    this.cardPreview = cardPreview;
    this.cardholderNameInput = document.querySelector('#input-cardholder-name');
    this.cardNumberInput = document.querySelector('#input-card-number');
    this.expiryMonthInput = document.querySelector('#input-card-expiry-mm');
    this.expiryYearInput = document.querySelector('#input-card-expiry-yy');
    this.cvcInput = document.querySelector('#input-card-cvc');
    this.cardholderNameError = document.querySelector('#error-cardholder-name');
    this.cardNumberError = document.querySelector('#error-card-number');
    this.expiryDateError = document.querySelector('#error-card-expiry');
    this.cvcError = document.querySelector('#error-card-cvc');
  }
  
  init() {
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

    this.expiryYearInput.addEventListener('input', () => {
      this.updateExpiryDatePreview();
    })

    this.cvcInput.addEventListener('input', (e) => {
      this.updateCardCvcPreview(e.target.value);
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
    }
    else {
      this.cardholderNameError.textContent = "";
      this.cardholderNameError.hidden = true;
      this.cardholderNameInput.classList.remove('error-input');
    }
  }

  updateCardNumberPreview(cardNumber) {
    const cleanDigits = cardNumber.replace(/\D/g, '').substring(0, 16);

    const formattedNumber = cleanDigits ? cleanDigits.match(/.{1,4}/g).join(' ') : '0000 0000 0000 0000';

    this.cardNumberInput.value = cleanDigits ? formattedNumber : '';
    this.cardPreview.cardNumberField.textContent = formattedNumber;
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
      return;
    }

    this.cardNumberError.hidden = false;
    this.cardNumberInput.classList.add('error-input');
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

    year = year.padStart(2, '0');
    month = month.padStart(2, '0');

    this.cardPreview.expiryDateField.textContent = `${month}/${year}`;
  }

  updateCardCvcPreview(cvc) {
    const cleanDigits = cvc.replace(/\D/g, '').substring(0, 3);

    this.cvcInput.value = cleanDigits;
    this.cardPreview.cvcField.textContent = cleanDigits ? cleanDigits : '000';
  }
}

const cardPreview = new CardPreview();
const formCardInfo = new FormCardInfo(cardPreview);

formCardInfo.init();