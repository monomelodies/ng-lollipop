
"use strict";

import isValueDate from './isValueDate';
import convertValueToDate from './convertValueToDate';

export default angular.module('lollipop.normalizeData', [isValueDate, convertValueToDate])
    /**
     * Factory returning a helper method to normalize data for Angular:
     * - dates are actual Date objects
     * - numbers are actual Number objects
     *
     * @param object obj A (JSON) object to normalize.
     * @return object The "normalized" object.
     */
    .factory('normalizeData', ['isValueDate', 'convertValueToDate', (isValueDate, convertValueToDate) => {
        return function normalize (obj) {
            if (obj === ('' + obj)) {
                return obj;
            }
            for (const prop in obj) {
                let value = obj[prop];
                if (value != undefined) {
                    if (angular.isArray(value)) {
                        value.map(item => normalize(item));
                        continue;
                    }
                    if (typeof value == 'string') {
                        const checkDate = isValueDate(value);
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
    }])
    .name;

