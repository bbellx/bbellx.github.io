var NRD = window.NRD || {};

NRD['./shim'] = (function() {
    'use strict';

    // Shim
    NRD['jquery'] = window.jQuery; // jshint ignore:line
    NRD['modernizr'] = window.Modernizr; // jshint ignore:line
    NRD['basejs'] = window.Base; // jshint ignore:line
    NRD['eventbus'] = window.EventBus; // jshint ignore:line
    NRD['matchmedia'] = window.matchMedia; // jshint ignore:line

}());