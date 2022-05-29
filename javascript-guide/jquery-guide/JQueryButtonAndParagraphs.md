## jQuery Button and Paragraph Demo

The following is a "Hello World" style demo of jQuery basics. Let's
start with a very simple HTML file that links in jQuery and a custom
JavaScript file. The file called jquery.js is copy of the jQuery library
downloaded from the jQuery site. In its place you could also place
a CDN reference, as described above.

```html
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="utf-8" />
  <title>index</title>
  <script src="jquery.js"></script>
  <script src="index.js"></script>
 </head>

 <body>
  <p id="paragraph1"> </p>
  <button id="button1">Click Me</button>
 </body>
</html>
```

Here is the custom index.js file.

```javascript
function setParagraph() {
 $('#paragraph1').html('You clicked the button');
};

$(document).ready(function() {
 $('#button1').click(setParagraph);
});
```

The document ready event handler is called when the HTML file has
finished loading. It contains a jQuery call that says: "When the button
with the id **button1** is clicked call the **setParagraph** function."
The set paragraph function sets the text of the paragraph element with
id **paragraph1** to the text "You clicked the button."

It can take awhile to fully understand how and why this code works.
Explaining it in depth is the burden of other text found in this
document. However, as it stands, the code should represent something
of an introduction to how you can use jQuery to dynamically change
the contents of an HTML file.

## RadioButtons

jQuery makes it easy to work with **RadioButtons**. Consider the
following declaration, which gathers together three RadioButtons in a
single group called mainGroup. This ensures that selecting any one
button will deselected the other two in the group.

```html
<section id="mainGroups">
   <ul>
      <li><input type="radio" name="mainGroup" id="walk"><label for="walk">Walk</label></li>
      <li><input type="radio" name="mainGroup" id="drive"><label for="drive">Drive</label></li>
      <li><input type="radio" name="mainGroup" id="fly"><label for="fly">Fly</label></li>
   </ul>
</section>
```

The following code ensures that a JavaScript method called
**displayRadioButtonSelection** is called whenever a the user selects
one of the **RadioButtons** in the **mainGroup:**

```javascript
$(document).ready(function() {
  $("input[name=mainGroup]:radio").click(displayRadioButtonSelection)
});
```

This code specifies that it will select only input type RadioButtons
with the **name** set equal to **mainGroup.** This is not a simple
selector, but it is very precise, and very powerful. The **name** is
specified in square brackets, and the **type**, which in this case is
**radio**, appears after a colon. This jQuery selector then goes on to
state that it will call the **displayReadioButtonSelection** method
whenever one of the **RadioButtons**is selected:

```javascript
function displayRadioButtonSelection()
{
  var id = $("input[name=mainGroup]:checked").attr('id');
  alert(id)
}
```

Again, take a moment to study the syntax to select the **checked** item
from the **mainGroup**. It is not particularly easy to read, but it is
concise and very precise.

I have written an HTML/CSS RadioButton sample and put it in the
[Elvenware Mercurial
repository](http://www.elvenware.com/charlie/development/cloud/Mercurial.html).
It is in the HtmlCssJavaScript folder. I also moved the JQuerySelectors
examples into that folder.