# Jade Mixin Basics

The goal of this assignment is to learn how to use Jade mixins. In particular, we will see how to use mixins to quickly and easily assemble an interface for an application.

The assignment also reviews creating forms and retrieving data from forms with jQuery.

- Slides on Jade Mixins: [http://bit.ly/jade-mixins](http://bit.ly/jade-mixins)

## Create Project

Use **CreateExpressProject** to create **Week05-JadeMixinBasics**.

Copy in the mixins:

```
cp $ELF_TEMPLATES/JadeMixins/mixin-radios.jade views/.
cp $ELF_TEMPLATES/JadeMixins/mixins.jade views/.
```

**NOTE**: *We might not use the second file, **mixins.jade**, but I will include if for now in case we need it later.*

**TIP**: *I've saved the above commands to **$JSOBJECTS/Utilities/NodeInstall/GetMixins**. You could copy that file to your **~/bin** directory.*

## The Code

Below we set up an event that will be called when the user clicks on the **submit** button:

```javascript

$(document).ready(function() { 'use strict';
    $("#target").submit(function(event) {
        event.preventDefault();
        var userFormData = $(this).serialize();
        $('#formResults').html(userFormData);
    });
});
```

The id **target** is associated with the form itself:

```html
<form id="target">
```

The submit button is declared like this:

```
Jade:
	input.btn.btn-primary(type="submit", value="Go")

HTML:
	<input value="Go" class="btn btn-primary" type="submit">
```

When the button is clicked the jQuery [submit]() method is triggered. We use the jQuery **serialize** method to retrieve the user's selections from the form.


## The Main Page

The Jade for our main page is quite simple because of our mixins. There are three mixins that we focus on in this assignments:

* **formPanel**: Bootstrap panel with a form
* **elfPanel**: Generic Bootstrap panel
* **elfCheckBox**: Create a check box
* **radioPanel**: Panel for radio buttons
* **elfRadio**: Create a radio button

You can see the source for these files here:

* **$ELF_TEMPLATES/JadeMixins/**

The following is the complete code listing for **views/index.jade**:

```jade
extends layout
include mixin-radios

block append content

    .container
        h1 #{pageTitle}
        p You are in the <strong>#{programTitle}</strong> program. Select some controls and press the Go button.

        +elfFormPanel("Main Form")#target

            +elfRadioPanel("Radio Buttons")
                +elfRadio("Radio1", "option1")
                +elfRadio("Radio2", "option2")

            +elfPanel("CheckBoxes")
                +elfCheckBox("CheckBox 01", "checkBox01", "checkBox01")#checkBox01
                +elfCheckBox("CheckBox 02", "checkBox02", "checkBox02")#checkBox02

            +elfPanel("Input")
                +elfInput("Enter a name", "subject", "Enter a subject")#subject.form-control

            +elfPanel("Actions")
                input.btn.btn-primary(type="submit", value="Go")

        div
            pre#formResults


```

Also put this code in **routes/index.js**, updating the already existing method:

```
router.get('/', function(req, res, next) { 'use strict';
  res.render('index', { pageTitle: 'Main Page',
        programTitle: 'Week05-JadeMixinBasics'});
});
```

## A Second Program

Now that you have the rhythm, create a second program called **Week05-SecondMixin** with:

- Three **elfCheckboxes** in an **elfPanel**
	- Kurosawa
	- Tolstoy
	- Mifune
- Five **elfRadio** Buttons in a **elfRadioPanel**. Name them:
	- Seven Samurai
	- Ran
	- Rashomon
	- High and Low
	- Ikiru
- An **elfInput** control in an elfPanel
- A submit button in a elfPanel

Create a screen shot to show that the submit button works. That is, that it can be used to display the user's selections in **pre#formResults**.

## Turn it in

In both programs, select a radio button, at least two check boxes. Enter text in the input control. Press the **submit** button. For each program, take a screen shot showing that the contents of the form selections are displayed in **pre#formResults**.

Attach your screen shots to the assignment and place your work in the folders designated above and turn in as usual.