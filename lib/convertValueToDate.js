
"use strict";

var app = angular.module('lollipop.convertValueToDate', []);

module.exports = app.name;

/**
 * Factory returning a method that converts an array of valid date parts (e.g.
 * [yyyy, mm, dd]) into a `Date` object by calling the constructor.
 *
 * @param Array
 * @return Date
 */
app.factory('convertValueToDate', function () {

    function toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }
            return arr2;
        } else {
            return Array.from(arr);
        }
    };
    
    return function (value) {
        return new (Function.prototype.bind.apply(Date, [null].concat(toConsumableArray(value))))();
    };
});

