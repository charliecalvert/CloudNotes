# Bootstrap Basics

Bootstrap allows you to create projects with CSS that looks good on a PC, a tablet or a phone.

## Step One: Install {#install}

To get started using bootstrap, navigate to your repository and create a new express project called **Week02-BootstrapBasics**.

```
express Week02_BootstrapBasics
cd Week02_BootstrapBasics
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
express Week02_BootstrapBasics
cd Week02_BootstrapBasics
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

## Step Three: Query Delicious {#query-delicious}

```
function delicious() {
    $.ajax(
        {
            url: 'http://feeds.delicious.com/v2/json/charliecalvert/javascript',

            dataType: 'jsonp',

            success: function(data) {
                $('#viewer').html(JSON.stringify(data, null, 4));
            }
    });
}
```

## Step Four: Define Controls {#define-controls}

Get started by creating a single input control:

```
div.panel.panel-default
    div.panel-heading Text Input
    div.panel-body
        div.form-group
            label(for='i1') Env Variable
            input#i1.form-control(type='text', name='foo', placeholder="foo")
````

Provide three radio buttons:

* javascript
* node
* bootstrap

When the user selects one of them, they see the delicious options for links to those items

That is, change the URL in the **delicious** call to one of these:

```
url: 'http://feeds.delicious.com/v2/json/charliecalvert/javascript'
url: 'http://feeds.delicious.com/v2/json/charliecalvert/nodejs'
url: 'http://feeds.delicious.com/v2/json/charliecalvert/bootstrap'
```

Provide three checkboxes

If the user selects one or more of them, they see delicious links for multiple items



##Turn It In

Be sure your work is in your repository in a folder called **Week02-BootstrapBasics**. Include the URL of your repository when you submit the assignment. You might also make a note of the folder in which your project resides. This might help you remember to put it in exactly the right folder.

