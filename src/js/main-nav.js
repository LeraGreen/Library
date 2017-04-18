'use strict';


function MenuNav(el) {
  this.el = el;
  this.mainNavCurrent = this.el.querySelector('.main-nav__item--current');
  this.mainNavHideOnTouch = this.el.querySelector('.main-nav__item--hide-touch');
  this.mainNavItems = this.el.querySelectorAll('.main-nav__item');
  this.menuLinks = this.el.querySelectorAll('.main-nav__link');
  this.toggleMenuItems = this.toggleMenuItems.bind(this);
  this.onresize = this.onresize.bind(this);
}

MenuNav.prototype.initialize = function() {
  this.mode = this.getMode();
  window.removeEventListener( 'resize', this.onresize);
  window.addEventListener( 'resize', this.onresize);
  this.showSubMenuCurrent();

  if ( this.mode === 'desktop' ) {
    this.hideSubMenusOthers();
  }

  if ( this.mode === 'touch' ) {
    this.showSubMenusOthers();
    this.hideSubMenuTouch();
  }

  for ( var i = 0; i < this.menuLinks.length; i++ ) {
    this.menuLinks[i].removeEventListener( 'click', this.toggleMenuItems );
    this.menuLinks[i].addEventListener( 'click', this.toggleMenuItems );
  }
}

MenuNav.prototype.onresize = function() {
  this.checkMode();
}

MenuNav.prototype.checkMode = function() {
  var mode = this.getMode();

  if ( mode !== this.mode ) {
    this.initialize();
  }
}

MenuNav.prototype.getMode = function() {

  if ( document.documentElement.clientWidth >= 960 ) {
    return 'desktop';
  } else {
    return 'touch';
  }
}

MenuNav.prototype.hideSubMenuCurrent = function() {
  if ( this.mainNavCurrent.classList.contains('main-nav__item--active') ) {
    this.mainNavCurrent.classList.remove('main-nav__item--active');
  }
}

MenuNav.prototype.showSubMenuCurrent = function() {
  if ( !this.mainNavCurrent.classList.contains('main-nav__item--active') ) {
    this.mainNavCurrent.classList.add('main-nav__item--active');
  }
}

MenuNav.prototype.hideSubMenusOthers = function() {

  var elements = this.mainNavItems;
  for (var i = 0; i < elements.length; i++ ) {

    if ( elements[i].classList.contains('main-nav__item--active') && !elements[i].classList.contains('main-nav__item--current') ) {

      elements[i].classList.remove('main-nav__item--active');
    }
  }
}

MenuNav.prototype.showSubMenusOthers = function() {

  var elements = this.mainNavItems;
  for (var i = 0; i < elements.length; i++ ) {

    if ( !elements[i].classList.contains('main-nav__item--active') && !elements[i].classList.contains('main-nav__item--current') ) {

      elements[i].classList.add('main-nav__item--active');
    }
  }
}

MenuNav.prototype.toggleMenuItems = function(event) {
  var elementParent = event.target.parentElement.parentElement;
  if ( event.target.tagName == 'A' && elementParent.querySelector('.sub-nav') ) {

    if ( elementParent.classList.contains('main-nav__item--hide-touch') && ( this.mode === 'touch' ) ) {
      return;

    } else  if ( elementParent.classList.contains('main-nav__item--active') ) {
      elementParent.classList.remove('main-nav__item--active');

    } else if ( !elementParent.classList.contains('main-nav__item--active') ) {
      elementParent.classList.add('main-nav__item--active');

      var containersCollection = this.el.querySelectorAll('.main-nav__item');

      for ( var i = 0; i < containersCollection.length; i++ ) {

        if ( containersCollection[i] !== elementParent && containersCollection[i].classList.contains('main-nav__item--active') ) {

          containersCollection[i].classList.remove('main-nav__item--active');
        }
      }
    }
  }
}

MenuNav.prototype.hideSubMenuTouch = function() {
  if ( this.mainNavHideOnTouch !== null && this.mainNavHideOnTouch.classList.contains('main-nav__item--active') ) {
    this.mainNavHideOnTouch.classList.remove('main-nav__item--active');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var mainNav = document.querySelector('.main-nav');
  if ( mainNav !== null ) {
    var menuNav = new MenuNav(mainNav);
    menuNav.initialize();
  }
});
