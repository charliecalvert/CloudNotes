## Nao Explorer

Start with this command:

	CreateExpressProject Week10-NaoExplorer

Then navigate into that directory and run:

	TestReady

Then open your project in WebStorm.

If you don't have TestReady:

cp $JSOBJECTS/Utilities/NodeInstall/TestReady ~/bin/.

## FixtureReady

I have created a new script called **FixtureReady**. It is designed to automate the process of moving a project from the state that **TestReady** creates to the point where it can handle working with Fixtures. In particular, it does the following tasks.

- Insert necessary **loadNpmTasks** and **registerTasks** into Gruntfile.js
- Insert preprocessor object into **karma.conf.js**
- Insert code to load jasmine-jquery
- Insert code to load any HTML files in the spec directories
- Install **grunt-exec**, **grunt-contrib-jade**, and **jasmine-jquery** NPM packages

You may have already done these tasks, in which case you should not run **FixtureReady**. But if you are having trouble getting Fixtures to work, this tool can help you get started.

To get **FixtureReady**, first run **git pull** on **JsObjects** and then run this command:

```bash
ln -s $ELF_TEMPLATES/UnitTest/FixtureReady ~/bin/FixtureReady
ln -s $JSOBJECTS/Utilities/NodeInstall/CreateExpressProject ~/bin/CreateExpressProject
ln -s $JSOBJECTS/Utilities/NodeInstall/CreateAllExpress ~/bin/CreateAllExpress
ln -s $JSOBJECTS/Utilities/NodeInstall/check-karma-grunt-config ~/bin/check-karma-grunt-config
```

This creates a symbolic link to the script in JsObjects. This way, when we update **JsObjects**, the "code" in **~/bin/FixtureReady** is automatically updated.


## Latest Check Karma

Whether you used **FixtureReady** or not, you should run **check-karma-grunt-config** to ensure that your project is set up correctly. In particular, run **git pull** on JsObjects and then run this command to ensure you have the latest code:

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


## Copy Unit Tests

Copy in the unit tests for this project:

cp $ELF_TEMPLATES/UnitTest/NaoExplorer/* spec/.


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
