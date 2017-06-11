
"use strict";

import normalizeData from './normalizeData';
import appendTransform from './appendTransform';

export default angular.module('lollipop.normalizeIncomingHttpData', [normalizeData])
    /**
     * Wrapper service that normalizes incoming HTTP data. You need to inject this
     * somewhere in your application (e.g. in `app.run(['normalizeIncomingHttpData',
     * function(noop) {}]);`).
     *
     * @see normalizeData:factory
     */
    .service('normalizeIncomingHttpData', ['$http', 'normalizeData', function ($http, normalizeData) {
        $http.defaults.transformResponse = appendTransform($http.defaults.transformResponse, normalizeData);
    }])
    .name;

