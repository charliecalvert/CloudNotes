---
fullPath: /home/ubuntu/Git/CloudNotes/javascript-guide/AddingMachine.md
relativePath: javascript-guide/AddingMachine.md
title: AddingMachine
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
subject: JavaScript
fileNameMarkdown: AddingMachine.md
fileNameHTML: AddingMachine.html
queryPath: javascript-guide/
image: ./course/course-javascript.jpg
---

<!-- toc -->
<!-- tocstop -->

## Adding Machine

***This page is part of the [Elvenware
site](http://www.elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html#adding).***

The page demonstrates how to use a form to submit data to a Python
script. There are also calls to JavaScript routines that perform simple
addition. Follow the instructions outlined below, and then read the text
found beneath example.

**Instructions**: Below you will find a form outlined in blue dashes.
Enter two numbers in the fields labeled **Number One** and **Number
Two**. Press the **Add** button to add the numbers. If you are satisfied
with your result, press the **Submit** button.

Here is what is going on behind the scenes. When you press the
**Submit**button two things happen:

- The submit button forces the form to submit its data to a python
    script called **AddingMachineWrite.py**. This happens because the
    form has its action attribute set to /cgi-bin/AddingMachineWrite.py

```html
<form action="/cgi-bin/AddingMachineWrite.py" method="post">
</form>
```

- Three pieces of data are also submitted.
  - The text from the input field labeled **Operand A** and named
        **operanda**
  - The text from the input field labeled **Operand B** and named
        **operandb**
  - The text from the input field named **answer**.

- A fourth input control, a button labeled **Add Numbers**, is used to
    call the JavaScript routine that adds the numbers together.
- Finally, the fifth input control, of type **submit,** executes the
    **form** and submits the contents of the form to
    **AddingMachineWrite.py**.

Here is the complete code for the form:

```html
<form action="/cgi-bin/AddingMachineWrite.py" method="post">
  <div>
    <div><label>Operand A:</label></div>
    <input type="text" 
        name="operanda" 
        id="operanda" />
  </div>
  <div>
    <div><label>Operand B:</label></div>
    <input type="text" 
        name="operandb" 
        id="operandb" />
  </div>
  
  <div>
    <div>
        <label>Result</label>: 
        <input type="text" name="answer" id="answer"/>
    </div>
  
    <div>
        <input type="button" 
            onclick="addingMachine.addNumbers()" 
            value="Add Numbers" />
        <input type="submit" />
    </div>
  </div>
</form>
```

Below is the JavaScript routine that adds two numbers together. Note
that it makes heavy use of jQuery to locate the fields were the operands
are located, and where the result is displayed.

```javascript
this.addNumbers = function() &#123;
  var operanda = $(&quot;#operanda&quot;).val();
  var operandb = $(&quot;#operandb&quot;).val();
  var sum = parseInt(operanda) + parseInt(operandb);
  $(&quot;#answer&quot;).val(sum);
&#125;
```

Press the **Get all additions** button to see a list of all the
additions people have performed. Pressing this button calls another
Python script

The code for the **Get all additions** button looks like this:

```html
<form action="/cgi-bin/AddingMachineRead.py" method="post">
  <input type="submit" value="Get all additions" />
</form>
```

Call the add line code directly:

[http://www.elvenware.com/cgi-bin/AddingMachineWrite.py?operanda=2&operandb=3&answer=5](http://www.elvenware.com/cgi-bin/AddingMachineWrite.py?operanda=2&operandb=3&answer=5)

If you want to execute code when a form is submitted, but don't want to
return HTML that would replace the current page, then write this:

```html
    <form action="javascript:void validate( )" >
        <p>some html</p>
    </form>
```

By using void, we assure that a method gets called, but does not return
anything. If we return HTML, then the that HTML would replace the
current page, which is not always what we want.
