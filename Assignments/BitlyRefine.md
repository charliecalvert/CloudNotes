#BitlyRefine

This is the midterm. Your goal is to refine the BitlyProgram into something reasonably attractive and easy to use.

[![BitlyRefine][br01s]][br01]

[br01s]:https://s3.amazonaws.com/bucket01.elvenware.com/images/BitlyRefine01Small.png
[br01]:https://s3.amazonaws.com/bucket01.elvenware.com/images/BitlyRefine01.png

## Create Project

Copy Week06-BitlyInteractive into Week07-BitlyRefine

```
cp Week06-BitlyInteractive Week07-BitlyRefine
```

Update the project name to **BitlyRefine** in:

* bin/www
* routes/index.js
* package.json

**NOTE**: *I understand why you would want to work on a single project and keep updating it, but I want you to work one step at a time. I'm expecting to see three directories: **Week06-BitlyQuery**, **Week06-BitlyInteractive**, and **Week07-BitlyRefine**. Each folder should contain the proper code for their respective assignments.*

## Display Updates

Right now we have several methods that have to do with displaying the fields of a link object. These don't really belong in the main object found in **control.js**. Let's move then into their own file called display.

In particular, I'm talking about the methods called:

* display
* showRecord

I want you to rename **display** to **display.render**. The object you create should have at least this much in it:

* display.render
* display.showRecord
* display.renderTable
* display.showTableSelection

The latter two methods can be empty for now. So your code might look something like this:

```javascript
var elfDisplay={

    render: function () {
        'use strict';
        // VERY SIMILAR TO CODE FROM BitlyInteractive
    },

    renderTable: function(links) {
        'use strict';
        // CAN BE EMPTY FOR NOW
    },

    showRecord: function (bitlyLink) {
        'use strict';
        // VERY SIMILAR OR IDENTICAL TO CODE FROM BitlyInteractive
    },

    showTableSelection: function(event) {
        'use strict';
        // CAN BE EMPTY AT FIRST
    }

};
```

Don't forget that you need to load your new JavaScript files in **layout.jade**. In particular you will need to load **control.js**, **downloads.js**, **movement.js** and **display.js**:

```
script(src="javascripts/control.js")
script(src="javascripts/etc...
script(src="javascripts/etc...
script(src="javascripts/etc...
```

Don't forget to include the **downloads** module in the project. It was given to you in [bitly interactive][bid].

[bid]: http://www.ccalvert.net/books/CloudNotes/Assignments/BitlyInteractive.html#the-downloads-module

## Elf Unity

This is a refactoring issue. We want to take a halfway step to fixing the global namespace problem. Let's begin by making sure all our objects begin with the letters **elf**.

While you are doing the following, be sure you are running the unit tests. We are going to be changing variable names in multiple locations, and even when using Refactor in WebStorm, this can be complicated. As you make changes, run your unit tests and make sure they all pass. Also, check to make sure the interface works.

The refactor option in WebStorm can help with this process, but it can also make changes that you are not expecting. I think the unit tests are more help than the **refactor** option, but you may have a different opinion.

**NOTE**: *Make changes one at a time. If you attempt to make too many changes at once, you won't know what is broken. Make a change, confirm that it works, then make the next change.*

In particular, rename the main objects in your program as follows:

* elfBitly (This was **bitlyUrlParser** and is in **control.js**)
* elfMovement (**movement.js**)
* elfDisplay (**display.js**)
* elfDownloads (**downloads.js**)

We are not changing any file names, just the objects in the files.

Given these changes, we would call the **renderTable** method in **display.js** from a modified **getBlitlyLinks** method:

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


## CSS Updates

Create the **.elfDiv** class in styles.css

Set the border width in **styles.css**

Changes to elfInput, including moving to its own file.

Describe the elfDivFolder

Here is my current **public/stylesheets/style.css** file:

```
body {
  padding: 10px;
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
}

a {
  color: #00B7FF;
}


.elfDiv {
  max-width: 800px;
  border: ridge 1px black;
  margin: auto;
}

.scroller {
  height: 220px;
  overflow: auto;
}
```

Note that I have set the **padding** in the BODY tag to 10px rather than the default **50px** that we get by default in Express projects.

The **elfDiv** class ensures that the width of our panels is never larger than 800px, and that the panels are centered in the page. We center them by setting their margins to equivalent values: **margin:auto**.

The scroller class is used to help us scroll the table that we put inside a panel, as described elsewhere in this document.

## Creating a table

Our interface has a new section in it called **Bitly Links Table**. (See screen shot above.) Here are some hints on how to create it.

In **elfDisplay** fill in the **renderTable** method. In the code shown below, you will need to discover which fields of the **link** object you want to include to create results like that shown in the screenshot:

```javascript
    renderTable: function(links) {
        'use strict';
        $.each(links, function(index, link) {
            var title = "<td>" + WHAT GOES HERE? +  "</td>";
            var keyword = "<td>" + WHAT GOES HERE? + "</td>";
            var tableRowStart = "<tr class='linkTitle' index=" + index + ">";
            $("#tableLinks").append(tableRowStart + WHAT GOES HERE? + "<tr>");
        });
        $('.linkTitle').click(elfDisplay.showTableSelection);
    },
```

Notice that each <TR> has a class and custom attribute called **index** associated with it:

```javascript
var tableRowStart = "<tr class='linkTitle' index=" + index + ">";
```

The **jQuery** code at the bottom of the method ensures that if the user clicks on one of these rows, then the **elfDisplay.showTableSelection** method will be called:

```javascript
showTableSelection: function(event) {
    'use strict';
    var index = $(event.currentTarget).attr('index');
    var link = elfBitly.getLinkHistory(index, true);
    // CALL THE showRecord METHOD OF elfDisplay HERE.
}
```

This code requires a moment's study. Each <TR> element has an attribute called **index** that is set to the offset of that particular row in our **bitly-links.json** file. We can use that index to display the appropriate link object in our main form. All we need to do, is get ahold of the value of the **index** attribute for the row the user clicked. To do that, we use the jQuery **attr** property. Make sure you understand this code. It is important to understand how to work with attributes of your HTML elements.

Here is the updated **getLinkHistory** method:

```javascript
getLinkHistory: function(index, setLinkIndex) {
    'use strict';
    if (setLinkIndex) {
        elfBitly.linkIndex = parseInt(index);
    }
    return elfBitly.bitlyLinks.data.link_history[index];

},
```

As you can see, it is has been modified to ensure that we continue to track the currently selected item in the **linkIndex** property of **elfBitly**

Here is the Jade that we use to hold our table.

```
+elfPanel("Bitly Links Table").elfDiv
    div.scroller
        table.table#tableLinks
```

This jade and CSS **scroller** class found in **styles.css** ensure that our table has scroll bars and can be scrolled.

## Jade Mixins

Start dividing mixins into easy to comprehend files. When you are done, the top of **index.jade** might look something like this:

```
extends layout
include mixin-radios
include mixin-inputs
include mixin-buttons
```

Here are my **mixin-buttons.jade** file:

```
mixin forwardBack(leftFunction, rightFunction)
    button.btn.btn-success.btn-large(type='button', onclick= leftFunction)
       span.glyphicon.glyphicon-arrow-left
       | &nbsp; Left
    span &nbsp;
    button.btn.btn-success.btn-large(type='button', onclick= rightFunction)
       | Right &nbsp;
       span.glyphicon.glyphicon-arrow-right

mixin downloadButton(title, downloadFunction)
    button.btn.btn-primary(type='button', onclick= downloadFunction)
        | #{title} &nbsp;&nbsp;
        span.glyphicon.glyphicon-download

```

One could use them like this:

```
+forwardBack("elfMovement.left()", "elfMovement.right()")
+downloadButton("Get Bitly Data", "downloads.getBitlyData()")
```

I have also moved the input controls into their own file called **mixin-inputs.jade**:

```
// **************
// Vertical Input Controls
// **************

mixin elfInput(labelText, name, placeHolder)
   div
      label(for='subject') #{labelText}
      input(type='text', name=name, placeholder=placeHolder)&attributes(attributes)

mixin elfInputVB(labelText, name, placeHolder, labelType)
   - if (typeof attributes.buttonType === 'undefined') {
   -        attributes.buttonType="btn-default";
   - }

   div
      label.label.label-default(for='subject') #{labelText}
      input(type='text', name=name, placeholder=placeHolder)&attributes(attributes)


// **************
// Horizontal Input Controls
// **************
mixin elfInputA(labelText, name, placeHolder)
   div.row
      label.col-md-2.control-label(for='textinput') #{labelText}
      .col-md-8
         input.form-control.input-md(name=name, type='text', placeholder=placeholder)&attributes(attributes)

mixin elfInputB(labelText, name, placeHolder)
   div.row
      h4
         span.col-md-2.label.label-success #{labelText}
      .col-md-10
         input.form-control.input-md(name=name, type='text', placeholder=placeholder)&attributes(attributes)

mixin elfInputHorizontal(labelText, name, placeHolder)
   .form-group
      span.col-xs-2.label.label-success #{labelText}
      .col-xs-10
         input.form-control.input-sm(name=name, type='text', placeholder=placeholder)&attributes(attributes)
```

All this is in **$ELF_TEMPLATES**. Therefore the following code should get up to date, so long as you first ran **git pull** in JsObjects:

```bash
cp $ELF_TEMPLATES/JadeMixins/mixin-inputs.jade views/.
cp $ELF_TEMPLATES/JadeMixins/mixin-radios.jade views/.
cp $ELF_TEMPLATES/JadeMixins/mixin-buttons.jade views/.
```

Another way to handle this is with the file and directory comparison utility called **meld**. It is available in Pristine Lubuntu:

```
meld views/ $ELF_TEMPLATES/JadeMixins
```

**NOTE**: *I've never tried it, but there is some chance that [Midnight Commander][mc9] might work on Cloud9. Perhaps you can use it to do directory comparisons.*

To install midnight command: **sudo apt-get install mc**

[mc9]: http://linuxcommand.org/lc3_adv_mc.php

## Set up the Title

In **routes/index.js** create a new variable for use when Jade is rendered into HTML. You should, of course, use your own name:

```javascript
res.render('index', { title: 'Bitly-Refine', author: 'John von Neumann' });
```

Change the title to show the author:

```
    .jumbotron.elfDiv
        h1= title
        p by WHAT GOES HERE?
```
