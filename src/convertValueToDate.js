
"use strict";

export default angular.module('lollipop.convertValueToDate', [])
    /**
     * Factory returning a method that converts an array of valid date parts (e.g.
     * [yyyy, mm, dd]) into a `Date` object by calling the constructor.
     *
     * @param Array
     * @return Date
     */
    .factory('convertValueToDate', () => value => new Date(Date.UTC(...toConsumableArray(value))))
    .name;

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

