# Boostrap-Basics

Various comments on this program.

[![Bootstrap][bsbs]][bsb]

**BootstrapBasics**: *Click the image to enlarge it.*

[bsb]: https://s3.amazonaws.com/bucket01.elvenware.com/images/BootstrapBasics01.png
[bsbs]: https://s3.amazonaws.com/bucket01.elvenware.com/images/BootstrapBasics01Small.png


## Form Submit

There are three steps we need to take to properly handle forms:

- Declare the form in jade/html
- Create submit button
- Create a response handler for the submit button

To get started, we declare our HTML such that all the input controls are inside a form:

```xml
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

```xml
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

## The Two Buttons

Note that we have two buttons in this project:

```
<button type="submit" class="btn btn-primary">Submit</button>
<button type="button" onclick="search()" class="btn btn-success">Search</button>
```

The Jade looks like this:

```
button.btn.btn-primary(type="submit") Submit
button.btn.btn-success(type="button", onclick='search()') Search
```

One button is labeled **Submit** and the other **Search**. One is of type **submit** the other of type **button**.

By default a button will be of type of **submit**. This means that it will **submit** the form it is in automatically unless you specifically ask it not to by setting its type.

We don't want the **Search** button to trigger a **form** submit, so we set its type to **button**. When clicked, it triggers the **search** method:

```javascript
function search() {
	var input = $('#subject').val();
	$('#searchResults').html(input);
}
```

It will not trigger the jQuery submit method:

```javascript
$("#target").submit(function(event) {
    event.preventDefault();
    var userFormData = $(this).serialize();
    $('#formResults').html(userFormData);
});
```

The **submit** button has the opposite effect. It triggers the jQuery **submit** method but does not trigger the **search** method.

## Column Size

You have three choices for column size:

- div.col-sm-6  (small)
- div.col-md-6  (medium)
- div.col-lg-6  (large)

If you make your page smaller, there will come a point at which the two columns you set up won't fit any longer. In that case, Bootstrap puts each column on a separate row. If you choose small (div.col-sm-6), then you can make the page quite narrow before the columns are wrapped around into separate rows. If you choose large, then the columns will be wrapped around into one row much sooner.

Here is another way to say the same thing. The smallest column can be less wide than the medium and large columns. This affects the point at which the columns wrap when you shrink the width of your page. If you choose small, then the page can be small (less wide) before the two colums are wrapped around into one column.