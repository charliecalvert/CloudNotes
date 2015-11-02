## Overview

Comments on **Boostrap Delicous**.

## Handle Check Box and Radio Button Selections
Here is the code that should appear inside our **document ready** function.

```javascript
$(document).ready(function() {
    // Handle button clicks
    $("input[name=check]:checkbox").click(displayCheckboxSelection);
    $('.btn-group .btn').click(displayRadioButtonSelection);

    // Initialize controls
    displayCheckboxSelection();
    $("#radioButtonDisplay01").html('No radiobutton selected');
});
```

Here is the code from Boostrap Basics for handling radio button and check box clicks:

```javascript
function displayCheckboxSelection()
{
    var tag, query = '';
    var options = ['bootstrap', 'javascript', 'nodejs'];

    if ($("#chBootstrap").is(':checked')) {
        $("#checkBoxDisplay01").html("You clicked Bootstrap");
        query += options[0];
    } else {
        $("#checkBoxDisplay01").html("Bootstrap is not selected");
    }

    if ($("#chJavaScript").is(':checked')) {
        $("#checkBoxDisplay02").html("You clicked JavaScript");
        tag = query === '' ?  '' : '+';
        query +=  tag + options[1];
    } else {
        $("#checkBoxDisplay02").html("JavaScript is not checked");
    }

    if ($("#chNodeJs").is(':checked')) {
        $("#checkBoxDisplay03").html("You clicked NodeJs");
        tag = query === '' ?  '' : '+';
        query +=  tag + options[2];
    } else {
        $("#checkBoxDisplay03").html("NodeJs is not checked");
    }

    callDelicious(query)
}

function displayRadioButtonSelection() {
    var id = $(this).text();
    $("#radioButtonDisplay01").html("You clicked " + id);
    callDelicious(id);
}
```

Without this code, clicks on checkboxes and on radiobuttons will not work.

The **displayCheckBoxSelection** must build up a query reflecting the options selected by the user. We use the variables **tag**, **query** and **options** to help us with this task.

Recall that if you want to see the links that have two or more different tags associated with them, then compose a URL like one of these:

```javascript
url: 'http://feeds.delicious.com/v2/json/charliecalvert/javascript+nodejs'
url: 'http://feeds.delicious.com/v2/json/charliecalvert/nodejs+bootstrap'
url: 'http://feeds.delicious.com/v2/json/charliecalvert/bootstrap+javascript+nodejs'
```

Notice how each of the three **if statements** in **displayCheckboxSelection** creates or adds to the **query** string. For instance, if the user selections only bootstrap, then this is our **subject** parameter for the query string:

- boostrap

If they selection bootstrap and javascript, then we end up with this:

- boostrap+javascript

And so on.

## Use Ajax to Call Delicious {#call-delicious}

Here is my code for making the remote call to the Delicious web service:

```javascript
var deliciousLinks;

function detailDelicious(index) {
    $('#deliciousDetails').html(JSON.stringify(deliciousLinks[index], null, 4));
}

function appendUrl(index, deliciousLink) {
    var url = deliciousLink.u;
    var description = deliciousLink.d;
    var anchor = '<a href="' + url + '" target="_blank">' + description + '</a>';
    var details = '<a onclick="detailDelicious(' + index + ')">Details</a>';
    $('#urlDelicious').append('<li>' + anchor + ' - ' + details + '</li>');
}

function callDelicious(subject) {
    var feedUrl = 'http://feeds.delicious.com/v2/json/charliecalvert/' + subject;
    $.ajax(
        {
            url: feedUrl,

            dataType: 'jsonp',

            success: function(data) {
                deliciousLinks = data;
                $('#urlDelicious').empty();
                $.each(deliciousLinks, function(index, deliciousLink) {
                    appendUrl(index, deliciousLink);
                });
                $('#deliciousDetails').html(JSON.stringify(deliciousLinks, null, 4));
            }
        });
}
```

The code first create a url called **feedUrl** that might look like this:

```xml
http://feeds.delicious.com/v2/json/charliecalvert/bootstrap+javascript
```

If the **$.ajax** call that uses this URL succeeds, then we iterate over the **data** array returned from Delicious. For each item in the array, we call **appendUrl**, which is designed to create a list item (LI) that contains two hyperlinks.

- The first hyperlink opens a tab showing the Delicious link.
- The second hyperlink shows the details of the object we got from delicious that details the link related information. For instance, the details might look like this:

```json
{
    "a": "charliecalvert",
    "d": "Twitter Bootstrap Github twbs/bootstrap",
    "n": "",
    "u": "https://github.com/twbs/bootstrap",
    "t": [
        "bootstrap",
        "html",
        "css",
        "javascript"
    ],
    "dt": "2015-10-04T03:12:48Z"
}
```

## Suppress Form Submit

It is unlikely you will need this in our code since we do not have a form. Nevertheless, it is perhaps worth mentioning that if you have a form, and want to suppress or customize the default handling of the said form, then do something like this in **document ready**:

```javascript
$("#target").submit(function(event) {
    event.preventDefault();
    var userFormData = $(this).serialize();
    $('#formResults').html(userFormData);
});
```

For now, however, we are ensuring that even if we had a form, our button does not trigger form submit by setting the button **type** to **button**:

```jade
button.btn.btn-primary(type="button", onclick="delicious()") Search Delicious
```