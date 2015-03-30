var NRD = window.NRD || {};

NRD['./services/BreakpointListener'] = (function() {
    'use strict';

    var $ = NRD['jquery']; // jshint ignore:line
    var BaseView = NRD['./views/BaseView']; // jshint ignore:line
    var matchMedia = NRD['matchmedia']; // jshint ignore:line
    var config = NRD['config']; // jshint ignore:line

    // Model
    var BreakpointModel = NRD['./models/BreakpointModel'];

    /**
     * An object of events used in this utility
     *
     * @constant
     * @type {Object}
     * @final
     */
    var EVENTS = {
        RESIZE: 'resize'
    };

    /**
     * An object of time values in milliseconds
     *
     * @constant
     * @type {Object}
     * @final
     */
    var TIMES = {
        DEBOUNCE: 300
    };

    /**
     * An object of error message strings
     *
     * @constant
     * @type {Object}
     * @final
     */
    var ERROR_MESSAGES = {
        MALFORMED_MEDIA_QUERY: 'The following media query object is malformed: '
    };

    //////////////////////////////////////////////////////////////////////////////////
    // CONSTRUCTOR
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * Breakpoint Listener Utility
     *
     * @class BreakpointListener
     * @constructor
     */
    var BreakpointListener = BaseView.extend({

        constructor: function(App) {
            /**
             * A reference to the window
             *
             * @default null
             * @property $window
             * @type {jQuery}
             * @public
             */
            this.$window = null;

            /**
             * A reference to the global app, used to call global services
             *
             * @default null
             * @property app
             * @type {App}
             * @public
             */
            this.app = App;

            /**
             * A reference to the current breakpoint
             *
             * @default null
             * @property currentBreakpoint
             * @type {String}
             * @public
             */
            this.currentBreakpoint = null;

            /**
             * A reference to an object of breakpoints
             *
             * @default null
             * @property breakpoints
             * @type {Object}
             * @public
             */
            this.breakpoints = null;

            /**
             * Tracks whether the utility is enabled or not
             *
             * @default false
             * @property utilityIsEnabled
             * @type {Boolean}
             * @public
             */
            this.utilityIsEnabled = false;

            /**
             * A global reference to a timer
             *
             * @default null
             * @property timeout
             * @type {Function}
             * @public
             */
            this.timeout = null;

            this.init();
        },

        /**
         * Initializes the Breakpoint Listener
         * Runs a single setupHandlers call, followed by createChildren, getCurrentBreakpoint and enable
         *
         * @method init
         * @public
         * @chainable
         */
        init: function() {
            this.setupHandlers()
                .createChildren()
                .setCurrentBreakpoint()
                .enable();

            return this;
        },

        /**
         * Binds the scope of any handler functions
         * Should only be run on initialization of the view
         *
         * @method setupHandlers
         * @public
         * @chainable
         */
        setupHandlers: function() {
            this.onResizeHandler = this.onResize.bind(this);

            return this;
        },

        /**
         * Create any child objects or references to DOM elements
         * Should only be run on initialization of the view
         *
         * @method createChildren
         * @public
         * @chainable
         */
        createChildren: function() {
            this.$window = $(window);
            this.breakpoints = {};

            for (var key in config.breakpoints) {
                if (config.breakpoints.hasOwnProperty(key)) {
                    this.breakpoints[key] = new BreakpointModel(config.breakpoints[key]);
                }
            }

            return this;
        },

        /**
         * Remove any child objects or references to DOM elements
         *
         * @method removeChildren
         * @public
         * @chainable
         */
        removeChildren: function() {
            this.$window = null;
            this.breakpoints = null;

            return this;
        },

        /**
         * Enables the utility
         * Performs any event binding to handlers
         * Exits early if it is already enabled
         *
         * @method enable
         * @public
         * @chainable
         */
        enable: function() {
            if (this.utilityIsEnabled) {
                return this;
            }

            this.$window.on(EVENTS.RESIZE, this.onResizeHandler);

            this.utilityIsEnabled = true;

            return this;
        },

        /**
         * Disables the utility
         * Tears down any event binding to handlers
         * Exits early if it is already disabled
         *
         * @method disable
         * @public
         * @chainable
         */
        disable: function() {
            if (!this.utilityIsEnabled) {
                return this;
            }

            this.$window.off(EVENTS.RESIZE, this.onResizeHandler);

            this.utilityIsEnabled = false;

            return this;
        },

        /**
         * Destroys the utility
         * Tears down any events, handlers, elements
         * Should be called when the utility should be left unused
         *
         * @method destroy
         * @public
         * @chainable
         */
        destroy: function() {
            this.disable()
                .removeChildren();

            return this;
        },

        /**
         * Sets the current breakpoint and stores a reference to it
         *
         * @method setCurrentBreakpoint
         * @public
         * @chainable
         */
        setCurrentBreakpoint: function() {
            var breakpoint;
            var breakpoints = this.breakpoints;
            var mediaQuery = null;
            var mediaType = null;
            var mediaArgs = null;

            // This loop assumes that the breakpoints are listed from largest to smallest.
            for (breakpoint in breakpoints) {
                if (breakpoints.hasOwnProperty(breakpoint)) {
                    mediaType = breakpoints[breakpoint].media;
                    mediaArgs = breakpoints[breakpoint].arguments;

                    if (mediaType != null && mediaArgs != null) {
                        mediaQuery = breakpoints[breakpoint].media + ' and ' + breakpoints[breakpoint].arguments;
                    } else {
                        this.mediaQueryError(breakpoint);
                        this.currentBreakpoint = null;
                    }

                    if (matchMedia(mediaQuery).matches) {
                        this.previousBreakpoint = this.currentBreakpoint;
                        this.currentBreakpoint = breakpoints[breakpoint];
                        this.direction = this.currentBreakpoint.compare(this.previousBreakpoint);
                        break;
                    }
                }
            }

            this.app.eventBus.trigger('BREAKPOINT.CHANGE');

            return this;
        },

        /**
         * Returns the current breakpoint
         *
         * @method getCurrentBreakpoint
         * @public
         * @returns {Object} currentBreakpoint A reference to the current breakpoint model
         */
        getCurrentBreakpoint: function() {
            return this.currentBreakpoint;
        },

        //////////////////////////////////////////////////////////////////////////////////
        // ERROR HANDLERS
        //////////////////////////////////////////////////////////////////////////////////

        /**
         * Throw an error if the media query object configuration is malformed
         *
         * @method mediaQueryError
         * @param breakpoint {string} A string of the breakpoint object causing the error
         * @public
         */
        mediaQueryError: function(breakpoint) {
            try {
                throw new ReferenceError(ERROR_MESSAGES.MALFORMED_MEDIA_QUERY + breakpoint);
            } catch(e) {
                console.log(e.name + ': ' + e.message);
            }
        },

        //////////////////////////////////////////////////////////////////////////////////
        // EVENT HANDLERS
        //////////////////////////////////////////////////////////////////////////////////

        /**
         * Preforms the function when the window is resized.
         *
         * @method onResize
         * @public
         */
        onResize: function() {
            var debounceResize = this.debounce(this.setCurrentBreakpoint, TIMES.DEBOUNCE);

            debounceResize();
        },

        /**
         * Debounce handler. Waits to run the passed in function.
         *
         * @method debounce
         * @param {Function} func The function to run on debounce
         * @param {Integer} wait The number of milliseconds to wait between firing events
         * @param {Boolean} immediate If true, run the function before the wait instead of after
         * @return function
         * @public
         */
        debounce: function(func, wait, immediate) {
            var self = this;

            return function() {
                var args = arguments;

                if (self.timeout !== undefined) {
                    clearTimeout(self.timeout);
                }

                self.timeout = setTimeout(function() {
                    self.timeout = null;

                    if (!immediate) {
                        func.apply(self, args);
                    }

                }, wait);

                if (immediate && !self.timeout) {
                    func.apply(self, args);
                }
            };
        },
    });

    return BreakpointListener;

}());