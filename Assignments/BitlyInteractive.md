# Bitly Interactive

The primary goal of this program is to create an interface for your Bitly data.

Other goals include:

* Learn about epoch time format and how to convert it to human readable dates
* Work with different styles of labels and controls in a form
* Use JavaScript to check a checkbox under certain conditions
* Multiple Modules: One JavaScript Object per file
* Function Objects
* Creating an access token for bitly


[![interface][bis]][bi]

**Bitly Interactive**: *Part of the interface. Click image to see larger version.*

[bi]:https://s3.amazonaws.com/bucket01.elvenware.com/images/Bitly-Interactive01.png
[bis]: https://s3.amazonaws.com/bucket01.elvenware.com/images/Bitly-Interactive01Small.png

## Get Started

Rather than start from scratch, copy your **BitlyQuery** program into a new folder called **Week06-BitlyInteractive**. First navigate to the root of your repository. Then issue a command like this:

```
cp -r Week06-BitlyQuery Week06-BitlyInteractive
```

You will have to make a few changes to the name of the application. In particular, look in these files:

- bin/www
- routes/index.js
- package.json

Find instances of BitlyQuery in each file, and change them to **BitlyInteractive**

## Load the data

Your program should be able to load data either directly from the Bitly website, or from a JSON file stored in your public directory.


## Get a Bitly Access Token

Go to the bitly API home page: [http://dev.bitly.com/](http://dev.bitly.com/). You can find a link to this page under the **more** button at the bottom of the bitly home page, and at various other places, such as on the **tools** page.

On the right, at the bottom, choose **Manage my apps**. Generate a **Generic Access Token**.

## The interface

To get started, just boot up the program normally: **npm start**.

Copy the **bitly-links.json** file to a directory you create called **public/data**. Load it from document ready.

Using our mixins, create an editable interface that will show the following fields from a single object in bitlyLinks array. These fields should be in input controls:

* keyword_link
* title
* aggregate_link
* long_url
* client_id
* link

Also convert the timestamps, and display them in input fields, as described below:

* user_ts
* created_at
* modified_at

We need checkboxes to display these fields

* archived: false
* private: false

These should appear as the program loads so the user sees them by default. In other words, call your method that contains your getJson method from your **document ready** function.

## Check a CheckBox

Here is how to check a checkbox in JavaScript:

```javascript
// with jquery
if (bitlyLink.private) {
    $("#checkBoxPrivate").prop('checked', true);
}

// With the JavaScript DOM:
if (bitlyLink.archived) {
    document.getElementById("checkBoxArchived").checked = true;
}
```

## Converting Dates

The time stamps in the bitly data consist of numbers called epochs:

```javascript
"created_at": 1444163942
```

We typically convert them from epoch format to human readable format with code like this:

```
new Date(bitlyLink.created_at * 1000)
```

Most of what you need to know is at the [epochconverter.com][epoch-converter] site and their [javascript][epoch-js] page:

[epoch-converter]: http://www.epochconverter.com
[epoch-js]: http://www.epochconverter.com/programming/#javascript

