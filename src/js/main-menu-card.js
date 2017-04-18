function ToggleCards(el) {
  this.el = el;
  this.blocks = el.querySelectorAll('.features__item-wrap');
  this.toggleCards = this.toggleCards.bind(this);
}

ToggleCards.prototype.initialize = function() {
  if (this.blocks === null) {
    return;
  }
  for (var i = 0; i < this.blocks.length; i++ ) {
    this.blocks[i].addEventListener('click', this.toggleCards);
  }
}

ToggleCards.prototype.toggleCards = function(event) {
  var currentItem = event.currentTarget;
  currentItem.classList.toggle('features__item-wrap--rotate');
}

ToggleCards.prototype.delete = function() {
  for (var i = 0; i < this.blocks.length; i++ ) {
    this.blocks[i].removeEventListener('click', this.toggleCards);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var ua = navigator.userAgent;
  var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
  if (ua.search(/MSIE/) === -1 && isIE11 !== true) {
    var features = document.querySelector('.features');
    if ( features !== null ) {
      var featuresBlock = new ToggleCards(features);
      featuresBlock.initialize();
    }
  };
});
