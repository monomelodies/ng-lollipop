
"use strict";

import appendTransform from './appendTransform';

export default angular.module('lollipop.postRegularForm', [])
    /**
     * By default, Angular posts forms as JSON. This service injects a request
     * transform that makes it into actual www-form-urlencoded data.
     *
     * To use, simply inject it _somewhere_ in your app, e.g. like so:
     * `app.run(['postRegularForm', function (noop) {}]);`
     */
    .service('postRegularForm', ['$http', function ($http) {
        delete $http.defaults.headers.common['X-Requested-With'];
        $http.defaults.headers.post["Content-Type"] = 'application/x-www-form-urlencoded;charset=utf-8';
        
        // http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/
        function param(obj) {
            let query = '', name, value, fullSubName, subValue, innerObj;
            for (name in obj) {
                // These are (normally) Angular internals
                if (name.substring(0, 1) == '$') continue;
                // Posting a function doesn't make any sense
                if (typeof obj[name] == 'function') continue;
                value = obj[name];
                if (value instanceof Array) {
                    for (let i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Date) {
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value.toString()) + '&';
                } else if (value instanceof Object) {
                    for (const subName in value) {
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
        $http.defaults.transformRequest = appendTransform($http.defaults.transformRequest, data => {
            if (typeof data == 'string') {
                try {
                    data = angular.fromJson(data);
                } catch (e) {
                }
            }
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        });
    }])
    .name;

