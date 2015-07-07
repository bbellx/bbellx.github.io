var NRD = window.NRD || {};

NRD['./models/AppStateModel'] = (function() {
    'use strict';

    var $ = NRD['jquery']; // jshint ignore:line
    var BaseModel = NRD['./models/BaseModel'];

    /**
     * Stores the state of the global application, useful for storing
     * client information for variosu classes to consume
     *
     * @class AppStateModel
     */
    var AppStateModel = BaseModel.extend({

        currentBreakpoint: null,

        /**
         * @constructor
         */
        constructor: function(data) {
            this.base(data);
        },

        /**
         * Uses the passed in data to update the current model information.
         * Extends the current data so only relevant property is overwritten.
         *
         * @method set
         * @param data {Object} Contains a set of properties which match the model properties to be set
         */
        set: function(data) {
            var prop;

            for (prop in data) {
                if (data.hasOwnProperty(prop)) {
                    this[prop] = $.extend(this[prop], data[prop]);
                }
            }
        }

    });

    return AppStateModel;

}());