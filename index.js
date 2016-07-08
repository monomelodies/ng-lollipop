
"use strict";

var postRegularForm = require('./lib/postRegularForm');
var normalizeIncomingHttpData = require('./lib/normalizeIncomingHttpData');
var dateRegexes = require('./lib/dateRegexes');
var dateCallbacks = require('./lib/dateCallbacks');
var convertValueToDate = require('./lib/convertValueToDate');
var isValueDate = require('./lib/isValueDate');

var app = angular.module('lollipop', [postRegularForm, normalizeIncomingHttpData, dateRegexes, dateCallbacks, convertValueToDate, isValueDate]);

module.exports = app.name;

