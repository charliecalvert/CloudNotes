## Overview


## WebPack

In **webpack.config.js** add a new property:

```
devtool: "source-map"
```

At runtime, look for a folder in the **source** page for the Chrome Dev Tools that says **webpack**. You have to click around a bit to find your **source** folder, but once you have it, you can set breakpoints and inspect.

And lets add the ability to run webpack automatically when we update one of our ES6 files. Modify the **bundle** property in **package.json**. (It may be called something else on your system, such as **bundle**. The key thing is to change the property that runs webpack.)

```javascript
"buildDev": "node_modules/.bin/webpack --watch"
```

This won't refresh the page automatically, but it will run **webpack**. Then you can press F5 in the browser to refresh.

## Insert React in MakeHtml {#react-in-make-html}

Add this method to **public/javascripts/make-html/make-html.js**:

```javascript
function publishRectMakeHtml() {
    $.publish('reactMakeHtml', {
        message : "Publisher Constructor Called"
    });
}
```

In the same file, make sure it gets called when **makeHtml** is displayed:

```javascript
return {
    init: function() {
        $('#pageLoad').load('/makers/makeHtml', function() {
            $('#loadConfig').click(loadConfig);
            $('#walk').click(walk);
            $('#walktype').change(function() {
                radioWalkType = $('input[name=walktype]:checked').attr('id');
            });
            walking.configurePageOne();
            loadConfig();
            publishRectMakeHtml(); <=== HERE
        });
    }
};
```
