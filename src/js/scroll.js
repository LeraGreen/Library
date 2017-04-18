'use strict';

// для подменю главная

// function setListenerSubNav() {
//   var subMenu = document.getElementById('sub-nav-main-page');

//   if ( subMenu === null ) {
//     console.log('hi');
//     return;
//   }

//   subMenu.addEventListener('click', function(event) {
//     event.preventDefault();
//     checkEventTargetMenu(event);
//   });
// }

document.addEventListener('DOMContentLoaded', function() {
  var subMenu = document.getElementById('sub-nav-main-page');
  if ( subMenu !== null ) {
    subMenu.addEventListener('click', function() {
      event.preventDefault();
      checkEventTargetMenu(event);
    });
  }
});

// setListenerSubNav();


function checkEventTargetMenu(event) {
  if ( event.target.tagName != 'A' || document.documentElement.clientWidth < 960) {
    return;
  } else {
    scrollToBlock(event.target);
  }
}

//для кнопки формы в услугах

// function setListenerBtnServices() {
//   var btnServices = document.getElementById('btn-form-services');

//   if ( btnServices === null ) {
//     console.log('hi');
//     return;
//   }

//   btnServices.addEventListener('click', function(event) {
//     event.preventDefault();
//     checkWindowWidth(event.target);
//   });
// }

function checkWindowWidth(element) {
  var windowWidth = document.documentElement.clientWidth;
  if ( document.documentElement.clientWidth < 960) {
    scrollToBlockTouchScreen(element);
  } else {
    scrollToBlock(element);
  }
}

// setListenerBtnServices();

document.addEventListener('DOMContentLoaded', function() {
  var btnServices = document.getElementById('btn-form-services');
  if ( btnServices !== null ) {
    btnServices.addEventListener('click', function() {
      event.preventDefault();
      checkWindowWidth(event.target);
    });
  }
});

//скролл на главной
function scrollToBlock(element) {
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
      pointScrolledBlock =  blockTop * quad(step) + fixedValue;
      scrolledBlock.scrollTop = pointScrolledBlock;
    }
    else {
      clearInterval(scrollInterval);
    }
    i++;
  }, interval);
}


function quad(progress) {
  return Math.pow(progress, 2)
}

//scroll mobile


function scrollToBlockTouchScreen(element) {

  var blockID = (element.getAttribute('href')).slice(1);
  var block = document.getElementById(blockID);
  var blockCordinate = block.getBoundingClientRect();
  var blockTop = blockCordinate.top;

  var scrolledBlock = document.querySelector('.main-content');
  var pointScrolledBlock = scrolledBlock.scrollTop;
  // var fixedValue = pointScrolledBlock;

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
      // pointScrolledBlock =  blockTop * quad(step) - pageHeaderHeight;
      scrolledBlock.scrollTop = blockTop * quad(step) - pageHeaderHeight;
    }
    else {
      clearInterval(scrollInterval);
    }
    i++;
  }, interval);
}
