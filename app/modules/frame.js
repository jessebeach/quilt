define([
  "namespace",

  // Libs
  "jquery",
  "use!backbone"

  // Modules

  // Plugins
],

function(namespace, $, Backbone) {

  // Create a new module
  var Frame = namespace.module({name: 'frame'});

  // Frame extendings
  Frame.Model = Backbone.Model.extend({ /* ... */ });
  Frame.Collection = Backbone.Collection.extend({ /* ... */ });

  // This will fetch the Layout template and render it.
  Frame.Views.AppFrame = Backbone.View.extend({
    template: "app/templates/frame.html",

    render: function(done) {
      var view = this;

      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    }
  });

  // Required, return the module for AMD compliance
  return Frame;

});
