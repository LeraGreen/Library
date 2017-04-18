function ToggleBg(el) {
  this.el = el;
  this.items = this.el.querySelectorAll('.crm-features__step');
  this.elClass = 'crm-features';
  this.findStepName = this.findStepName.bind(this);
  this.onresize = this.onresize.bind(this);
}

ToggleBg.prototype.initialize = function() {
  window.addEventListener( 'resize', this.onresize);
  this.mode = this.getMode();
  if ( this.mode === 'touch' ) {
    return;
  }
  for (var i = 0; i < this.items.length; i++) {
    this.items[i].addEventListener( 'mouseover', this.findStepName);
  }
}

ToggleBg.prototype.getMode = function() {
  if ( document.documentElement.clientWidth >= 960 ) {
    return 'desktop';
  }

  if ( document.documentElement.clientWidth < 960 && document.documentElement.clientWidth >= 660) {
    return 'touch';
  }

  return false;
}

ToggleBg.prototype.findStepName = function(event) {

  var classListTarget = event.currentTarget.classList;

  for ( var i = 0; i < classListTarget.length; i ++ ) {
    var index = classListTarget[i].indexOf("--");

    if ( index !== -1 ) {
      var stepName = classListTarget[i].slice(index + 2);
      this.makeSameClass(stepName);
    }
  }
}

ToggleBg.prototype.makeSameClass = function(modifier) {
  var blockClass = this.elClass + '--' + modifier;
  this.toggle(blockClass);
}

ToggleBg.prototype.toggle = function(selector) {
  var classList = this.el.classList;

  for (var i = 0; i < classList.length; i++) {
    var index = classList[i].indexOf("--");

    if ( index !== -1 ) {

      if (classList[i] === selector) {
        return;
      }

      var elClass = classList[i];

      clearTimeout(timeout);

      this.el.classList.remove('bg-show');
      this.el.classList.add('bg-hide');

      var timeout = setTimeout(function() {
        this.el.classList.remove(elClass);
        this.el.classList.add(selector);
        var timeoutSecond = setTimeout(function() {
          this.el.classList.remove('bg-hide');
          this.el.classList.add('bg-show');
        }.bind(this), 200);
      }.bind(this), 500);
    }
  }
}

ToggleBg.prototype.onresize = function() {
  clearTimeout(this.timer)
  this.timer = setTimeout( this.calcResize.bind(this), 30);
}

ToggleBg.prototype.calcResize = function() {
  var mode = this.getMode();
  if ( mode === 'touch' ) {
    this.makeSameClass('default');
    this.delete();
  } else {
    this.delete();
    this.initialize();
  }
}

ToggleBg.prototype.delete = function() {
  for (var i = 0; i < this.items.length; i++) {
    this.items[i].removeEventListener( 'mouseover', this.findStepName);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var crmFeatures = document.querySelector('.crm-features');
  if (crmFeatures !== null) {
    var toggleBg = new ToggleBg(crmFeatures);
    toggleBg.initialize();
  }
});
