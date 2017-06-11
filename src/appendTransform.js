
"use strict";

export default (defaults, transform) => {
    defaults = angular.isArray(defaults) ? defaults : [defaults];
    return defaults.concat(transform);
};

