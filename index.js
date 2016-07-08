
"use strict";

var app = angular.module('lollipop', []);

module.exports = app.name;

function appendTransform(defaults, transform) {
    defaults = angular.isArray(defaults) ? defaults : [defaults];
    return defaults.concat(transform);
}

app.service('postRegularForm', ['$http', function ($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    $http.defaults.withCredentials = true;
    $http.defaults.headers.post["Content-Type"] = 'application/x-www-form-urlencoded;charset=utf-8';

    // http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/
    function param(obj) {
        var query = '', name, value, fullSubName, subValue, innerObj;
        for (name in obj) {
            // These are (normally) Angular internals
            if (name.substring(0, 1) == '$') continue;
            // Posting a function doesn't make any sense
            if (typeof obj[name] == 'function') continue;
            value = obj[name];
            if (value instanceof Array) {
                for (var i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            } else if (value instanceof Date) {
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value.toString()) + '&';
            } else if (value instanceof Object) {
                for (var subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            } else if (value !== undefined && value !== null) {
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            } else {
                // Note that the original function as referenced above silently drops empty
                // values (null or undefined). We actually want those to be posted, but as
                // an empty value.
                query += encodeURIComponent(name) + '=&';
            }
        }
        return query.length ? query.substr(0, query.length - 1) : query;
    };
    // Extend $http service's default transformRequest
    $http.defaults.transformRequest = appendTransform($http.defaults.transformRequest, function(data) {
        if (typeof data == 'string') {
            try {
                data = angular.fromJson(data);
            } catch (e) {
            }
        }
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    });
}]);

app.service('normalizeIncomingHttpData', ['$http', 'normalizeData', function ($http, normalizeData) {
    $http.defaults.transformResponse = appendTransform($http.defaults.transformResponse, normalizeData);
}]);

/**
 * Helper method to normalize data for Angular:
 * - dates are actual Date objects
 * - numbers are actual Number objects
 *
 * @param object obj An object to normalize.
 * @return object Then normalized object.
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

app.service('dateCallbacks', function () {
    this[1] = function (value) {
        return value - 1;
    };
});

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

app.value('dateRegexes', [/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/, /^(\d{4})-(\d{2})-(\d{2})/]);

