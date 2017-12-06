## Overview

The goal is to learn more about Google [Material][md], more about mixins, and find a way to hide and display divs so as to make better use of available real estate.

- [Material Components][mc]

## The Latest Materials

My layout.pug has been changed to support the latest material code:

```nohighlighting
doctype html
html
    head
        meta(charset='utf-8')
        meta(name='viewport', content='width=device-width, initial-scale=1')
        title= title

        script(src="bower_components/jquery/dist/jquery.js")

        // Material
        link(rel="stylesheet", href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css")
        link(rel='stylesheet', href='https://fonts.googleapis.com/icon?family=Material+Icons')

        // Firebase
        script(defer='', src='https://www.gstatic.com/firebasejs/4.6.2/firebase-app.js')
        script(defer='', src='https://www.gstatic.com/firebasejs/4.6.2/firebase-auth.js')
        script(defer='', src='https://www.gstatic.com/firebasejs/4.6.2/firebase-database.js')

        // Elvenware
        //link(rel='stylesheet', href='/stylesheets/style.css')
        script(src="javascripts/control.js")
        script(src="javascripts/elven-fire-login.js")
        script(src="javascripts/elven-fire-data.js")
    body
        block content
```

At the bottom of **index.pug** I link in the JavaScript:

```nohighlighting
script(src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js")
```

## Mixin Base Elements

Material and Bootstrap components often end up with fairly complex CSS implemented by multiple classes with long names. For instance:

```html
<button type="submit" class="mdc-button
           mdc-button--raised
           mdc-ripple-surface" data-mdc-auto-init="MDCRipple">
    Print Greeting
</button>
```
There are two problems with this:

- The components are hard to understand, take up lots of room, and often look ugly on the page
- We keep applying the same styles to multiple components of the same type. For instance, we end up with multiple buttons like the one above that have the same set of classes applied to them yet differ in only minor ways.

The solution is to declare base mixins for the types we use most often. Consider this **baseButton** mixin which we might place in a file called **base-mixins.pug**:

```nohighlighting
mixin baseButton(id, text)
    button(id=id).mdc-button.mdc-button--raised.mdc-ripple-surface(data-mdc-auto-init='MDCRipple') #{text}
```

To use it, we can write this:

```nohighlighting
include base-mixins

  +baseButton('pres-toggle', 'Presidents')
```

## Base Mixins

Here are set of base mixins that we can add to as needed:

```nohighlighting
mixin baseButton(id, text)
    button(id=id).mdc-button.mdc-button--raised.mdc-ripple-surface(data-mdc-auto-init='MDCRipple') #{text}

mixin baseButton2(id, text)
    button(id=id).mdl-button.mdl-js-button.mdl-button--raised #{elfDatabasePush}

mixin baseInput(id, text)
    .mdc-text-field(data-mdc-auto-init='MDCTextField')
        input(id=id).mdc-text-field__input(type='text')
        |
        label.mdc-text-field__label(for='lastname')
            | #{text}
        |
        .mdc-text-field__bottom-line
```

## Elf Fire Materials

Get the elf-fire-materials.pug file:

    wget https://s3.amazonaws.com/bucket01.elvenware.com/mixins/elf-fire-materials.pug

This is similar too, but not identical too, **elf-fire-view-mixins.pug**.

## Cards

Material cards are nice ways to display data. Here is an example of how to wrap the Login section in a card. We should do the same for the other sections:

```nohighlighting
mixin signInCard(title, subTitle, text)
    #card01
        .mdc-card
            section.mdc-card__primary
                h1.mdc-card__title.mdc-card__title--large #{title}
                h2.mdc-card__subtitle #{subTitle}
            |
            section.mdc-card__supporting-text
                //+baseButton('elf-sign-in', 'Sign in with Google')

                p#load Firebase SDK Loading…

                p Firebase sign-in status:
                    span#elf-sign-in-status Unknown

                h1 User Details

                pre
                    code#elf-user unknown
                pre
                    code#elf-details unknown
                pre
                    code#elf-oauthtoken unknown

                img#elfPhoto(src='favicon.png', alt='', width="10%", min-width="120px")
            |
            section.mdc-card__actions
                button#elf-sign-in.mdc-button.mdc-button--compact.mdc-card__action Sign In
```

Save this in a file called **card-mixins.pug**.

You might use it like this:

```nohighlighting
include card-mixins
  +signInCard('Google Login', 'Status')
```


## Hide Div

We are out of real estate on our main screen. As a result, we need to find some way to toggle chunks of our screen on and off. The first step is to divide our code up into a series of DIVs, perhaps a bit like what is seen in this version of **index.pug**:


```nohighlighting
extends layout
include material-mixins
include elf-fire-materials
include card-mixins

block content

    +menuButtons
    div

        #signer
            +signInCard('Google Login', 'Status')
        #baseButtons(style="display:none")
            +baseButtons
        #pres(style="display:none")
            +presidentInput
            +presidentButtons
        #user(style="display:none")
            +userInput
        #server(style="display:none")
            +serverButtons
            +userData

    script(src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js")
```

And here is the code to toggle the DIVs. There are just a few lines that I want you to write:

```javascript
function runToggle() {
    function toggle(id) {
        const div = document.getElementById(id);
        if (div.style.display !== 'none') {
            div.style.display = 'none';
        }
        else {
            div.style.display = 'block';
        }
    }

    const buttonPres = document.getElementById('pres-toggle');
    const buttonUser = document.getElementById('user-toggle');
    const buttonSignIn = document.getElementById('sign-in-toggle');

    buttonPres.onclick = function() {
        toggle('pres');
    };

    // Define Two more on click methods.
    // One for user-toggle and one for sign-in-toggle

}

onload = function() {
    window.mdc.autoInit();
    runToggle();
};
```

Note that this code, as shown, would allow a user to display all three sections at once. It does not hide any visible sections automatically when a new section is displayed. We probably want that feature, but not yet.

## Turn it In

I'm looking for something like this on EC2:

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/VJEGK15ASVw?ecver=2" width="640" height="360" frameborder="0" gesture="media" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

[mc]: https://material.io/components/web/catalog/
[md]: https://material.io/
