## Overview

This is assignment demonstrates key features of [ThreeJs][threejs], a 3D library for JavaScript.

The repository is here: [https://github.com/mrdoob/three.js](https://github.com/mrdoob/three.js).

The bower library is here: [https://libraries.io/bower/threejs](https://libraries.io/bower/threejs).

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

## Add a Floor

The following module will add a floor to our scene in our Test05 program from last week. Note the call to the require method called [define][deffunc].

```
define([require], function() {

    'use strict';

    function Floors() {}

    function makeFloor() {
        // floor

        geometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
        geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

        for (var i = 0, l = geometry.vertices.length; i < l; i++) {

            var vertex = geometry.vertices[i];
            vertex.x += Math.random() * 20 - 10;
            vertex.y += Math.random() * 2;
            vertex.z += Math.random() * 20 - 10;

        }

        for (i = 0, l = geometry.faces.length; i < l; i++) {

            var face = geometry.faces[i];
            face.vertexColors[0] = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            face.vertexColors[1] = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            face.vertexColors[2] = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);

        }

        var material = new THREE.MeshBasicMaterial({
            vertexColors: THREE.VertexColors
        });

        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
    }

    Floors.prototype.drawFloor = function(scene) {
        // FLOOR
        var names = ['images/checkerboard.jpg', 'images/FloorBorder256.png', 'images/WoodenPlanks.png', 'images/grass02.jpg', 'images/Grass03.png'];
        var repeats = [250, 100, 100, 175];
        var index = 0;
        //var floorTexture = new THREE.ImageUtils.loadTexture('images/FloorBorder256.png');
        var floorTexture = new THREE.ImageUtils.loadTexture(names[index]);
        floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
        floorTexture.repeat.set(repeats[index], repeats[index]);
        var floorMaterial = new THREE.MeshBasicMaterial({
            map: floorTexture,
            side: THREE.DoubleSide
        });
        var floorGeometry = new THREE.PlaneGeometry(2000, 2000, 10, 10);
        var floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.y = -0.5;
        floor.rotation.x = Math.PI / 2;
        scene.add(floor);
    };

    return Floors;
});
```


You should save the file into your public/javascripts directory as something like **Floors.js**. Then add it to Main.js in the config section. You would add it near here:

```
require.config({
	baseUrl : '.',
	paths : {
		"jquery" : 'javascripts/jquery-2.1.1',
		"Three" : 'javascripts/three',
		"Control" : 'javascripts/Control',
```

Here is the code to use the module, which belongs in your constructor or init section in Control.js, near where you add the cube.

```
var floors = new Floors();
floors.drawFloor(scene);
```

You will also need to modify the define call at the top of **Control.js**:

	define(["Floors"], function(Floors) {

The code above will cause require to automatically load your **Floors.js** file.

Create a bitmap called checkerboard.jpg that is 256 X 256 pixels in size and download the one found here. We don't have rights to use this publicly at this time, but we can use it in our assignments. Put it in an images directory in the public folder.

![bar](https://docs.google.com/uc?export=view&id=0B25UTAlOfPRGVW5LOWl5SUItc3M)

More later, but this should get you started.

[deffunc]: http://requirejs.org/docs/api.html#deffunc

## Naive Walk

Let's add just primitive support for walking through the scene. Since the camera is our eye on the scene, what we will do is move the camera to the left and right, and backward and forward. This is like moving through a room, but always having to face in the same direction, as if you were a courtier coming to visit the king.

First let's declare some variables in Control.js above the constructor for tracking movement and the camera position:

```
	var keyMove = {
		moveForward : false,
		moveBackward : false,
		moveLeft : false,
		moveRight : false
	};

	var cameraPosition = {
		x : 2,
		y : 0,
		z : 2
	}
```
Now we want to capture mouse events in the constructor:

```
document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);
```

This event code causes the methods called **onKeyUp** and **onKeyDown** to be called when the keys are pressed or released. Here is the **onKeyDown** method:

```
	var onKeyDown = function(event) {

		switch (event.keyCode) {

		case 38: // up
		case 87: // w
			keyMove.moveForward = true;
			break;

		case 37: // left
		case 65: // a
			keyMove.moveLeft = true;
			break;

		case 40: // down
		case 83: // s
			keyMove.moveBackward = true;
			break;

		case 39: // right
		case 68: // d
			keyMove.moveRight = true;
			break;
	};
```
You also need to compose an **onKeyUp** method that looks the one shown above, but has the opposite effect. In other words, the **boolean** values are set to tell the app that movement to the right, left, back or forward has stopped. The method looks very, very much like the one above, with one important difference which I'm sure you can guess.

Finally we want to change the **render** method to animate the camera when the key presses are detected by the code above. At the top of the render method, add a four part **if block** that moves the **cameraPosition**. I give you the first of the four parts, and you can fill in the rest:

```
	if (keyMove.moveLeft) {
		cameraPosition.x -= 1;
	} else etc...
```

Finally, we move the camera to the new position:

	camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

When you are finished you should be able to "jump" right, left, forward and backward. You might experiment with moving smaller increments each time to make the jumps less jarring to the viewer.

There is much more complex code that allows us to move more smoothly through the screen, but this at least helps us get started moving around in the scene.

## Add More Objects

First, let's add a few more cubes to the scene. Our goal will be to create a scene that looks something like this:

![Bar](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGTnFWZmhSN2tuWFk)

When you first see the boxes in the scene, they will not have a brown wooden texture on them. Have patience, we will add them in this assignment, just not right away.

To get started, you could create a method called **addCubes**. It would begin something like this:

```
function addCubes(scene, camera, wireFrame) {
	for (var i = 0; i < 6; i++) {
	   etc
```

We would call this method from the constructor, rather than calling **addCube**. As you recall the **addCube** call looks like this:

	addCube(scene, camera, wireFrame, 1, 1);

Now from inside **addCubes**,  you want to call **addCube**, but you will need to do something with the last parameters in order to make the cubes appear in different locations. In fact, you might want to call **addCube** more than once in your **for loop**. Perhaps you could hard code one of the last two parameters, and do sometihng with the other one that involved the **loop variable i**.

After you "walk" down the aisle between the boxes for a bit, you might see something like this:

![Bar](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGN1pyc3JiMWVjUWs)

If you look carefully you can see that there is a small space betwen each box. I'm doing this mostly so that you can clearly see when one box ends and the next starts. In a final version of our game, we might not want to include that space. But for now, its useful. To create the space, just add a small value to the z location of each box. You'll probably want to pick a value well under 1.0.

## Add Textures

The scene in your program right now probably looks a bit like the one in the screen shots, but the boxes have bright colors on them rather than a nice wooden texture. To add the texture, swap out this call to [MeshNormalMaterial][normal]:

```
var material = new THREE.MeshNormalMaterial({
	color : 0x00ffff,	  
	wireframe : wireFrame
});
```

Put this call to [MeshLabertMaterial][material] in its place:

```
svar material = new THREE.MeshLambertMaterial({
	map : THREE.ImageUtils.loadTexture('images/crate.jpg')
});
```

Here is a create texture which we can use in class, but not in our final games. Or at least not until we get permission to use it. Just right click and download to your images folder.

![Bar](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGdmUtMHpCSlQ4bmc)

The results in your program are probably less than satisfying, as the boxes are hard to see. To fix that, we need to add lights to the scene.

[normal]:http://threejs.org/docs/#Reference/Materials/MeshNormalMaterial
[material]:http://threejs.org/docs/#Reference/Materials/MeshLambertMaterial


## Add Lights

Call it from your constructor:

```
function addLights() {
	var light = new THREE.DirectionalLight(0xffffff, 1.5);
	light.position.set(1, 1, 1);
	scene.add(light);
	light = new THREE.DirectionalLight(0xffffff, 0.75);
	light.position.set(-1, -0.5, -1);
	scene.add(light);
}
```

## Sphere

Let's add a [sphere][sphere].

```
function addSphere(sne, camera, wireFrame, x, y) {
	var geometry = new THREE.SphereGeometry(.5, 25, 25);
	var material = new THREE.MeshNormalMaterial({
	color: 0x00ffff,
		wireframe: wireFrame
	});

	var sphere = new THREE.Mesh(geometry, material);
	sphere.overdraw = true;
	sphere.position.set(x, 0, y);
	scene.add(sphere);

        return sphere;
}
```

Call the **addSphere** method just after your **for loop**. Be sure to pass in the correct x and y parameters so the sphere appears at the end of our aisle, as shown in the screen shots above.

[sphere]: http://threejs.org/docs/#Reference/Extras.Geometries/SphereGeometry

## Window Resize

One event handler that I should mention is window resize. This event is triggered when the window is resized and it causes the scene to be recalculated so that it fits properly inside the window.

Here is how we hook the event:

	window.addEventListener('resize', onWindowResize, false);

And here is how we handle the event:

```
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
```

On the same general subject, you might find it useful to just remove all the HTML (for now) from you index.jade. My code, at any rate, now looks like this:

```
extends layout

block content
```

As you can see, there is essentially nothing at all happening in **index.jade**. Our HTML body is occupied entirely by Three.Js. Later on we will see how to use CSS to lay HTML over the 3D scene.

## Turn it in

Add a .gitignore file to the root of your BitBucket repository. Make sure you include both **.metadata** and **node_modules** in your .gitignore file. Put your project in your BitBucket repository. Reference for .gitignore:

- <http://www.elvenware.com/charlie/development/cloud/Git.html#the-gitignore-file>

Click the **Send Invitation** button and share your BitBucket repository with me. I'm **ccalvert** on BitBucket.


[threejs]: https://threejs.org/
