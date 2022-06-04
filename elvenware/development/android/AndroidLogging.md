---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android/AndroidLogging.md
relativePath: elvenware/development/android/AndroidLogging.md
title: AndroidLogging
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: AndroidLogging.md
fileNameHTML: AndroidLogging.html
image: ./course/course-javascript.jpg
subject: android
queryPath: elvenware/development/android/
---

<!-- toc -->
<!-- tocstop -->

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

Logging
=======

Andriod comes with a [class designed to help with
logging](http://developer.android.com/reference/android/util/Log.html).
It is found in this package:

``` {.code}
import android.util.Log;
```

It is typically used like this, where the most important lines are the
last **import** statement, the declaration for the **String** **tag**,
and the call to **Log.d**: 

``` {.code}
package com.elvenware.testlogging;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;

public class TestLoggingActivity extends Activity 
{
  String tag = "TestLogging";

  @Override
  public void onCreate(Bundle savedInstanceState) 
  {
     super.onCreate(savedInstanceState);
     setContentView(R.layout.main);

     Log.d(tag, "OnCreate called");
  }
}
```

Begin by declaring a "tag" which is passed as the first parameter to
each call to **Log.d**. This tag will be used to help you filter logging
messages. The second parameter is any arbitrary debug message that you
want to log.

Viewing the Log
---------------

You can use a tool built into Eclipse called **LogCat** to view the
messages you log. When debugging your applications, you should always be
sure **LogCat** is running. If its not visible right away, choose the
following from the Eclipse menu:

    Window | Show View | LogCat

If that doesn't work, or if you want more information, try:

    Window | Show View | Other | Android | LogCat

To begin, press the green button in the **Saved Filters** view on the
left of the **LogCat** window. Use the dialog that appears to create a
filter. You can filter by several different fields. Let's begin by
filtering on the Tag we created, as shown in Figure 1.

![Logging Setup](images/Logging01.png)

**Figure 01: Filtering by tag.**

When you run your program your log will be recorded in the LogCat
window. In Figure 2, notice that I have selected in the **Saved
Filters** view the filter that I set up in Figure 01:

[![View a log in
LogCat](images/Logging02Small.png)](images/Logging02.png)

**Figure 02: Viewing the custom filter we created when we used Log.d.
(Click to view full sized image.)**

**NOTE**: LogCat has a **pause** button on the far right near the top.
This button must be in the correct state or you won't see, or be able to
properly study, your debug output. It is simpler to let you experiment
with the button than to try to say the obvious things about how it
works. Pause means -- well, just try it and you will see it does what
you would expect.

There are six fields visible in the LogCat window:

-   **Level**: Which in this case is set to D for debug.
-   **Time**: The time when the message was recorded
-   **PID**: The Process ID of the application that sent the message.
-   **Application**: The name of your application. This is usually the
    **namespace** of your main **Activity**.
-   **Tag**: The tag we specified at the top of the class we created and
    passed in the first parameter of our call.
-   **Text**: The text we sent in the second parameter

You can click the disk icon on the right of LogCat to save selected
output from the LogCat window to a text file. This can be useful if you
want to search through the file in an editor, or send the file to
someone else such as another developer or your teacher. Here is the
entry shown in Figure 2 as it appears in a text file:

``` {.code}
02-02 15:17:38.896: D/TestLogging(1653): OnCreate called
```

It is sometimes useful to select the **All Messages** filter in the
**Save Filters** view. At first, there will be so many messages that it
is difficult to make sense of them. You can save all these messages to a
text file and search through them, or better, double click the **All
Messages** text in the **Save Filters** view and create a filter, much
as you did in Figure 1. For instance, if I filter only on those messages
sent by a particular application, I might get output that looks like
this:

``` {.code}
02-02 15:17:02.376: D/HelloWorld(1593): onCreate.
02-02 15:17:02.376: D/HelloWorld(1593): onStart. UI may be partially visible.
02-02 15:17:02.376: D/HelloWorld(1593): onResume. UI fully visible.
02-02 15:17:02.396: D/MyApplication(1593): configuration changed
02-02 15:17:17.016: D/HelloWorld(1593): onSaveInstanceState. You should load up the bundle
02-02 15:17:17.016: D/HelloWorld(1593): Saved state
02-02 15:17:17.016: D/HelloWorld(1593): onpause. I may be partially or fully invisible
02-02 15:17:17.216: D/HelloWorld(1593): onstop. I am fully invisible
02-02 15:17:38.586: D/HelloWorld(1593): onRestart. UI controls are there.
02-02 15:17:38.586: D/HelloWorld(1593): onStart. UI may be partially visible.
02-02 15:17:38.586: D/HelloWorld(1593): onResume. UI fully visible.
02-02 15:17:38.856: D/HelloWorld(1593): onSaveInstanceState. You should load up the bundle
02-02 15:17:38.856: D/HelloWorld(1593): Saved state
02-02 15:17:38.856: D/HelloWorld(1593): onpause. I may be partially or fully invisible
02-02 15:17:39.066: D/HelloWorld(1593): onstop. I am fully invisible
```

Here I can see that this application sent out two types of debug
information: one has the tag **HelloWorld**, and the other
**MyApplication**.

Exceptions
----------

LogCat can help you track down errors in your program. Suppose we
modified the code shown above to look like this:

``` {.code}
public void onCreate(Bundle savedInstanceState) 
{
   super.onCreate(savedInstanceState);
   setContentView(R.layout.main);
        
   Log.d(tag, "OnCreate called");
        
   TextView view = (TextView)this.findViewById(1);
   view.setText("Error");
}
```

This program will raise an exception on the call to **setText** because
there is no such **TextView** resource in this program and hence
**view** will be set to **null.** If you run this program, you will get
an exception. After you see the error, be sure to toggle to **off** the
**pause** button on the far right of the **LogCat** view. Select **All
Messages** on the left of LogCat,  Scroll up from the bottom of the
LogCat view, and look for a "sea of red." Hover your mouse over the
second line in the redness. You should see an explanation of what is
wrong. 

Alternatively, or in addtion, you can create a filter on **All
Messages** with the Tag **AndroidRuntime**, or set the **LogLevel** in
your Filter to **error**. If you do that, it should be fairly easy for
you to isolate the error messages:

``` {.code}
02-02 16:20:17.986: E/AndroidRuntime(1688): FATAL EXCEPTION: main
02-02 16:20:17.986: E/AndroidRuntime(1688): java.lang.RuntimeException: Unable to start activity ComponentInfo{com.elvenware.testlogging/com.elvenware.testlogging.TestLoggingActivity}: java.lang.NullPointerExceptionion
02-02 16:20:17.986: E/AndroidRuntime(1688): at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:1647)
02-02 16:20:17.986: E/AndroidRuntime(1688): at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:1663)
02-02 16:20:17.986: E/AndroidRuntime(1688): at android.app.ActivityThread.access$1500(ActivityThread.java:117)
02-02 16:20:17.986: E/AndroidRuntime(1688): at android.app.ActivityThread$H.handleMessage(ActivityThread.java:931)
02-02 16:20:17.986: E/AndroidRuntime(1688): at android.os.Handler.dispatchMessage(Handler.java:99)
02-02 16:20:17.986: E/AndroidRuntime(1688): at android.os.Looper.loop(Looper.java:130)
02-02 16:20:17.986: E/AndroidRuntime(1688): at android.app.ActivityThread.main(ActivityThread.java:3683)
02-02 16:20:17.986: E/AndroidRuntime(1688): at java.lang.reflect.Method.invokeNative(Native Method)
02-02 16:20:17.986: E/AndroidRuntime(1688): at java.lang.reflect.Method.invoke(Method.java:507)
02-02 16:20:17.986: E/AndroidRuntime(1688): at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:839)
02-02 16:20:17.986: E/AndroidRuntime(1688): at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:597)
02-02 16:20:17.986: E/AndroidRuntime(1688): at dalvik.system.NativeStart.main(Native Method)
02-02 16:20:17.986: E/AndroidRuntime(1688): Caused by: java.lang.NullPointerException
02-02 16:20:17.986: E/AndroidRuntime(1688): at com.elvenware.testlogging.TestLoggingActivity.onCreate(TestLoggingActivity.java:20)
02-02 16:20:17.986: E/AndroidRuntime(1688): at android.app.Instrumentation.callActivityOnCreate(Instrumentation.java:1047)
02-02 16:20:17.986: E/AndroidRuntime(1688): at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:1611)
02-02 16:20:17.986: E/AndroidRuntime(1688): ... 11 more
```

The most important lines are the second and the sixteenth, where the
sixteenth is also identifiable as the fourth from the bottom. The second
line tells us that we have a **null** pointer exception, and the
sixteenth tells us that the error occurred on Line 20 of
**TestLoggingActivity**.**java**. Here is that line:

``` {.code}
view.setText("Error");
```

As you can see, **LogCat** has correctly located our error.

Summary
-------

LogCat can help you understand your program, record important events in
your program, and debug errors. I use LogCat multiple times every day. I
believe it is a well designed tool that does its job well.

There is more to LogCat than I have explained here, but this information
should be sufficient to get you up and running. For additional
information, search online or read the relevant text in books such as
**Pro Android 3**, pages 54 through 56, found in Chapter 2, in the
section called "Debugging your App."

Links
-----

-   [Microlog4android](http://code.google.com/p/microlog4android/): A
    popular alternative to the Android built in logging tools
-   Back to [Android Top](index.html)

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../index.html) |
[Delphi](../delphi/index.html) | [CSharp](../csharp/index.html) | [My
Books](../../books/index.html)
