#Express and JQuery In Class

Create a new express app.

In the **public/javascripts** folder create a JavaScript file called **ExpressJquery.js**. Modify **layout.jade** to include this file. Put the following code in it:

    var MyObject = (function() {

        function MyObject() {
        }
        
        MyObject.prototype.readyCalled = function() {
            $("#readyCalled").html("Ready was called and myObjected created");
        }
        return MyObject;
    }());


    $(document).ready(function() {
        var myObject = new MyObject();
        myObject.readyCalled();
    });


In **index.jade** use Jade to create a button and two paragraphs:

    button#sendString Send String
    p#stringHolder
    p#readyCalled
    
Add a button to index.jade with an id of **sendString**. Use the constuctor of **MyObject** to set
up a handler for the button click. Create a private method of **MyObject** called **stringSender** that places
a string in your **stringHolder** paragraph.