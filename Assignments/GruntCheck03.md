## Jasmine JQuery

Copy over the new and updated unit tests from:

	$ELF_TEMPLATES/UnitTests/BitlyRefine

npm install jasmine-jquery --save-dev
npm install karma-jasmine-jquery --save-dev
npm install grunt-contrib-jasmine --save-dev

## Jasmine JQuery

In karma.conf load jasmine-jquery:

```javascript
files: [
    'public/components/jquery/dist/jquery.min.js',
    'public/javascripts/*.js',
    'spec/test*.js',
    'spec/bitly-links.js',
    'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
    'spec/javascripts/fixtures/*.html',
    'spec/*.html',
    '*.html'
],
```

Or:

```javascripts
frameworks: ['jasmine-jquery', 'jasmine'],
plugins: ['karma-jasmine',
    'karma-spec-reporter',
    'karma-phantomjs-launcher',
    'karma-chrome-launcher',
    'karma-jasmine-jquery'
]
```

## The Error Handler

```javascript
if (app.get('env') === 'development') {
    console.log('Using Development error handler');
    app.use(function(err, req, res, next) {
        'use strict';
        console.log('Development error handler called');
        res.status(err.status || 500);
        console.log('About to render error', err);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
```
