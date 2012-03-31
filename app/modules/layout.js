define([
  "namespace",

  // Libs
  "use!jquery",
  "use!backbone"

  // Modules

  // Plugins
],

function(namespace, jQuery, Backbone) {

  // Create a new module
  var Layout = namespace.module();

  // Layout extendings
  Layout.Model = Backbone.Model.extend({ /* ... */ });
  Layout.Collection = Backbone.Collection.extend({ /* ... */ });
  Layout.Router = Backbone.Router.extend({
  	routes: {
  		"layout/add": "addLayout"
  	},
  	'addLayout': function () {}
  });

  // This will fetch the Layout template and render it.
  Layout.Views.Layout = Backbone.View.extend({
    template: "app/templates/layout.html",

    render: function(done) {
      var view = this;

      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    }
  });

  // Required, return the module for AMD compliance
  return Layout;

});