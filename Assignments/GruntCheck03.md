## Jasmine JQuery

Copy over the new and updated unit tests from:

	cp $ELF_TEMPLATES/UnitTest/BitlyRefine/*.js views/.

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

And put this in **karma.conf.js**:

```
preprocessors: {
    // '**/*.html': ['html2js']
    '**/*.html': []
},
```


## Jade and Exec

Copy **views/index.jade** to **views/dest.jade**.

Make sure you have a global copy of Jade:

```
npm install -g jade
```

Now create the HTML file:

```
jade views/dest.jade
```

This produces **views/dest.html**. This is the code we want in our tests.

Now save the following into **spec/test-dest.js**. Put this in it:

```javascript
describe('Test Jade', function() {
    'use strict';

    beforeEach(function () {
        jasmine.getFixtures().fixturesPath = 'base/spec/';
        loadFixtures('dest.html');
    });

    it('shows we can get at least 2 radio inputs', function() {
        var inputs = $('input:radio');
        //utils.showHtmlElements(inputs);
        expect(inputs.length).toBeGreaterThan(1);
    });


});
```



## For later

```javascript
jade: {
    compile: {
        options: {
            pretty: true,
            data: {
                debug: false
            }
        },
        files: {
            'spec/javascripts/fixtures/dest.html': ['views/temp.jade', '$ELF_TEMPLATES/JadeMixins/*.jade']
        }
    }
},

exec: {
    echo_name: {
        cmd: function(firstName, lastName) {
            var formattedName = [
                lastName.toUpperCase(),
                firstName.toUpperCase()
            ].join(', ');

            return 'echo ' + formattedName;
        }
    },

    foo: {
        cmd: function() {
            return "sed '/exten## Jasmine JQuery

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
d/d' views/index.jade > views/temp.jade";
        }
    }
}
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
