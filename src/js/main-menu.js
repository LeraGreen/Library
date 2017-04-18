'use strict';

function MainMenu(el) {
  this.el = el;
  this.menuToggler = document.getElementById('main-menu-toggler');
  this.mainMenu = this.el.querySelector('.main-menu');

  this.toggleMenu = this.toggleMenu.bind(this);
  this.switchWorkMenu = this.switchWorkMenu.bind(this);
}

MainMenu.prototype.initialize = function() {
  if ( document.documentElement.clientWidth < 960 ) {
    this.closeMenu();
  }

  this.menuToggler.addEventListener( 'click', this.toggleMenu );

  window.addEventListener( 'resize', this.switchWorkMenu );
}

MainMenu.prototype.closeMenu = function() {
  if ( !(this.mainMenu.classList.contains('visually-hidden')) && this.menuToggler.classList.contains('visually-hidden') ) {
    this.mainMenu.classList.add('visually-hidden');
    this.menuToggler.classList.remove('visually-hidden');
  }
}

MainMenu.prototype.toggleMenu = function() {
  this.menuToggler.classList.toggle('page-header__menu-toggler--close');
  this.mainMenu.classList.toggle('visually-hidden');
}

MainMenu.prototype.switchWorkMenu = function() {
  if ( document.documentElement.clientWidth >= 960 ) {
    this.showMenu();
    this.hideMenuToggler();
  } else {
    this.closeMenu();
  }
}

MainMenu.prototype.showMenu = function() {
  if ( this.mainMenu.classList.contains('visually-hidden') ) {
    this.mainMenu.classList.remove('visually-hidden');
  }
}

MainMenu.prototype.hideMenuToggler = function() {
  if ( !(this.menuToggler.classList.contains('visually-hidden')) ) {
    this.menuToggler.classList.add('visually-hidden');
  }

  if ( this.menuToggler.classList.contains('page-header__menu-toggler--close') ) {
     this.menuToggler.classList.remove('page-header__menu-toggler--close');
  }
}


document.addEventListener('DOMContentLoaded', function() {
  var header = document.querySelector('.page-header');
  if ( header !== null ) {
    var mainMenu  = new MainMenu(header);
    mainMenu.initialize();
  }
});

