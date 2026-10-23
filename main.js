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
  }
  
  init() {
    this.cardholderNameInput.addEventListener('input', (e) => {
      this.updateCardholderNamePreview(e.target.value.trim());
    });

    this.cardNumberInput.addEventListener('input', (e) => {
      this.updateCardNumberPreview(e.target.value.trim());
    });

    this.expiryMonthInput.addEventListener('input', () => {
      this.updateExpiryDatePreview();
    })

    this.expiryYearInput.addEventListener('input', () => {
      this.updateExpiryDatePreview();
    })
  }
  
  updateCardholderNamePreview(cardholderName) {
    this.cardPreview.cardholderNameField.textContent = cardholderName !== '' ? cardholderName : 'Jane Appleseed';
  }

  updateCardNumberPreview(cardNumber) {
    this.cardPreview.cardNumberField.textContent = cardNumber !== '' ? cardNumber : '0000 0000 0000 0000';
  }

  updateExpiryDatePreview() {
    let year = this.expiryYearInput.value;
    let month = this.expiryMonthInput.value;
    year = year !== '' ? year : '00';
    month = month !== '' ? month : '00';
    this.cardPreview.expiryDateField.textContent = `${month}/${year}`;
  }
}

const cardPreview = new CardPreview();
const formCardInfo = new FormCardInfo(cardPreview);

formCardInfo.init();