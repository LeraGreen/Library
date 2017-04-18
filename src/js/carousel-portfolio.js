'use strict';

function TaskCarousel(el) {
  this.el = el;
  this.title = this.el.querySelector('.carousel-promotion__item-title');
}

TaskCarousel.prototype.initialize = function() {
  this.carousel = new Carousel(this.el);
  this.carousel.initialize();
  var cardEl = this.carousel.findElement();
  this.setHost(cardEl);

  this.carousel.update = function() {
    var cardEl = this.carousel.findElement();
    this.setHost(cardEl);
  }.bind(this);
}

TaskCarousel.prototype.setHost = function(cardEl) {
  var host = cardEl.getAttribute('data-host');
  this.title.textContent = host;
}
