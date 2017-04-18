'use strict';
function Carousel(el) {
  this.el = el;
  this.carousel = el.querySelector('.carousel');
  this.wrapBlock = el.querySelector('.carousel-wrap-list');
  this.itemsList = el.querySelectorAll('.carousel__item');
  this.tabsLeft = el.querySelectorAll('.tab--left');
  this.tabsRight = el.querySelectorAll('.tab--right');
  this.itemsCount = this.itemsList.length;

  this.onresize = this.onresize.bind(this);
  this.moveCarouselNext = this.moveCarouselNext.bind(this);
  this.moveCarouselPrev = this.moveCarouselPrev.bind(this);
  this.handleMove = this.handleMove.bind(this);
  this.handleEnd = this.handleEnd.bind(this);

  this.wrapBlockWidth = null;
  this.itemWidthWithOffset = null;
  this.carouselMarginLeft = 0;
  this.countCardsInBlock = null;
  this.itemOffset = null;
  this.stepsCount = null;
  this.handleMoveXStart = null;
  this.handleMoveXEnd = null;
  this.handleMoveYStart = null;
  this.handleMoveYEnd = null;
  this.marginMax = 0;
  this.marginMin = null;
  this.startItem = 0;
}
Carousel.prototype.initialize = function() {
  this.calcSizeWrapBlock();
  this.calcItemOffset();
  this.calcCarouselWidth();
  this.calcSizeCarouselItem();
  this.calcCountCardsInBlock();
  this.calcMarginMin();
  this.update();


  window.addEventListener('resize', this.onresize);

  for ( var i = 0; i < this.tabsRight.length; i++ ) {
    this.tabsRight[i].addEventListener( 'click', this.moveCarouselNext );
  }

  for ( var j = 0; j < this.tabsLeft.length; j++ ) {
    this.tabsLeft[j].addEventListener( 'click', this.moveCarouselPrev);
  }

  this.el.addEventListener('touchstart', this.handleMove );
  this.el.addEventListener('touchend', this.handleEnd );

  this.carouselMarginLeft = this.itemWidthWithOffset * this.startItem * -1;
  this.move();
}

Carousel.prototype.calcSizeWrapBlock = function() {
  this.wrapBlockWidth = this.wrapBlock.clientWidth;
}

Carousel.prototype.calcSizeCarouselItem = function() {
  this.itemWidth = this.itemsList[0].clientWidth;
  this.itemWidthWithOffset = this.itemWidth + this.itemOffset;
}

Carousel.prototype.calcCountCardsInBlock = function() {
  var widthCarouselWrap = this.wrapBlockWidth + this.itemOffset;
  this.countCardsInBlock = Math.floor(widthCarouselWrap / this.itemWidthWithOffset);
}

Carousel.prototype.calcItemOffset = function() {
  var carouselItemStyle = getComputedStyle(this.itemsList[0]);
  this.itemOffset = parseFloat(carouselItemStyle.marginRight);
}

Carousel.prototype.calcMarginMin = function() {
  var steps = this.itemsCount / this.countCardsInBlock;
  var stepWidth = this.wrapBlockWidth + this.itemOffset;
  this.marginMin = -((steps * stepWidth) - stepWidth);
}

Carousel.prototype.moveCarouselPrev = function() {
  this.calcNextCarouselMargin(this.countCardsInBlock);
}

Carousel.prototype.moveCarouselNext = function() {
  this.calcNextCarouselMargin(-this.countCardsInBlock);
}

Carousel.prototype.handleMove = function(evt) {
  this.handleMoveXStart = Math.round(evt.changedTouches[0].clientX);
  this.handleMoveYStart = Math.round(evt.changedTouches[0].clientY);
}

Carousel.prototype.handleEnd = function(evt) {
  this.handleMoveXEnd = Math.round(evt.changedTouches[0].clientX);
  this.handleMoveYEnd = Math.round(evt.changedTouches[0].clientY);
  this.calcCoordinatesDifference();
}

Carousel.prototype.calcCoordinatesDifference = function() {
  if ( this.handleMoveYStart - this.handleMoveYEnd <= 30 || this.handleMoveYEnd - this.handleMoveYStart <= 30 ) {
    if ( this.handleMoveXEnd - this.handleMoveXStart > 15 ) {
      this.calcNextCarouselMargin(this.countCardsInBlock);
    }
    if ( this.handleMoveXStart - this.handleMoveXEnd > 15 ) {
      this.calcNextCarouselMargin(-this.countCardsInBlock);
    }
  }
}

Carousel.prototype.calcNextCarouselMargin = function(number) {
  var widthStep = this.itemWidthWithOffset * number;
  this.carouselMarginLeft += widthStep;
  this.move();
}

Carousel.prototype.calcCarouselWidth = function() {
  var screenSize = document.documentElement.clientWidth;
  this.carouselWidth = this.itemsList.length * (screenSize + this.itemOffset);
  this.carousel.style.width = this.carouselWidth + 'px';
}

Carousel.prototype.move = function() {
  if ( this.carouselMarginLeft < this.marginMin ) {
    this.carouselMarginLeft = this.marginMin;  }

  if ( this.carouselMarginLeft > this.marginMax ) {
    this.carouselMarginLeft = this.marginMax;
    this.disabledTabs(this.tabsRight);
  }

  if ( this.carouselMarginLeft === this.marginMin ) {
    this.disabledTabs(this.tabsRight);
  } else {
    this.deleteDisabledTabsClass(this.tabsRight);
  }

  if ( this.carouselMarginLeft === this.marginMax) {
    this.disabledTabs(this.tabsLeft);
  } else {
    this.deleteDisabledTabsClass(this.tabsLeft);
  }

  this.carousel.style.marginLeft = this.carouselMarginLeft + 'px';
  this.update();
}


Carousel.prototype.deleteDisabledTabsClass = function(elements) {
  for ( var i = 0; i < elements.length; i++ ) {
    if ( elements[i].classList.contains('tab--disabled') ) {
      elements[i].classList.remove('tab--disabled');
    }
  }
}

Carousel.prototype.disabledTabs = function(elements) {
  for ( var i = 0; i < elements.length; i++ ) {
    if ( !elements[i].classList.contains('tab--disabled') ) {
      elements[i].classList.add('tab--disabled');
    }
  }
}

Carousel.prototype.getPointer = function(width) {
  var pointer = Math.round(this.carouselMarginLeft / width) * -1;
  return pointer;
}

Carousel.prototype.onresize = function() {
  clearTimeout(this.timer)
  this.timer = setTimeout( this.calcResize.bind(this), 180);
}

Carousel.prototype.calcResize = function() {
  var widthWrapper = this.wrapBlockWidth;
  var sizeItem = this.itemWidthWithOffset;
  this.calcSizeWrapBlock();
  this.calcCarouselWidth();
  this.calcSizeCarouselItem();
  if ( widthWrapper !== this.wrapBlockWidth || this.itemWidthWithOffset !== sizeItem ) {
    this.startItem = this.getPointer(sizeItem);
    this.destroy();
    this.initialize();
  } else {
    return;
  }
}

Carousel.prototype.destroy = function() {
  window.removeEventListener( 'resize', this.onresize);
  for ( var i = 0; i < this.tabsRight.length; i++ ) {
    this.tabsRight[i].removeEventListener( 'click', this.moveCarouselNext );
  }
  for ( var j = 0; j < this.tabsLeft.length; j++ ) {
    this.tabsLeft[j].removeEventListener( 'click', this.moveCarouselPrev );
  }
  this.el.removeEventListener('touchstart', this.handleMove );
  this.el.removeEventListener('touchend', this.handleEnd );
}

Carousel.prototype.update = function() {
}

Carousel.prototype.findElement = function() {
  var number = this.getPointer(this.itemWidthWithOffset);
  return this.itemsList[number];
}

document.addEventListener('DOMContentLoaded', function() {
  var carouselServicesBlock = document.querySelector('.services');
  if ( carouselServicesBlock !== null ) {
    var carouselServices = new Carousel(carouselServicesBlock);
    carouselServices.initialize();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var carouselCreateSites = document.querySelector('.carousel-create-sites');
  if ( carouselCreateSites !== null ) {
    var carousel = new Carousel(carouselCreateSites);
    carousel.initialize();
  }
});
