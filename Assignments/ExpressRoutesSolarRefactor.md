---
creationLocalTime: 3/26/2022, 10:23:51 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/ExpressRoutesSolarRefactor.md
relativePath: Assignments/ExpressRoutesSolarRefactor.md
title: ExpressRoutesSolarRefactor
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: ExpressRoutesSolarRefactor.md
fileNameHTML: ExpressRoutesSolarRefactor.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

The goal of this assignment is to refactor the renewables related code into appropriately named folders.

We will also improve the first of its three pages, the renewable-page, so that it display one record at a time in a nice "table" view.

Do your work in a branch called **week08**. Rename your project from **Week07-ExpressRoutesSolar** to **SolarVoyager**. I think this will be the last name change, and we will continue to use this name throughout the quarter.

**NOTE**: _This is an in-class exercise that we can perform to help you see how to complete the final._

## Rename Renewables {#renewables-rename}

We have created a lot of files, and it is time to start organizing them. Let's create some subfolders and move our work into them. This kind of work is known as refactoring. It helps us create a more maintainable and easier to understand application. It does not, however, usually change the behavior of our application.

The goal is to move all files that handle our **data/Renewable.json** file into folders called **renewables**. Doing so will make it easier to find and understand the code that manipulates the data from **Renewables.json**.

This move will involve at least two sets of files:

- The files in **public/javascript** that open, parse or manipulate the data from our **Renewable.json** file.
- The core jade files associated with the **renewables** files from our **public/javascript** directories
  - This does not include **layout.jade** or **index.jade** though those files do mention renewables

**NOTE**: _By now, most of the files that handle **Renewable.json** data have the renewable in their name. For instance, **renewable-by-year.js**. If, however, you have files with a different naming scheme in your project, then you should move them also and consider renaming them._

To get started, create a **views/renewables/** folder and move (**git mv**) our renewable files into it:

<pre>
$ ls -la
total 20
drwxrwxr-x 2 charlie charlie 4096 May 22 09:41 .
drwxrwxr-x 3 charlie charlie 4096 May 22 09:41 ..
-rw-rw-r-- 1 charlie charlie  256 May 19 19:33 renewable-by-index.jade
-rw-rw-r-- 1 charlie charlie  257 May 19 19:39 renewable-by-year.jade
-rw-rw-r-- 1 charlie charlie 2217 May 21 10:35 renewable-page.jade
charlie@rohan-elf:~/Git/prog272-calvert-2016/SolarVoyager/views/renewables
</pre>



In **routes/index.js** create a new route for handling renewable calls in their own folder:

```javascript
router.get('/renewables/:id', function(request, response) {
    console.log('renewables page called');
    response.render('renewables/' + request.params.id, { title: 'ElfComponent' });
});
```

This code says that instead of looking for **renewable-page.jade** or **renewable-by-index.jade** in the **views** folder, we should look for them in the **views/renewables folder**.

Finally, we have to change our requests on the client side so they look for files in the right place:

```javascript
var renewablesByYear = {
    color: "red",
    size: "big",
    init: function() {
        console.log(renewablesByYear.color);
        $('#elf-view').load('/renewables/renewable-by-year', function() {
```

This code says that the **init** method should load the jade file called **renewables/renewable-by-year.jade**. Before we make the change the last line looked like this:

```javascript
$('#elf-view').load('renewable-by-year', function() { ... })
```

This old, obsolete, code loaded **renewable-by-year.jade** from the **views folder**. We don't want to do that anymore. Now we want to load it from the **views/renewables/renewable-by-year.jade** folder.

**NOTE**: _Express doesn't ask us to specify the **views** folder in the above code because of this statement found around line 14 in **app.js**: _

```javascript
app.set('views', path.join(__dirname, 'views'));
```
_That code tells express where to look for our jade files. Specifically, it says look in the **views** folder. Hence we can **response.render('renewables/' + request.params.id, { title: 'ElfComponent' });** rather than **response.render('views/renewables/' + request.params.id, { title: 'ElfComponent' });**. The views folder is searched by default, so we don't need to specify it._

## Move Client Side Rewewables {#client-side-renewables}

I did it with these commands, starting from the root of my project:

<pre>
cd public/javascripts
mkdir renewables
git mv renewables.js renewables/.
git mv renewables-* renewables/.
</pre>

I spell this out because having a file called **renewables.js** that you want to move into a folder called **renewables** can be a bit tricky when using wildcards. Specifically, this call did not work because I was, unintentionally, asking git to move a folder into itself:

<pre>
git mv renewables* renewables/.
</pre>

So I moved the files in two steps, as shown in the third and fourth lines above.

The result looks like this when I ask for a listing of **public/javascripts/renewables**:

<pre>
$ ls -la
total 20
drwxrwxr-x 2 charlie charlie 4096 May 22 10:04 .
drwxrwxr-x 3 charlie charlie 4096 May 22 10:04 ..
-rw-rw-r-- 1 charlie charlie 1328 May 22 09:43 renewables-index.js
-rw-rw-r-- 1 charlie charlie 2923 May 22 09:42 renewables.js
-rw-rw-r-- 1 charlie charlie 1311 May 22 09:43 renewables-year.js
</pre>

You will now also have to make some changes in **main.js**, around lines 12 through 14. You need, of course, to set up the new paths, which I leave as an exercise for the reader.

**NOTE**: _Hopefully you have been doing so all along, but if you have not, stop now and test your work. Make sure all is well before you move on. If you are following along in class, and don't have time to test everything, then do so when you get home. If necessary comment out code, or turn to the bash shell and developer tools **network** page and make sure everything is acting you expect. Clearly these changes to the location of the renewables files must be working before you can debug related portions of your code._

## Create Home {#home}

Rename work.js to home.js. Rename all associated buttons, menus, variables and files. To help you find all instances of these variables, try these command from the root of the project folder:

<pre>
elfgrepcomps work
grep -r --include=\*.jade work
</pre>

**NOTE**: _The **elfgrepcomps** command is from JsObjects, but should be symbolically linked from your **bin** folder, and hence on your path._

If you trust them, there are also often search and replace across a project options in developer IDEs.

## Control Init

The **control.js** init function now looks like this:

```javascript
init: function() {
    $('.homeMenu').click(home.init);
    $('.renewablesMenu').click(renewables.init);
    $('.renewablesByIndexMenu').click(renewablesByIndex.init);
    $('.renewablesByYearMenu').click(renewablesByYear.init);
    $('.aboutMenu').click(about.init);
    home.init();
}
```

## Display Renewables

Display a single record to the user. Provide buttons to allow the user to iterate through the items in the array.

![Renewables](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog272-midterm-2016-03.png)

**Figure03**: _Display the fields of a single record inside a series of labels and input controls. Provide buttons to help the user navigate between records._

Here is the Jade for the HTML with bootstrap classes for the buttons and input control:

<pre>
.jumbotron
    h1 Renewable Page

    .alert.alert-success
        p#display

.container
    .panel.panel-default
        .panel-heading Renewable
        .panel-body
            .input-group
                span.input-group-btn
                    button#minusButton.btn.btn-danger.btn-number(type="button")
                        span.glyphicon.glyphicon-minus
                input#indexInput.form-control.input-number(type="number", value=0, min='0', max='12')
                span.input-group-btn
                    button#plusButton.btn.btn-success.btn-number(type="button")
                        span.glyphicon.glyphicon-plus
</pre>

Here is the jade for two rows from the "table" shown below the iteration buttons. It is up to you to create the other fields:

<pre>
.input-group
    span.input-group-addon Year
    input#yearView.form-control(type='text', placeholder='Year', aria-describedby='basic-addon1')
.input-group
    span.input-group-addon Solar
    input#solarView.form-control(type='text', placeholder='Solar', aria-describedby='basic-addon1')
</pre>

The IDs should be:

- #yearView
- #solarView
- #geoView
- #otherBiomassView
- #windView
- #liquidBiofuelsView
- #woodView
- #hydropowerView

Create a function called **getSimpleKeys** that can convert a object of this type into a simpler format:

```json
{
    "Year": "2017",
    "Solar (quadrillion Btu)": "0.8045307",
    "Geothermal (quadrillion Btu)": "0.2349284",
    "Other biomass (quadrillion Btu)": "0.50916",
    "Wind power (quadrillion Btu)": "2.202328",
    "Liquid biofuels (quadrillion Btu)": "1.2329197",
    "Wood biomass (quadrillion Btu)": "1.9860924",
    "Hydropower (quadrillion Btu)": "2.5859957"
},
```

For instance, the function might start like this:

```javascript
function getSimpleKeys(renewable) {
    return {
        year: renewable["Year"],
        solar: renewable["Solar (quadrillion Btu)"],
        etc...
    }
}
```

The goal is to convert the long, uneven property names shown above in our JSON object into a Javascript object that looks like this:

```javascript
{
  geo: "0.2349284",
  hydropower: "2.5859957",
  liquidBiofuels: "1.2329197",
  otherBiomass: "0.50916",
  solar: "0.8045307",
  wind: "2.202328",
  wood: "1.9860924",
  year: "2017"
}
```

Field order does not matter, and is typically not reliable in JavaScript. Just be sure all the properties are present.

Now display the object in our control with code that looks like this:

```javascript
function showRenewable(renewable) {
       renewable = getSimpleKeys(renewable);
       $('#yearView').val(renewable.year);
       $('#solarView').val(renewable.solar);
       etc...
}
```

Call this method from the **getRenewable** method:

```javascript
$.getJSON('/renewables', function(response) {
     console.log(response);
     renewablesList = response.renewables;
     showRenewable(renewablesList[index]);
     $('#debug').html(JSON.stringify(response, null, 4));
 })
```

For instance, the code, with much omitted, might look like this:

```javascript
function getRenewable() {
      console.log('getRenewable called');

      $.getJSON('/renewables', function(response) {
              //console.log(response);
              renewables.renewablesList = response.renewables;
              //console.log('RenewablesList', renewablesList);
              showRenewable(renewables.renewablesList[index]);
              // $('#debug').html(JSON.stringify(response, null, 4));
          })
          .fail(function(a, b, c) {
              console.log('Error', a, b, c);
              $('#debug').html('Error occured: ', a.status);
          })
          .done(function() {
              console.log('second success');
          })
          .always(function() {
              console.log('complete');
          });
  }

  function showRenewable(renewable) {
      renewable = getSimpleKeys(renewable);
      $('#yearView').val(renewable.year);
      // YOUR CODE HERE
  }

  function getSimpleKeys(renewable) {
      // jscs:disable requireDotNotation
      return {
          year: renewable.Year,
          solar: renewable['Solar (quadrillion Btu)'],
          // YOUR CODE HERE
      };
      // jscs:enable requireDotNotation
  }

```

**NOTE**: _The code shown above demonstrates how to get jscs to ignore places where just can't use dot notation._

## Button Iteration {#iteration}

When the user clicks on the red and green buttons, this code is called:

```javascript
function indexChange(test) {
    if (test < 12 && test >= 0) {
        index = test;
        $('#indexInput').val(index);
        showRenewable(renewablesList[index]);
    }
}

var indexButtonChange = function(event) {
    var test = event.data.value + index;

    indexChange(test);
};

var buttonChange = function() {
    var test = $('#indexInput').val();
    indexChange(parseInt(test));
};
```

The code won't be called unless you set up the event handler. Looking above at the menu, you see that the idea of the plus button is **plusButton**:

<pre>
button#plusButton.btn.btn-success.btn-number(type="button")
    span.glyphicon.glyphicon-plus
</pre>

Using jQuery, can you connect clicks on the button to the **indexButtonChange**. At the same time, you can pass in a parameter stating that the index has been incremented by one. To understand how to do this, see this elvenware section on [passing parameters with the click event][click-param]. In particular, you will need to write code like:

```javascript
$('#plusButton').click(
  // DO SOMETHING IN HERE LIKE WHAT IS DONE IN THE ELVENWARE EXAMPLE
)
```

Notice the code in **indexButtonChange** where we access the parameter like this:

```javascript
var test = event.data.value + index;
```

[click-param]: http://www.elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html#clickParam

## Simple Iteration

As an alternative, if the above is too much, you can have simple iteration. Put this in your init method:

```javascript
$('#renewableByIndex').change(function() {
    getRenewableByIndex();
});
```

Like this:

```javascript
var renewablesByIndex = {
    color: 'red',
    size: 'big',
    init: function() {
        console.log(renewablesByIndex.color);
        $('#elf-view').load('/renewables/renewable-by-index', function() {
            $('#renewableByIndex').change(function() {
                getRenewableByIndex();
            });
            etc....
        });
    }
};
```

And the input control:

<pre>
input#renewableByIndex(type='number', value='2', min='0', max='12')
</pre>

## Turn it in

I expect to find this in your **week08** branch in a folder called **SolarVoyager**.
