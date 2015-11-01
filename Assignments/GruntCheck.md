# Grunt Check

Learn how to use [jshint][jshint], [jscs][jscs] and [jsbeautifier][jsb]. These utilities help you format your code and run basic sanity checks on it. The goal of this assignment is to be able to run the following commands and have them come back clean:

```
grunt check
grunt test
```

The emphasis here is onlearning to format your code correctly. In particular, see the [Google style guide][gsg]. The JSCS tests in this project follow the Google style guides, except that our indent is four spaces rather than two.

[jscs]: https://github.com/jscs-dev/node-jscs
[jshint]: http://jshint.com/docs/
[jsb]: https://github.com/beautify-web/js-beautify
[gsg]: https://google.github.io/styleguide/javascriptguide.xml

This assignment turned out to be more difficult than I thought it would be at first. The main problem came when shortening lines longer than 120 characters. Yet, these style guidelines are reasonable, and we should follow them. Furthermore, it has proved nearly impossible to get either me or my students to properly format their code without some kind of hard metric, and this provides one for us.

**NOTE**: *When viewing the Google style guide, you may find it easiest to select the **Toggle All Summaries** option at the top of the file.*

See also:

- [jsbeautifier.org](http://jsbeautifier.org/)

## Setup

You need to create two files:

- **.jscsrc**: Configure JSCS
- **Gruntfile.js**: Configure Grunt

One is used to configure **grunt**, the other to configure **jscs**. Another configuration file that we have dealt with regularly is **.bowerrc**. It is used, of course, to configure **bower**. I mention it only because it is similar to **.jscsrc**.

Here is the **.jscsrc** config file:

```javascript
{
    "preset": "google",
    "validateIndentation": 4,
    "excludeFiles": ["**/node_modules/**", "**/components/**"]
}
```

Here is **Gruntfile.js**:


```javascript
module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        pkg: '<json:package.json>',

        jshint: {
            files: ['**/*.js'],

            options: {
                ignores: [
                    '**/node_modules/**', '**/components/**'
                ],
                reporter: require('jshint-stylish'),
                strict: true,
                jasmine: true
            }
        },

        clean: {
            yourTarget: {
                src: ['**/node_modules/**', '**/components/**']
            }
        },

        jscs: {
            src: '**/*.js',
            options: {
                config: '.jscsrc'
            }
        },

        'jsbeautifier': {
            files: ['**/*.js', '!**/node_modules/**', '!**/components/**'],
            options: {
                'indentSize': 4
            }
        },

        karma: {
            karma: {
                configFile: 'karma.conf.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-karma');
    grunt.registerTask('beautify', ['jsbeautifier']);
    grunt.registerTask('check', ['beautify', 'jscs', 'jshint']);
    grunt.registerTask('test', ['jshint', 'karma']);
};
```

In **jscs**, you can skip checking **bitly-links.js**:

```
jscs: {
    src: ['**/*.js', '!spec/bitly-links.js'],
    options: {
        config: '.jscsrc'
    }
},
```

In the code above, note how we use the bang operator to tell **jscs** to skip a file: **!spec/bitly-linksjs**.

We also need to turn off checking for [CamelCase violations][ccv]. While we are at it, let's set the max line length to 120, which is more reasonable for modern editors. This means our **.jscsrc** file for **BitlyInteractive** and **BitlyRefine** should look like this:

```json
{
    "preset": "google",
    "validateIndentation": 4,
    "excludeFiles": ["**/node_modules/**", "**/components/**"],
    "requireCamelCaseOrUpperCaseIdentifiers": false,
    "maximumLineLength": 120
}
```

Note the two new lines at the end of the file. The camel case problem is in our tests, where we have lines like this:

```javascript
var firstLink = bitlyUrlParser.bitlyLinks.data.link_history[0];
```

At some later point, we can use maps to transform **link_history** to **linkHistory**, but for now let's just turn off the warning.

[ccv]: http://jscs.info/rule/requireCamelCaseOrUpperCaseIdentifiers

If a line is too long, try to find a way to break it up. The following method had a line that was over 120 characters, but here I break it up to fit the formatting rules:

```javascript
    getUrl: function(accessToken) {
        'use strict';

        var baseUrl = 'https://api-ssl.bitly.com/v3/user/link_history';
        var params = '?access_token=';

        if (accessToken === -1) {
            return 'data/bitly-links.json';
        } else {
            var url = baseUrl + params;
            return url += accessToken;
        }
    },
```

Let's make a breaking change that will allows us to shorten some other lines:

```javascript
    getLinkHistoryArray: function() {
        'use strict';
        return bitlyUrlParser.bitlyLinks.data.link_history;
    },

    getLinkHistoryItem: function(index) {
        'use strict';
        return bitlyUrlParser.bitlyLinks.data.link_history[index];
    },

    getMap: function() {
        'use strict';
        return bitlyUrlParser.getLinkHistoryArray().map(function(history) {
            var myDate = new Date(history.created_at * 1000);
            return {
                title: history.title,
                link: history.link,
                created_at: myDate.toLocaleString()
            };
        });
    },
```

Notice that we now call **getLinkHistoryArray** in the **getMap** function.

And let's clean up the way we report errors in the **fail** handler:

```javascript
    getBitlyLinks: function(accessToken) {
        'use strict';
        var url = bitlyUrlParser.getUrl(accessToken);

        $.getJSON(url, function(result) {
            bitlyUrlParser.bitlyLinks = result;
            bitlyUrlParser.display();
            $('#displayLinks').html(JSON.stringify(result, null, 4));
        }).fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log('Request Failed: ' + err);
            console.log('url:', url);
        });
    },
```

Though you probably have these changes already, I'll remind you that in **BitlyRefine** the code looks like this, :

```javascript
getBitlyLinks: function(accessToken) {
    'use strict';
    var url = elfBitly.getUrl(accessToken);

    $.getJSON(url, function(result) {
        elfBitly.bitlyLinks = result;
        elfDisplay.render();
        elfDisplay.renderTable(elfBitly.getLinkHistoryArray());
        $('#displayLinks').html(JSON.stringify(result, null, 4));
    }).fail(function(jqxhr, textStatus, error) {s
        var err = textStatus + ', ' + error;
        console.log('Request Failed: ' + err);
        console.log('url:', url);
    });
},
```

This change will break some of our tests, since **getLinkHistory** has been renamed to **getLinkHistoryItem**.

The **package.json** file for this code might look like this:

```json
{
  "name": "week07-gruntcheck",
  "version": "1.0.0",
  "description": "\"Learn about jscs and grunt\"",
  "main": "work.js",
  "scripts": {
    "start": "nodemon work.js",
    "test": "grunt test"
  },
  "keywords": [
    "JavaScript",
    "format"
  ],
  "author": "Charlie Calvert",
  "license": "MIT",
  "devDependencies": {
    "grunt": "^0.4.5",
    "grunt-contrib-clean": "^0.6.0",
    "grunt-contrib-jshint": "^0.11.3",
    "grunt-jsbeautifier": "^0.2.10",
    "grunt-jscs": "^2.3.0",
    "grunt-karma": "^0.12.1",
    "jasmine-core": "^2.3.4",
    "jshint-stylish": "^2.0.1",
    "karma": "^0.13.14",
    "karma-jasmine": "^0.3.6",
    "karma-phantomjs-launcher": "^0.2.1",
    "karma-spec-reporter": "0.0.22",
    "phantomjs": "^1.9.18"
  }
}
```

This assignment does not actually use Karma, but I include the code for configuring karma in case you want to use this assignment as a template for that task.

## Clean Code

I want to be sure that the following projects, and all future projects, pass the tests set up in this project:

- Week04-JavaScriptObjects
- Week06-BitlyInteractive
- Week07-BitlyRefine

Start with **Week04-JavaScriptObjects** as it is a very simple project. By the time you get it to pass, you should know enough to be able to test the code in the other two projects.

The [PrimitiveTypes][pt] project in **JsObjects** provides an example of what I would, at minimum, like to see. Note that both **grunt check** and **grunt test** pass without errors. (The test is not very interesting, but it does work. That would be fine for **Week04-JavaScriptObjects**, but I want, of course, better tests in the other two projects.)

Remember, you should not need to modify the files included in this assignment. It is your JavaScript files that may need to change as a result of the tests shown here.

[pt]:https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Syntax/PrimitiveTypes

## Updated Unit Tests

```
/**
 * Created by charlie on 10/7/15.
 */

describe('Elvenware Simple Plain Suite', function() {
    'use strict';

    it('expects true to be true', function() {
        expect(true).toBe(true);
    });

});

describe('Test Bitly Suite', function() {
    'use strict';

    var accessToken = 'YOUR ACCESS CODE HERE';

    it('gets a url', function() {
        var url = elfBitly.getUrl(accessToken);

        expect(url).toBeTruthy();
        expect(url).toContain(accessToken);
        expect(url).toContain('https');

    });

    it('tests the the local url we pass to getBitlyLinks', function() {
        var finalUrl;

        spyOn($, 'getJSON').and.callFake(function(url, success) {
            finalUrl = url;
            success(bitlyLinks);
            return {
                fail: function() {}
            };
        });

        elfBitly.getBitlyLinks(-1);
        expect(finalUrl).toBe('data/bitly-links.json');
    });

    it('tests the accesstoken url we pass to getBitlyLinks', function() {
        var finalUrl;

        spyOn($, 'getJSON').and.callFake(function(url, success) {
            finalUrl = url;
            success(bitlyLinks);
            return {
                fail: function() {}
            };
        });

        elfBitly.getBitlyLinks(accessToken);
        expect(finalUrl).toContain(accessToken);
        expect(finalUrl).toContain('https');
    });

});

describe('Test Bitly Links', function() {
    'use strict';

    beforeEach(function() {
        spyOn($, 'getJSON').and.callFake(function(url, success) {
            success(bitlyLinks);
            return {
                fail: function() {}
            };
        });
    });

    it('shows we can directly get the status code and text', function() {
        elfBitly.getBitlyLinks();
        expect(elfBitly.bitlyLinks.status_code).toBe(200);
        expect(elfBitly.bitlyLinks.status_txt).toBe('OK');

    });

    it('shows we have a status code of 200', function() {

        elfBitly.getBitlyLinks();
        var statusCode = elfBitly.getStatusCode();
        expect(statusCode).toBe(200);
    });

    it('shows we have a status txt of OK', function() {

        elfBitly.getBitlyLinks();
        var statusText = elfBitly.getStatusText();
        expect(statusText).toBe('OK');
    });

    it('shows we have a count of 165 links', function() {

        elfBitly.getBitlyLinks();
        expect(elfBitly.bitlyLinks.data.result_count).toBe(165);
    });

    it('show we can get the title of the first element', function() {
        elfBitly.getBitlyLinks();
        var firstLink = elfBitly.bitlyLinks.data.link_history[0];
        expect(firstLink.title).toBe('BootstrapBasics01Small.png (307×261)');
        expect(firstLink.title).toContain('BootstrapBasics01Small.png');
    });

    it('show we can get the first item from the link history', function() {
        elfBitly.getBitlyLinks();
        var firstLink = elfBitly.getLinkHistoryItem(0);
        expect(firstLink.title).toBe('BootstrapBasics01Small.png (307×261)');
        expect(firstLink.title).toContain('BootstrapBasics01Small.png');
    });

    it('Shows we can transform the data', function() {
        elfBitly.getBitlyLinks();
        var map = elfBitly.getMap();
        // console.log(JSON.stringify(map[0], null, 4));
        expect(map.length).toBe(50);
    });
});
```

## Turn it in

When turn, I should be able to see updated files in the projects mentioned above. In particular, I should be able to go to any of those three projects, run **grunt check**, and see results like this:

```
$ grunt check
Running "jsbeautifier:files" (jsbeautifier) task
Beautified 5 files, changed 0 files...OK

Running "jscs:src" (jscs) task
>> 5 files without code style errors.

Running "jshint:files" (jshint) task

✔ No problems


Done, without errors
```

The number of files may differ, but the general format should be the same. Be sure all the JavaScript code in **public/javascripts/** and **routes/** passes these tests.

