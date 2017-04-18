function MainLogo(el) {
  this.el = el;
  this.scroll = document.querySelector('.main-content');
  this.checkScrollAndHight = this.checkScrollAndHight.bind(this);
  this.onresize = this.onresize.bind(this);
}

MainLogo.prototype.initialize = function() {
  window.addEventListener('resize', this.onresize);
  this.checkScrollAndHight();
  this.scroll.addEventListener( 'scroll', this.checkScrollAndHight );
  window.addEventListener( 'resize', this.checkScrollAndHight );
}

MainLogo.prototype.checkScrollAndHight = function() {
  var mode = this.getMode();
  if ( mode === 'desktop') {

    if (this.scroll.scrollTop >= 160 || document.documentElement.clientHeight < 680 ) {

    if ( !this.el.classList.contains('page-header--light') ) {
      this.el.classList.add('page-header--light');
      this.el.classList.remove('page-header--default');
    }

    } else if ( !this.el.classList.contains('page-header--default') ) {
      this.el.classList.remove('page-header--light');
      this.el.classList.add('page-header--default');
    }
  }
}

MainLogo.prototype.getMode = function() {
  if ( document.documentElement.clientWidth >= 960 ) {
    return 'desktop';
  } else {
    return 'touch';
  }
}

MainLogo.prototype.onresize = function() {
  clearTimeout(this.timer)
  this.timer = setTimeout( function() {
    var mode = this.getMode();
    if ( mode === 'touch') {
      if ( this.el.classList.contains('page-header--light') ) {
        this.el.classList.remove('page-header--light');
        this.el.classList.add('page-header--default');
      }
    } else {
      this.checkScrollAndHight();
    }
  }.bind(this), 30);
}

document.addEventListener('DOMContentLoaded', function() {
  var header = document.querySelector('.page-header');
  if ( header !== null ) {
    var mainMenuLogo  = new MainLogo(header);
    mainMenuLogo.initialize();
  }
});
