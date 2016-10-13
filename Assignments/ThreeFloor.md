## Overview

This is assignment demonstrates key features of [ThreeJs][threejs], a 3D library for JavaScript.

The repository is here: [https://github.com/mrdoob/three.js](https://github.com/mrdoob/three.js).

The bower library is here: [https://libraries.io/bower/threejs](https://libraries.io/bower/threejs).

## Get Started

Begin by copying over the code from the [ThreeJsBasics]() assignment:

<pre>
cp -r Week04-ThreeJsBasics Week04-ThreeFloor
</pre>

## Add a Floor

The following module will add a floor to our scene in our **ThreeJsBasics** program. Note the call to the **require** method called [define][deffunc].


```
define([require], function() {
	'use strict';

	var THREE = null;

	function Floors(threeInit) {
		THREE = threeInit;
	}


	function makeFloor() {
		// floor

		var geometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
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
			var loader = new THREE.TextureLoader();
			var floorTexture = loader.load(names[index]);
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


You should save the file into your **public/javascripts** directory as **floor.js**. Then add it to **main.js** in the **config** section. More specifically, you would add it near here:

```
require.config({
	baseUrl : '.',
	paths : {
		"jquery" : 'components/jquery/dist/jquery-2.1.1',
		"three" : 'javascripts/three',
		"control" : 'javascripts/control',
		// YOUR CODE FOR LOADING floor.js GOES HERE
```

You will need to modify the define call at the top of **control.js**:

```javascript
define(["floor"], function(Floor) {
	// LOTS OF CODE OMITTED HERE
});
```

The code passed to the define method will cause **require** to automatically load your **floor.js** file.

Below is the code to create and use the key method in the **floor** module:

```
var floor = new Floor();
floor.drawFloor(scene);
```

It belongs in the constructor found in **control.js**. Insert it into your source just after you add the cube.

Create a bitmap called **checkerboard.jpg** that is 256 X 256 pixels in size or download the one found here. We don't have rights to use this publicly at this time, but we can use it in our assignments. Put it in an **images** directory in the **public** folder:

<pre>
public/images/checkerboard.jpg
</pre>

![bar](https://docs.google.com/uc?export=view&id=0B25UTAlOfPRGVW5LOWl5SUItc3M)

At this stage you should be able to run the program and see a floor. The cube from the basics program should be partially buried in the floor, but still visibly rotating.

![Three Floor Start][three-floor-01]

[deffunc]: http://requirejs.org/docs/api.html#deffunc

[three-floor-01]: https://s3.amazonaws.com/bucket01.elvenware.com/images/three-floor-01.png

## Naive Walk

Let's add primitive support for walking through the scene. Our camera is the eye on the scene. To change what we see, we move the camera. In particular, if we want to simulate walking through the scene, then we just move the camera along a path. We will be able to move the camera to the left and right, and backward and forward. This is like moving through a room, but always having to face in the same direction, as if you were a courtier coming to visit the king. (We will see how to rotate the camera and change the direction we are facing in a later assignment.)

First let's declare some variables in **control.js** above the constructor for tracking movement and the camera position:

```javascript
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

Now we want to capture mouse events in the constructor for **control.js**. The following code tells the browser to call certain methods when the user presses or releases a key:

```javascript
document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);
```

You can place the above lines in a number of locations, but just below the calls to create the floor is a reasonable spot.

Note that the **addEventListener** method specifies that the **onKeyDown** method will be called when a key is pressed and a method called **onKeyUp** will be called when a key is released. In short, the event code causes the methods called **onKeyUp** and **onKeyDown** to be called when the keys are pressed or released. Here is the **onKeyDown** method:

```javascript
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
  }
};
```

You also need to compose an **onKeyUp** method that looks the one shown above, but has the opposite effect. In other words, the **boolean** values are set to tell the app that movement to the right, left, back or forward has stopped. The method looks very, very much like the one above, with one important difference which I'm sure you can guess.

Finally we want to change the **render** method to animate the camera when the key presses are detected by the code above. At the top of the render method, add a four part **if block** that moves the **cameraPosition**. I give you the first of the four parts, and you can fill in the rest:

```javascript
	if (keyMove.moveLeft) {
		cameraPosition.x -= 1;
	} else etc...
```

We will move in the x direction to mvoe left and right. Which direction, y or z, should we move to be able to move deeper into the scene? Just experiement a bit, and you will soon see which property to choose. Remember, we want to move left, right, forward and back. We don't move up and down. For now, try moving by plus or minus one unit.

**Note**: _Recalled that we declared both **keyMOve** and **cameraPosition**, so you know what those objects look like._

Finally, just after our four part **if** statement, we move the camera to the new position:

```javascript
	camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
```

When you are finished you should be able to "jump" right, left, forward and backward. You might experiment with moving smaller increments each time to make the jumps less jarring to the viewer.

**NOTE**: _When the scene is first rendered, the camera may be right in the middle of a cube. This means you will have to "backup" (down arrow) to move away from the cube and see it. If you are standing in the middle of cube, it might be invisible. We will fix all this later, but for now, we have to live with the scene in its half-finished state._

Later you will see more complex code that allows us to move more smoothly through the screen, but this at least helps us get started moving around.

## Add More Objects

First, let's add a few more cubes to the scene. Our goal will be to create a scene that looks something like this:

![Bar](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGTnFWZmhSN2tuWFk)

When you first see the boxes in the scene, they will not have a brown wooden texture on them. Have patience, we will add them in this assignment, just not right away.

To get started, you could create a method called **addCubes**, based on the addCube method. It would begin something like this:

```javascript
function addCubes(scene, camera, wireFrame) {
	for (var i = 0; i < 6; i++) {
	   etc...
	}
}
```

We would call this method from the constructor, rather than calling **addCube**. As you recall the invocation of **addCube** looks like this:

```javascript
	addCube(scene, camera, wireFrame, 1, 1);
```

Now from inside **addCubes**,  you want to call **addCube**, but you will need to do something with the last parameters in order to make the cubes appear in different locations. In fact, you might want to call **addCube** more than once in your **for loop**. Perhaps you could hard code one of the last two parameters, and do sometihng with the other one that involved the **loop variable i**.

After you "walk" down the aisle between the boxes for a bit, you might see something like this:

![Bar](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGN1pyc3JiMWVjUWs)

If you look carefully you can see that there is a small space betwen each box. I'm doing this mostly so that you can clearly see when one box ends and the next starts. In a final version of our game, we might not want to include that space. But for now, its useful. To create the space, just add a small value to the z location of each box. You'll probably want to pick a value well under 1.0.

## Add Textures

The scene in your program right now probably looks a bit like the one in the screen shots, but the boxes have bright colors on them rather than a nice wooden texture. To add the texture, swap out this call to [MeshNormalMaterial][normal]:

```
var material = new THREE.MeshNormalMaterial({
	wireframe : wireFrame
});
```

Put this call to [MeshLabertMaterial][material] in its place:

```javascript
var loader = new THREE.TextureLoader();
var material = new THREE.MeshLambertMaterial({
	map : loader.load('images/crate.jpg')
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

Call the **addSphere** method just after your **for loop** in the **addCubes** method. Be sure to pass in the correct x and y parameters so the sphere appears at the end of our aisle, as shown in the screen shots above. (Hint, start with something like 2 and -7.)

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

## A Little CSS {#css-border}

To get rid of the borders around the scene:

```css
html, body {
	width: 100%;
	height: 100%;
}

body {
	background-color: #ffffff;
	margin: 0;
	overflow: hidden;
	font-family: arial;
}
```

## JSCS Ignore

We should ignore certain files in **.jscsrc**:

<pre>
"excludeFiles": ["**/node_modules/**", "**/components/**", "**/bower_components/**", "\*\*/three.js"],
</pre>

## Turn it in

Add a .gitignore file to the root of your BitBucket repository. Make sure you include both **.metadata** and **node_modules** in your .gitignore file. Put your project in your BitBucket repository. Reference for .gitignore:

- <http://www.elvenware.com/charlie/development/cloud/Git.html#the-gitignore-file>

Click the **Send Invitation** button and share your BitBucket repository with me. I'm **ccalvert** on BitBucket.


[threejs]: https://threejs.org/
