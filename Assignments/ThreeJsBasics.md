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

Install the libraries we need:

bower install

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

Let's set up [require js][reqjs]. To get started, put this in **layout.jade**:

<pre>
script(data-main="javascripts/main" src="javascripts/require.js")
</pre>

Now in **main.js**, put this:

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
            color : 0x00ffff,
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
