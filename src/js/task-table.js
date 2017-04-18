'use strict';

function TaskTable(el) {
  this.el = el;
  var templateEl = document.getElementById('taskTemplate');
  if ( templateEl ) {
    this.template = _.template(templateEl.innerHTML);
    console.log(this.template);
  } else {
    throw new Error('Template not found');
  }
}

TaskTable.prototype.initialize = function() {
  return this.fetch()
  .then(function(data) {
    this.render(data);
    this.setCount(data.cnt);
    this.show();
  }.bind(this))
}

TaskTable.prototype.fetch = function() {
  return axios.get('/data/tasks.json')
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
}

TaskTable.prototype.render = function(data) {
  var tbodyEl = this.el.querySelector('tbody');
  var html = '';
  data.list.forEach(function(task) {
    var date = new Date(task.modified);
    date = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();
    html += this.template({
      title: task.title,
      date: date
    });
  }.bind(this));
  tbodyEl.innerHTML = html;
}

TaskTable.prototype.setCount = function(data) {
  var counterBody = this.el.querySelector('.portfolio-tasks__counter');
  if ( counterBody === null ) {
    return;
  }
  for (var i = 0; i < data.length; i++) {
    var li = document.createElement('li');
    li.className = "portfolio-tasks__counter-item";
    li.innerHTML = data.charAt(i);
    counterBody.appendChild(li);
  }
}

TaskTable.prototype.show = function() {
  if ( this.el.classList.contains('visually-hidden') ) {
    this.el.classList.remove('visually-hidden');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var taskTableEl = document.getElementById('taskTable');
  if ( taskTableEl !== null ) {
    var taskTable = new TaskTable(taskTableEl);
    taskTable.initialize();
  }
});

