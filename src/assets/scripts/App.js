define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    // var $ = require('jquery');
    var AutoReplace = require('nerdery-auto-replace');
    var ExternalLinks = require('nerdery-external-links');

    /**
     * Initial application setup. Runs once upon every page load.
     *
     * @class App
     * @constructor
     */
    var App = function() {
        AutoReplace.init();
        ExternalLinks.init();
        this.init();
    };

    var proto = App.prototype;

    /**
     * Initializes the application and kicks off loading of prerequisites.
     *
     * @method init
     * @private
     */
    proto.init = function() {
        // Create your views here
    };

    return App;

});