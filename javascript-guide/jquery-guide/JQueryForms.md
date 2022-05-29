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
