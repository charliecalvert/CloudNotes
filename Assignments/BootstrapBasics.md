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

First copy our default **bower.json** and **.bowerrc** files from [JsObjects][bower-copy].

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

Then let's copy in a favicon and change the title:

```
cp ~/Git/JsObjects/Data/MongoLab03/favicon.png public/.
sed -i -- 's/Express/Week03-Bootstrap-Basics/g' routes/index.js
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
sed -i -- 's/Express/Week03-Bootstrap-Basics/g' routes/index.js
npm start
```

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
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    link(rel='stylesheet', href='/components/bootstrap/dist/css/bootstrap.css')
    script(src="components/jquery/dist/jquery.js")
    script(src="components/bootstrap/dist/js/bootstrap.js")
  body
    block content
```

## Step Three: Create Public JavaScript File  {#create-main-public}

Add a file into the javascripts directory called **control.js**. You can create the file inside WebStorm, or use the following code:

```
ELF_NOW=$(date +"%m/%d/%Y")
ELF_FILE=public/javascripts/control.js
echo "/**" >> $ELF_FILE
echo " * Created by Charlie Calvert $ELF_NOW" >> $ELF_FILE
echo " */" >> $ELF_FILE
```

Use the **script** tag to link it into our app from **layout.jade**:

## Step Four: Define Controls {#define-controls}

Get started defining the HTML for your app by creating a single button and input control:

```
div.panel.panel-default
    div.panel-heading Text Input
    div.panel-body
        div.form-group
            label(for='subject') Subject
            input#subject.form-control(type='text', placeholder="subject")
````

For what follows, refer to **JsObjects/HtmCssJavaScript/BootstrapBasics** for help setting up radio buttons and check boxes.

Provide two radio buttons:

```
  div.panel.panel-default
    div.panel-heading Radios
    div.panel-body
      div.btn-group.elves(role="group")
        button.btn.btn-default(type="button") radio01
        button.btn.btn-default(type="button") radio02
```

When the user selects one of them...

Provide three checkboxes:

```
  div.panel.panel-default
    div.panel-heading CheckBoxes
    div.panel-body
      div
        input#checkBox01(type='checkbox', name='check', value='check1' )
        label(for='checkBox01') CheckBox 01
      div
        input#checkBox02(type='checkbox', name='check', value='check2' )
        label(for='checkBox02') CheckBox 02

```

## Add a box

Put a box around all the controls:

```
	div.panel.panel-default
		div.panel-heading My Controls
		div.panel-body
    		PUT THE INPUT HERE
            THE CHECKBOXES HERE
            THE RADIOBUTTONS HERE
```

## Put them in rows:

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
        		PUT THE TEXT INPUT HERE
			div.col-md-6
				PUT THE CHECKBOXES HERE
        PUT THE RADIO BUTTONS HERE
```

You can arrange things  this way, or else create a single row with three colums, each containing all three sets of controls.

Remember, indentation is very important in Jade.

## Create Debug Display {#debug-display}

```
div.panel.panel-default
    div.panel-heading Debug Display
    div.panel-body
        div.row
            div.col-md-6
                div.panel.panel-default
                    div.panel-heading RadioButtons
                    div.panel-body
                        p#radioButtonDisplay01
            div.col-md-6
                div.panel.panel-default
                    div.panel-heading CheckBoxes
                    div.panel-body
                        p#checkBoxDisplay01
                        p#checkBoxDisplay02
                        p#checkBoxDisplay03
                        p#allCheckBoxes
```

## Process

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
	var id = $(this).text();
	$("#radioButtonDisplay01").html("You clicked " + id);
}

$(document).ready(function() {

	// Handle button clicks
	$("input[name=check]:checkbox").click(displayCheckboxSelection);
	$('.btn-group .btn').click(displayRadioButtonSelection);

	// Initialize controls
	displayCheckboxSelection();
	$("#radioButtonDisplay01").html('No radiobutton selected');
});
```

##Turn It In

Be sure your work is in your repository in a folder called **Week03-BootstrapBasics**. Include the URL of your repository when you submit the assignment. You might also make a note of the folder in which your project resides. This might help you remember to put it in exactly the right folder.

