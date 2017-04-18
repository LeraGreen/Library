'use strict';

function Utils() {
}

Utils.prototype.addClass = function(elem, className) {
  if (elem.length) {
    for (var i = 0; i < elem.length; i++) {
      this.addClass(elem[i], className);
    }
  } else {
    if (!elem.classList.contains(className)) {
      elem.classList.add(className);
    }
  }
}

Utils.prototype.removeClass = function(elem, className) {
  if (elem.length) {
    for (var i = 0; i < elem.length; i++) {
      this.removeClass(elem[i], className);
    }
  } else {
    if (elem.classList.contains(className)) {
      elem.classList.remove(className);
    }
  }
}

var utils = new Utils();
