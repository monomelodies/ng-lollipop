
"use strict";

export default angular.module('lollipop.dateRegexes', [])
    /**
     * An array of regexes that should match dates in your application.
     *
     * Not every storage system stores dates in the same way; the default is to use
     * the rather universal YYYY-MM-DD hh:mm:ss format, but this allows you to add
     * your own variations where needed.
     */
    .value('dateRegexes', [/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/, /^(\d{4})-(\d{2})-(\d{2})/])
    .name;

