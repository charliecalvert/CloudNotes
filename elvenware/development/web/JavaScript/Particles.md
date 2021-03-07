# Particles

## Refactoring

Let's performs some refactoring. Our utility methods go in a file called **Utilities.js**. Make sure it is require ready, that is, make sure it includes a define method.

It should contain to methods:

```
        showDebug : function(data) {
            console.log(data);
        },

        showError : function(request, ajaxOptions, thrownError) {
            showDebug("Error occurred: = " + ajaxOptions + " " + thrownError);
            showDebug(request.status);
            showDebug(request.statusText);
            showDebug(request.getAllResponseHeaders());
            showDebug(request.responseText);
        }
```
Put this method inside a simple JavaScript and return that object at the bottom of the file, per the usual system for require.

Some files that you might have in your project:

- Particles.js - Draw the particle system
- Shapes.js - Load the shape objects such as the star.
- Buildings.js (or Walls.js or Maze.js) - Draw the maze
- Floor.js - Draw the floor
- Controls.js - The main hub for your project
- Utilities.js - Any simple routine that you want to be able to reuse
- Main.js - The require file

You could also go to GenMyModel, create an account, and draw a UML diagram of your project. 

## Display a Simple Particle System

Create a file called **Particles.js**. Set it up so it with a define method so it can be loaded with **require**. Don't forget to add new files to **Main.js**!

The Icosahedron is in the shape of a sphere, so our particles, taken together, form a sphere.

```
function showParticles(scene, x, y) {
   var geometry = new THREE.IcosahedronGeometry(10, 2);
   var material = new THREE.PointCloudMaterial({
       color : 0x00AA00,
       size : 0.2
   });
   var particleSystem = new THREE.PointCloud(geometry, material);
   particleSystem.position.set(x, 10, y);
   scene.add(particleSystem);
   particles.push(particleSystem);
}
```

## Rotate Particles

Make all the particles rotate like a spinning sphere:

```
Particles.prototype.rotateParticlesAroundWorldAxis = 
    function(axis, radians, npc) {
        if (npcs.length > 0) {
            for (var i = 0; i < npcs.length; i++) {
                var object;
                if (npc === true) {
                    object = npcs[i];
                } else {
                    object = particles[i];
                }

            that.rotWorldMatrix = new THREE.Matrix4();
            that.rotWorldMatrix.makeRotationAxis(axis.normalize(),
                    radians);

            that.rotWorldMatrix.multiply(object.matrix); // pre-multiply

            object.matrix = that.rotWorldMatrix;

            object.rotation.setFromRotationMatrix(object.matrix);
        }
    }
};            
```

Declare a variable called **animateNpc** at the top of **Control.js** with object scope. Then in **animate()**, you can call **rotateAparticlesAroundWorldAxis** like this:

```
var xAxis = new THREE.Vector3(1, 0, 0);
particles.rotateParticlesAroundWorldAxis(xAxis, Math.PI / 180, animateNpc);
animateNpc = !animateNpc;
```

## Put Particles Where NPCs Are

Load in the NPC grid, iterate over it, and draw particles.

```
Particles.prototype.initNpc = function(fileName, scene, camera) {
    $.ajax({
        url : fileName,
        cache : false,
        type : "GET",
        dataType : "json",
        success : function(gridData) {
            utilities.showDebug('Opening file: ' + fileName);
            for (var i = 0; i < gridData.length; i++) {
                var shapeType = 4;
                console.log(gridData[i]);
                for (var j = 0; j < gridData[0].length; j++) {
                    var npcValue = gridData[j][i];
                    if (npcValue !== 0) {
                        console.log("npcValue: ", npcValue);
                        // addShape(shapeType, scene, camera, j, i, npcValue);
                        showParticles(scene, j * size, i * size);
                    }
                }
            }
        },

        error : utilities.showError
    });
};
```

Here is the Npc000.json:

```
[
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 5, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
]
```

##Load Shapes

For this code to work, you need to get **OBJMTLLoader.js** and **MTLLoader.js**.  These files are from the examples directory in Mr. Doops big zip file that you get from the [threejs downloads page](http://threejs.org/). I think it is wise it download the whole zip file, unzip it, then get a copy of **three.js** from the **build** folder and the other files from: **examples\js\loaders**. Here is the Shapes.js file, that you should not have to modify:

```
/**
 * Shapes
 * 
 * @author Charlie Calvert
 */

define([ 'MTLLoader', 'OBJMTLLoader', 'ColladaLoader' ], 
        function(MTLLoader, OBJMTLLoader, ColladaLoader) {

    function Shapes() {

    }

    Shapes.prototype.addStarObject = function(npcs, scene, camera, wireFrame, x, y) {
        var loader = new THREE.OBJMTLLoader();
        loader.load('mesh/20facestar.obj', 'mesh/20facestar.mtl', function(
                object) {
            object.position.set(x, 10, y);
            scene.add(object);
            npcs.push(object);
        });
    }

    Shapes.prototype.addBuilding = function(scene, camera, wireFrame, x, y) {
        var meshes = [ 'mesh/untitled.dae', 'mesh/facestar.dae',
                'mesh/Medieval_building.DAE' ];
        var loader = new THREE.ColladaLoader();
        loader.load(meshes[0], function(result) {
            result.scene.position.set(x, 6, y);
            scene.add(result.scene);
        });
    }

    Shapes.prototype.addBuildingObject = function(scene, camera, wireFrame, x, y) {
        var loader = new THREE.OBJMTLLoader();
        loader.load('mesh/RuralStallObj/RuralStall.obj',
                'mesh/RuralStallObj/RuralStall.mtl', function(object) {
                    object.scale.set(0.03, 0.03, 0.03);
                    object.position.set(x, 0, y);

                    scene.add(object);
                    npcs.push(object);
                });
    }

    Shapes.prototype.addNumber = function(scene, camera, wireFrame, x, y, npcValue) {
        // create a canvas element
        var canvas1 = document.createElement('canvas');
        var context1 = canvas1.getContext('2d');
        context1.font = "Bold 8px Arial";
        context1.fillStyle = "rgba(55,255,55,0.95)";
        context1.fillText('Hello, world!', 0, 50);

        // canvas contents will be used for a texture
        var texture1 = new THREE.Texture(canvas1);
        texture1.needsUpdate = true;

        var material1 = new THREE.MeshBasicMaterial({
            map : texture1,
            side : THREE.DoubleSide
        });
        material1.transparent = true;

        var mesh1 = new THREE.Mesh(new THREE.PlaneGeometry(
                canvas1.width, canvas1.height), material1);
        mesh1.position.set(x, 6, y);
        scene.add(mesh1);
    }

    /*
     * var calcRotation = function ( obj, a) { var euler = new THREE.Euler( 0,
     * a, 0, 'XYZ' ); obj.rotation.applyEuler(euler); };
     */

    return Shapes;
});
```

Call **addStarObject** something like this:

```
addStarObject(npcs, Scene, Camera, false, x, z);
```

**npcs** is an array to hold the star objects you create, in case you need them later. The values x and z are the location where you want the star object to appear.

Here are the two pieces of the 20facestar object wrapped in a zip file. I think it is the only one you need for now:

- [20FaceStar](http://www.elvenware.com/charlie/downloads/20facestar.zip)

If you have trouble working with these files, let me know. I orignally got them here: 

- [TurobSquid](http://www.turbosquid.com/FullPreview/Index.cfm/ID/535674)

There are several formats available, and we are using the OBJ.

For those who want to start creating their own shapes, here is blender:

- [Blender](http://www.blender.org/)

It is open source and works on Windows, Linux and the Mac. There are, no doubt, better 3D tools out there, but this one is good, and it is free and cross platform.

##Turn it in

Put your project in your repository as Week05_Particles.
Attach a bitmap showing the UML diagram you created.