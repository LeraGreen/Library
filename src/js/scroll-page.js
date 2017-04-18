'use strict';

function ScrollPage(el) {
  this.el = el;
  this.offset = 300;
  this.blocksClasses = ['.tariffs__item--one', '.tariffs__item--second', '.crm-intro', '.crm-features','.workers', '.services'];
  this.blocks = [];
}

ScrollPage.prototype.initialize = function() {
  this.findBlocks();
  this.hideBlocksContent();
  this.el.addEventListener( 'scroll', this.checkScroll.bind(this) );
  window.addEventListener( 'resize', this.checkScroll.bind(this) );
}

ScrollPage.prototype.findBlocks = function() {
  this.blocksClasses.forEach(function(item) {
    var element = this.el.querySelector(item);
    if ( element !== null) {
      this.blocks.push(element);
    }
  }, this);
}

ScrollPage.prototype.hideBlocksContent = function() {
  this.blocks.forEach(function(item) {

    if ( !item.classList.contains('page-scroll-hidden') ) {
      item.classList.add('page-scroll-hidden');
    }
  }, this);
}

ScrollPage.prototype.checkScroll = function() {

  this.blocks.forEach(function(item) {

    if ( item.offsetTop <= Math.floor(this.el.scrollTop + this.offset) && item.classList.contains('page-scroll-hidden') ) {
      item.classList.remove('page-scroll-hidden');
      item.classList.add('page-scroll-visible');
    }

  }, this);
}

document.addEventListener('DOMContentLoaded', function() {
  var mainContent = document.querySelector('.main-content--scroll');
  if ( mainContent !== null ) {
    var scrollPage = new ScrollPage(mainContent);
    scrollPage.initialize();
  }
});
