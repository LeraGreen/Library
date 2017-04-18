'use sctrict';

function PopupForm(btn, el) {
  this.btn = btn;
  this.el = el;
  this.form = this.el.querySelector('.form-main');
  this.btnClose = this.el.querySelector('.popup__close');
  this.close = this.close.bind(this);
  this.show = this.show.bind(this);
  this.checkKey = this.checkKey.bind(this);
}

PopupForm.prototype.initialize = function() {

  this.form.addEventListener('submit', this.close);
  this.btn.addEventListener('click', this.show);
  this.btnClose.addEventListener('click', this.close);
  window.addEventListener('keydown', this.checkKey);
}

PopupForm.prototype.checkKey = function(event) {
  if (event.keyCode === 27) {
    this.close();
  }
}

PopupForm.prototype.close = function () {
  if ( !this.el.classList.contains('visually-hidden') ) {
    this.el.classList.add('visually-hidden');
    document.body.style.overflow = '';
  }
}

PopupForm.prototype.show = function(event) {
  event.preventDefault();
  if ( this.el.classList.contains('visually-hidden') ) {
    this.el.classList.remove('visually-hidden');
    document.body.style.overflow = 'hidden';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var btnFormShow = document.getElementById('form-btn');
  var formPopup = document.getElementById('popup-main-form');

  if ( btnFormShow !== null && formPopup !== null) {
    var popupForm = new PopupForm(btnFormShow, formPopup);
    popupForm.initialize();
  }
});

