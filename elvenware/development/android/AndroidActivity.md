---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android/AndroidActivity.md
relativePath: elvenware/development/android/AndroidActivity.md
title: AndroidActivity
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

Activities
----------

[Activities](http://developer.android.com/reference/android/app/Activity.html#startActivity%28android.content.Intent%29)
usually run in a Window that takes up an entire screen. You can have
more than one Activity on screen at a time, but at least at first,
developers start by creating Activities that fill the entire screen. The
user interacts with the application through the Activity. The
**onCreate** method of the Activity is called first, and **onDestroy**
is called just before it exits. There is also an important method called
**onPause**. Other methods include **onStop**, **onResume** and
**onRestart**(). The **Activity** that runs first is declared to do so
in the Manifest file, nested inside the **Application,**and other
**Activities** are typically listed below it. This process is described
in more depth below.

Each Activity extends a class called **ApplicationContext**().

Switching Activities
--------------------

Because the screen on a phone or tablet is relatively small, you
frequently want to switch screens, that is, you want to switch from one
**Activity** to another. There are several different ways to switch
Activities, but one of the simplest and most useful involves starting
new **Intents**.

In the simplest form of this scheme, you should create a layout for each
screen, and a class for each layout. If you want to display three
different screens, then your **res/layout** folder would typically have
three XML files in it. Use the layout manager or write XML that defines
the file your want to create. Give each XML file a reasonable name, such
as **view\_data.xml**, **insert\_data.xml,** **edit\_data.xml**.

You will need to create or edit three classes, one for each XML file.
Each class should extend **Activity**, or one of its derivide classes,
such as **ListActivity**. For instance, you might create three classes
called **ViewData**, **InsertData** and **EditData**.

You need to be sure to tell Android about these classes by referencing
them in your Manifest:

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
        <activity android:name=".ViewData"></activity>
        <activity android:name=".InsertData"></activity>
        <activity android:name=".EditData"></activity>
   <provider android:name=".BookProvider"
       android:authorities="com.androidbook.provider.BookProvider"/>
    </application>
    <uses-sdk android:minSdkVersion="3" />
</manifest>
~~~~

Each class that you create will be like a normal Activity, or a normal
ListActivity. You load the appropriate view just as you normally would,
via call to **setContentView**:

~~~~ {.code}
public class InsertData extends Activity
{

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.insert_data);
    }

    public void onSwitch(View view)
    {
        Intent intent = new Intent(view.getContext(), EditData.class);
        startActivityForResult(intent, 0);
    }
}
~~~~

Notice that in this code shown here I have included a simple event
handler, of the type that might be used to respond to a button click.
The handler creates an Intent designed to start a new Activty. In this
case, the Activity is the **EditData**class. After the call to
**startActivityForResult**, the current screen will be hidden, and the
**EditData** **Activity** will be brought to the fore.

Recall that inside the appropriate layout XML file the declaration for
the button designed to call this method might look something like this:

~~~~ {.code}
<Button
  android:id="@+id/button2"
  android:layout_width="wrap_content"
  android:layout_height="wrap_content"
  android:onClick="onSwitch"
 android:text="@string/buttonInsertData" />
~~~~

Links
-----

-   Download [sample
    code](../../downloads/Android/SwitchLayoutIntents.zip)
-   Download [switch with geo and web
    launch](../../downloads/Android/InvokeIntents.zip)
-   Download sample project called
    [SwitchVideo01](../../downloads/Android/SwitchVideo01.zip) from
    the[video on switching](http://youtu.be/r31hTfxUmIs) activities.

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../index.html) |
[Delphi](../delphi/index.html) | [CSharp](../csharp/index.html) | [My
Books](../../books/index.html)
