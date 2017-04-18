function TopClientsData(el) {
  this.el = el;
  this.charts = [];
  var templateEl = document.getElementById('topClientsTemplate');
  if ( templateEl ) {
    this.template = _.template(templateEl.innerHTML);
  } else {
    throw new Error('Template not found');
  }
}

TopClientsData.prototype.initialize = function() {
  return this.fetch()
  .then(function(data) {
    this.render(data);
  }.bind(this));
}

TopClientsData.prototype.fetch = function() {
  return axios.get('/data/top.json')
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    throw error;
  });
}

TopClientsData.prototype.render = function(data) {
  var tbodyEl = this.el.querySelector('.clients__list');

  for (var key in data) {
    var obj = data[key];
    var host = obj.site;

    for (var facts in obj ) {
      var currentObj = obj[facts];
      var list = currentObj.list;

      if ( list === undefined || list.length === 0 || currentObj.query === undefined ) {
        continue;
      }

      var lr = currentObj.lr;
      var href = 'http://yandex.ru/yandsearch?text=' + encodeURIComponent(currentObj.query) + '&lr=' + lr;

      var listItem = list[list.length-1];
      var pos = listItem.pos;

      var html = '';
      html += this.template({
        href: href,
        host: host,
        pos: pos,
        query: currentObj.query
      });

      tbodyEl.insertAdjacentHTML('beforeEnd', html);

      var lastListItem = tbodyEl.lastElementChild;
      var canvasList = lastListItem.getElementsByTagName('canvas');
      var chart = new Сhart(obj[facts].list, canvasList[0]);
      chart.initialize();
      chart.render();
    }
    break;
  }
  this.show();
  this.ready();
}


TopClientsData.prototype.show = function() {
  if ( this.el.classList.contains('visually-hidden') ) {
    this.el.classList.remove('visually-hidden');
  }
}

TopClientsData.prototype.ready = function() {
}

document.addEventListener('DOMContentLoaded', function() {
  var topClientsEl = document.getElementById('clients');
  if ( topClientsEl !== null ) {
    var topClientsCarousel = new TopClientsData(topClientsEl);
    topClientsCarousel.initialize();
    topClientsCarousel.ready = function() {
      var carouselClientsBlock = document.querySelector('.clients');
      if ( carouselClientsBlock !== null ) {
        var carouselClients = new Carousel(carouselClientsBlock);
        carouselClients.initialize();
      }
    }
  }
});
