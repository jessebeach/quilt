require([
  "namespace",

  // Libs
  "jquery",
  "use!backbone",

  // Modules
  "modules/frame",
  "modules/component",
  "modules/layout"
],

function(namespace, $, Backbone) {

  // Get the list of overloaded arguments.
  // These will be the modules defined in require. Modules should not be passed
  // as explicit arguments of the callee function.
  var Modules = Array.prototype.slice.call(arguments, arguments.callee.length) || [];

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      ":hash": "index"
    },
    // Add module routes and route callbacks to the Router.
    initialize: function(Modules) {
      namespace.mergeSubroutes.call(this, Modules);
    },
    index: function(hash) {
      // Get the frame and render it.
      var FrameModule;
      for (var i = 0; i < Modules.length; i++) {
        if (Modules[i].name && Modules[i].name === 'frame') {
          FrameModule = Modules[i];
        }
      }
      // The application depends on the Frame module.
      if (FrameModule) {
        var frame = new FrameModule.Views.AppFrame();
        // Attach the frame to the DOM
        frame.render(function(el) {
          $("#main").html(el);
        });
      }
      else {
        $("#main").html('<p>The application could not be initialized.</p>');
      }
      // Fix for hashes in pushState and hash fragment
      if (hash && !this._alreadyTriggered) {
        // Reset to home, pushState support automatically converts hashes
        Backbone.history.navigate("", false);

        // Trigger the default browser behavior
        location.hash = hash;

        // Set an internal flag to stop recursive looping
        this._alreadyTriggered = true;
      }
    }
  });

  // Shorthand the application namespace
  var app = namespace.app;

  // Treat the jQuery ready function as the entry point to the application.
  // Inside this function, kick-off all initialization, everything up to this
  // point should be definitions.
  $(function() {
    // Define your master router on the application namespace and trigger all
    // navigation from this instance.
    // @param Modules (Array): list of modules passed into required by main.js.
    app.router = new Router(Modules);

    // Trigger the initial route and enable HTML5 History API support
    Backbone.history.start({ pushState: true });
  });

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router.  If the link has a data-bypass
  // attribute, bypass the delegation completely.
  $(document).on("click", "a:not([data-bypass])", function(evt) {
    // Get the anchor href and protocol
    var href = $(this).attr("href");
    var protocol = this.protocol + "//";

    // Ensure the protocol is not part of URL, meaning its relative.
    if (href && href.slice(0, protocol.length) !== protocol &&
        href.indexOf("javascript:") !== 0) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events.  The Router's internal `navigate` method
      // calls this anyways.
      Backbone.history.navigate(href, true);
    }
  });

});
