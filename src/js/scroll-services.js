'use sctrict';

document.addEventListener('DOMContentLoaded', function() {
  var btnServices = document.getElementById('btn-form-services');
  if ( btnServices !== null ) {
    var scrollToBlock = new ScrollToBlock(btnServices);
    scrollToBlock.initialize();
  }
});

function ScrollToBlock(el) {
  this.el = el;
  this.checkWindowWidth = this.checkWindowWidth.bind(this);
}

ScrollToBlock.prototype.initialize = function() {
  this.el.addEventListener('click', this.checkWindowWidth );
}

ScrollToBlock.prototype.checkWindowWidth = function(event) {
  var windowWidth = document.documentElement.clientWidth;
  if ( document.documentElement.clientWidth < 960) {
    this.scrollTouchScreen(event);
  } else {
    this.scroll(event);
  }
}

ScrollToBlock.prototype.scroll = function(event) {
  event.preventDefault();
  var blockID = (this.el.getAttribute('href')).slice(1);
  var block = document.getElementById(blockID);
  var blockCordinate = block.getBoundingClientRect();
  var blockTop = blockCordinate.top;

  var scrolledBlock = document.querySelector('.main-content');
  var pointScrolledBlock = scrolledBlock.scrollTop;
  var fixedValue = pointScrolledBlock;

  var interval = 16;
  var time = 1000;
  time = time - ( time % interval );
  var count = time / interval;
  var step = 0;
  var i = 1;

  var scrollInterval = setInterval(function() {

    if ( i <= count ) {
      step = i / count;
      pointScrolledBlock =  blockTop * this.quad(step) + fixedValue;
      scrolledBlock.scrollTop = pointScrolledBlock;
    }
    else {
      clearInterval(scrollInterval);
    }
    i++;
  }.bind(this), interval);
}

ScrollToBlock.prototype.quad = function(progress) {
  return Math.pow(progress, 2)
}

ScrollToBlock.prototype.scrollTouchScreen = function(event) {
  event.preventDefault();
  var blockID = (this.el.getAttribute('href')).slice(1);
  var block = document.getElementById(blockID);
  var blockCordinate = block.getBoundingClientRect();
  var blockTop = blockCordinate.top;

  var scrolledBlock = document.querySelector('.main-content');
  var pointScrolledBlock = scrolledBlock.scrollTop;

  var pageHeader = document.querySelector('.page-header');
  var pageHeaderSizes = pageHeader.getBoundingClientRect();
  var pageHeaderHeight = pageHeaderSizes.bottom - pageHeaderSizes.top;

  var interval = 16;
  var time = 1000;
  time = time - ( time % interval );
  var count = time / interval;
  var step = 0;
  var i = 1;

  var scrollInterval = setInterval(function() {

    if ( i <= count ) {
      step = i / count;
      scrolledBlock.scrollTop = blockTop * this.quad(step) - pageHeaderHeight;
    }
    else {
      clearInterval(scrollInterval);
    }
    i++;
  }.bind(this), interval);
}
