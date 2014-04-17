#Express and JQuery In Class

Create a new express app.

Create a JavaScript file called **ExpressJquery.js**. Put the following code in it:

    var MyObject = (function() {

        function MyObject() {
        }
        
        MyObject.prototype.readyCalled = function() {
            $("#readyCalled").html("Ready was called and myObjected created");
        }
        return MyObject;
    });


    $(document).ready(function() {
        var myObject = new MyObject();
        myObject.readyCalled();
    });


Use Jade to create a button and two paragraphs:

    button#sendString Send String
    p#stringHolder
    p#readyCalled
    
Add a button to index.jade with an id of **sendString**. Use the constuctor of **myObject** to set
up a handler for the button click. Create a private method called **stringSender** that places
a string in your paragraph.