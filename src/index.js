
"use strict";

import postRegularForm from './postRegularForm';
import normalizeIncomingHttpData from './normalizeIncomingHttpData';
import dateRegexes from './dateRegexes';
import dateCallbacks from './dateCallbacks';
import convertValueToDate from './convertValueToDate';
import isValueDate from './isValueDate';

export default angular.module('lollipop', [postRegularForm, normalizeIncomingHttpData, dateRegexes, dateCallbacks, convertValueToDate, isValueDate]).name;

