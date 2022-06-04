---
creationLocalTime: 5/30/2022, 11:23:19 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/jquery-guide/JQuerySelectors.md
relativePath: jquery-guide/JQuerySelectors.md
title: JQuerySelectors
queryPath: jquery-guide/
subject: jquery-guide
fileNameMarkdown: JQuerySelectors.md
fileNameHTML: JQuerySelectors.html
---


<!-- toc -->
<!-- tocstop -->

## Selectors and jQuery

CSS selectors are a topic that you must understand before you can work
with jQuery. Here is page that covers the basics regarding selectors:

- [BasicSyntax.html](/development/web/CssGuide/BasicSyntax.html)

You should also visit this page on jQuery selectors:

[http://api.jquery.com/category/selectors/](http://api.jquery.com/category/selectors/)

## Experimenting with jQuery Selectors

The many examples found on this page demonstrate a number of ways to use
[selectors](http://api.jquery.com/category/selectors/) in jQuery to
match one or more elements in an HTML document, and then perform an
operation on those elements. The jQuery selectors are based on CSS
selectors that you would use in a CSS file.

There are many different ways to use selectors in jQuery, but perhaps
the most common are these selectors:

- [class](http://api.jquery.com/class-selector/),
- [ID](http://api.jquery.com/id-selector/) and
- [element](http://api.jquery.com/element-selector/)

Here is a way to think about them:

| --------------- | -------------------------- | -----------
| Selector Type   | jQuery Example             | HTML Example
| --------------- | -------------------------- | ----------
| class           | $(.myClass).someMethod()   | <p class="myClass"\>
| id              | $("\#myId").someMethod()   | <p id="myId"\>
| element         | $("p").someMethod()        | <p\>
| --------------- | -------------------------- | --------------

The class selector shown here would find all the elements in the
document that have a class set equal to **myClass.**The **id** selector
would find the single element with the specified id, and the element
selector would find all the **\<p\>** elements in the document.

It is important to understand that these are only the three most common
of the many types of selectors used by jQuery. To see a somewhat more
complicated example, study the **[RadioButton](#radioButtons)** section
found in this document.

## jQuery Attribute Selectors

Look at this selector:

```html
"input[name=mainGroup]:radio"
```

For instance, it might be used like this to select all the radiobuttons
with a name of **mainGroup**:

```html
$("input[name=mainGroup]:radio").click(app.displayRadioButtonSelection);
```

Here is a radio button that would be selected with the given selector:

```html
<input type="radio" name="mainGroup" id="rbPage01">
```

The **[name=mainGroup]** part follows the jQuery [attribute =
"value"](http://api.jquery.com/attribute-equals-selector/) selector
pattern. You first give then name of an attribute, and then write the
value for the attribute. For instance, the tag shown above has an
attribute called **name**, and its value is **"mainGroup"**.

The :**radio** part of the selector follows the jQuery radio selector
pattern. For instance, the follow selects all the radio buttons in a
document:

```html
$(':radio')
```

It is a shorthand way of writing \$(type='radio'). It is recommended
that you limit the scope of the selection by specifying the tag you want
to use:

```html
$("input:radio")
```

If you combine the attribute = value and the radio selector pattern, you
can create very precise selectors like the one we are using in our
primary example for this section:

```javascript
$("input[name=mainGroup]:radio")
```

Here we ask for all the **input** controls of type **radio** with an
attribute called **name** set to the value **mainGroup**.

## The jQuery API

Once you have used a selector to select one or more elements from an
HTML document, what kind of operations can you perform on the element
you have selected?

The best single list I have found is from the jQuery documentation:

[http://api.jquery.com/](http://api.jquery.com/)

There is a raw API dump for those with an adventuresome turn of mind:

[http://api.jquery.com/api/](http://api.jquery.com/api/)

The code shown in the remainder of this document demonstrate at least a
few of the key methods most commonly used by beginners to jQuery.