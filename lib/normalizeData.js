
"use strict";

var isValueDate = require('./isValueDate');
var convertValueToDate = require('./convertValueToDate');

var app = angular.module('lollipop.normalizeData', [isValueDate, convertValueToDate]);

module.exports = app.name;

/**
 * Factory returning a helper method to normalize data for Angular:
 * - dates are actual Date objects
 * - numbers are actual Number objects
 *
 * @param object obj A (JSON) object to normalize.
 * @return object The "normalized" object.
 */
app.factory('normalizeData', ['isValueDate', 'convertValueToDate', function (isValueDate, convertValueToDate) {
    return function normalize (obj) {
        if (obj === ('' + obj)) {
            return obj;
        }
        for (var prop in obj) {
            var value = obj[prop];
            if (value != undefined) {
                if (angular.isArray(value)) {
                    value.map(function (item) { return normalize(item); });
                    continue;
                }
                if (typeof value == 'string') {
                    var checkDate = isValueDate(value);
                    if (checkDate) {
                        value = convertValueToDate(checkDate);
                    } else if ((value - 0) == value && ('' + value).trim().length > 0) {
                        value = value - 0;
                    }
                } else if (typeof value != 'undefined' && typeof value == 'object') {
                    value = normalize(value);
                }
            }
            obj[prop] = value;
        }
        return obj;
    };
}]);

