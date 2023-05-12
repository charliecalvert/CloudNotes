---
layout: page
date: 2023-05-11 08:25:53 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android/Libraries.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android
fileName: Libraries.md
relativePath: /android/Libraries.md
title: Libraries
directoryName: android
category : css-guide
---

Toggle Menu

Charlie Calvert on Elvenware
============================

Writing Code and Prose on Computers
-----------------------------------

Menu
----

Core Code
---------

-   [Strongly Typed](../index.html)
-   [Web & Scripts](../web/index.html)
-   [Cloud](../cloud/index.shtml)

OS and Tools
------------

-   [OS](../../os/index.html)
-   [Database](../database/index.html)
-   [My Writing](../../books/index.html)

Art
---

-   [Poems & Photos](../../Art/index.html)
-   [Book Reviews](../../books/reading/index.html)
-   [Spiritual](../../spirit/index.html)

Links
-----

-   [My Links](../../links.html)
-   [Falafel](http://www.falafel.com/)
-   [Sourceforge](http://sourceforge.net/projects/elvenware/)

![Elvenware](../../images/elvenwarelogo.png)

Android Libraries
=================

We frequently find ourselves reusing the same code over and in our
applications. Over time, we define a set of routines that we want to
reuse. We can do several things with these routines:

-   Put in them in a jar file and use that external jar file in our
    application.
-   Create a service
-   Create a library

In this text we are going to focus on the third technique. This
technique links the code from the library into your main project. This
means the code for your library could be copied to the target machine
multiple times, once for each program that uses the library. A library
cannot use another library. Still, I like the idea of libraries in some
cases.

Create the library as you would any standard Android Project. In
**Proprieties | Android** check the IsLibrary box.

[![Library](images/Library01Small.png)](images/Library01.png)

**Figure 01: Click to enlarge this image**.

In the project that uses the library, click the Add button and Add in
the library.

[![Adding a Library to a
Project](images/Library02Small.png)](images/Library02.png)

**Figure 02: Click to enlarge**

**Example**
-----------

Here is the code for a simple library:

~~~~ {.code}
package com.elvenware.simplelibrary;

public class SimpleLibrary extends Object 
{
{
 pu  public int GetNine()
      return 9;
  }
} 9;
 }
} 9;
}
~~~~

Here is the code for a program that consumers the library:

~~~~ {.code}
package com.elvenware.simplelibraryuser;

import com.elvenware.simplelibrary.SimpleLibrary;
import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;

public class SimpleLibraryUserActivity extends Activity 
{

  @Override
  public void onCreate(Bundle savedInstanceState) 
  {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.main);

    SimpleLibrary library = new SimpleLibrary();
    int nine = library.GetNine();

    TextView textViewMain = (TextView)this.findViewById(R.id.textViewMain);
    textViewMain.setText(String.format("The answer is %s", nine)); 
  }
}
~~~~

Links
-----

-   [Sample Code](../../downloads/Android/SimpleLibrary.zip)
-   Back to [Android Main](index.html)

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../index.html) |
[Delphi](../delphi/index.html) | [CSharp](../csharp/index.html) | [My
Books](../../books/index.html)
