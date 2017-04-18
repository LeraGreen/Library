'use srtict';

function WorkSteps(elements) {
  this.elements = elements;
  this.toggleWorkStep = this.toggleWorkStep.bind(this);
}

WorkSteps.prototype.initialize = function() {
  window.addEventListener( 'resize', this.onresize);
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].addEventListener( 'click', this.toggleWorkStep );
  }
}

WorkSteps.prototype.toggleWorkStep = function(event) {
  var textBlock = event.currentTarget.querySelector('.work-steps__help-text');

  if ( textBlock.classList.contains('text-hide') ) {
    textBlock.classList.remove('text-hide');
    textBlock.classList.add('text-show');

  } else {

    textBlock.classList.add('text-hide');
    textBlock.classList.remove('text-show');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var workSteps = document.querySelectorAll('.work-steps__item');
  if ( workSteps !== null ) {
    var steps = new WorkSteps(workSteps);
    steps.initialize();
  }
});
