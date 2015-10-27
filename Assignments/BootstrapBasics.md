# Bootstrap Basics

We'll work on this assignment in class on Tuesday, Oct 6, 2015.

Bootstrap allows you to create projects with CSS that looks good on a PC, a tablet or a phone.

## Step One: Install {#install}

To get started using bootstrap, navigate to your repository and create a new express project called **Week03-BootstrapBasics**.

```
express Week03_BootstrapBasics
cd Week03_BootstrapBasics
npm install
```

Copy our default **bower.json** and **.bowerrc** files from [JsObjects][bower-copy].

```
cp $ELF_TEMPLATES/bower.json .
cp $ELF_TEMPLATES/.bowerrc .
bower install bootstrap --save
```

Remember that we define **$ELF_TEMPLATES** in our **.bash_alias** file. That file is maintained on [JsObjects][bash-alias].

[bower-copy]:https://github.com/charliecalvert/JsObjects/tree/master/Utilities/Templates
[bash-alias]:https://github.com/charliecalvert/JsObjects/blob/master/Utilities/SetupLinuxBox/.bash_aliases

Now set the port to **bin/www** to 30025. You can do it manually in WebStorm, or use this command to do it from the command line:

```
sed -i -- 's/3000/30025/g' bin/www
```

And this should replace **node** with **nodemon** in **package.json**:

```
sed -i -- 's/node\s/nodemon /g' package.json
```

Then let's copy in a favicon and change the title to include your last name:

```
cp ~/Git/JsObjects/Data/MongoLab03/favicon.png public/.
sed -i -- 's/Express/Bootstrap-Basics-LastName/g' routes/index.js
```

This part of your work is done now, but as an fyi, this is how it looks if you put it all together:

```
express Week03-BootstrapBasics
cd Week03-BootstrapBasics
npm install
cp $ELF_TEMPLATES/bower.json .
cp $ELF_TEMPLATES/.bowerrc .
bower install bootstrap --save
sed -i -- 's/3000/30025/g' bin/www
sed -i -- 's/node\s/nodemon /g' package.json
cp ~/Git/JsObjects/Data/MongoLab03/favicon.png public/.
sed -i -- 's/Express/Bootstrap-Basics-LastName/g' routes/index.js
npm start
```

**NOTE**: *If you used the **CreateProject** script to build this application, manually go in and change the title to include your last name.*

## Step Two: Link to Bootstrap {#link}

We need to link in three files:

* boostrap.css
* jquery.js
* bootstrap.js

Here is what **layout.jade** looks like when you are done:

```
doctype html
html
  head
  	meta(charset='UTF-8')
    meta(name='viewport', content='width=device-width')
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    link(rel='stylesheet', href='/components/bootstrap/dist/css/bootstrap.css')
    script(src="components/jquery/dist/jquery.js")
    script(src="components/bootstrap/dist/js/bootstrap.js")
  body
    block content
```

**NOTE**: *I'm aware that most of the examples on the web that you find will show raw HTML rather than jade. However, it is trivial to convert HTML to jade. In particular, you should find this html2jade site. It will help you convert HTML to jade.*

* [Google Search](https://www.google.com/search?q=html+to+jade)
* [HTML to Jade](http://html2jade.org)

## Step Three: Create Public JavaScript File  {#create-main-public}

Add a file into the javascripts directory called **control.js**. You can create the file inside WebStorm, or use the following code to build it from the bash shell:

```
ELF_NOW=$(date +"%m/%d/%Y")
ELF_FILE=public/javascripts/control.js
echo "/**" >> $ELF_FILE
echo " * Created by Charlie Calvert $ELF_NOW" >> $ELF_FILE
echo " */" >> $ELF_FILE
```

Use the **script** tag to link it into our app from **layout.jade**. See the previous section for hints as to how to do this.

## Step Four: Create Debug Output

Put the following at the bottom of your index.jade file:

## Step Four: Create Debug Display {#debug-display}

We want to build a page that looks something like this:

[![Bootstrap Form](http://bit.ly/bootstrap-basics-01-sm)](http://bit.ly/bootstrap-basics-01)

**Bootstrap Form**: *Click the image to see a larger view*

Let's get started by putting in the debug display shown at the bottom of the page. This code goes at the bottom of **index.jade**:

```jade
div.panel.panel-default
    div.panel-heading Debug Display
    div.panel-body
        div.row
            div.col-md-6
                div.panel.panel-default
                    div.panel-heading Search result
                    div.panel-body
                        p#searchResults
            div.col-md-6
                div.panel.panel-default
                    div.panel-heading RadioButtons
                    div.panel-body
                        p#radioButtonDisplay01
        div.row
            div.col-md-6
                div.panel.panel-default
                    div.panel-heading CheckBoxes
                    div.panel-body
                        p#checkBoxDisplay01
                        p#checkBoxDisplay02
                        p#checkBoxDisplay03
                        p#allCheckBoxes

            div.col-md-6
                div.panel.panel-default
                    div.panel-heading Form Submit Button Results
                    div.panel-body
                        p#formResults
```

Remember, this code should always be at the bottom of the file. Whatever else we add goes above this block code.

## Step Five: Define Controls {#define-controls}

Get started defining the body of the HTML for your app by creating a single button and input control:

```
div.panel.panel-default
    div.panel-heading Text Input
    div.panel-body
        div.form-group
            label(for='subject') Subject
            input#subject.form-control(type='text', name="subject" value="subject" placeholder="subject")
        br
        div
            button.btn.btn-success(type="button", onclick='search()') Search
```

For what follows, refer to **JsObjects/HtmCssJavaScript/BootstrapBasics** for help setting up radio buttons and check boxes.

Provide two radio buttons:

```jade
div.panel.panel-default
    div.panel-heading Radios:
    div.panel-body
        div.btn-group.elves(role="group")
            .radio
                label
                    input(type='radio', name='radio', value='option1', id='option1', checked='')
                    |     radio01
            .radio
                label
                    input(type='radio', name='radio', value='option2', id='option2')
                    |     radio02

```

When the user selects one of them...

Provide three checkboxes:

```jadedefault
div.panel.panel-default
    div.panel-heading CheckBoxes
    div.panel-body
        div
            input#checkBox01(type='checkbox', name='check', value='check1' )
            label(for='checkBox01') &nbsp; CheckBox 01
        div
            input#checkBox02(type='checkbox', name='check', value='check2' )
            label(for='checkBox02') &nbsp; CheckBox 02
```

Sometimes we want to know that radio button or checkbox was clicked. Here is how to proceed. In **control.js** let's detect if checkbox buttons or radiobuttons were clicked:

```javascript
$(document).ready(function() {
    $("input[name=check]:checkbox").click(displayCheckboxSelection);
    $('.btn-group.elves').click(displayRadioButtonSelection);
});
```

And here are the methods for handling these events:

```javascript
function displayCheckboxSelection()
{
    var tag, query = '';
    var options = ['CheckBox01', 'CheckBox02'];

    if ($("#checkBox01").is(':checked')) {
        $("#checkBoxDisplay01").html("CheckBox01 Selected");
        query += options[0];
    } else {
        $("#checkBoxDisplay01").html("CheckBox01 not Checked");
    }

    if ($("#checkBox02").is(':checked')) {
        $("#checkBoxDisplay02").html("CheckBox02 Selected");
        tag = query === '' ?  '' : '+';
        query +=  tag + options[1];
    } else {
        $("#checkBoxDisplay02").html("CheckBox02 not Selected");
    }

    $("#allCheckBoxes").html(query);
}

function displayRadioButtonSelection() {
    if ($('#option1').is(':checked')) {
        $("#radioButtonDisplay01").html("You clicked option1 ");
    } else {
        $("#radioButtonDisplay01").html("You clicked option2 ");
    }
}

```

Here is how to handle a click on **Search** button:

```javascript
function search() {
    var input = $('#subject').val();
    $('#searchResults').html(input);
}
```

## Step Six: Add a box {#box-it}

Put a box around all the controls:

```
div.panel.panel-default
    div.panel-heading My Controls
    div.panel-body
        PUT THE INPUT HERE
        THE CHECKBOXES HERE
        THE RADIOBUTTONS HERE
```

## Step Seven: Put them in rows: {#add-rows}

To define a row, create a **DIV** with class **row**

```html
    <div class="row">
        <div class="col-md-6">column01</div>
        <div class="col-md-6">column02</div>
    </div>
```

Each row you create should have columns that add up to twelve. For instance col-md-6 + col-md-6 = 6 + 6 = 12. For three columns, do this: col-md-4 + col-md-4 + col-md-4. Example and more docs are here:

* [https://getbootstrap.com/examples/grid/](https://getbootstrap.com/examples/grid/)

The following code creates to two columns in one row, and then below that row you see the radio buttons:

```jade
div.panel.panel-default
    div.panel-heading My Controls
    div.panel-body
       div.row
            div.col-md-6
                PUT A DESCRIPTION AND SUBMIT BUTTON HERE
            div.col-md-6
                PUT THE TEXT INPUT HERE
        div.row
            div.col-md-6
                PUT THE CHECKBOXES HERE
            div.col-md-6
                PUT THE RADIO BUTTONS HERE
```

Remember, indentation is very important in Jade. For instance, the description
section could be indented something like this:

```jade
form#target
	div.panel.panel-default
		div.panel-heading My Controls
		div.panel-body

			div.row
				div.col-md-6
					div.panel.panel-default
						div.panel-heading Text Input
						div.panel-body
							p Learn how to use controls in bootstrap. 
								| Fill in the input and push the
								| Search button. See the results
								| displayed below. Try the radio
								| buttons and checkboxes. The radio
								| buttons display the output from
								| each button, and the combined
								| output from both buttons.

						div.panel-body.form-group
							button.btn.btn-primary(type="submit") Submit
```

**NOTE**: *Jade and bootstrap are not really that hard, but it takes some time to wrap your head around them. Many of you want to be good at design. In todays world, that means you must be good at bootstrap. I think you should also have a good understanding of templating engines such as jade.

## Step Eight: Add a form {#use-form}

Wrap all the main HTML (not the debug output) in a form:

```
form#target
    div.panel.panel-default
        div.panel-heading My Controls
        div.panel-body
        etc...
```

Inside your document ready method, you should handle the form click:

```
$("#target").submit(function(event) {
    event.preventDefault();
    var userFormData = $(this).serialize();
    $('#formResults').html(userFormData);
});
```

This code:

* Is called when the submit button is selected
* Uses the jquery **serialize** method to pull everything from the form
* Displays the output in **paragraph** control.
* Calls **preventDefault** to keep the form from trying to submit everything to the server. We'll handle that part when we are ready to do so. And today, we are not yet ready to do that. We will cover that in a later class.

## Step Nine: Review Code {#code-review}

I've shown you all this code already, but just to be sure, here is the complete source for **control.js**:

```javascript
function displayCheckboxSelection()
{
    var tag, query = '';
    var options = ['CheckBox01', 'CheckBox02'];

    if ($("#checkBox01").is(':checked')) {
        $("#checkBoxDisplay01").html("CheckBox01 Selected");
        query += options[0];
    } else {
        $("#checkBoxDisplay01").html("CheckBox01 not Checked");
    }

    if ($("#checkBox02").is(':checked')) {
        $("#checkBoxDisplay02").html("CheckBox02 Selected");
        tag = query === '' ?  '' : '+';
        query +=  tag + options[1];
    } else {
        $("#checkBoxDisplay02").html("CheckBox02 not Selected");
    }

    $("#allCheckBoxes").html(query);
}

function displayRadioButtonSelection() {
    if ($('#option1').is(':checked')) {
        $("#radioButtonDisplay01").html("You clicked option1 ");
    } else {
        $("#radioButtonDisplay01").html("You clicked option2 ");
    }
}

function search() {
    var input = $('#subject').val();
    $('#searchResults').html(input);
}


$(document).ready(function() {

    $("#target").submit(function(event) {
        event.preventDefault();
        var userFormData = $(this).serialize();
        $('#formResults').html(userFormData);
    });

    // Handle button clicks
    $("input[name=check]:checkbox").click(displayCheckboxSelection);
    $('.btn-group.elves').click(displayRadioButtonSelection);

    // Initialize controls
    displayCheckboxSelection();
    $("#radioButtonDisplay01").html('No radiobutton selected');
});
```

##Turn It In

Be sure your work is in your repository in a folder called **Week03-BootstrapBasics**. Include the URL of your repository when you submit the assignment. You might also make a note of the folder in which your project resides. This might help you remember to put it in exactly the right folder.

Attach a screen shot of your running application to the assignment when you submit it. All I need to see is the output in your browser. Your lastname in the title should be clearly visible.

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