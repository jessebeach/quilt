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
  var Component = namespace.module({name: 'component'});

  // Component extendings
  Component.Model = Backbone.Model.extend({ /* ... */ });
  Component.Collection = Backbone.Collection.extend({ /* ... */ });
  Component.Router = Backbone.Router.extend({
  	routes: {
  		"component/add": "addComponent"
  	},
  	'addComponent': function () {
  		console.info('route function addComponent called.');
  	}
  });

  // This will fetch the Layout template and render it.
  Component.Views.Layout = Backbone.View.extend({
    template: "app/templates/component.html",

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
  return Component;

});
