var app = app || {};

app.LibraryView = Backbone.View.extend({
  el: '#books',

  events: {
    'click #add': 'addBook',
    'click .delete': 'deleteBook'
  },

  initialize: function(initialBooks) {
    this.collection = new app.Library(initialBooks);
    this.listenTo( this.collection, 'add', this.renderBook );
    this.render();
  },

  addBook: function(e) {
    e.preventDefault();
    var formData = {};

    $('#addBook div').children('input').each(function(i, el) {
      if ($(el)[0].type === 'file') {
        var e = new FileReader();
        e.onload = (function(file) {
          return function (event) {
            formData[el.id] = event.target.result;
          }
        })($(el)[0].files[0]);
        e.readAsDataURL($(el)[0].files[0]);
      } else if($(el).val() !== '') {
        formData[el.id] = $(el).val();
      }
    });

    setTimeout(_.bind(function() {
      console.log(formData);
      this.collection.add(new app.Book(formData));
    }, this), 1200);
  },

  render: function() {
    this.collection.each(function(item) {
      this.renderBook(item);
    }, this);
  },

  renderBook: function(item) {
    var bookView = new app.BookView({
      model: item
    });
    this.$('#books-list').append(bookView.render().el);
  }
});
