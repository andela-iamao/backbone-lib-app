var app = app || {};

app.BookView = Backbone.View.extend({
  tagName: 'div',
  className: 'bookContainer',
  events: {
    'click #add': 'addBook',
    'click .delete': 'deleteBook'
  },
  initialize: function() {

  },
  template: _.template($('#bookTemplate').html()),

  deleteBook: function() {
     this.model.destroy();
     this.remove();
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});
