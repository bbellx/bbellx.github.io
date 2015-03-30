var NRD = window.NRD || {};

NRD['./models/BaseModel'] = (function() {
    'use strict';

    var Base = NRD['basejs']; // jshint ignore:line

    /**
     * @class BaseModel
     */
    var BaseModel = Base.extend({
        /**
         * @constructor
         * @param {Object} data A reference to an Object of key/value pairs
         */
        constructor: function(data) {

            if (data) {
                this.fromJSON(data);
            }
        },

        /**
         * @method fromJSON
         * @param {Object} data A reference to an Object of key/value pairs
         */
        fromJSON: function(data) {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    this[key] = data[key];
                }
            }
        },

        /**
         * Return JSON data
         *
         * @method toJSON
         * @return {Object}
         */
        toJSON: function() {
            return this;
        },

        /**
         * A utility method to find and replace all instances of a string
         *
         * @method replaceAll
         * @param {String} string A reference to the string to search through
         * @param {String} find A reference to the string to search for
         * @param {String} replace A reference to a string to replace the one that is found
         * @return {String}
         */
        replaceAll: function(string, find, replace) {
            return string.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
        },

        /**
         * @method escapeRegExp
         * @param {String} string A reference to the string to search for
         * @return {String}
         */
        escapeRegExp: function(string) {
            return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
        }

    });

    return BaseModel;

}());