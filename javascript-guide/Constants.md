---
fullPath: /home/ubuntu/Git/CloudNotes/javascript-guide/Constants.md
relativePath: javascript-guide/Constants.md
title: Constants
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
subject: JavaScript
fileNameMarkdown: Constants.md
fileNameHTML: Constants.html
queryPath: javascript-guide/
image: ./course/course-javascript.jpg
---

<!-- toc -->
<!-- tocstop -->

# Learn about Constants

See how to use Object.defineProperty to create a constant in ES5 code. This was technique still works, but it was designed before the ES6 keyword **const** was introduced into the language. It is harder to use than ES6 **const**, but it does more exactly what a traveler from another language would expect a **const** variable to do.

## The Code

We declare constants in an object that follows the module pattern like this:

```javascript
var App = (function() {

 function Constants() {
  Object.defineProperty(this, "MAIN_BIG", withValue('mainBig'));
  Object.defineProperty(this, "MAIN_SMALL", withValue('mainSmall'));
  Object.defineProperty(this, "MAIN_DIV", withValue('#main'));
 }

 var withValue = function(value) {
  var d = withValue.d || (withValue.d = {
   enumerable : false,
   writable : false,
   configurable : false,
   value : null
  });

  d.value = value;
  return d;
 }

 return Constants;
})();
```

## Display Constants

Display the constants like this

```javascript
var app = new App();
$('#test01').html(app.MAIN_BIG);
$('#test02').html(app.MAIN_SMALL);
$('#test03').html(app.MAIN_DIV);</pre>
```

Create some paragraphs or a list with the appropriate IDs.

```html
<ul>
  <li><b>MAIN BIG</b>: <span id="test01"></span> </li>
  <li><b>MAIN SMALL</b>:  <span id="test02"></span></li>
  <li><b>MAIN DIV</b>:  <span id="test03"></span></li>
</ul>
```

The results of the code shown above:

```html
<ul>
  <li><b>MAIN BIG</b>: <span id="test01"></span> </li>
  <li><b>MAIN SMALL</b>:  <span id="test02"></span></li>
  <li><b>MAIN DIV</b>:  <span id="test03"></span></li>
</ul>
```

## Try to Change Constant

Now let's try to change a constant by setting it equal to a new value:

```javascript
app.MAIN_DIV = "Some new value";
```

Check the value of the MAIN_DIV after setting it to a new value. It is unchanged:

```javascript
<script>
var App = (function() {

 function Constants() {
  Object.defineProperty(this, "MAIN_BIG", withValue('mainBig'));
  Object.defineProperty(this, "MAIN_SMALL", withValue('mainSmall'));
  Object.defineProperty(this, "MAIN_DIV", withValue('#main'));
 }

 var withValue = function(value) {
  var d = withValue.d || (withValue.d = {
   enumerable : false,
   writable : false,
   configurable : false,
   value : null
  });

  d.value = value;
  return d;
 }

 return Constants;
})();

var app = new App();
$('#test01').html(app.MAIN_BIG);
$('#test02').html(app.MAIN_SMALL);
$('#test03').html(app.MAIN_DIV);
app.MAIN_DIV = 'Bar';
$('#test04').html(app.MAIN_DIV);

</script>
```
