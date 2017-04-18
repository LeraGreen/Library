function Сhart(data, elem) {
  this.data = data;
  this.elem = elem;
  this.width = null;
  this.height = null;
  this.onresize = this.onresize.bind(this);
}

Сhart.prototype.initialize = function() {
  this.ctx = this.elem.getContext('2d');
  window.addEventListener('resize', this.onresize);
  this.onresize();
}

Сhart.prototype.render = function() {
  if ( this.width === null || this.height === null ) {
    return;
  }
  this.ctx.save();
  this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);

  this.elem.setAttribute('width', this.width);
  this.elem.setAttribute('height', this.height);

  var x = {};
  x.min = null;
  x.max = null;

  var y = {};
  y.min = null;
  y.max = null;

  this.data.forEach(function(item) {
    if (x.min === null || item.created < x.min) {
      x.min = item.created;
    }

    if (x.max === null || item.created > x.max) {
      x.max = item.created;
    }

    if (y.min === null || item.pos < y.min) {
      y.min = item.pos;
    }

    if (y.max === null || item.pos > y.max) {
      y.max = item.pos;
    }
  })

  var stepX = (x.max - x.min) / this.width;
  var stepY = (y.max - y.min) / this.height;

  this.ctx.beginPath();
  this.ctx.strokeStyle = '#e0cd2a';
  this.ctx.lineWidth = 2;

  this.data.forEach(function(item, index) {
    if ( index === 0 ) {
      this.ctx.moveTo( (item.created - x.min)/stepX+1, (item.pos - y.min)/stepY+1 );
    } else {
      this.ctx.lineTo( (item.created - x.min)/stepX+1, (item.pos - y.min)/stepY+1 );
    }
  }.bind(this))
  this.ctx.stroke();

  this.ctx.beginPath();
  this.ctx.strokeStyle = 'white';
  this.ctx.lineWidth = 2;

  this.data.forEach(function(item, index) {
    if ( index === 0 ) {
      this.ctx.moveTo( (item.created - x.min)/stepX, (item.pos - y.min)/stepY );
    } else {
      this.ctx.lineTo( (item.created - x.min)/stepX, (item.pos - y.min)/stepY );
    }
  }.bind(this))
  this.ctx.stroke();
  this.ctx.restore();
}

Сhart.prototype.onresize = function() {
  var canvasStyle = getComputedStyle(this.elem);
  var width = parseFloat(canvasStyle.width);
  var height = parseFloat(canvasStyle.height);

  if ( this.width !== width ) {
    this.width = width;
    this.height = height;
    this.render();
  }
}
