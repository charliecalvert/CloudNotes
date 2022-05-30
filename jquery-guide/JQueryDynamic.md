## Dynamically Changing a Page with jQuery Part I

You can use jQuery to change many of the elements of a page on the fly.
In this section, I provide examples of various ways to do this.

To get started, consider a very simple HTML page with three buttons on
it labeled Red, Green and Blue. When you click one of the buttons, the
following jQuery based JavaScript code is called:

```javascript
function setBackground(value)
{
    if (value === 1) {
        $("body").css({ backgroundColor: "red", color: "yellow" });
    } else if (value === 2) {
        $("body").css({ backgroundColor: "green", color: "black" });
    } else {
        $("body").css({ backgroundColor: "blue", color: "yellow" });
    }
}
```

This code changes use jQuery to select the **body** tag for the current
page and set its background and text color using css. Here is a link to
a sample page demonstrating how this works:

- [JQueryBackgroundMorph.html](JQueryBackgroundMorph.html)

## Dynamically Changing a Page with jQuery Part II

Below you will find a link to a more complex example of a set of similar
jQuery tools. Try clicking on some of the buttons and examing the code to
get a sense of how it works. Some of the buttons will change all the text
found on the linked page, just as the buttons in the previous example
changed the background color for an entire page. Don't forget that you can
view the source for the linked page, and for the JavaScript file, by right
clicking and choosing "View Source" or some similar option.

- [jQuerySelectors Example](/javascripts/dev-web/JQuerySelectors.html)

Here are the methods called when the buttons above are clicked:

- html()
- css()
- each()
- remove()
- after()
- replaceWith()
- addClass()
- removeClass()
- val()

```javascript
this.ModifyHeader = function()
{
  $("#testHeader").css({ backgroundColor: "blue",
    color: "yellow",
    border: "double black thick" });
}

this.SetH1 = function()
{
  $("#testHeader").html("New Dynamic Header Text");
}

this.AddPar = function()
{
  $("#testHeader").after("<p class='attention'>New P tag inserted with this text</p>");
}

this.ReplaceParsWithH2 = function()
{
  $("p").each(function() {
    p = $(this);
    p.replaceWith("<h2 class='switchMeBack'>" + p.html() + "</h2>");
  });
}

this.ReplaceSwitchMeBackWithPars = function()
{
  $(".switchMeBack").each(function() {
    p = $(this);
    p.replaceWith("<p class='attention'>" + p.html() + "</p>");
  });
}

this.MovePars = function()
{
  var data = $("#a").html();
  $("#a").remove();
  $("#b").addClass('attention');
  $("#b").after("<p id='a' class='attention'>" + data + "</p>");
}

this.MovePars02 = function()
{
  var data = $("#b").html();
  $("#b").remove();
  $("#a").after("<p id='b' class='attention'>" + data + "</p>");
}

this.ApplyClassToPars = function()
{
  $("p").addClass("able");
}

this.RemoveAbleClass = function()
{
  $(".able").removeClass("able");
}

this.HiLite = function()
{
  $("#a").addClass("attention");
}

this.RemoveHiLite = function()
{
  $(".attention").removeClass("attention");
}
```

## Form Test

This exercise shows how to use Forms:

- [Forms Test](/javascript-guide/FormTest.html)

## Dynamically Add Data to a Table

Click here to see an example where you can click a button to add structured
data to a table.javascripthtml

[Dynamically Add Data to a Table](/javascripts/dev-web/JQuerySelectors.html#dynamically-add-data-to-a-table)

To make this work, first embed an empty table element into a document. I
have, for instance, embedded one like this in this document:

```html
<table id="structuredTable"><table>
```

Then create a button like the one above so the user has something to
click when items are to be added to the table. Here is what the code for
the button shown above looks like:

```html
<input type="button" value="Add Data" onclick="jQueryTests.addStructuredData()" />
```

The method that gets called when the button is pressed can be placed in
a separate JavaScript file that might look, in part, something like
this:

```javascript
var jQueryTests = new JQueryTests();

function JQueryTests()
{
    this.addStructuredData = function()
    {
        var a = "foo";
        var b = "bar";

        data = "<tr><td>" + a + "</td>" + "<td>" + b + "</td></tr>";
        $("#structuredTable").append(data);
    }
}
```

Each time the button is pressed a new element with this structure
**\<tr\>\<td\>some string\</td\>\<td\>some string\</td\>\</tr\>** is
added to the **\#structuredTable**.

