---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Python/PythonSyntax.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Python
fileName: PythonSyntax.md
relativePath: /web/Python/PythonSyntax.md
title: PythonSyntax
directoryName: Python
category : cssguide-guide
---

Python Syntax
=============

A good resource is the Think Python book:

-   [http://www.greenteapress.com/thinkpython/html/index.html](http://www.greenteapress.com/thinkpython/html/index.html)

Get the Python Path {#pythonPath}
-------------------

Start the Python interpreter. Then type:

~~~~ {.code}
>>> import sys
>>> print sys.path
~~~~

Python Program Structure {#structure}
------------------------

Python is different from C\# in that offers both stand alone functions
and methods in a class.

Here is a standalone function in a simple, but complete, Python program:

~~~~ {.code}
def foo():
  print "bar bar"

foo()
~~~~

This program prints out: **bar bar**

And here is program with a **class**:

~~~~ {.code}
class MyClass(object): 

    def __init__(self):
        print "Constructor called"
        
        
my_class = MyClass()
~~~~

This program prints out **Constructor called**.

For Loops {#forLoops}
---------

For loops in Python often use range, which can return a range of numbers
from some starting point to an ending point. It looks like this:

~~~~ {.code}
for number in range(1, 4):
    print number    
~~~~

The code shown above prints out the following:

~~~~ {.code}
1
2
3
~~~~

I know, it can't possibly be right, or at least it looks strange. But
the principle is simple enough, and I don't see why it is necessarily
more difficult than writing the standard for loop used by the C based
languages:

~~~~ {.code}
 for (i = 1; i < 4; i++). 
~~~~

In this next example we work with an array of letters:

~~~~ {.code}
letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
for letter in letters:
    print letter
~~~~

The loop shown above prints out:

~~~~ {.code}
a
b
c
d
e
f
g
~~~~

Overall, looping in Python is quite simple once you get a feel for it.

If Statements {#ifs}
-------------

The syntax for **if** statemtns involves the keywords
**if**,**elif**,****and **else**. Don't forget the colon at the end of
each line that uses a keyword:

~~~~ {.code}
letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
for letter in letters:
    if letter == 'a':
        print 'eh?'
    elif letter == 'b':
        print 'buzz'
    else:        
        print letter
~~~~

The shown above produces this output:

~~~~ {.code}
eh?
buzz
c
d
e
f
~~~~

Default Parameters {#defaultParameters}
------------------

Python supports default parameters. As a result, it is possible to omit
parameters when calling a method. The missing arguments are set to
default values.

Consider this simple Python program, which defines a method that takes
three parameters, each of which is given a default value:

~~~~ {.code}
def bar(one=1, two=2, three=3):   print one   print two   print three
bar()
~~~~

It's output looks like this:

~~~~ {.code}
1
2
3
~~~~

As you can see, we call bar, passing in zero parameters, so the defaults
are used in place of the missing arguments.

Consider this version of the same program:

~~~~ {.code}
def bar(one=1, two=2, three=3):  print one  print two  print threebar(4, 5)
~~~~

If produces this output:

4

5

3

As you can see, the first two parameters are set to the arguments we
passed in, and the third takes a default value.

And finally, consider this example:

~~~~ {.code}
def foo(one, two, three):
    print one
    print two
    print three
foo()
~~~~

When run, this program produces the following output:

~~~~ {.code}
Traceback (most recent call last):File 
"J:\Source\PythonParams\src\params\params.py", line 19, in <module>foo()
TypeError: foo() takes exactly 3 arguments (0 given)
~~~~

File IO {#fileIo}
-------

Here are some examples of reading and writing files. For a few examples
of how to call an earlier version of this file, see the
**[UnitTests](PythonUnitTests.html)** section.

~~~~ {.code}
import os
import csv

class SimpleFile(object):
        
    def __init__(self, fileName):
        self.fileName = fileName
    
    def write_new_text_file(self, textToWrite):
        f = open(self.fileName, 'w')
        f.write(textToWrite)
        f.close()
    
    def append_text(self, textToWrite):
        f = open(self.fileName, 'a')
        f.write(textToWrite)
        f.close()
        
    def read_text(self):
        f = open(self.fileName, 'r')
        read = f.read()
        return read
    
    def delete_file(self):
        os.remove(self.fileName)

    def write_csv(self, param1, param2, param3):
        f = open(self.fileName, 'a')
        data = param1 + "," + param2 + "," + param3 + "\n";
        f.write(data)
        f.close()
        
    def write_csv_row(self, row):
        f = csv.writer(open(self.fileName, 'ab'))
        f.writerow(row) 
        
    def read_csv_row(self):
        f = csv.reader(open(self.fileName, 'rb'))        
        data = []
        for row in f:
            data += row
        return data
    
    def read_csv_row_number(self, row_number):
        f = csv.reader(open(self.fileName, 'rb'))
        count = 0        
        for row in f:
            if count == row_number:
                return row
            count += 1
        
    
    def read_csv_get_item(self, row_num, item_num):
        f = csv.reader(open(self.fileName, 'rb'))
        count = 0
        for row in f:
            if count == row_num:
                return row[item_num]
            count += 1
~~~~

Dictionary
----------

Below is a simple program that first creates a dictionary, and then
retrieves both of the values from it:

~~~~ {.code}
myDictionary = { "one": 1, "two": 2}
print myDictionary["one"]
print myDictionary["two"]
~~~~

The output from this program looks like this:

~~~~ {.code}
12
~~~~

A Python dictionary works the same way as a physical dictionary used to
define words. We pass in a key such as "one" or "two" and we get back a
value/definition for that key, which in this case are the values 1 and
2.

Dictionaries are quite flexible:

    class TestField(object):
        def __init__(self, value):
            self.value = value
              
    field = TestField(3)
    myDictionary = { "one": field }

    print myDictionary["one"].value

In this example we declare a class called TestField. We then create an
instance of the class, setting its **value** field to the 3. We then
make this class the **value** part of a dictionary's key/value pair.
Finally, we print out the value of the key "one", which is 3. The
simplest way to understand this code is to copy the code into a Python
script and run it.

Here is an alternative syntax for the previous example:

~~~~ {.code}
class TestField(object):
    def __init__(self, value):
        self.value = value
          
myDictionary = { "bar": TestField(4), "foo": TestField(5) }

for item in myDictionary:
    print item + "=" + str(myDictionary[item].value)
~~~~

The output from this last program looks like this:

~~~~ {.code}
foo=5
bar=4
~~~~

Explicitly use the **dict** type that underlies a dictionary:

~~~~ {.code}
tuples = [('table', 'flat board with four legs'), ('plate', 'round ceramic object')]
myDictionary = dict(tuples)
for item in myDictionary:
    print item + "=" + myDictionary[item]   
~~~~

This prints out:

~~~~ {.code}
table=flat board with four legs
plate=round ceramic object
~~~~

Errors
------

If you get the error "instance has no call method," that usually means
you are trying to call something like can object, a file, or a
dictionary, that is not executable, that is not a method, and hence
can't be called. For instance, someone might write:

~~~~ {.code}
run_chords = RunChords()run_chords().runChords()
~~~~

This code makes no sense, since in the second line there is an attempt
to call an object, and objects are not methods or functions, and hence
can't be called. This is what the developer intended to write:

~~~~ {.code}
run_chords = RunChords()run_chords.runChords()
~~~~

You might get the error "module object not callable." This means you are
trying to call a module, trying to execute a source, file, which of
course makes no sense.

I had a file Mod01.py with these contents:

~~~~ {.code}
class Mod01():    def __init__(self):        print "Mod01"
~~~~

To call it from Mod02.py I write this:

~~~~ {.code}
import Mod01
        
class Mod02():     def __init__(self):         print "Mod02"mod_01 = Mod01.Mod01() 
~~~~

If I change the last line to look like this, then I get the "module
object not callable error:

~~~~ {.code}
mod_01 = Mod01() // Module object not callable
~~~~

Sometimes you will get a message like X is not subscriptable. This means
you are trying to treat something that is not a list (array) as if it
were a list:

~~~~ {.code}
return self.form.has_key["rain"]
TypeError: 'instancemethod' object is not subscriptable
~~~~

You probably meant to write something like this:

~~~~ {.code}
return self.form.has_key("rain")
~~~~

\

Copyright © [Charlie Calvert](../../../index.html) | [Elvenware
Home](../../../index.html) | [Writing Code](../../index.html) |
[Delphi](../../delphi/index.html) | [CSharp](../../csharp/index.html) |
[My Books](../../../books/index.html)
