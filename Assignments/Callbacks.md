#Callbacks

Create a function named **callbackHandler** that takes three parameters. The first parameter is
a callback (that is, a function), the other two parameters are integers.

Now call the function the three times:

- First pass a function that adds the second and third parameters.
- Pass a function that returns the remainder from dividing two numbers (modulus operator)
- Pass a function that converts the second parameter from miles to feet

The **callbackHandler** function that you create should use jQuery to display the results of your function calls. Use
a list to display the result:

The HTML:

    <ul id="myList"> </ul>

In Jade, that would be:

    ul#myList

The JavaScript to display the result of your function calls:

    $("#myList").append("<li>" + result + "</li>");

## Turn it in

Place it in your git folder under the name Week02-Callbacks. Provide a link to your folder.

