---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/CanvasTest.md
relativePath: Assignments/CanvasTest.md
title: CanvasTest
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: CanvasTest.md
fileNameHTML: CanvasTest.html
---


<!-- toc -->
<!-- tocstop -->

# Canvas Test

Create a program with an HTML canvas and draw some rectangles on it.


Submit the CanvasTest project that we did in class:

 

First declare the canvas in the HTML:

 

 div
        <canvas id="myCanvas" width="200" height="200" style="border:1px solid #000000;"></canvas>

 

Canvas Object:

  var c = document.getElementById("myCanvas");
  var context = c.getContext("2d");
  context.fillStyle = "#FF0000";
  context.fillRect(0, 0, 10, 10);
 

Like this

window.onload = function() {
    var blockSize = 10;
    for (var i = 0; i < 5; i++) {
Put everything in a folder called Week05_CanvasTest and check it in.