var NRD = window.NRD || {};

NRD['./App'] = (function() {
    'use strict';

    var $ = NRD['jquery']; // jshint ignore:line
    var Base = NRD['basejs']; // jshint ignore:line
    var EventBus = NRD['eventbus']; // jshint ignore:line

    // Services
    var BreakpointListener = NRD['./services/BreakpointListener'];

    // Model
    var AppStateModel = NRD['./models/AppStateModel'];

    /**
     * Initial application setup. Runs once upon every page load.
     *
     * @class App
     */
    var App = Base.extend({
        /**
         * @constructor
         */
        constructor: function() {
            this.init();
        },

        /**
         * Initializes the application and kicks off loading of prerequisites.
         *
         * @method init
         * @public
         */
        init: function() {
            // Global Services

            // Event Bus pub/sub, must be started first
            this.eventBus = new EventBus();

            // Breakpoint Listener
            this.breakpointListener = new BreakpointListener(this);

            // Global State Model
            this.appState = new AppStateModel();

            this.setupHandlers()
                .enable();
        },

        /**
         * Binds the scope of any handler functions
         * Should only be run on initialization of the class
         *
         * @method setupHandlers
         * @public
         * @chainable
         */
        setupHandlers: function() {
            this.onBreakpointChangeHandler = this.onBreakpointChange.bind(this);

            return this;
        },

        /**
         * Enables the app
         * Performs any event binding to handlers
         * Forces a breakpoint data update
         *
         * @method enable
         * @public
         * @chainable
         */
        enable: function() {
            this.eventBus.on('BREAKPOINT.CHANGE', this.onBreakpointChangeHandler);
            this.onBreakpointChange();
        },

        /**
         * Updates the AppStateModel with new breakpoint information whenever the breakpoint change event fires
         *
         * @method onBreakpointChange
         * @public
         */
        onBreakpointChange: function() {
            var data = {
                currentBreakpoint: this.breakpointListener.getCurrentBreakpoint()
            };

            this.appState.set(data);
        }

    });

    return App;

}());