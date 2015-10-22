# Jade Mixin Basics

The goal of this assignment is to learn how to use Jade mixins. In particular, we will see how to use mixins to quickly and easily assemble an interface for an application.

The assignment also reviews creating forms and retrieving data from forms with jQuery.

- Slides on Jade Mixins: [http://bit.ly/jade-mixins](http://bit.ly/jade-mixins)

## Create Project

Use **CreateExpressProject** to create **Week05-JadeMixinBasics**.

Copy in the mixins:

```
cp $ELF_TEMPLATES/mixins/mixin-radios.jade views/.
cp $ELF_TEMPLATES/mixins/mixins.jade views/.
```

## The Code

Below we set up an event that will be called when the user clicks on the **submit** button:

```javascript

$(document).ready(function() {
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
* **elfCheckBox**
* **radioPanel**
* **elfRadio**

```jade

extends menu-mixin
include mixin-radios
include mixins

block append content

    .container
        h1 #{pageTitle}
        p You are in the <strong>#{programTitle}</strong> program. Select some controls and press the Go button.

        +formPanel("Main Form")#target

            +radioPanel("Radio Buttons")
                +elfRadio("Radio1", "option1")
                +elfRadio("Radio2", "option2")

            +elfPanel("CheckBoxes")
                +elfCheckBox("CheckBox 01", "checkBox01", "checkBox01")#checkBox01
                +elfCheckBox("CheckBox 02", "checkBox02", "checkBox02")#checkBox02

            +elfPanel("Actions")
                input.btn.btn-primary(type="submit", value="Go")

        div
            pre#formResults
```

## A Second Program

Now that you have the rhythm, create a second program with:

- Three Check Boxes in a Panel
	- Kurosawa
	- Tolstoy
	- Mifune
- Five Radio Buttons in a Panel. Name them:
	- Seven Samurai
	- Ran
	- Rashomon
	- High and Low
	- Ikiru
- A submit button

Create a screen shot to show that the submit button works. That is, that it can be used to display the user's selections in **pre#formResults**.

## Turn it in

In both programs, select a radio button and two check boxes. Press the submit button. Take a screen shot showing that  the contents of the form selections are displayed in **pre#formResults**.

Place your work in the folder designated above and turn in as usual.