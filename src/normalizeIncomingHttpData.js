
"use strict";

var normalizeData = require('./normalizeData');
var app = angular.module('lollipop.normalizeIncomingHttpData', [normalizeData]);

var appendTransform = require('./appendTransform');

module.exports = app.name;

/**
 * Wrapper service that normalizes incoming HTTP data. You need to inject this
 * somewhere in your application (e.g. in `app.run(['normalizeIncomingHttpData',
 * function(noop) {}]);`).
 *
 * @see normalizeData:factory
 */
app.service('normalizeIncomingHttpData', ['$http', 'normalizeData', function ($http, normalizeData) {
    $http.defaults.transformResponse = appendTransform($http.defaults.transformResponse, normalizeData);
}]);

