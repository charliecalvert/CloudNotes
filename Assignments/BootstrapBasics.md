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

Add a file into the javascripts directory called **control.js**. Use the **script** tag to link it into our app from **layout.jade**. Begin by placing the following code in it.


## Step Four: Define Controls {#define-controls}

Get started defining the HTML for your app by creating a single button and input control:

```
button(onclick="delicious()") Delicous

div.panel.panel-default
    div.panel-heading Text Input
    div.panel-body
        div.form-group
            label(for='subject') Subject
            input#subject.form-control(type='text', placeholder="subject")
````

For what follows, refer to **JsObjects/HtmCssJavaScript/BootstrapBasics** for help setting up radio buttons and check boxes.

Provide two radio buttons:

* radio01
* radio02

When the user selects one of them...

Provide three checkboxes with the these labels:

* check box 01
* check box 02
* check box 03

##Turn It In

Be sure your work is in your repository in a folder called **Week03-BootstrapBasics**. Include the URL of your repository when you submit the assignment. You might also make a note of the folder in which your project resides. This might help you remember to put it in exactly the right folder.

