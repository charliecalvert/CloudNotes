---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android/AndroidViewBinder.md
relativePath: elvenware/development/android/AndroidViewBinder.md
title: AndroidViewBinder
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: AndroidViewBinder.md
fileNameHTML: AndroidViewBinder.html
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

ViewBinder
==========

If you are working with a database or some other ContentProvider, you
may need to format the strings that you display in a **TextViews.**To do
this, you can create a class that implements the
SimpleCursorAdapter.[ViewBinder](http://developer.android.com/reference/android/widget/SimpleCursorAdapter.ViewBinder.html)
interface. You can attach a ViewBinder to an adapter with a single line
of code. In this example, I first create an adapter, and then write one
additional line of code to associate a ViewBinder with the adapter:

~~~~ {.code}
SimpleCursorAdapter adapter = new SimpleCursorAdapter(this, R.layout.basic_list, cursor, fields, views);
adapter.setViewBinder(new MyViewBinder());
~~~~

 The **ViewBinder** interface defines a single method called
**setViewValue.** If the **ViewBinder** has been associated with an
adapter, then each field held by the adapter's **Cursor** is passed to
this method:

~~~~ {.code}
package com.ai.android.book.provider;

import java.util.Date;
import android.database.Cursor;
import android.text.format.DateUtils;
import android.view.View;
import android.widget.SimpleCursorAdapter;
import android.widget.TextView;

public class MyViewBinder implements SimpleCursorAdapter.ViewBinder 
{
    public boolean setViewValue(View view, Cursor cursor, int columnIndex) 
    {
        if (columnIndex == cursor.getColumnIndex(BookProviderMetaData.BookTableMetaData.MODIFIED_DATE)) 
        {           
            long timestamp = cursor.getLong(columnIndex); 
            CharSequence time = DateUtils.getRelativeTimeSpanString(view.getContext(), timestamp); 
            ((TextView) view).setText(time); 
            return true;
        } 
        else 
        {
            return false;
        }       
    }
}
~~~~

View's are a base class for **Widgets** such as **TextViews**,
**Buttons** and **EditTexts**. As you can see, a **View**, a **Cursor**,
the index of currently selected **Column** are all passed to
**setViewValue**().

The code shown here first checks if the **View** being passed in is
associated with the **Date** field that we want to format as text. If it
is, code is written to convert the **Date** field into a string, and
then the **View** is used to display the text to the user. The
**View**might be a **TextView** that we placed in our layout, usually as
a part of a list of some kind. For instance, if you are displaying the
fields from your table in a custom **ListView** that you defined in a
layout, then the **TextView** will be one of the **TextViews** you
defined in your XML file.

You might also want to look at the other ViewBinders for classes like
SimpleAdapter or SimpleCursorTreeAdapter.

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../index.html) |
[Delphi](../delphi/index.html) | [CSharp](../csharp/index.html) | [My
Books](../../books/index.html)
