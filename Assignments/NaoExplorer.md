## Nao Explorer

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