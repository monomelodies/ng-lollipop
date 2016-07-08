
"use steict";

var dateRegexes = require('./dateRegexes');
var dateCallbacks = require('./dateCallbacks');

var app = angular.module('lollipop.isValueDate', [dateRegexes, dateCallbacks]);

module.exports = app.name;

/**
 * Checks a given value to see if it is a date based on `dateRegexes` and
 * `dateCallbacks`. On success an array of parts is returned which can be passed
 * to `convertValueToDate`. On failure, returns undefined;
 *
 * @param value Any (string) value to check.
 * @return Array|undefined
 * @see dateRegexes:value
 * @see dateCallbacks:service
 * @see convertValueToDate:factory
 */
app.factory('isValueDate', ['dateRegexes', 'dateCallbacks', function (dateRegexes, dateCallbacks) {
    return function (value) {
        var match = undefined;
        for (var i = 0; i < dateRegexes.length; i++) {
            if (match = dateRegexes[i].exec(value)) {
                match.shift();
                var returner = [];
                for (var i = 0; i < match.length; i++) {
                    if (i in dateCallbacks) {
                        returner.push(dateCallbacks[i](match[i]));
                    } else {
                        returner.push(match[i]);
                    }
                }
                return returner;
            }
        }
        return undefined;
    };
}]);

