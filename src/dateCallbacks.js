
"use strict";

export default angular.module('lollipop.dateCallbacks', [])
    /**
     * Default date callbacks for transforming a regexed date back to something
     * Javascript can grock in a `Date` constructor.
     *
     * For each matched subpattern, the corresponding index is invoked (if set).
     * Hence, for the default regex pattern this changes the months to be zero
     * offset since that's how Javascript rolls.
     *
     * @param mixed Each transformer receives the submatch and must convert it to
     *  an integer which can be used in the `Date` constructor.
     * @return int Each transformer must return an integer.
     * @see lollipop.dateRegexes:value
     */
    .service('dateCallbacks', function () {
        this[1] = value => value - 1;
    })
    .name;

