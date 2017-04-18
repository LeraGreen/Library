'use strict';

var btnScroll = document.querySelector('.btn--scroll');
btnScroll.addEventListener('click', scrollToForm);

function scrollToForm(event) {
  event.preventDefault();
  var form = document.getElementById('form')
  var formCordinate = form.getBoundingClientRect();
  var formTop = formCordinate.top;
  var windowYOffset = window.pageYOffset;
  var interval = 16;                                      //кол-во кадров в секунду
  var time = 1000;
  time = time - ( time % interval );
  var count = time / interval;
  var step = 0;
  var i = 1;                                              //шаг от 1

  var scrollInterval = setInterval(function() {
    if ( i <= count ) {
      step = i / count;
      windowYOffset =  formTop * circ(step);              //Переданное значение максимум = 1. 
                                                          //Последнее должно быть = 1;
      window.scrollTo(0, windowYOffset);
    }
    else {
      clearInterval(scrollInterval);
    }
    i++;
  }, interval);
}

function circ(timeFraction) {
  return 1 - Math.sin(Math.acos(timeFraction))
}
