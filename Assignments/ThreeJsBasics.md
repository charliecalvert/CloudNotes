## Overview

ThreeJs is a 3D library for JavaScript. Create a simple [ThreeJs](https://threejs.org/) program.

The repository is here: [https://github.com/mrdoob/three.js](https://github.com/mrdoob/three.js).

The bower library is here: [https://libraries.io/bower/threejs](https://libraries.io/bower/threejs).

## Step 01

Create an Express application in the root of your repository called **Week04-ThreeJsBasics**.

<pre>
CreateAllExpress Week04-ThreeJsBasics
</pre>

## Step 02

Make sure you have **bower.json** and **.bowerrc** in place. If these files are missing, get them like this from JsObjects:

```bash
cp $ELF_TEMPLATES/bower.json .
cp $ELF_TEMPLATES/.bowerrc .
```

Install the libraries we need with **bower install**:

<pre>
bower install jquery requirejs --save
wget https://raw.githubusercontent.com/mrdoob/three.js/dev/build/three.js
mv three.js public/javascripts/.
</pre>

Though I don't recommend it, you can download **three.min.js**. You can also install **three.js** with bower:

<pre>
bower install threejs --save
</pre>

This gets you the whole threejs project including the examples. If you really want that, I suggest just cloning the repository like this:

<pre>
cd ~/Git
git clone git@github.com:mrdoob/three.js.git
</pre>

## Step Three

Let's set up [require js][reqjs]. To get started, open up **layout.jade** and remove all the script tags. For instance, remove these, if they exist:

```text
script(src="components/jquery/dist/jquery.js")
script(src="components/bootstrap/dist/js/bootstrap.js")
script(src="javascripts/control.js")
```

Then put this in **layout.jade** on the place of the other tags:

<pre>
script(data-main="javascripts/main" src="javascripts/require.js")
</pre>

This sets you to start working with **requirejs**. We will use this library to load our JavaScripts files when they are needed, rather than just at the start of the program. It also helps us define modules, and helps us see which modules depend on which other modules.

To get start, open up **main.js**. This is where we will configure **requirejs**. In particular, put this in **main.js**:

```javascript
requirejs.config({
    baseUrl : '.',
    paths : {
        "jquery" : 'components/jquery/dist/jquery',
        "bootstrap": 'components/bootstrap/dist/js/bootstrap',
        "Three" : 'javascripts/three',
        "control" : 'javascripts/control'

    },
    shim : {
        'Three' : {
            exports: 'THREE'
        }
    }
});

requirejs([ 'jquery'], function($) {
    'use strict';
    requirejs(['bootstrap', 'Three', 'control' ], function(bootstrap, THREE, Control) {
        $(document).ready(function() {
            var control = new Control(THREE);
        });
    });
});
```

Here are some reminders to help you check that require is set up correctly.

In **layout.jade** remove all script tags but this one:

```javascript
script(data-main="javascripts/main" src="components/requirejs/require.js")
```

In the Chrome developer tools network page, you should see **require.js** loaded first, then see **main.js** loaded, then the other JavaScript files. This helps prove to you that require is working. If jquery, for instance, is loaded before require, then something is wrong, likely in **layout.jade**.

## Buttons

Because we are loading bootstrap, we can create some pretty buttons with simple code in **index.jade**

<pre>
extends layout

block content
  h1= title
  p Welcome to #{title}

  div.buttons
    button.homeMenu.btn.btn-primary Home
    button.aboutMenu.btn.btn-success About
</pre>


## Step Four

Let's draw a shape in **control.js**. Replace all the code in **control.js** with the following requirejs module:

```javascript

/* globals define: true, THREE:true */

define(function() {

    var scene = null;
    var camera = null;
    var renderer = null;
    var cube = null;
    var THREE = null;

    function Control(threeInit) {
        THREE = threeInit;
        console.log("Control called");
        scene = new THREE.Scene();
        var width = window.innerWidth / window.innerHeight;
        camera = new THREE.PerspectiveCamera(75, width, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({
            antialias : true
        });
        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
        document.body.appendChild(renderer.domElement);
        cube = addCube(scene, camera, false, 1, 1);
        camera.position.z = 23;
        camera.position.x = 2;
        camera.position.y = 0;
        render();
    }

    function render() {
        requestAnimationFrame(render);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    function addCube(scene, camera, wireFrame, x, y) {
        var geometry = new THREE.BoxGeometry(7, 7, 7);
        var material = new THREE.MeshNormalMaterial({            
            wireframe : wireFrame
        });
        var cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, 0, y);
        scene.add(cube);

        return cube;
    }

    return Control;
});
```

<!-- Links -->

[reqjs]: http://www.elvenware.com/charlie/development/web/JavaScript/Require.html

## Turn it in

Make sure you code is in your repository and in the right folder. Push your code. Let me know you have finished your work by submitting the assignment.

## Concepts

Let's look at this code for calling our threejs [renderer](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer):

```javascript
function render() {
	requestAnimationFrame(render);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render(scene, camera);
}
```

This code first calls **requestAnimationFrame**, which [tells the browser][request] to call the **render** method in its animation loop. The effect is to end up calling **render** over and over, each time the Window is ready to redraw the screen.

The next two lines rotate the cube we created. In this assignment, we want to stop rotating the cube, so you should comment those lines out, or delete them entirely.

Finally, we call **renderer.render**. That line of code actually draws our scene and tells the camera to show us what it sees. Note that in the **control.js** constructor, or in a method called by the constructor, we fill the scenes with the objects we want to view. For instance, we load the **cube** in the scene:

	scene.add(cube);

Hopefully you now have some sense of how **render** works. It is certainly one of the most important methods in our program.

[request]: https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame

## JSCS Ignore

We should ignore certain files in **.jscsrc**:

<pre>
"excludeFiles": ["**/node_modules/**", "**/components/**", "**/bower_components/**", "\*\*/three.js"],
</pre>

The two key places where you will need to tell grunt related code to ignore **three.js** are in **.jscsrc** and in **Gruntfile.js** in the **JsHint** section.
