# Week06-BitlyInteractive

by Charlie Calvert

## Links

* [Forms][forms]
* [Jade Code][jade-code]
* [Learn-Layout][learn-layout]

[forms]: http://www.tutorialrepublic.com/twitter-bootstrap-tutorial/bootstrap-forms.php
[jade-code]: https://github.com/jadejs/jade/issues/1248
[learn-layout]: http://learnlayout.com/position-example.html

## Source in Separate Files {#separate-files}

You should create three files called:

- downloads.js
- movements.js
- control.js

Then be sure to load each of them in **layout.jade**:

```jade
doctype html
html
  head
    meta(charset='UTF-8')
    meta(name='viewport', content='width=device-width')
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    link(rel='stylesheet', href='/components/bootstrap/dist/css/bootstrap.css')
    script(src="components/jquery/dist/jquery.js")
    script(src="components/bootstrap/dist/js/bootstrap.js")
    script(src="javascripts/control.js")
    script(src="javascripts/downloads.js")
    script(src="javascripts/movement.js")
  body
    block content
```

## Switching Sources {#Switch Source}

We have two buttons that allow us to switch between the local and remote data.

As Jade:

```jade
div.col-sm-6
    +elfRadioPanel("Radio Buttons", "dataSource")
        +elfRadio("Local Data", "localData")
        +elfRadio("Cloud Data", "cloudData")
```

As HTML:

```xml
<div role="group">
    <div class="radio">
        <label for="#radioButtonDisplay01">
            <input type="radio" name="radio"
                   value="#radioButtonDisplay01"
                   id="#radioButtonDisplay01">
            <strong>Local Data</strong></label>
    </div>
    <div class="radio">
        <label for="#radioButtonDisplay02">
            <input type="radio" name="radio"
                   value="#radioButtonDisplay02"
                   id="#radioButtonDisplay02">
            <strong>Cloud Data</strong></label>
    </div>
</div>
```

If you select one of the radio buttons, the following code gets called in **downloads.js**:

```javascript
downloads.dataTypes = ['dtLocal', 'dtCloud'];

downloads.dataType = downloads.dataTypes[0];

downloads.dataTypeSelection = function() {
    'use strict';
    if ($('#localData').is(':checked')) {
        $('#radioButtonDisplay01').html('You clicked localData ');
        downloads.dataType = downloads.dataTypes[0];
    } else {
        $('#radioButtonDisplay01').html('You clicked cloudData ');
        downloads.dataType = downloads.dataTypes[1];
    }
};
```

Recall that the **dataTypeSelection** method won't get called unless you hook it up to your **radio** buttons:

```javascript
$('#dataSource').click(downloads.dataTypeSelection);
```

This bit of **jquery** belongs in the **document ready** callback in **control.js**.

It sets the data type to either **dtLocal** or **dtCloud**. When the user clicks the button to download the data, the following code gets called:

```javascript
downloads.getBitlyData = function() {
    'use strict';
    if (this.dataType === this.dataTypes[0]) {
        console.log('getBitlyData called: ', this.dataTypes[0]);
        bitlyUrlParser.getBitlyLinks(-1);
    } else if (this.dataType === this.dataTypes[1]) {
        console.log('getBitlyData called: ', this.dataTypes[1]);
        bitlyUrlParser.getBitlyLinks(downloads.accessToken);
    }
};
```

If the **dataType** is set to **dtLocal** then we call **getBitlyLinks** with **-1**:

```javascript
bitlyUrlParser.getBitlyLinks(-1);
if (this.dataType === this.dataTypes[0]) {
```

Otherwise we call it with our **accessToken** from the Bitly site:

```javascript
bitlyUrlParser.getBitlyLinks(downloads.accessToken);
```

In **control.js** we form the URL our download based on the argument passed to us:

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

If the argument is **-1** then we get the local URL pointing to the copy of our JSON file which is in the **data** directory. Otherwise we compose a URL that points at the Bitly cloud service.

## Improved Switch Source {#switch-source-improved}

My code shown in the previous section was flawed because I was using **magic numbers**. In the uses, the word magic has negative connotations. When we talk about **magic numbers** we are referring to numbers in our code that have no inherent meaning, no semantic value. They are just numbers that can only be understood by studying the code. But ideally, the person who maintains our code should not have to study our code to understand it. They should be able to just read it.

In particular, there are places in my code where I was writing things like:

```javascript
    if (accessToken === -1) {
```

The values **-1** and **0** have no semantic value. They are just numbers which *magically* mean things like **get the local file** or *index* into the array to get the local or cloud value.

The following changes replace my magic numbers with meaningful variables that have semantic value. In **downloads.js**, here are two updated properties and two updated methods:

```javascript
downloads.dataTypes = {"dtLocal": 0, "dtCloud": 1};

downloads.dataType = downloads.dataTypes.dtLocal;

downloads.dataTypeSelection = function() {
    'use strict';
    if ($('#localData').is(':checked')) {
        $('#radioButtonDisplay01').html('You clicked localData ');
        downloads.dataType = downloads.dataTypes.dtLocal;
    } else {
        $('#radioButtonDisplay01').html('You clicked cloudData ');
        downloads.dataType = downloads.dataTypes.dtCloud;
    }
};

downloads.getBitlyData = function() {
    'use strict';
    console.log('getBitlyData called: ', Object.keys[downloads.dataType]);
    bitlyUrlParser.getBitlyLinks(downloads.dataType);
};
```

Notice the improvement. Before I wrote:

```javascript
downloads.dataType = downloads.dataTypes[0];
```

This code is flawed because it contains a magic number. What does the value **0** mean? It has no obvious semantic value. You have to study the code to discern its meaning. Now I write:

```javascript
downloads.dataType = downloads.dataTypes.dtLocal;
````

The property of **dataTypes** called **dtLocal** is much easier to understand than a **magic number** like **0** or **1**.

And here are the changes to control.js. Near the top>

```javascript

    getUrl: function(accessToken) {
        'use strict';

        var cloudBaseUrl = 'https://api-ssl.bitly.com/v3/user/link_history';
        var cloudParams = '?access_token=';
        var localUrl = 'data/bitly-links.json';

        if (accessToken === downloads.dataTypes.dtLocal) {
            return localUrl;
        } else {
            return baseUrl + params + downloads.accessToken;
        }
    },
```

And near the bottom:

```javascript
$(document).ready(function() {
    'use strict';
    $('#localData').prop('checked', true);
    bitlyUrlParser.getBitlyLinks(downloads.dataTypes.dtLocal);
    $('#dataSource').click(downloads.dataTypeSelection);
});
```

Notice improvement. Before I wrote:

```javascript
if (accessToken === -1) {
    return 'data/bitly-links.json';
} else {
    var url = baseUrl + params;
    return url += accessToken;
}
```

What the heck does **-1** mean? That number has no inherent semantic value. Now I write:

```javascript
if (accessToken === downloads.dataTypes.dtLocal) {
    return localUrl;
} else {
    return baseUrl + params + downloads.accessToken;
}
```

Instead of **-1**, we have **dtLocal**, which is much easier to understand.

**NOTE**: *Nearly everyone writes careless code like the code in my original version of the assignment. The point is not that we never write bad code, but that we take the time to go over our code and clean up the ugly parts.*

## Fav-Icon Missing - 404 {#icon-missing}

Sometimes, on startup, you get an error about your favorite icon missing. I believe the **CreateExpressProject** script will put a 32 X 32 image file called called **favicon.png** in your **public** directory. You need to open **app.js**. Around line 17 you will find this code:

```javascript
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
```

Uncomment the second line and change **favicon.ico** to **favicon.png**.

```javascript
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
```

Now the error should go away. You can use any image editor you want to modify the **favicon.png** file. On Linux, the tool of choice is called **gimp**, but simpler tools will probably a do simple job like this just as well.

## Careful in package.json {#package-start}

One student made an interesting mistake in their **package.json**. They copied the **package.json** file from **Week04-JavaScriptObjects**:

```javascript
{
    "name": "week06-BitlyInteractive",
    "version": "1.0.0",
    "description": "\"Learn about jscs and grunt\"",
    "main": "work.js",
    "scripts": {
        "start": "nodemon work.js",
        "test": "grunt test"
    },
    etc...
```

In and of itself, that is a reasonable thing to do. However, they failed to see that **nodemon work.js** is correct for the JavaScriptObjects project, but not for this project. It should be:

	nodemon bin/www

## Iterating Past the End of the Array {#iterate}

Don't allow your buttons to iterate past the end of your array. Here is one way to check for that condition in **movement.js**:

```javascript
    right: function() {
        'use strict';
        var history = bitlyUrlParser.getLinkHistoryArray();
        if (bitlyUrlParser.linkIndex < (history.length - 1)) {
            bitlyUrlParser.linkIndex += 1;
            bitlyUrlParser.display();
        }
    }
```

And here is **getLinkHistoryArray**:

```javascript
getLinkHistoryArray: function() {
    'use strict';
    return bitlyUrlParser.bitlyLinks.data.link_history;
},
```
