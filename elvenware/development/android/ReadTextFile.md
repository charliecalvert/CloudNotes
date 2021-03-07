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

Reading Text Files
------------------

You can store things like text file in a folder you create called **res
| raw**. The files you create will have an ID associated with them, just
as a layout or other resource. You use this ID to retrieve the text:

~~~~ {.code}
InputStream inputStream = ctx.getResources().openRawResource(resId);
~~~~

The method shown below called readTextFile is designed for reading text.
You can use other Java streaming classes for reading binary data or
other types of resources.

~~~~ {.csharpcode}
package com.elvenware.readtextfile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.widget.TextView;

public class ReadTextFileActivity extends Activity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        TextView textView = (TextView)findViewById(R.id.textview_data);
        
        String data = readTextFile(this, R.raw.books);
        textView.setText(data);
    }

    public static String readTextFile(Context ctx, int resId)
    {
        InputStream inputStream = ctx.getResources().openRawResource(resId);

        InputStreamReader inputreader = new InputStreamReader(inputStream);
        BufferedReader bufferedreader = new BufferedReader(inputreader);
        String line;
        StringBuilder stringBuilder = new StringBuilder();
        try 
        {
            while (( line = bufferedreader.readLine()) != null) 
            {
                stringBuilder.append(line);
                stringBuilder.append('\n');
            }
        } 
        catch (IOException e) 
        {
            return null;
        }
        return stringBuilder.toString();
    }
}
~~~~

TThe layout file:

~~~~ {.csharpcode}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" >

    <TextView
        android:id="@+id/textview_data"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:text="@string/hello" />

</LinearLayout>
~~~~

Alternate
---------

If you want to read the text file into a List\<String\>, you might try
something like this:

~~~~ {.csharpcode}
public static List<String> readTextFileAsList(Context ctx, int resId)
{
    InputStream inputStream = ctx.getResources().openRawResource(resId);

    InputStreamReader inputreader = new InputStreamReader(inputStream);
    BufferedReader bufferedreader = new BufferedReader(inputreader);
    String line;
    List<String> list = new ArrayList<String>(); 
        
    try 
    {
        while (( line = bufferedreader.readLine()) != null) 
        {
            list.add(line);                
        }
    } 
    catch (IOException e) 
    {
        return null;
    }
    return list;
}
~~~~

Links
-----

-   Download the [source](../../downloads/Android/ReadTextFile.zip).

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../index.html) |
[Delphi](../delphi/index.html) | [CSharp](../csharp/index.html) | [My
Books](../../books/index.html)
