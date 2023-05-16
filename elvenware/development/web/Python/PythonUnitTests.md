---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Python/PythonUnitTests.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Python
fileName: PythonUnitTests.md
relativePath: /web/Python/PythonUnitTests.md
title: PythonUnitTests
directoryName: Python
category: Python-guide
---

Python Unit Tests
=================

This files covers unit testing in Python. Unit testing has several
benefits:

-   It provides a means of testing your code to ensure it works as you
    expect it to work
-   It documents the features and behaviors of your class
-   It helps you confirm that any changes you make to your code did not
    break existing features

There are other important aspects to unit testing, but the three points
outlined above provide a simple, easy to understand starting point for a
technology that is really more than a technology, and that can be
thought of as a philosophy for architecting and managing projects.

Simple Example
--------------

In this section you will see a simple example of how to write a few
simple tests. First I will show you a program that does some simply File
IO. Then I will show you code that tests these operations to confirm
that they work as expected. In particular, the code tests to see if a
method that is designed to write and read from a file actually creates a
file, and actually writes and reads the expected value from the file.
This example is not meant to be an exhaustive test of the sample class,
but rather a demonstration of who to use the basic syntax of unit
testing.

-   Watch the Video:
    [http://youtu.be/fU7RHewj6dg](http://youtu.be/fU7RHewj6dg)

The file to test:

```python
#!/usr/bin/python

class SimpleFile(object):

    def __init__(self, fileName):
        self.fileName = fileName

    def write_text(self, textToWrite):
        f = open(self.fileName, 'w')
        f.write(textToWrite)
        f.close()

    def read_text(self):
        f = open(self.fileName, 'r')
        read = f.read()
        return read     
```

The file that tests it contains several important features:

-   import unittest
-   The main class begins with the word Test and inherits from
    unittest.TestCase
-   The actual test methods all begin with the word test

You must have these features in your unit tests. For instance, the way
you tell the unit test library that a particular method is a test is to
have it begin with the word **test**.

~~~~ {.code}
#!/usr/bin/python

import unittest
import os
from files.core import SimpleFile

class Test(unittest.TestCase):

    def get_file_name(self):
        fileName = "bar.txt"
        return fileName

    def get_file_text(self):
        textToWrite = "This line"
        return textToWrite

    def test_write_file(self):        
        simple_file = SimpleFile(self.get_file_name())
        simple_file.write_text(self.get_file_text())
        self.assertTrue(os.path.isfile(self.get_file_name()))

    def test_read_file(self):
        simple_file = SimpleFile(self.get_file_name())
        read_text = simple_file.read_text()
        self.assertEqual(read_text,self.get_file_text())

suite = unittest.TestLoader().loadTestsFromTestCase(Test)
unittest.TextTestRunner(verbosity=2).run(suite)  
~~~~

Set Up {#setup}
------

 If you have something that you want to do before each test is run, add
a setup method to your testcase:

~~~~ {.code}
class Test(unittest.TestCase):
    def setUp(self):
        self.chords = SimpleDbChords("Chords")
        self.contentType = self.chords.getHeader()
~~~~

Just as **setUp()** runs before each test, a method called
**tearDown()** will be run after each test. It is important to
understand that this is very different from a constructor or destructor.
The **setUp** and **testDown** methods are not called when the object is
created or destroyed, but rather before and after each test is run.\

Copyright © [Charlie Calvert](../../../index.html) | [Elvenware
Home](../../../index.html) | [Writing Code](../../index.html) |
[Delphi](../../delphi/index.html) | [CSharp](../../csharp/index.html) |
[My Books](../../../books/index.html)
