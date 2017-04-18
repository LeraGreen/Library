unction ToggleBlocksByModifier(el) {
  this.el = el;
  this.workersItems = el.querySelectorAll('.workers__item');
  this.textBlockAboutWorker = el.querySelectorAll('.workers__promo-text');
}

ToggleBlocksByModifier.prototype.initialize = function() {

  for (var i = 0; i < this.workersItems.length; i++) {
    this.workersItems[i].addEventListener( 'click', this.findWorkerName.bind(this) );
  }
}

ToggleBlocksByModifier.prototype.findWorkerName = function(event) {

  var classListTarget = event.currentTarget.classList;

  for ( var i = 0; i < classListTarget.length; i ++ ) {
    var index = classListTarget[i].indexOf("--");

    if ( index !== -1 ) {
      var workerName = classListTarget[i].slice(index + 2);
      this.findSameTextBlock(workerName);
    }
  }
}

ToggleBlocksByModifier.prototype.findSameTextBlock = function(name) {
  var textBlocks = this.textBlockAboutWorker;

  for ( var i = 0; i < textBlocks.length; i++ ) {
    var classList = textBlocks[i].classList;

    for (var j = 0;  j < classList.length; j++ ) {
      var index = classList[j].indexOf("--");

      if ( index !== -1 ) {
        var blockModifier = classList[j].slice(index + 2);

        if ( blockModifier === name ) {
          this.toggleWorkersText(textBlocks[i], textBlocks);
        }
      }
    }
  }
}

ToggleBlocksByModifier.prototype.toggleWorkersText = function(textBlock, textBlocksList) {
  for ( var i = 0; i < textBlocksList.length; i++ ) {
    var block = textBlocksList[i];

    if ( block === textBlock && block.classList.contains('block-hide') ) {
      block.classList.remove('block-hide');
      block.classList.add('block-show');

    } else if ( block !== textBlock && !(block.classList.contains('block-hide')) ) {
      block.classList.add('block-hide');
      block.classList.remove('block-show');
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var workers = document.querySelector('.workers');
  if ( workers !== null ) {
    var workersBlock = new ToggleBlocksByModifier(workers);
    workersBlock.initialize();
  }
});
