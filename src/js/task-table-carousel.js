function TaskTableCarousel(el) {
  this.el = el;
  var templateTableEl = document.getElementById('carouselTableTemplate');
  var templateEl = document.getElementById('carouselTemplate');
  if ( templateTableEl && templateEl ) {
    this.template = _.template(templateEl.innerHTML);
    this.templateTable = _.template(templateTableEl.innerHTML);
  } else {
    throw new Error('Template not found');
  }
}

TaskTableCarousel.prototype.initialize = function() {
  return this.fetch()
  .then(function(data) {
    this.render(data);
  }.bind(this));
}

TaskTableCarousel.prototype.fetch = function() {
  return axios.get('/data/best.json')
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
}

TaskTableCarousel.prototype.render = function(data) {
  var tbodyEl = this.el.querySelector('.carousel-promotion__list');

  for (var key in data) {

    var tbody = '';
    data[key].list.forEach(function(task) {
      tbody += this.templateTable({
        title: task.query,
        placeBefore: task.before,
        placeNow: task.after
      });
    }.bind(this));

    var html = '';
    html += this.template({
      host: data[key].host,
      body: tbody
    });

    tbodyEl.insertAdjacentHTML('afterBegin', html);
  }
  this.show();
  this.ready();
}

TaskTableCarousel.prototype.ready = function() {
}

TaskTableCarousel.prototype.show = function() {
  if (this.el.classList.contains('visually-hidden') ) {
    this.el.classList.remove('visually-hidden');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var taskTableCarouselEl = document.getElementById('taskTableCarousel');
  if ( taskTableCarouselEl !== null ) {
    var taskTableCarousel = new TaskTableCarousel(taskTableCarouselEl);
    taskTableCarousel.initialize();
    taskTableCarousel.ready = function() {
      var promoCarousel = document.querySelector('.carousel-promotion');
      if ( promoCarousel !== null ) {
        var hostCarousel = new TaskCarousel(promoCarousel);
        hostCarousel.initialize();
      }
    }
  }
});
