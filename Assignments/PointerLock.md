# PointerLock

As mentioned earlier, navigating through a scene with the keyboard and mouse can be a tricky task. Fortunately, there is existing code for doing. In this assignment, we will add that code to our existing project.

## The HTML

The first step is to show HTML that tells the user to start game. Put this code in index.jade:

```
extends layout

block content

  div#blocker(style='display: -webkit-box;')
    div#instructions(style='')
      span(style='font-size:40px') Click to play
      p (W, A, S, D = Move, SPACE = Jump, MOUSE = Look around)
```

Here is the CSS:

```

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

#content { 
    display: block;
}


#blocker {

	position: absolute;

	width: 100%;
	height: 100%;

	background-color: rgba(0,0,0,0.5);

}

#instructions {

	width: 100%;
	height: 100%;

	display: -webkit-box;
	display: -moz-box;
	display: box;

	-webkit-box-orient: horizontal;
	-moz-box-orient: horizontal;
	box-orient: horizontal;

	-webkit-box-pack: center;
	-moz-box-pack: center;
	box-pack: center;

	-webkit-box-align: center;
	-moz-box-align: center;
	box-align: center;

	color: #ffffff;
	text-align: center;

	cursor: pointer;

}
```

##PointerLock Implementation

Here is my (slightly modified) version of the the boilerplate PointerLock code. This is from the [Three.js site][plc], and is used widely. Put it in a file called **PointerLockControls.js**:

[plc]: https://github.com/mrdoob/three.js/blob/master/examples/js/controls/PointerLockControls.js

```
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.PointerLockControls = function(camera) {

    var scope = this;

    camera.rotation.set(0, 0, 0);

    var pitchObject = new THREE.Object3D();
    pitchObject.add(camera);

    var yawObject = new THREE.Object3D();
    yawObject.position.y = 10;
    yawObject.add(pitchObject);

    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;

    var isOnObject = false;
    var canJump = false;

    var prevTime = performance.now();

    var velocity = new THREE.Vector3();

    var PI_2 = Math.PI / 2;

    var onMouseMove = function(event) {

        if (scope.enabled === false) return;

        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        yawObject.rotation.y -= movementX * 0.002;
        pitchObject.rotation.x -= movementY * 0.002;

        pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, pitchObject.rotation.x));

    };

    var onKeyDown = function(event) {

        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                moveForward = true;
                break;

            case 37: // left
            case 65: // a
                moveLeft = true;
                break;

            case 40: // down
            case 83: // s
                moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                moveRight = true;
                break;

            case 32: // space
                if (canJump === true) velocity.y += 350;
                canJump = false;
                break;

        }

    };

    var onKeyUp = function(event) {

        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                moveForward = false;
                break;

            case 37: // left
            case 65: // a
                moveLeft = false;
                break;

            case 40: // down
            case 83: // s
                moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                moveRight = false;
                break;

        }

    };

    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

    this.enabled = false;

    this.getObject = function() {

        return yawObject;

    };

    this.isOnObject = function(boolean) {

        isOnObject = boolean;
        canJump = boolean;

    };

    this.getDirection = function() {

        // assumes the camera itself is not rotated

        var direction = new THREE.Vector3(0, 0, -1);
        var rotation = new THREE.Euler(0, 0, 0, "YXZ");

        return function(v) {

            rotation.set(pitchObject.rotation.x, yawObject.rotation.y, 0);

            v.copy(direction).applyEuler(rotation);

            return v;

        }

    }();

    this.update = function() {

        if (scope.enabled === false) return;

        var time = performance.now();
        var delta = (time - prevTime) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        if (moveForward) velocity.z -= 400.0 * delta;
        if (moveBackward) velocity.z += 400.0 * delta;

        if (moveLeft) velocity.x -= 400.0 * delta;
        if (moveRight) velocity.x += 400.0 * delta;

        // I've changed this code to stop all movement if we 
        // are about to hit something. Compare to original 
        // which only set y.
        if (isOnObject === true) {

            velocity.y = Math.max(0, velocity.y);
            velocity.x = 0;
            velocity.z = 0;

        }

        yawObject.translateX(velocity.x * delta);
        yawObject.translateY(velocity.y * delta);
        yawObject.translateZ(velocity.z * delta);

        if (yawObject.position.y < 10) {

            velocity.y = 0;
            yawObject.position.y = 10;

            canJump = true;

        }

        prevTime = time;

    };

};
```

Remember that you will need to modify both **Main.js** and the top of **Control.js**. You need to make these changes so that **require** will know how to load these two new files. We have already seen how to make those changes with **Floors.js**, now apply the same knowledge to **PointerLockControls** and **PointerLockSetup**. Remember that **PointerLockControls.js** will need to be shimmed in.

##PointerLockSetup

Here is a file I put together to help automate the process of loading the PointerLockControl code:

```
define(['PointerLockControls'], function(pointerLock) {

    'use strict';

    var element;
    var blocker, instructions;

    function PointerLockSetup(controls) {

        blocker = document.getElementById('blocker');
        instructions = document.getElementById('instructions');

        var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

        if (havePointerLock) {

            element = document.body;

            var pointerlockchange = function(event) {

                if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {

                    controls.enabled = true;

                    blocker.style.display = 'none';

                } else {

                    controls.enabled = false;

                    blocker.style.display = '-webkit-box';
                    blocker.style.display = '-moz-box';
                    blocker.style.display = 'box';

                    instructions.style.display = '';

                }
            };

            var pointerlockerror = function(event) {

                instructions.style.display = '';

            };

            // Hook pointer lock state change events
            document.addEventListener('pointerlockchange', pointerlockchange, false);
            document.addEventListener('mozpointerlockchange', pointerlockchange, false);
            document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

            document.addEventListener('pointerlockerror', pointerlockerror, false);
            document.addEventListener('mozpointerlockerror', pointerlockerror, false);
            document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

            instructions.addEventListener('click', function(event) {

                instructions.style.display = 'none';

                // Ask the browser to lock the pointer
                element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

                if (/Firefox/i.test(navigator.userAgent)) {

                    var fullscreenchange = function(event) {

                        if (document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) {

                            document.removeEventListener('fullscreenchange', fullscreenchange);
                            document.removeEventListener('mozfullscreenchange', fullscreenchange);

                            element.requestPointerLock();
                        }

                    };

                    document.addEventListener('fullscreenchange', fullscreenchange, false);
                    document.addEventListener('mozfullscreenchange', fullscreenchange, false);

                    element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

                    element.requestFullscreen();

                } else {
                    element.requestPointerLock();
                }

            }, false);

        } else {

            instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

        }
    }

    return PointerLockSetup;

});
```

##Initialize

Let's move the code to initialize the engine out of the constructor and into a method called **init**:

```
function Control() {
	init();
	animate();
}
```

We now start the app by first initializing our engine, and by then rendering the game in our render loop.

You will need to declare a object scoped variables called **size** and **cubes**. Set **size** equal to 20. In **addCube**, when you create the cube, make it size X size X size square, like this:

	var geometry = new THREE.BoxGeometry(size, size, size);

And when you create a cube, in **addCube**, you need to call **cubes.push(cube)**, where cubes is an object scoped array (var cubes = []).
 
After you make the cubes bigger, you are going to have to change the way you lay out the boxes. They are now much bigger than they were before and so they will be further apart.


The init method looks like this:

```
function init() {

	var screenWidth = window.innerWidth / window.innerHeight;
	camera = new THREE.PerspectiveCamera(75, screenWidth, 1, 1000);

	scene = new THREE.Scene();
	scene.fog = new THREE.Fog(0xffffff, 0, 750);

	addCubes(scene, camera, false);

	doPointerLock();

	addLights();

	var floors = new Floors();
	floors.drawFloor(scene);

	raycaster = new THREE.Raycaster(new THREE.Vector3(), 
		new THREE.Vector3(0, -1, 0), 0, 10);

	renderer = new THREE.WebGLRenderer({ antialias : true });
	
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	window.addEventListener('resize', onWindowResize, false);
}
```

## Set up PointerLock
Here is a function to instantiate an instance of the PointerLockControls:

```
function doPointerLock() {
	controls = new THREE.PointerLockControls(camera);
	var yawObject = controls.getObject();
	scene.add(yawObject);
	
	// Move camera to the 1, 1 position
	yawObject.position.x = size;
	yawObject.position.z = size;

	var ps = new PointerLockSetup(controls);
}
```

Note that we create an instance of **PointerLockControls** and store it in a variable called controls. That instance is scoped to be visible inside the entirety of the Controls. It has object scope. 

## Render or Animate

Here is a function to replace our previous render method. Note that I have changed the name from **render** to **animate**.

```
function animate() {

	requestAnimationFrame(animate);

	var xAxis = new THREE.Vector3(1, 0, 0);

	controls.isOnObject(false);

	var controlObject = controls.getObject();
	var position = controlObject.position;
				
	// drawText(controlObject, position);

	collisionDetection(position);

	// Move the camera
	controls.update();

	renderer.render(scene, camera);
}
```

## Collision Detection

Another complicated subject is collision detection. In particular, we need to know if our main character (the camera) bumps into a wall. We can't have the main character walking through walls if we want this world to make sense to the user. 

In a 2D world it is fairly easy to decide when the main character has bumped into something. Writing such code a 3D world is more complex because objects could be not only in front, behind, or the side of our main character, but also above or below or at some odd angle. 

It turns out that the solution for this problem is found by "looking around" with a technology called ray casting. A "ray" shoots out from the camera at various angles. If it pumps into something, then that information is stored and can be acted upon.

Here is some code to that does at least a fair job of detecting collisions:

```
function collisionDetection(position) {
	// Collision detection
	raycaster.ray.origin.copy(position);
	// raycaster.ray.origin.y -= 10;
	var dir = controls.getDirection(new THREE.Vector3(0, 0, 0)).clone();
	raycaster.ray.direction.copy(dir);

	var intersections = raycaster.intersectObjects(cubes);

	// If we hit something (a wall) then stop moving in
	// that direction
	if (intersections.length > 0 && intersections[0].distance <= 215) {
		console.log(intersections.length);
		controls.isOnObject(true);
	}
}
```

Note that the code sets **controls.isOnObject** to true if a collision occurrs.

## Text 

Let's add some text.

Put this in your CSS:

```
#message { 
    /* background-color: #7777AA; */
    background-color:rgba(0,255,0,0.5);
    position: absolute;
    left: 0.5em;    
    width: 250px;
    font-size: 10px;
    border: solid black 2px;
}
```

Add some text to index.jade that says **Isit320_LastName**, where LastName is your last name. On the next line, put three paragraph elments and assign it an ID. Implement the stubbed out **drawText** in the animation loop. Have it use jQuery or standard HTML to show the position of the main character. Use this data to display values in the HTML elements:

	$('#cameraX').html(position.x);

And so on for y and z and anything else you want to display. The HTML will be generated by a jade script that includes this:

```
  div#message
    p
      strong CameraX: 
        span#cameraX Foo
```

##Turn it in

Check the code into your BitBucket repository as **Week03_PointerLock**. When you submit the code, include the URL of your repository.

> by [Charlie Calvert](http://elvenware.com/charlie).