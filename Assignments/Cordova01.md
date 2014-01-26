Week03 Exercises
================

Cordova First Exercise
----------------------

- Set up your machine to use Cordova **create** command to create
a Cordova project.
- Create a project called Cordova01-LastName
- Create the project and deploy it to the emulator, AndroidX86 or your
device. 
- Take a screenshot of your program running
- Put both your project and your screenshot in Git

###Alternative way to create Cordova project:

	npm install -g cordova

Now go to your temp directory:

	cordova create Cordova01
	cordova platform add android

Then just open Eclipse and Import **C:\\Temp\\Cordova01**, using the same 
steps we have described elsewhere.

On the MAC, you might want to try this:

	npm install -g cordova
	cordova create Cordova01
	cordova platform add ios

I can't test on the MAC, however.

Second Assignment
-----------------

- Create a second project called Cordova02-LastName
- Allow the user to enter a value in Fahrenheit and convert to
Celsius
- Allow the user to enter a value in miles and convert to 
kilometers
- Allow the user to enter a number and calculate the Square Root
- Make the background of the form have some color
- Set a custom font for headers and paragraph elements.
- So you need: HTML, CSS, and JavaScript to make it work.

The design is pretty much up to you. For instance:

- One input area and three buttons.
- Three input areas and one button
- Three input areas and three buttons
- Something else

It's your choice. Here is some information on how to get buttons and
input controls talking to one another with jQuery:

- [jQuery, Buttons, InputControls](http://elvenware.com/charlie/books/CloudNotes/Prog272/Resources.html#working-with-buttons-input-controls-and-jquery)

All three conversion methods should be in a single JavaScipt object.
Whether the object is a function or conventional JavaScript object
is up to you.

```
var myObject = {
	func: function() {},
	func2: function() {}
}

var MyObject = function() {
	function func() {};
	function func2() {};
} 
```

Remember:

- HTML in HTML files, JavaScript in JavaScript files, CSS in CSS files
- Make sure your code is properly formated
- Provide unit tests for conversion methods.
- Pay attention to naming conventions! Don't call things myObject or
func. Create meaningful names.
