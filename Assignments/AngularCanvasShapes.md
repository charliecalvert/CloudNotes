---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/AngularCanvasShapes.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: AngularCanvasShapes.md
relativePath: /AngularCanvasShapes.md
title: AngularCanvasShapes
directoryName: Assignments
category : assignments-guide
---

# Angular Canvas Shapes

This assignment covers two topics:

- Angular modules, controllers and factories. 
- HTML5 Canvas (Draw 2D objects)

We have covered the Angular bits in class. The only difference, is that this time we will put one **factory** in its own file. Hopefully this will help you to see how you can use **modules**, **factories** and controllers to divide your code up into discreet, loosely coupled, objects.

The HTML5 Canvas, however, we have not covered, so I will give you most of the code for that part of the assignment.

This assignment is the first of two assignments on learning about Angular and the HTML5 Canvas. The second part will involve Angular Directives, which are needed to properly render our 2D objects. However, we can introduce much of what needs to be known in this assignment and then learn about Directives in class on Monday.

![AngularCanvas](https://drive.google.com/uc?id=0B25UTAlOfPRGenp0eVJOc1lFSjQ)

## Step One:

Use the one module, two factories and a controller technique to create an application. Details on how to proceed are found in the **Angular Controller Shapes** assignment and in the links included in that assignment:

- [Angular Controller Shapes][angShapes]

Details:

- Module: **elvenApp**
- ControllerAs: **ShapeController as shapeController**
- Factories: **line**, **rectangle**, **drawMachine**

Files:

- **index.js**
- **drawMacine.js**
- **index.html**
- **angular.js** (with Bower....)

Project Folder:

- **Week04-AngularCanvasShapes**

[angShapes]:http://www.ccalvert.net/books/CloudNotes/Assignments/AngularControllerShapes.html

## Step Two:

We will create a factory that contains an object that knows how to draw rectangles and lines on the HTML5 Canvas element.  To achieve this goal, put the following code in a file called **draw-machine.js**:
 
```JavaScript

(function() {

    angular.module('elvenApp')
        .factory('drawMachine', function() {

            var context;

            function Draw() {
            }

            Draw.prototype.init = function(contextInit) {
                context = contextInit;
                context.lineWidth = 1;
            };

            Draw.prototype.setColor = function(colorInit) {
                context.strokeStyle = colorInit;
            };

            Draw.prototype.drawRectangle = function(x, y, rectWidth, rectHeight) {
                context.strokeRect(x, y, rectWidth, rectHeight);
            };

            Draw.prototype.drawLine = function(x, y, x1, y1) {
                context.beginPath();
                context.moveTo(x, y);
                context.lineTo(x1, y1);
                context.closePath();
                context.stroke();
            };

            return new Draw();
        });

})();

```

Notice that this code has three useful methods. In particular, it can:

- Set the color of the shapes you want to draw
- Draw a line
- Draw a rectangle

## Step Three

Create the HTML in which the canvas object will be drawn:

```
 <div>
                <canvas id="myCanvas">
                    If you see this text, then your browser does not support the Canvas Element
                </canvas>
</div>
```

The shapes we draw will appear inside this HTML element. Though it is not necessary in this assignment, we should still put the **div** and **canvas** elements inside the **ng-controller**, as that will be necessary in future assignments.

Don't forget to load the file containing the **drawMachine** factory by adding a script tag near the top of **index.html**:

```
    <script src="draw-machine.js"></script>
```


## Step Four

Back in **index.js**,  you can use the **drawMachine** as you would any other factory. The fact that it is in another file is not important, so long as you load **draw-machine.js** with a script tag in **index.html**. 

Here is how the **line** factory can use the **drawMachine**:

```javascript

    var app = angular.module('elvenApp', []);

    app.factory('line', function(drawMachine) {
        return {
            detail: "line",
            draw: function(size) {
                drawMachine.setColor('blue');
                // Code for drawing lines left as exercise for the reader...
            }
    }
``` 

In addition to the **line** factory, **index.js** should also include a **rectangle** factory and your controller.

## Step Five

Once you have hold of the **drawMachine**, you must provide a Canvas **context** for it. Exactly why we do this outside the **drawMachine** will become clear in a later assignment. For now, lets do this not in the **line** or **rectangle** objects, but in the **ShapeController**, like this:

```
var myCanvas = document.getElementById('myCanvas');
var context = myCanvas.getContext('2d');
drawMachine.init(context);
```

It should be clear that the above code will not work unless you pass the **drawMachine** into the controller. We pass it in the same way we passed it to the line factory.

**NOTE**: *Please note that here and in other places, I know clearer, more precise ways to describe what I want you to do. I'm being a little elliptical because I want you to have to think just a bit about how the application is put together. If I just say: do a, do b, do c, then you can do a, b and c without ever understanding what you are doing. I'm trying to help you not just do something by wrote, but to understand what you are doing. Also, it is more fun if there are at least a few puzzles for you to solve. And finally, we want to develop problem solving skills, and we can't do that unless we have some problems to solve.* 

## Step Six

We need to provide a means for the user to ask the program to draw our shape. In later assignments I will show ways to get it to draw automatically without a request from the user. But for now, we will put a button on the View, and call a **drawShape** method:

    <button ng-click="shapeController.drawShape()">Draw Shape</button>

The drawShape method could look something like this:

```
   shapeControl.drawShape = function() {
            var shapeSize = {
                START_X: 10,
                START_Y: 10,
                WIDTH: 280,
                HEIGHT: 130
            };
            var myCanvas = document.getElementById('myCanvas');
            var context = myCanvas.getContext('2d');
            drawMachine.init(context);
            line.draw(shapeSize);
            // What line is missing here? The answer is left as an exercise for you know who....
    }
```

Remember, this is what we want the program to look like after the user presses the button:

![AngularCanvas](https://drive.google.com/uc?id=0B25UTAlOfPRGenp0eVJOc1lFSjQ)

You will have to experiment a bit to see how to use the data in **shapeSize** to create a shape with, for instance, the **rectangle** factory and the **drawMachine.drawRectangle** method. Note the parameters passed to the **drawRectangle** method and do the best you can to figure out how to call it with the data provided in **shapeSize**.

The text above the button is present before the button is clicked. Of course, the words **line** and **rectangle** that appear in the view are not hard-coded into the HTML. Instead, they are rendered by Angular expressions as they were in previous assignments:

    {{shapeController.line}} 

## Turn it in 

Put your code in your repository in a directory with the name specified in **Step One**. Submit the assignment and provide the usual information, using your common sense and past experience to determine exactly what information you think I need. If you get stuck, remember it you can ask questions in the discussion area. Also, it is much better to turn in something not completely perfect rather than nothing.