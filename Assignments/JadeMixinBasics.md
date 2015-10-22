# Jade Mixin Basics

## Create Project

Use **CreateExpressProject** to create **Week05-JadeMixinBasics**.

Copy in the mixins:

```
cp $ELF_TEMPLATES/mixins/mixin-radios.jade views/.
cp $ELF_TEMPLATES/mixins/mixins.jade views/.
```

## The Code

```javascript

$(document).ready(function() {
    $("#target").submit(function(event) {
        event.preventDefault();
        var userFormData = $(this).serialize();
        $('#formResults').html(userFormData);
    });
});
```


## The main page

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

## Turn it in

Select a radio button and two check boxes. Press the submit button. Take a screen shot showing that  the contents of the form selections are displayed in **pre#formResults**.

Place your work in the folder designated above and turn in as usual.