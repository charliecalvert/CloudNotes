---
creationLocalTime: 5/30/2022, 10:14:46 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/jquery-guide/JQueryForms.md
relativePath: jquery-guide/JQueryForms.md
title: JQueryForms
queryPath: jquery-guide/
subject: jquery-guide
fileNameMarkdown: JQueryForms.md
fileNameHTML: JQueryForms.html
---


<!-- toc -->
<!-- tocstop -->

## jQuery Forms

There are three steps we need to take to properly handle forms:

- Declare the form in jade/html
- Create submit button
- Create a response handler for the submit button

To get started, we declare our HTML such that all the input controls are inside a form:

```html
<form id="target">
    <div class="panel panel-default">
        <div class="panel-heading">My Form Controls</div>
          <div class="panel-body">
            <div class="row">
                <div class="col-sm-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">Description</div>
                          <div class="panel-body"><p>Learn how to...
                            Fill in the input and push the
                            etc...
```

We declare a submit button:

```html
<button type="submit" class="btn btn-primary">Submit</button>
```

In **control.js**, in the document ready method, we put a jQuery **submit** handler:

```javascript
$("#target").submit(function(event) {
    event.preventDefault();
    var userFormData = $(this).serialize();
    $('#formResults').html(userFormData);
});
```
