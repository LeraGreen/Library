// block about workers

function ToggleText(el, items, blocks) {
  this.el = el;
  this.items = items;
  this.blocks = blocks;
  this.onresize = this.onresize.bind(this);
  this.findModifier = this.findModifier.bind(this);
}

ToggleText.prototype.initialize = function() {
  window.addEventListener( 'resize', this.onresize);
  this.mode = this.getMode();
  if (!this.mode) {
    return;
  }

  if ( this.mode === 'touch') {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].addEventListener( 'click', this.findModifier);
    }
  }

  if (this.mode === 'desktop') {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].addEventListener( 'mouseover', this.findModifier);
    }
  }
}

ToggleText.prototype.findModifier = function(event) {
  var eventTarget = event.currentTarget;
  var classListTarget = eventTarget.classList;

  for ( var i = 0; i < classListTarget.length; i ++ ) {
    var index = classListTarget[i].indexOf("--");

    if ( index !== -1 ) {
      var modifier = classListTarget[i].slice(index + 2);
      this.findSameTextBlock(modifier);
    }
  }
}

ToggleText.prototype.findSameTextBlock = function(name) {
  var textBlocks = this.blocks;

  for ( var i = 0; i < textBlocks.length; i++ ) {
    var classList = textBlocks[i].classList;

    for (var j = 0;  j < classList.length; j++ ) {
      var index = classList[j].indexOf("--");

      if ( index !== -1 ) {
        var blockModifier = classList[j].slice(index + 2);

        if ( blockModifier === name ) {
          this.toggle(textBlocks[i]);
        }
      }
    }
  }
}

ToggleText.prototype.toggle = function(textBlock) {
  var blocks = this.blocks;
  var blockToShow = textBlock;
  var blocksToHide = [];

  for ( var i = 0; i < blocks.length; i++ ) {
    var block = blocks[i];

    if (block !== blockToShow) {
      blocksToHide.push(block);
    }
  }

  var toggle = function(ms) {
    return new Promise(function(resolve, reject) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(resolve, ms)
    }.bind(this))
  }.bind(this)

  toggle(0)
  .then(function() {
    utils.removeClass(blocksToHide, 'block-show');
    utils.addClass(blocksToHide, 'block-hide');
    return toggle(300);
  })
  .then(function() {
    utils.addClass(blocksToHide, 'visually-hidden');
    utils.removeClass(blockToShow, 'visually-hidden');
    return toggle(10);
  })
  .then(function() {
    utils.addClass(blockToShow, 'block-show');
    utils.removeClass(blockToShow, 'block-hide');
  })
}

ToggleText.prototype.onresize = function() {
  clearTimeout(this.timer)
  this.timer = setTimeout( this.calcResize.bind(this), 30);
}

ToggleText.prototype.calcResize = function() {
  var screen = this.getMode();
  if (screen === this.mode) {
    return;
  }

  if (screen !== this.mode && screen ) {
    this.delete();
    this.initialize();
  }

  if (!screen) {
    this.findSameTextBlock('default');
    this.delete();
    this.initialize();
  }
}

ToggleText.prototype.delete = function() {
  for (var i = 0; i < this.items.length; i++) {
    this.items[i].removeEventListener( 'mouseover', this.findModifier);
  }
  for (var i = 0; i < this.items.length; i++) {
    this.items[i].removeEventListener( 'click', this.findModifier);
  }
}

ToggleText.prototype.getMode = function() {
  if ( document.documentElement.clientWidth >= 960 ) {
    return 'desktop';
  }

  if ( document.documentElement.clientWidth < 960 && document.documentElement.clientWidth >= 660) {
    return 'touch';
  }

  return false;
}

document.addEventListener('DOMContentLoaded', function() {
  var workers = document.querySelector('.workers');
  if (workers !== null) {
    var workersItems = workers.querySelectorAll('.workers__item');
    var textBlocksAboutWorkers = workers.querySelectorAll('.workers__promo-text');
    if (  workersItems !== null && textBlocksAboutWorkers !== null) {
      var workersBlock = new ToggleText(workers, workersItems, textBlocksAboutWorkers);
      workersBlock.initialize();
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var crm = document.querySelector('.crm-intro');
  if (crm !== null) {
    var crmItems = crm.querySelectorAll('.crm-intro__step');
    var textBlocksAboutCrm = crm.querySelectorAll('.crm-intro__promo-text');
    if (  crmItems !== null && textBlocksAboutCrm !== null) {
      var crmBlock = new ToggleText(crm, crmItems, textBlocksAboutCrm);
      crmBlock.initialize();
    }
  }
});
