---
creationLocalTime: 5/30/2022, 10:14:46 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/jquery-guide/JQueryRestAjax.md
relativePath: jquery-guide/JQueryRestAjax.md
title: JQueryRestAjax
queryPath: jquery-guide/
subject: jquery-guide
fileNameMarkdown: JQueryRestAjax.md
fileNameHTML: JQueryRestAjax.html
---


<!-- toc -->
<!-- tocstop -->

## JQuery Load

Use the [jQuery.load()](http://api.jquery.com/load/) method to enable
Ajax. The goal is to load not a whole page, but part of a page. From
the user's perspective, the page is changing, morphing, as they look at
it. This saves a great deal of time as it means that a trip back to the
server to retrieve and reload an entire page is not necessary. The
benefits are faster response, and less blinking, less refreshing of the
entire screen.

**jQuery.load()** takes two parameters:

- The URL to load (Must be in same domain)
- A callback function

Here is an example call:

```javascript
$('#container').load(URL + '#content', hijackLinks);
```

This code changes the part of the document with the id **container**. It
replaces that element with the content from a document referenced by a
URL.

- Load into the \#container of current document
- The \#content from the document referenced by URL
- **hijackLinks** is the callback.
- The callback is called after the URL is loaded

Here is another example, which shows how to print out an error message.

```javascript
$("#data01").load("../data.html #div01", function(response, status, xhr) {
   if (status == "error") {
       var msg = "Error loading data.html: <br /> ";
       $("#error").html(msg + xhr.status + " " + xhr.statusText);
   }
});
```

Notice that you need a html element, such as a paragraph tag, to display
your error message. For instance, you might insert a tag in your HTML
file that looks like this:

```html
<p id="error"> </p>
```

Reporting errors is not just a nicety, it is a necessity. It is helpful
to the user, and invaluable for the developers who put the code
together. If you want to help yourself, then begin by reporting errors
correctly.

## jQuery and REST

There are details about the REST specification that I don't understand yet. But in general terms, REST is what we do when we send commands from a client to a server using a URL. In particular, it is about sending a request to a server and get data such as an XML or JSON document in return, but I don't think it is limited to that. If we compose a URL and get an HTML document in return, then I still think of that is making a REST call.

In this discusison I'm talking about the kind of URL that appears in the address bar of a browser:

```html
http://localhost:30025/read
http://localhost:30025
http://localhost
http://www.google.com
```

All of the above are simple HTTP commands that humans can give when using the web. They are also REST calls. The idea of REST is that there is no need for a big, complex framework in order to use the web. We can just compose URI/URLs like the ones above. The core idea here is that simple HTTP, as it was meant to be used by humans, is powerful enough to also allow programmers to get their work done. In fact, it is probably the best, most flexible, and most powerful way for them to get their work done.

**NOTE**: *URL and URI are equivalent terms. Everyone calls them URLs, but some web committees like to call them URIs just to cause confusion.*

Remember that we can create these URLs by calling jQuery methods like **\$.getJSON**, **\$.load**, **\$.get** and **\$.ajax**. Suppose we write this:

```html
http://localhost:30025/read?operanda=1&operandb=2
```

or this:

```javascript
$.getJSON(/read, {operanda: 1, operandb: 2}, function(resultFromServer) {

})
```

Both the URL and the \$.getJSON calls invoke the **/read** route on the server. They both pass the server two parameters called **operanda** and **operandb**. Both calls above are equivalent in that *they send the same HTTP packet* from the client to the server. They are both REST calls. The server can't tell whether the call was made by typing in a URL in the address bar, or by calling **\$.getJSON** or **\$.ajax**. It looks exactly the same on the server end. In particular, **request.query** ends up with the same data, and so do all the other fields in the huge **request** object. They both use REST to allow the client to invoke methods on the server.

I should point out, that in general, when developers say REST, they are talking about composing URLs and requesting data, rather than HTML pages, in return. If you ask for and receive an XML or JSON document, then you are using the **programmable web** rather than the **human readable web**. To me, both are forms of REST calls, but I think most people mean the **programmable web** when they are talking about REST.

You need to look at REST as a contrast to other, more complex technologies, such as:

- SOAP
- WSDL
- WS-Notification
- WS-Security
- Corba

All of these summon reams of complex code and huge object oriented frameworks to make calls like the ones we show above. For years, everyone thought these big web solutions were the way to program the web. This happened in part, I believe, because companies could sell these complex frameworks for huge sums of money. But it turned out that REST worked just as well, and in many cases much better, than these big web frameworks.

You can read an entire book on REST here for free:

- [http://restfulwebapis.org/RESTful_Web_Services/](http://restfulwebapis.org/RESTful_Web_Services/)

The book is also available for download.

## jQuery getJSON

The jQuery **getJSON** method is a wrapper around the **ajax** method. It looks like
this:

```javascript
$.getJSON('index.json', function(data) {
      var name = data[0].firstName;
      $("#firstName").html(name);
      $("#lastName").html(data[0].lastName);
  }).success(function() { console.log("success"); })
    .error(function(jqXHR, textStatus, errorThrown) { alert("error calling JSON. Try JSONLint or JSLint: " + textStatus); })
    .complete(function() { console.log("complete"); });
```

The code shown above will parse JSON that looks like this:

```json
[
    {
        "firstName": "George",
        "lastName": "Washington"
    }, {
        "firstName": "John",
        "lastName": "Adams"
    }, {
        "firstName": "Thomas",      
        "lastName": "Jefferson"
    }
]
```

```javascript
$.getJSON("index.json", function(data) {
   $.each(data, function(index, president) {
       $('#data01').append("<p>" + president.firstName + ' ' + president.lastName + "</<p>");
   });
});
```

## jQuery Ajax with JSON

The [$.ajax()](http://api.jquery.com/jQuery.ajax/) method is one of the most
important in the entire jQuery library. It allows us to make asynchronous
calls to the server. Both $.getJSON and $.load use $.ajax to do their actual
work. They are just wrappers around calls to ajax. They are simpler to use
than ajax, but nevertheless they too end up being calls to $.ajax.

You can invoke at least some of the standard HTTP verbs
when making the call. For instance, you can perform an HTTP GET or HTTP
POST. Other verbs may be supported, depending on the browser you are using.

Here is a sample ajax call from the
[SimpleReadWrite](https://github.com/charliecalvert/JsObjects/) program in
JsObjects:

```javascript
var writeJson = function() {
 var userInput = {
  firstName: $('#firstName').val(),
  lastName: $('#lastName').val(),
  age: $('#age').val()
 };

 $.ajax({
  type: 'GET',
  url: '/write',
  dataType: 'json',
  data: userInput,
  success: function(data) {
   showDebug(data.result);
  },
  error: showError      
 });
};
```

**NOTE**: *There are two other programs in JsObjects/JavaScript/NodeCode that
also demonstrate code shown in this section and the immediately succeeding
sections of this HTML file. In particular, see SimpleReadWriteJson02 and
SimpleReadWriteJson03.*

The primary purpose of this method is to invoke code on a server. It also
passes data to the server, and processes the data sent back from the server.

First, let's look at the data we are passing to the server:

```javascript
 var userInput = {
  firstName: $('#firstName').val(),
  lastName: $('#lastName').val(),
  age: $('#age').val()
 };
```

This is a simple JavaScript object that can be passed as JSON. It pulls values
from three input controls defined in an HTML file:

```html
<input type="text" id="firstName" value="firstName">
<input type="text" id="lastName" value="lastName">
<input type="text" id="age" value="age">
```

Here is what it looks like on screen:

![The SimpleReadWriteJson Program](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/javascript/Ajax01.png)

When the user's input is retrieved from the input controls, the data object might
look like this:

```javascript
 var userInput = {
  firstName: Mary,
  lastName: Lu,
  age: 52
 };
```

This information is passed in the **data** setting for the ajax call:

```javascript
 $.ajax(
  {
    type: 'GET',
    url: '/write',
    dataType: 'json',
    data: userInput, etc...
    })
```

Notice that we also use the settings specify that we want to perform an HTTP
GET, to send and receive data using JSON, and that we want to use a route to the
server (a url) called **write**. In our case, this latter bit of information
signifies that we want to call the following Node Express method on our server:

```javascript
 app.get('/write', function(request, response) {
  console.log('Write called: ' + request.query);
  // Code omitted here....
  response.send('{"result":"success"}');
 });
```

For now, let's not concern ourselves with main body of the method. Just notice
two things about it, the route and the response:

```javascript
app.get('/write'
response.send('{"result":"success"}');
```

As you can see, the route in the server matches the url in the client:

- url: '/write',
- app.get('/write'

It is this correspondance that makes it possible for the client to call a
particular method on the server.

At this stage we have covered all the major parts of this Ajax call except for
two key pieces:

- The success function
- the error function

Because each of these pieces of the call are so important, I will show give
them each their section in the text.

## Addition Example

Let's append an **add** method to our project. It will involve a call from the client to the server. Here are the steps:

- The user enters data on the client.
- The data is sent to the server.
- The server performs an addition operation on that data and sends back a result.

The implementation is relatively straight forward. We complete these steps:

- Get input from the user.
- Make a request from the client to the server.
- Send back a response.

Set up the interface in index.jade/pug:

```html
button#add Add

input#operatorA(type='number', value='2')
input#operatorB(type='number', value='3')
```

For the add method, on the client side, in **public/javascripts/control.js**, you need code like this:

```javascript
$('#add').click(add);

function add() {
    var operatorA = $('#operatorA').val();
    var operatorB = $('#operatorB').val();
    console.log('operators:', operatorA, operatorB);
    var requestQuery = { operatorA: operatorA, operatorB: operatorB };

    $.getJSON('/add', requestQuery, function(sum) {
         console.log("Sum:", sum);
         $('#display').html('The sum is: ' + sum.sum);
    });
}
```

Let's break out the code found above. First we get the input from the user:

```javascript
var operatorA = $('#operatorA').val();
var operatorB = $('#operatorB').val();
```

Then we put it in an object literal:

```javascript
var requestQuery = {
    operatorA: operatorA,
    operatorB: operatorB
};
```

Then we send a request to the server and wait for a response.

```javascript
$.getJSON('/add', requestQuery, function(sum) {
 console.log("Sum:", sum);
 $('#addresult').html('The sum is: ' + sum.sum);
});

```

When we get the response, we display the results to the user.

On the server side, in **routes/index.js** you need code like this for the add route:

```javascript
router.get('/add', function(request, response) {
  console.log('add method called');
  console.log('The parameters are:', request.query);
  console.log('OperatorA is:', request.query.operatorA);
  var operatorA = parseInt(request.query.operatorA);
  var operatorB = parseInt(request.query.operatorB);
  response.send({ sum: operatorA + operatorB });
});
```

Let's break that code out into its constituent parts. First re get the data sent from the client:

```javascript
var operatorA = parseInt(request.query.operatorA);
var operatorB = parseInt(request.query.operatorB);
```

Then we perform a calculation and send the result back to user:

```javascript
response.send({ sum: operatorA + operatorB });
```

## The Ajax success Function

The Ajax method shown in the previous section responds like this when it
gets a callback from the server stating that the call has been successful:

```javascript
 success: function(data) {
  showDebug(data.result);
 },
```

Just to help you understand, here is the call in context:

```javascript
 $.ajax({
  type: 'GET',
  url: '/write',
  dataType: 'json',
  data: userInput,
  success: function(data) {
   showDebug(data.result);
  },
  error: showError      
 });
```

The success function is a standard callback. It is invoked when the client
receives a response from the server indicating that all went as planned. If
something goes wrong, then the **error** function is called instead of
**success**.

As you know, this is the bit of JSON sent back from the server:

 {"result":"success"}

The showDebug method simply displays the value part of this key/value pair to
the user:

```javascript
var showDebug = function(textToDisplay)
{
 $("#debug").append('<li>' + textToDisplay + '</li>');
};
```

Assuming you control both the server and the client, you are free to decide:

- What data to pass back to the success function
- What to do with the data when you can get it

Sometimes you might simply assign the data passed back from the server to a
variable in your program. At other times, you might display the result to the
user. Quite often, you will do both:

- First you assign the returned object to a variable
- Then you invoke a method that parses the data and display it to the user.

Note that you can, if you wish, pass in a success function to the method
that invokes the ajax call:

```javascript
var writeJsonPrivate = function(successFunc) {
 var userInput = {
  firstName : $('#firstName').val(),
  lastName : $('#lastName').val(),
  age : $('#age').val()
 };

 $.ajax({
  type : 'GET',
  url : '/write',
  dataType : 'json',
  data : userInput,
  success : successFunc,
  error : showError
 });
};

var writeJson = function() {
 writeJsonPrivate(function(data) {
  showDebug(data.result);
 });
};
```

Notice that in this example writeJsonPrivate takes an argument called
**successFunc**:

```javascript
var writeJsonPrivate = function(**successFunc**)
```

It is passed in as an anonymous function when the method is
invoked:

```javascript
 var writeJson = function() {
  writeJsonPrivate(function(data) {
   showDebug(data.result);
  });
 };
```

## The Ajax Error Handler

At the end of the previous section we passed in an anonymous function to handle
the success setting of the $.ajax call. Over time, I have settled on handling
the error function for $.ajax calls with the following code:

```javascript
var showError = function(request, ajaxOptions, thrownError) {
 showDebug("Error occurred: = " + ajaxOptions + " " + thrownError);
 showDebug(request.status);
 showDebug(request.statusText);
 showDebug(request.getAllResponseHeaders());
 showDebug(request.responseText);
};

var showDebug = function(textToDisplay) {
 $("#debug").append('<li>' + textToDisplay + '</li>');
};
```

The #debug selector refers to this code in an HTML file:

```html
<ul id='debug'>  </ul>
```

If an error occurs, the unordered list defined in the above HTML ends
up filled with many lines of html, as shown in the screenshot below. You
don't have to think about all the data sent by jQuery to the error handler,
but I try to display quite a bit of information as it can be useful when you
are trying to understand what went wrong. There is, in fact, even more
information passed back than I include. But when an error occurs, I find the above
information sufficient in most cases.

![Relatively sparse feedback from the error method](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/javascript/Ajax02.png)

I forced the error shown in the screen shot above by giving a bad URL. In
particular, I passed in the URL **writes** instead of **write**:

```javascript
$.ajax({
 type : 'GET',
 url : '/writes',     // Should be write not writes
 dataType : 'json',
  ...
})
```

Since there is no method on the server to handle this route, an error is thrown.
You can see the error in the screenshot shown above. In particular, look at
the last lines.

It is probably obvious that you could pass this error function to the original
method just as we passed in the **success** function:

```javascript
var writeJsonPrivate = function(successFunc, showError) {
 var userInput = {
  firstName : $('#firstName').val(),
  lastName : $('#lastName').val(),
  age : $('#age').val()
 };

 $.ajax({
  type : 'GET',
  url : '/writes',
  dataType : 'json',
  data : userInput,
  success : successFunc,
  error : showError
 });
};

var writeJson = function() {
 writeJsonPrivate(
  function(data) {
   showDebug(data.result);
  },
  function(request, ajaxOptions, thrownError) {
   showDebug("Error occurred: = " + ajaxOptions + " " + thrownError);
   showDebug(request.status);
   showDebug(request.statusText);
   showDebug(request.getAllResponseHeaders());
   showDebug(request.responseText);
  }
 );
};
```

The beauty of this latter system is that you can pass in different
**success** or **error** handlers depending on the circumstances in your
program. For instance, you can pass in this comprehensive error handler
during development, and some simpler handler for use in a shipping product.
This technique of passing in callbacks can also be very useful when writing
Unit testing code.

It is probably obvious to most readers, but I'll add one last final comment
about error handlers. You can, if you wish, include an anonymous
function attached to the original ajax call:

```javascript
$.ajax({
 type : 'GET',
 url : '/write',
 dataType : 'json',
 data : userInput,
 success :function(data) {
  showDebug(data.result);
 },
 error : function(request, ajaxOptions, thrownError) {
  showDebug("Error occurred: = " + ajaxOptions + " " + thrownError);
  showDebug(request.status);
  showDebug(request.statusText);
  showDebug(request.getAllResponseHeaders());
  showDebug(request.responseText);
 }
});
```

In the code shown above, the **success** and **error** functions are
implemented directly in the **ajax** call. I did this a lot at first, but
since I keep passing in the same error handler regardless of what kind Ajax
call I make, I am finding it simpler to pass in the method, or store it
someplace else. These variations are demonstrated in the JsObjects sample
programs called SimpleReadWriteJson02 and SimpleReadWriteJson03.

I have not tried it yet, but it might be possible to use the $.ajaxSetup()
method to define a default error handler:

- <http://api.jquery.com/jQuery.ajaxSetup/>

## Pass Multiple Pieces of Data in an Ajax Call

Sometimes you want to pass more than one piece of information when you
make an Ajax call. For instance, you might want to pass an object to
save to file, and the name of file name to use when you save the object.
Here is a method that does both those things:

```javascript
var writeJsonPrivate = function(successFunc, showError) {

      // Here is the data I want to send:
      var fullName = {
          firstName : 'George',
          lastName : 'Washington'
      };

      // Here is the file name:
      var fileName = {
          fileName : 'Data/MyFile.txt'
      };

      //  Now put them both in one object:
      var dataToSend = {
          path : fileName,
          person : fullName
      };

      $.ajax({
          type : 'GET',
          url : '/write',
          dataType : 'json',
          data : dataToSend,
          success : successFunc,
          error : showError
      });
  };
```

Here is what it looks like on the Server side:

```javascript
app.get('/write', function(request, response) {

    // We begin with some debug calls

    // View all the data that was sent
 console.log('Write called: ' + JSON.stringify(request.query, null, 4));

 console.log('Here are the properties passed in the request: ');
 for (var propertyName in request.query) {
  console.log(" -> " + propertyName);
 }

 // Find both pieces of data:
 var person = request.query.person;
 var path = request.query.path;

 // Display both pieces of data separately
 var personString = JSON.stringify(person, null, 4);
 console.log('Path: ' + JSON.stringify(path));
 console.log('Person: ' + personString);

 // Now do our actual work of writing the file.
 // This assumes the path exists. See the mkdirp
 // NPM library if you need to create directories
 fs.writeFile(path.fileName, personString, 'utf8', function(err, data){
  if (err) throw err;
  console.log('Success, file was saved!');
 });

 // Send back a response
 response.send('{"result":"success"}');
});
```

If you want to see what properties exist on the object that was passed to you
from the client, you can write code like this:

```javascript
 for (var propertyName in request.query) {
  console.log(" -> " + propertyName);
 }
```

The above is for a GET verb. Here is the same code for a POST:

```javascript
for (var propertyName in request.body) {
 console.log(" -> " + propertyName);
}
```

This example is found here:

- [SimpleReadWrite04][srwj]

## Posting Data

There are two different ways to POST data back to the server when we
want to call a script. We can have a form, and call a script by writing
something like this:

```html
<form action="/cgi-bin/JQueryTest01.py" method="post">
```

This code calls jQueryTest01.py when you hit the submit button of the
form. The values and names of any input fields in the form will be
passed as parameters to that script, for instance, this code causes a
parameter called operanda to passed to the script:

```html
<input id="operanda" name="operanda" type="text">
```

Things get more complicated in PhoneGap or any application that wants to
use Ajax. When you post a message using a FORM like that shown above,
then you get html or xml in return. It is displayed in a new page in the
browser or in your PhoneGap window. Sometimes that is what you want. But
if you want to modify the page you are looking at, to make a portion of
it morph without having to load an entire new page, then you have to
write the jQuery.ajax statements that we have been working on in our
PhoneGap applications. Those statements can post data exactly as we do
when we hit the SUBMIT button in a form, but obviously the syntax is
quite different. The call to \$.ajax is the equivalent of hitting the
submit button. Here is the equivalent of the input fields with their
name and value pairs:

```javascript
dataRequest = "operanda=" + operanda + "&operandb=" + operandb +
    "&answer=" + answer;
```

And here is all the key parts in one place:

```javascript
request = $.ajax(
{
  type: "POST",
  data: dataRequest,
  url: "http://192.168.0.100:8000/cgi-bin/AddingDataXml.py",
  ...
})
```

The above call is like hitting the submit button, it calls a script and
passes parameters to the script. But the big difference is that we get
the result back not as new page, but as the parameters passed in the
success block:

```javascript
dataType: "xml",
success: function (xml) {
  $(xml).find('addition').each(function () { etc ... })
}
```

We then write code in that block to modify the existing page, without
forcing a load a new page.

Here is the whole method that performs the post:

```javascript
function ReadFromAddingXml(operanda, operandb, answer)
{
  // dataRequest = "operanda=2&operandb=3&answer=5";
  dataRequest = "operanda=" + operanda + "&operandb=" + operandb + "&answer=" + answer;
  request = $.ajax(
  {
    type: "POST",
    data: dataRequest,
    url: "http://192.168.0.100:8000/cgi-bin/AddingDataXml.py",
    dataType: "xml",
    success: function (xml)
    {
      $(xml).find('addition').each(function ()
      {
        var first = $(this).find('operanda').text();
        var last = $(this).find('operandb').text();
        var answer = $(this).find('answer').text();
        var additions = first + "+" + last + "=" + answer;
        $("#items").append("<li class='tulsa'>" + additions + "</li>");
      });
    }
  });

  request.fail(function(jqXHR, textStatus, bar)
  {
    alert( "Request failed: " + textStatus + bar );
  });
}
```

Think for a moment about the callback hook called **success.**It is
called if the program successfully posts data to the server by calling
the **AddingDataXml.py** script. That script puts some information in a
database, and then formulates some XML that describes what it did. The
XML is returned to the client in the parameter of the **success**
callback hook:

```javascript
success: function (xml)
```

By the time we get to the **success** callback, the call to the server
is over. It has completed and the result has been returned.Ãƒâ€šÃ‚Â  So the
first few lines of the **ReadFromAddingXml** method call the server, and
the last bit found in the **success** callback deals with the result
returned from the server.

What does the **success** callback function do? Well, it takes the XML
that was passed back to us and parses it, and then displays the results
back on the main page of the application. Here is the XML that might be
returned.

```html
 <additions>
  <addition>
   <operanda>1</operanda>
   <operandb>2</operandb>
   <answer>3</answer>
  </addition>
 </additions>
```

The called to **\$(xml).find** returns the addition section of the XML:

```html
<addition>
 <operanda>1</operanda>
 <operandb>2</operandb>
 <answer>3</answer>
</addition>
```

The call to **\$(this.find('operanda').text();** yields the number 1.
The next line retrieves 2, and the third line yields 3. We put them all
together in a string that looks like this: 1 + 2 = 3. Then we appeand
that string to the items list back in the main HTML document.

[srwj]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/SimpleReadWriteJson