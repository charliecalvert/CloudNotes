## Grunt Check 03 Comments.

## Setup Grunt and Karma

I've noticed that some people are still not getting **check-karma-grunt-config** to return smoothly. For instance, look at the results shown here:

```bash
$ check-karma-grunt-config 

*** setup ***

js-beautify exists
beautified karma.conf.js
beautified Gruntfile.js

*** These tests are meant to help you find problems in
*** karma.conf and Gruntfile. They are not definitive

preprocessor not found 
jasmine-jquery not found 
load html files in karma config files section not found 
exec task config not found 
jade task config not found 
grunt-contrib-clean loadNpmTask mentioned
grunt-contrib-jshint loadNpmTask mentioned
grunt-jscs loadNpmTask mentioned
grunt-jsbeautifier loadNpmTask mentioned
grunt-karma loadNpmTask mentioned
grunt-contrib-jade loadNpmTask not found 
grunt-exec loadNpmTask not found 
fixture registered task not found 
beautify registered task mentioned
check registered task mentioned
test registered task mentioned
[charlie@rohan-gate ~/Git/isit320-2015/isit320-enochs-2015]
```

As you can see, some of the sections come back with the words **not found** instead of **mentioned**. You need to get them to all say **mentioned** and to all be in green.

If you have completed the Single Page Express program then I have sent you a working program that includes **karma.conf.js** and **Gruntfile.js** source that passes the tests in **check-karma-grunt-config.**

Don't forget that I keep **check-karma-grunt-config** in **ELF_TEMPLATES**. You should copy it from there into your bin directory so you can easily access it:

```bash
cp $JSOBJECTS/Utilities/NodeInstall/check-karma-grunt-config ~/bin/.
```

## Chrome Might Help

In Chrome, you can debug your code with the Chrome developer tools as we do with a normal program. See this section here for a reminder about how to proceed:

- [Jasmine Mock Discussion Of Chrome and PhantomJS][jmdcpjs]

[jmdcpjs]: http://www.ccalvert.net/books/CloudNotes/Assignments/JasmineExpressMock.html#hint

## Keyword Link Property Count {#property-count}

A few people had trouble with this test:

```javascripts
it('shows we can get all the attributes of the text input keywordLink', function() {
    var element = document.getElementById('keywordLink');
    var arr = elfTestUtils.getAttributesFromElement(element);
    elfTestUtils.showAttributes(element, arr);
    expect(arr.length).toBe(6);
});
```

It's not a great test, but to get it to pass, you can declare your input controls like this:

```javascript
+elfInputVB("Keyword Link", "keywordLink", "keywordLink")#keywordLink.form-control.input-sm
```

If someone reminds me to do so, we could modify this test at some point to make it less stringent. For instance:

```javascript
it('shows we can get all the attributes of the text input keywordLink', function() {
    var element = document.getElementById('keywordLink');
    var arr = elfTestUtils.getAttributesFromElement(element);
    // elfTestUtils.showAttributes(element, arr);
    expect(arr.length).toBeGreaterThan(3);
});
```

It is the last line that differs.

## Filter Skipped Tests {#filter-skip}

If you are using the **spec** reporter, and most of us are, then filter out tests that are being skipped:

```javascript
reporters: ['spec'],

specReporter: {
    suppressSkipped: true // do not print information about skipped tests
},
```
