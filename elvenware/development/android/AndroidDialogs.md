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

Android Dialogs
===============

Show An Alert Dialog
--------------------

~~~~ {.code}
AlertDialog.Builder builder = new AlertDialog.Builder(this);
builder.setMessage("Please select one of the Radio Buttons");
builder.setCancelable(true);
builder.setNeutralButton("Ok",
    new DialogInterface.OnClickListener() {
        public void onClick(DialogInterface dialog, int which) {
            dialog.cancel();
        }
    });
builder.show();     
~~~~

A More Complex Example
----------------------

If you want more control, here is how to create a dialog in XML:

~~~~ {.code}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical" >

    <TextView
        android:id="@+id/textPrompt"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" 
        android:layout_marginLeft="20dip" 
        android:layout_marginRight="20dip" 
        android:text="@string/enter_something" 
        android:gravity="left" />

    <EditText
        android:id="@+id/editTextPrompt"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="20dip" 
        android:layout_marginRight="20dip" 
        android:scrollHorizontally="true" 
        android:autoText="false"
        android:capitalize="none"
        android:hint="@string/editTextHint"
        android:gravity="fill_horizontal" />

</LinearLayout>
~~~~

Here is how to call it without trying to initialize any of the controls
that that we defined in the XML:

~~~~ {.code}
LayoutInflater inflator = LayoutInflater.from(this);
View view = inflator.inflate(R.layout.dialog_basic, null);
AlertDialog.Builder builder = new AlertDialog.Builder(this);
builder.setTitle("Prompt");
builder.setView(view);
builder.setPositiveButton("Ok", null);
builder.setNegativeButton("Cancel", null);
AlertDialog inputDialog = builder.create();
inputDialog.show();
return null;
~~~~

Here is how to set up an AlertDialog (one that has buttons like OK and
Cancel) with some initialized content in a TextView. In the previous
example, we had a TextView, but we did not try to initialize it's
fields. In this case, we use **findViewById** to find the TextView, and
set its content:

~~~~ {.code}
private void postStatsDialog()
{
LayoutInflater inflator = LayoutInflater.from(this.activity);
View viewer = inflator.inflate(R.layout.dialog_post_stats, null);
TextView tv = (TextView)viewer.findViewById(R.id.textViewPostStats);
tv.setText("Something here again");
AlertDialog.Builder builder = new AlertDialog.Builder(this.activity);
builder.setTitle("Prompt");
builder.setView(viewer);
builder.setPositiveButton("Ok", null);
builder.setNegativeButton("Cancel", null);

AlertDialog inputDialog = builder.create();
inputDialog.show();

}
~~~~

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../index.html) |
[Delphi](../delphi/index.html) | [CSharp](../csharp/index.html) | [My
Books](../../books/index.html)
