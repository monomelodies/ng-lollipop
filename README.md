# ng-lollipop
Normalize HTTP requests for Angular applications

By default, Angular posts data as JSON, which is often not what you want. Also,
data received as JSON needs some massaging (date to actual Date objects, numbers
to actual Number objects etc.). This package handles all that for you.

## Installation
Via NPM (recommended):

```sh
npm install --save ng-lollipop
```

Include the package in your application. This can be done via a tool like
Browserify (recommended) or by simply adding a `<script>` tag pointing to the
location where you installed it.

Add it as a dependency for your Angular application:

```javascript
var app = angular.module('myAwesomeProject', ['lollipop']);
```

## Registering the helpers
Lollipop exposes two main services: `postRegularForm` to replace JSON posts with
normal `urlencoded` data strings, and `normalizeIncomingHttpData` to massage the
received data. You'll need to inject them once in your application for them to
take effect (since you might want to use just one of them):

```javascript
app.run(['postRegularForm', 'normalizeIncomingHttpData', function (a, b) {
    // We're not using `a` and `b`, we just need them to be injected.
}]);
```

## Normalizing data from non-HTTP sources
Since you might get your data from other sources (e.g. a Socket server),
Lollipop also offers a more low level `normalizeData` service. You might for
instance need to do something like this:

```javascript
app.factory('Socket', ['SocketFactory', 'normalizeData', function (SocketFactory, normalizeData) {
    var socket = socketFactory({ioSocket: window.io.connect('')});
    var on = socket.on;
    socket.on = function (event, callback) {
        on.call(socket, event, function (data) {
            callback(normalizeData(data));
        });
    };
}]);
```

## Handling alternative date formats
Out of the box, Lollipop recognizes date strings in a format compatible with
most RMDBSs. Of course, your source might be a bit more exotic. There are a
number of pluggable helpers you can modify to account for that:

### The `dateRegexes` value
Lollipop defines a `dateRegexes` Angular value which you can override. It is
simply an array of patterns to check. The first pattern matched gets returned
(with index 0, the full match, already removed). The default implementation
assumes that the date parts are "in order", i.e. they are passed directly to
the `Date` constructor.

### The `dateCallbacks` service
An object where each key matching the index in the matched date is called if
present. The default implementation is to only offset key 1 by -1 since
Javascript months are 0-indexed.

### The `convertValueToDate` factory
Returns a function which converts matched date parts into a `Date` object. If
your date parts are in a "weird" order, override this.

### The `isValueDate` factory
This you'll rarely need to override; it loops through the `dateRegexes` array
and applies `dateCallbacks` for defined keys.

