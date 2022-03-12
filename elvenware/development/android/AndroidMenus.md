---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android/AndroidMenus.md
relativePath: elvenware/development/android/AndroidMenus.md
title: AndroidMenus
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
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

Menus
-----

To view an Android menu in VirtualBox or some copies of the Emulator,
try the F2 key, or the right popup menu key found on many keyboards
between the right-alt key and the right-ctrl key.

Coding a Menu with Android SDK
------------------------------

Create a new project. Target the most recent SDK, but set the min-sdk
for the version of Android that you want to use.

You now need to create your menu. Right click on the **res**folder and
create a new folder called **menu.** Right click on the new folder and
choose **New | Other | Android | Android XML file** or, alternatively,
**New | Android XML File.** Give you file a name, such as
**menu\_main.xml.**Enter XML like that shown below:

~~~~ {.code}
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android" >
  <group android:id="@+id/group_main">
    <item android:id="@+id/item_show" android:title="show"></item>
    <item android:id="@+id/item_exit" android:title="exit"></item>
  </group>
</menu>
~~~~

Modify your main layout so that it has at least one **TextView**with an
id:

~~~~ {.code}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
  android:layout_width="fill_parent"
  android:layout_height="fill_parent"
  android:orientation="vertical" >

<TextView
  android:id="@+id/textview_main"
  android:layout_width="fill_parent"
  android:layout_height="wrap_content"
  android:text="@string/hello" />

</LinearLayout>
~~~~

Now add simple menu code, in your Activity:

~~~~ {.code}
     @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflator = getMenuInflater();
        inflator.inflate(R.menu.menu_main, menu);
        return super.onCreateOptionsMenu(menu);
    }
    
    @Override
    public boolean onMenuItemSelected(int featureId, MenuItem item) {
        TextView textView = (TextView)this.findViewById(R.id.textview_main);
        textView.setText(item.getTitle());
        return super.onMenuItemSelected(featureId, item);
    }
~~~~

In Eclipse, the outline of each of the methods shown here can be created
automagically if you type in the first few letters of their name, such
as **onCreateO** and then press **Ctrl-Space**.

The code shown here makes the menu visible, and displays the titles of
the menu items selected by the user in a **TextView.** Notice the calls
to **getMenuInflater()**,**inflate()**and **findViewById.**The first two
make your menu visiable, the latter helps you locate your **TextView**
so that you can change the text inside it.

The location of menus differs by version of the SDK. The menu moves to
the top if you write this:

~~~~ {.code}
<uses-sdk android:minSdkVersion="13" />
~~~~

It then appears on the bar at the top, rather than at the bottom.

You can add a menu using setChildScene. But this is the same way that we
set a control.

Links
-----

-   [Download the source.](../../downloads/Android/SimpleMenu.zip)

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../index.html) |
[Delphi](../delphi/index.html) | [CSharp](../csharp/index.html) | [My
Books](../../books/index.html)
