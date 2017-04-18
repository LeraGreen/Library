'use strict';


document.addEventListener('DOMContentLoaded', function() {
  var subMenu = document.getElementById('sub-nav-main-page');
  if ( subMenu !== null ) {
    var scrollPoints = new ScrollPoints(subMenu);
    scrollPoints.initialize();
  }
});

function ScrollPoints(el) {
  this.el = el;
  this.checkEventTarget = this.checkEventTarget.bind(this);
}

ScrollPoints.prototype.initialize = function() {
  this.el.addEventListener('click', this.checkEventTarget)
}

ScrollPoints.prototype.checkEventTarget = function(event) {
  if ( event.target.tagName != 'A' || document.documentElement.clientWidth < 960) {
    return;
  } else {
    this.scrollToBlock(event.target, event);
  }
}

ScrollPoints.prototype.scrollToBlock = function(element, event) {
  event.preventDefault();
  var blockID = (element.getAttribute('href')).slice(1);
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

ScrollPoints.prototype.quad = function(progress) {
  return Math.pow(progress, 2)
}
