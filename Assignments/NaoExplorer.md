## Nao Explorer

CreateExpressProject Week10-NaoExplorer

Then navigate into that directory and run:

TestReady

Then open your project in WebStorm.

If you don't have TestReady:

cp $JSOBJECTS/Utilities/NodeInstall/TestReady ~/bin/.

## Copy Unit Tests

Copy in the unit tests for this project:

cp $ELF_TEMPLATES/UnitTest/NaoExplorer/* spec/.

## Latest Check Karma

Run this:

```
diff $JSOBJECTS/Utilities/NodeInstall/check-karma-grunt-config ~/bin/check-karma-grunt-config```

If it does not come back clean, then do this:

```
cp $JSOBJECTS/Utilities/NodeInstall/check-karma-grunt-config ~/bin/.
```

Now [set up][grunt03] **karma.conf.js** and **Gruntfile.js**.

Don't forget:

-  npm install grunt-contrib-jade --save-dev
-  npm install grunt-exec --save-dev

[grunt03]: http://www.ccalvert.net/books/CloudNotes/Assignments/GruntCheck03.html

## Files to Create

- control.js
- display.js
- robot.js
- launcher.js
- responses.js
- behaviors.js
- arms.js

Be sure these are referenced in **layout.jade**.

The first three should contain an object with **elf** prepended to its name:

- elfControl
- elfDisplay
- elfRobot

## Error Handler
Update error handler in **app.js**:

```javascript
if (app.get('env') === 'development') {
    console.log("Using Development error handler");
    app.use(function(err, req, res, next) {
        'use strict';
        console.log("Development error handler called");
        res.status(err.status || 500);
        console.log("About to render error", err);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
```

## Unit Test for Buttons

We want to be sure you are declaring the buttons properly in **index.jade**. The unit tests for this are here:

```bash
$ELF_TEMPLATES/UnitTest/NaoExplorer/test-fixture.js  
```

You first need to run **grunt fixture**. That creates **spec/fixtures/fixture.html**. Then the code in **test-fixture.js** should now (hopefully) confirm that you have declared four buttons with the proper ID and CAPTION. You can start with the following jade:

```jade
button
button
button
button
```

Then run **grunt fixture** and see if your Jade is valid and if it satisfies the tests. Then just keep tweaking your Jade and running **grunt fixture** until the tests pass.

Note that there are two ways to get the HTML elements.

- With JavaScript
- With JQuery

Check for caption using pure JavaScript:

```javascript
    it('expects a button with a caption of Left Arm', function() {
        var button = document.getElementById('leftArm');
        var caption = button.innerHTML
        expect(caption).toBe('Left Arm');
    });
```

Check for caption using jQuery: 

```javascript
    it('expects a button with an caption of Get Behaviors', function() {
        var button = $('#behaviors');
        expect(button[0].innerHTML).toBe('Get Behaviors');
    });

```

Note that with jQuery we have to index into the result: **button[0]**. You should feel comfortable with either technique.
