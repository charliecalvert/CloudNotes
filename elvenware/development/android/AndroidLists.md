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

Lists
-----

On the one hand we have the List, which is a visual element, and on the
other hand we have the adapter, which maps the data to the List.
ListViews implement a widget called an AdapaterView The AdapterViewt and
the data are separate, and the Adapter forms a bridge between them. We
have several different kinds of Adapters, including:

-   ArrayAdapter
-   SimpleCursorAdapter
-   CursorAdapater
-   SimpleAdapter
-   HeaderViewListAdapter
-   ResourceCursorAdapter
-   WrapperListAdapter

Key elements:

-   Implement
    [ListActivity](http://developer.android.com/reference/android/app/ListActivity.html)
    not**Activity**
-   Create a list, such as **ArrayAdapter\<String\>**
-   Call **setListAdapter()**

You don't need a layout at all for a default list.

For a custom list give an id of list:

~~~~ {.code}
android:id="@android:id/list"
~~~~

If you want a textview, use empty:

~~~~ {.code}
android:id="@android:id/empty"
~~~~

Simple list program:

~~~~ {.code}
public class SimpleListActivity extends ListActivity {
  /** Called when the activity is first created. */
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState); 

    ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, 
      android.R.layout.simple_list_item_1, 
      new String[] { "1", "2", "3"});
 
  setListAdapter(adapter);
  }
}
~~~~

It is also possible to have a custom ListView, rather than using the
ListView from the system. If you do this, however, you should give your
ListView a System ID. In this example called **my\_layout.xml**, notice
that the **ListView** has an ID of **@android:id/list:**

    <?xml version="1.0" encoding="utf-8"?>
    <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
      android:orientation="vertical"
      android:layout_width="fill_parent"
      android:layout_height="fill_parent"
    >

    <TextView 
      android:id="@+id/text1"
      android:layout_width="wrap_content" 
      android:layout_height="wrap_content" 
      android:text="Debut Text Appears here"
    />

    <ListView
      android:id="@android:id/list"
      android:layout_width="match_parent"
      android:layout_height="wrap_content" >
    </ListView>

    </LinearLayout>

When you set things up this way, you can load the layout as usual, but
you access the **ListView** in the layout as if it were a system
resouce:

~~~~ {.code}
setContentView(R.layout.my_layout);
        
ArrayAdapter<String> array = new ArrayAdapter<String>(
  activity, 
  android.R.layout.simple_list_item_1,
  cursor.getColumnNames());
~~~~

Links
-----

[Docsiew.html"\> Hello
ListView](http://developer.android.com/reference/android/app/ListActivity.html)

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../index.html) |
[Delphi](../delphi/index.html) | [CSharp](../csharp/index.html) | [My
Books](../../books/index.html)
