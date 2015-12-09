## Nao Explorer

Start with this command:

	CreateExpressProject Week10-NaoExplorer

Then navigate into that directory and run:

	TestReady

Then open your project in WebStorm.

If you don't have TestReady:

cp $JSOBJECTS/Utilities/NodeInstall/TestReady ~/bin/.

Download a [copy of the source][naoexp] from Google Drive.

[naoexp]:https://drive.google.com/file/d/0B25UTAlOfPRGZzg3NkQtV2h3U3c/view?usp=sharing

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
ln -s $ELF_TEMPLATES/UnitTest/FixtureReady ~/bin/.
```


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

## Logging

In **elf-log.js**:

```javascript
(function() {

    'use strict';

    function ElfLog() {
        this.debugLevel = this.logLevelWarn;
    }

    //var levels = ['error', 'warn', 'info', 'silent'];
    var that;


    ElfLog.prototype.logLevelError = 0;
    ElfLog.prototype.logLevelWarn = 1;
    ElfLog.prototype.logLevelDetails = 2;
    ElfLog.prototype.logLevelInfo = 3;
    ElfLog.prototype.logLevelSilent = 4;

    ElfLog.prototype.debugLevel = undefined;

    ElfLog.prototype.setLevel = function(level) {
        this.debugLevel = level;
    };

    ElfLog.prototype.log = function(level, message) {
        // console.log("Level:", level, 'debugLevel: ', this.debugLevel);
        if (level >= this.debugLevel) {
            if (typeof message !== 'string') {
                message = JSON.stringify(message);
            }
            console.log(level+': '+message);
        }
    };

    that = new ElfLog();
    window.elfLog = that;
})();
```

## Sample Data from Nao

I saved this as **responses.js**:

```javascripts
var responses = {
    network: {
        'status': 200,
        'result': [
            '[I] 10222 qimessaging.session: Session listener created on tcp://0.0.0.0:0',
            '[I] 10222 qimessaging.transportserver: TransportServer will listen on: tcp://192.168.2.13:38884',
            '[I] 10222 qimessaging.transportserver: TransportServer will listen on: tcp://127.0.0.1:38884',
            '[I] 10222 qimessaging.transportserver: TransportServer will listen on: tcp://192.168.42.16:38884',
            'network state: online',
            'elfap wifi_bc307d749827_656c666170_managed_psk',
            'ElvenKnight wifi_bc307d749827_456c76656e4b6e69676874_managed_psk',
            'xfinitywifi wifi_bc307d749827_7866696e69747977696669_managed_none',
            'HOME-D902 wifi_bc307d749827_484f4d452d44393032_managed_psk',
            'ElvenBishop wifi_bc307d749827_456c76656e426973686f70_managed_psk',
            'DIRECT-DA-HP Officejet 5740 wifi_bc307d749827_444952454356a65742035373430_managed_psk'
        ]
    },

    transportResult01: {
        'status': 200,
        'result': [
            '[I] 8901 qimessaging.session: Session listener created on tcp://0.0.0.0:0',
            '[I] 8901 qimessaging.transportserver: TransportServer will listen on: tcp://192.168.2.13:43749',
            '[I] 8901 qimessaging.transportserver: TransportServer will listen on: tcp://127.0.0.1:43749',
            '[I] 8901 qimessaging.transportserver: TransportServer will listen on: tcp://192.168.42.16:43749'
        ]
    },

    transportResult02: {
        'status': 200,
        'result': [
            '[I] 10299 qimessaging.session: Session listener created on tcp://0.0.0.0:0',
            '[I] 10299 qimessaging.transportserver: TransportServer will listen on: tcp://127.0.0.1:45481',
            '[I] 10299 qimessaging.transportserver: TransportServer will listen on: tcp://192.168.42.11:45481'
        ]
    }
};
```

## Parse Behaviors

This is **parse-behavior.js**:

```javascript
var ElfParseBehaviors = (function() {

    'use strict';

    var behaviors;
    var that;

    ParseBehaviors.prototype.infoCount = 0;

    function ParseBehaviors(behaviorsInit) {
        behaviors = behaviorsInit;
        that = this;
    }

    var getInfoCount = function() {
        elfLog.log(elfLog.logLevelDetails, 'ParseBehaviors.getInfoCount called');
        var count = 0;
        $.each(behaviors.result, function(index, item) {
            // console.log(typeof item);
            if (item.indexOf('[I]') !== -1) {
                count++;
            }
        });
        that.infoCount = count;
        return count;
    };

    ParseBehaviors.prototype.getBehaviors = function() {
        elfLog.log(elfLog.logLevelDetails, 'ParseBehaviors.getBehaviors called');
        var infoCount = getInfoCount(behaviors.result);
        return JSON.parse(elfBehaviors.result[infoCount]);
    };

    ParseBehaviors.prototype.getBehaviorsAsArray = function() {
        elfLog.log(elfLog.logLevelDetails, 'ParseBehaviors.getBehaviorAsArray called');
        var b = this.getBehaviors();
        var arrayOfBehaviorArrays = [];
        $.each(b, function(index, value) {
            var behaviorArray = value.split('/');
            arrayOfBehaviorArrays.push(behaviorArray);
        });
        return arrayOfBehaviorArrays;
    };

    function isNotInArray(value, valueArray) {
        return (valueArray.indexOf(value) === -1);
    }

    ParseBehaviors.prototype.getAnimationTypes = function() {
        elfLog.log(elfLog.logLevelDetails, 'ParseBehaviors.getAnimationTypes called');
        var b = this.getBehaviorsAsArray();
        var animationTypes = [];
        $.each(b, function(index, valueArray) {
            var value = valueArray[1];
            if (valueArray[0] === 'animations' && isNotInArray(value, animationTypes)) {
                animationTypes.push(value);
            }
        });
        return animationTypes;
    };

    /* ParseBehaviors.prototype.getAnimationTypes = function() {
        var b = this.getBehaviorsAsArray();
        var animationTypes = [];
        $.each(b, function (index, valueArray) {
            var value = valueArray[1];
            if (valueArray[0] === 'animations' && isNotInArray(value, animationTypes)) {
                animationTypes.push(value);
            }
        });
        return animationTypes;
    }; */

    ParseBehaviors.prototype.getAnimationCategoryFromType = function(type) {
        elfLog.log(elfLog.logLevelDetails, 'ParseBehaviors.getAnimationCategoryFromType called');
        var b = this.getBehaviorsAsArray();
        var animationCategories = [];
        $.each(b, function(index, valueArray) {
            var value = valueArray[2];
            if (valueArray[0] === 'animations' && valueArray[1] === type && isNotInArray(value, animationCategories)) {
                animationCategories.push(value);
            }
        });
        return animationCategories;
    };

    ParseBehaviors.prototype.getAnimationActions = function(type, category) {
        elfLog.log(elfLog.logLevelDetails, 'ParseBehaviors.getAnimationActions called');
        var b = this.getBehaviorsAsArray();
        var animationActions = [];
        $.each(b, function(index, valueArray) {
            var value = valueArray[3];
            if (valueArray[0] === 'animations' &&
                valueArray[1] === type &&
                valueArray[2] === category &&
                isNotInArray(value, animationActions)) {
                animationActions.push(value);
            }
        });
        return animationActions;
    };

    ParseBehaviors.prototype.getAnimations = function() {
        elfLog.log(elfLog.logLevelDetails, 'ParseBehaviors.getAnimations called');
        var b = this.getBehaviors();
        var singleBehavior;
        $.each(b, function(index, value) {
            // singleBehavior = index + ': ' + value.split('/') + '\n';
            singleBehavior = index + ': [' + value.split('/') + ']\n';
            console.log(singleBehavior);
            $('#robotResult').append(singleBehavior);
        });
    };

    return ParseBehaviors;

})();
```

## The Robot

```javascript

var ElfParseBehaviors = (function() {

    'use strict';

    var behaviors;
    var that;

    ParseBehaviors.prototype.infoCount = 0;

    function ParseBehaviors(behaviorsInit) {
        behaviors = behaviorsInit;
        that = this;
    }

    var getInfoCount = function() {
        elfLog.log(elfLog.logLevelDetails, 'ParseBehaviors.getInfoCount called');
        var count = 0;
        $.each(behaviors.result, function(index, item) {
            // console.log(typeof item);
            if (item.indexOf('[I]') !== -1) {
                count++;
            }
        });
        that.infoCount = count;
        return count;
    };

    ParseBehaviors.prototype.getBehaviors = function() {
        elfLog.log(elfLog.logLevelDetails, 'ParseBehaviors.getBehaviors called');
        var infoCount = getInfoCount(behaviors.result);
        return JSON.parse(elfBehaviors.result[infoCount]);
    };

    ParseBehaviors.prototype.getBehaviorsAsArray = function() {
        elfLog.log(elfLog.logLevelDetails, 'ParseBehaviors.getBehaviorAsArray called');
        var b = this.getBehaviors();
        var arrayOfBehaviorArrays = [];
        $.each(b, function(index, value) {
            var behaviorArray = value.split('/');
            arrayOfBehaviorArrays.push(behaviorArray);
        });
        return arrayOfBehaviorArrays;
    };

    function isNotInArray(value, valueArray) {
        return (valueArray.indexOf(value) === -1);
    }

    ParseBehaviors.prototype.getAnimationTypes = function() {
        elfLog.log(elfLog.logLevelDetails, 'ParseBehaviors.getAnimationTypes called');
        var b = this.getBehaviorsAsArray();
        var animationTypes = [];
        $.each(b, function(index, valueArray) {
            var value = valueArray[1];
            if (valueArray[0] === 'animations' && isNotInArray(value, animationTypes)) {
                animationTypes.push(value);
            }
        });
        return animationTypes;
    };

    /* ParseBehaviors.prototype.getAnimationTypes = function() {
        var b = this.getBehaviorsAsArray();
        var animationTypes = [];
        $.each(b, function (index, valueArray) {
            var value = valueArray[1];
            if (valueArray[0] === 'animations' && isNotInArray(value, animationTypes)) {
                animationTypes.push(value);
            }
        });
        return animationTypes;
    }; */

    ParseBehaviors.prototype.getAnimationCategoryFromType = function(type) {
        elfLog.log(elfLog.logLevelDetails, 'ParseBehaviors.getAnimationCategoryFromType called');
        var b = this.getBehaviorsAsArray();
        var animationCategories = [];
        $.each(b, function(index, valueArray) {
            var value = valueArray[2];
            if (valueArray[0] === 'animations' && valueArray[1] === type && isNotInArray(value, animationCategories)) {
                animationCategories.push(value);
            }
        });
        return animationCategories;
    };

    ParseBehaviors.prototype.getAnimationActions = function(type, category) {
        elfLog.log(elfLog.logLevelDetails, 'ParseBehaviors.getAnimationActions called');
        var b = this.getBehaviorsAsArray();
        var animationActions = [];
        $.each(b, function(index, valueArray) {
            var value = valueArray[3];
            if (valueArray[0] === 'animations' &&
                valueArray[1] === type &&
                valueArray[2] === category &&
                isNotInArray(value, animationActions)) {
                animationActions.push(value);
            }
        });
        return animationActions;
    };

    ParseBehaviors.prototype.getAnimations = function() {
        elfLog.log(elfLog.logLevelDetails, 'ParseBehaviors.getAnimations called');
        var b = this.getBehaviors();
        var singleBehavior;
        $.each(b, function(index, value) {
            // singleBehavior = index + ': ' + value.split('/') + '\n';
            singleBehavior = index + ': [' + value.split('/') + ']\n';
            console.log(singleBehavior);
            $('#robotResult').append(singleBehavior);
        });
    };

    return ParseBehaviors;

})();
```

## Launcher and Control

```javascript
$(document).ready(function() {
    'use strict';
    elfControl.initialize();
});
```

And control:

```javascript
var elfControl = {
    initialize: function() {
        'use strict';

        elfLog.setLevel(elfLog.logLevelDetails);

        $('#leftArm').click(elfArm.armServerCall);

        $('#behaviors').click(function(event) {
            elfRobot.callingRobot();
            $.getJSON('/behaviors', function(result, status, details) {
                elfDisplay.clear();
                elfDisplay.appendRobotResult(JSON.stringify(result, null, 4));
            }).fail(function() {
                console.log('error');
            });
        });

        $('#parse').click(elfRobot.parseBehaviors);
        $('#getAnimationCount').click(elfRobot.getAnimationCount);
        $('#showAllObjects').click(elfRobot.showAllObjects);
        $('#getAnimationTypes').click(elfRobot.getAnimationTypes);
        $('#getAnimationCategoryFromType').click(elfRobot.getAnimationCategoryFromType);
        $('#getAnimationActions').click(elfRobot.getAnimationActions);
        $('#network').click(function(event) {
            elfRobot.callingRobot();
            elfRobot.basicServerCall('/network');
        });
    }
};
```

## Display

In **display.js**:

```javascript
var elfDisplay = {

    appendRobotResult: function(value) {
        'use strict';
        $('#robotResult').append(value + '\n');
    },

    clear: function() {
        'use strict';
        $('#robotResult').empty();
    }
};
```

## Turn it in

For now, just make sure that you have:

- Created the files described above
- Gotten all the tests in test_fixture.js to work

We will work more on this project, and more on updating the midterm, during class on Tuesday and Thursday.

As always, make sure everything comes back clean when you run **grunt check**.

## Hint

The main goal here is to get the Jade right. My thought was that these tests give you enough of a hint as to what the jade needed to look like that you should be able to figure the jade out, to reverse engineer it, as it were.
