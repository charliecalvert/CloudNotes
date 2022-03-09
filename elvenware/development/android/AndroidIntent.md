---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android/AndroidIntent.md
relativePath: elvenware/development/android/AndroidIntent.md
title: AndroidIntent
debug: First time
creationLocalTime: 3/8/2022, 3:55:50 PM
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

Intents

Android supports a number of components such as Activities, Content
Providers and Broadcast Receivers. If you want to start a component, you
can use an Intent. Android is designed in such a way that you can use
Intents to start a component that belongs to another application.

When you create a component, you can register it in the manifest. The
files that you register in a manifest can be started or invoked by an
intent. Consider this Manifest:

~~~~ {.code}
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
  package="com.ai.android.book.provider"
  android:versionCode="1"
  android:versionName="1.0.0">
  <application android:name=".MyApplication"
    android:icon="@drawable/icon" 
    android:label="Test Provider">
    <activity android:name=".HelloWorld"
      android:label="Test Provider">
      <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
      </intent-filter>
    </activity>
    <activity android:name="DisplayDataActivity"></activity> 
    <activity android:name="InsertDataActivity"></activity>
    <provider android:name=".BookProvider"
      android:authorities="com.androidbook.provider.BookProvider"/>
  </application>
<uses-sdk android:minSdkVersion="3" />
</manifest> 
~~~~

In the code shown above, there are at least four components:

1.  Activity HelloWorld
2.  Activity DisplayDataActivity
3.  Acticvty InsertDataActivity
4.  Content Provider BookProvider

Note that the Activity called HelloWorld is marked as belonging to the
category LAUNCHER. This means that Android will place it in them in the
list of applications that you can reach from the home screen of the
Android OS. It puts the application name and its icon on that screen so
that you can see the available applications.

### Creating an Intent.

Creating an Activity with an intent is covered in the Activity page. For
review, you can look at this code:

~~~~ {.code}
public void onShowIntent(View view)
{
  TextView textShowIntent = (TextView)this.findViewById(R.id.textViewShowIntentMain);
  textShowIntent.setText(this.getIntent().toString());
}

public void onSwitchToScreenTwo(View view)
{
  Intent intent = new Intent(view.getContext(), ScreenTwo.class);
  this.startActivity(intent);
}
~~~~

Note the method called onShowIntent. This method calls
**getIntent()**and then displays a string that provides a minimal
description of Here is what it looks like when the onShowIntent method
is called immediately after program launch:

[![Small Intents](images/Intents01Small.png)](images/Intents01.png)

**Figure 01: You can see how the intent for the main screen describes
itself after the program is launched.**

[![Intent with text
small](images/Intents01Small.png)](images/Intents02.png)

**Figure 02: Here are the intents for the second screen. Compare to
contents of Manifest.**

Links
-----

-   Download
    [SwithLayoutIntents](../../downloads/Android/SwitchLayoutIntents.zip)

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../index.html) |
[Delphi](../delphi/index.html) | [CSharp](../csharp/index.html) | [My
Books](../../books/index.html)
