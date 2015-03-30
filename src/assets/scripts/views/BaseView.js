var NRD = window.NRD || {};

NRD['./views/BaseView'] = (function() {
    'use strict';

    var Base = NRD['basejs']; // jshint ignore:line

    /**
     * @class BaseView
     */
    var BaseView = Base.extend({
        /**
         * @constructor
         * @param  {jQuery} $element Root element of the view
         */
        constructor: function($element) {
            /**
             * A reference to the containing DOM element.
             *
             * @default null
             * @property $element
             * @type {jQuery}
             * @public
             */
            this.$element = $element;

            /**
             * Tracks whether component is enabled.
             *
             * @default false
             * @property isEnabled
             * @type {bool}
             * @public
             */
            this.isEnabled = false;

            this.init();
        },

        /**
         * Initializes the UI Component View.
         * Runs a single setupHandlers call, followed by createChildren and layout.
         * Exits early if it is already initialized.
         *
         * @method init
         * @public
         * @chainable
         */
        init: function() {
            this.setupHandlers()
               .createChildren()
               .layout()
               .enable();

            return this;
        },

        /**
         * Binds the scope of any handler functions.
         * Should only be run on initialization of the view.
         *
         * @method setupHandlers
         * @public
         * @chainable
         */
        setupHandlers: function() {
            return this;
        },

        /**
         * Create any child objects or references to DOM elements.
         * Should only be run on initialization of the view.
         *
         * @method createChildren
         * @public
         * @chainable
         */
        createChildren: function() {
            return this;
        },

        /**
         * Remove any child objects or references to DOM elements.
         *
         * @method removeChildren
         * @public
         * @chainable
         */
        removeChildren: function() {},

        /**
         * Performs measurements and applys any positioning style logic.
         * Should be run anytime the parent layout changes.
         *
         * @method layout
         * @public
         * @chainable
         */
        layout: function() {
            return this;
        },

        /**
         * Enables the component.
         * Performs any event binding to handlers.
         * Exits early if it is already enabled.
         *
         * @method enable
         * @public
         * @chainable
         */
        enable: function() {
            if (this.isEnabled) {
                return this;
            }
            this.isEnabled = true;

            return this;
        },

        /**
         * Disables the component.
         * Tears down any event binding to handlers.
         * Exits early if it is already disabled.
         *
         * @method disable
         * @public
         * @chainable
         */
        disable: function() {
            if (!this.isEnabled) {
                return this;
            }
            this.isEnabled = false;

            return this;
        },

        /**
         * Destroys the component.
         * Tears down any events, handlers, elements.
         * Should be called when the object should be left unused.
         *
         * @method destroy
         * @public
         * @chainable
         */
        destroy: function() {
            this.disable()
                .removeChildren();

            return this;
        }
    });

    return BaseView;

}());