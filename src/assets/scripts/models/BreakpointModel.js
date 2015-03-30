var NRD = window.NRD || {};

NRD['./models/BreakpointModel'] = (function() {
    'use strict';

    var BaseModel = NRD['./models/BaseModel'];

    /**
     * @class BreakpointModel
     * @extends {BaseModel}
     */
    var BreakpointModel = BaseModel.extend({
        /**
         * The type of media in the media query
         *
         * @property media
         * @default 'screen'
         */
        media: 'screen',

        /**
         * The arguments used in the media query
         *
         * @property arguments
         * @default ''
         */
        arguments: '',

        /**
         * The width parameter of the media query
         *
         * @property width
         * @default 0
         */
        width: 0,

        /**
         * @constructor
         * @param {Object} data A reference to an Object of key/value pairs
         */
        constructor: function(data) {
            this.base(data);
            this.media = this.replaceAll(this.media, '\'', '');
            this.arguments = this.replaceAll(this.arguments, '\'', '');
        },

        /**
         * Compare the previous breakpoint to the current breakpoint
         *
         * @method compare
         * @param {Object} A reference to the current breakpoint object
         * @return {Integer}
         */
        compare: function(breakpointModel) {
            if (!breakpointModel) {
                return 0;
            }

            // Getting larger
            if (this.width > breakpointModel.width) {
                return 1;
            }

            // Getting smaller
            if (this.width < breakpointModel.width) {
                return -1;
            }

            // No breakpoint has been crossed
            return 0;
        }
    });

    return BreakpointModel;

}());