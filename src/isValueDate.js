
"use steict";

import dateRegexes from './dateRegexes';
import dateCallbacks from './dateCallbacks';

export default angular.module('lollipop.isValueDate', [dateRegexes, dateCallbacks])
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
    .factory('isValueDate', ['dateRegexes', 'dateCallbacks', (dateRegexes, dateCallbacks) => {
        return function (value) {
            let match = undefined;
            for (let i = 0; i < dateRegexes.length; i++) {
                if (match = dateRegexes[i].exec(value)) {
                    match.shift();
                    let returner = [];
                    for (let j = 0; j < match.length; j++) {
                        if (j in dateCallbacks) {
                            returner.push(dateCallbacks[i](match[j]));
                        } else {
                            returner.push(match[j]);
                        }
                    }
                    return returner;
                }
            }
            return undefined;
        };
    }])
    .name;

