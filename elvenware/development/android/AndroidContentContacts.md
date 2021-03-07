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

[Main
Page](http://developer.android.com/resources/articles/contacts.html)

### Contacts API

~~~~ {.code}
Uri myPerson = ContentUris.withAppendedId(ContactsContract.Contacts.CONTENT_URI, 23);
Cursor cur = managedQuery(myPerson, null, null, null, null);
~~~~

In your manifest, be sure to include the following:

~~~~ {.code}
<uses-permission android:name="android.permission.READ_CONTACTS"></uses-permission>
~~~~

Content Providers
-----------------

One typically accesses data through [content
providers](http://developer.android.com/guide/topics/providers/content-providers.html).
They allow you share data across applications.

There are different content providers for different types of data:
audio, video, images, contacts. We will start by exploring contacts.

To get started, you need to call a method of your Activity called
getContentResolver that returns an interface that allows you to access
the content on your machine. This interface, called ContentResolver,
will be the way that you access content.

You run queries that reutnr a **Cursor**object that allows you to
navigate through a data table.

### URIs

Uris are used to identify data resources and they look like this:

~~~~ {.code}
content://com.android.contacts/contacts
~~~~

So you need to know the URI you want, the names of the fields you want,
and the types of the fields.

 

The New Method 
---------------

[ContactsContract](http://developer.android.com/reference/android/provider/ContactsContract.html)
manages the contract between the contacts proveder and applications.
Here is where to find information about supported URIs and columns.

There are three different places where contact information is stored:

-   ContactsContract.Data
-   ContactsContract.RawContacts
-   ContractsContract.Contacts

There are other tables, such as **Groups**, **StatusUpdates**,
**AgreegationExceptions**, **Settngs**, **SyncState** and
**PhoneLookUp**.

Look at this example of how to run a simple query inside a
**ListActivity**:

~~~~ {.code}
@Override
public void onCreate(Bundle savedInstanceState) 
{
  super.onCreate(savedInstanceState);
  //setContentView(android.R.id.list);
  //setContentView(com.elvenware.contactlist.R.layout.main);
  runQuery();
}

public void runQuery()
{
  String[] projection = new String[] 
  { 
    ContactsContract.Contacts._ID, 
    ContactsContract.Contacts.DISPLAY_NAME, 
  };

  // Make the query. 
  Cursor people = managedQuery(ContactsContract.Contacts.CONTENT_URI, 
    projection, // Which columns to return 
    null,       // Which rows to return (all rows) 
    null,       // Selection arguments (none)
    ContactsContract.Contacts.DISPLAY_NAME + " ASC");

  String[] displayFields = new String[] {
    ContactsContract.Contacts._ID,
    ContactsContract.Contacts.DISPLAY_NAME 
  };

  int[] displayViews = new int[] {
    android.R.id.text1,
    android.R.id.text2 
  };

  SimpleCursorAdapter adapter = new SimpleCursorAdapter(this,
    android.R.layout.simple_list_item_2,
    people,
    displayFields, displayViews);

  setListAdapter(adapter); 
}
~~~~

The Manifest and Permissions
----------------------------

Don't forget that you need to update the permissions for your Manifest
file so that it includs android.permission.READ\_CONTACTS:

~~~~ {.code}
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
  package="com.elvenware.testpubcode"
  android:versionCode="1"
  android:versionName="1.0" >

  <uses-sdk android:minSdkVersion="10" />
  <uses-permission android:name="android.permission.READ_CONTACTS" />
  
  <application
    android:icon="@drawable/ic_launcher"
    android:label="@string/app_name" >
    <activity
    android:name=".TestPubCodeActivity"
    android:label="@string/app_name" >
    <intent-filter>
      <action android:name="android.intent.action.MAIN" />
      <category android:name="android.intent.category.LAUNCHER" />
      </intent-filter>
    </activity>
  </application>
</manifest>
~~~~

If you want to write to the contacts provider then you need to ask for
write permissions:

~~~~ {.code}
<uses-permission android:name="android.permission.WRITE_CONTACTS"/>
~~~~

Don't forget that the class in which the above code resides should be a
**ListActivity**, not an **Activity**:

~~~~ {.code}
import android.app.ListActivity;
import android.database.Cursor;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.widget.SimpleCursorAdapter;

public class TestPubCodeActivity extends ListActivity {
~~~~

The old method
--------------

This method is no longer the approved way to display files.

~~~~ {.code}
import android.provider.Contacts.People;      
        
        
Cursor mCursor = this.getContentResolver().query(People.CONTENT_URI, null, null, null, null);
startManagingCursor(mCursor);
int[] views = new int[]{android.R.id.text1};

ListAdapter adapter = new SimpleCursorAdapter(
this, // Context.
android.R.layout.simple_list_item_1, 
mCursor,
new String[] {People.NAME},
views); 

// Bind to our new adapter.
setListAdapter(adapter); 
~~~~

Inserting Records
-----------------

It is now recommended that you use the ContentProviderOperation when
inserting records. Here we do not actually specify the account name or
type that we want to use, but instead just pass in NULL to get the
default account. You can specify a particular account if you want to
insert into some other part of the contacts database, for instance, into
the GMail list:

~~~~ {.code}
private void writeContact(String firstAndLastName) {
    
    ArrayList ops = new ArrayList();
    
    ops.add(ContentProviderOperation.newInsert(RawContacts.CONTENT_URI)
            .withValue(RawContacts.ACCOUNT_TYPE, null)
            .withValue(RawContacts.ACCOUNT_NAME, null)
            .build());
    
    ops.add(ContentProviderOperation.newInsert(Data.CONTENT_URI)
            .withValueBackReference(Data.RAW_CONTACT_ID, 0) 
            .withValue(Data.MIMETYPE, StructuredName.CONTENT_ITEM_TYPE)
            .withValue(StructuredName.DISPLAY_NAME, firstAndLastName) 
            .build());
    
    try {
        this.getContentResolver().applyBatch(ContactsContract.AUTHORITY, ops);
    } catch (RemoteException e) {
        e.printStackTrace();
    } catch (OperationApplicationException e) {
        e.printStackTrace();
    }               
}
~~~~

Call the method like this:

~~~~ {.code}
writeContact("Sally Chuang");
~~~~

Don't forget to ask for write permissions in the manifest:

~~~~ {.code}
<uses-permission android:name="android.permission.WRITE_CONTACTS"/>
~~~~

Links
-----

-   Get the
    [source](../../downloads/Android/AndroidReadWriteContacts.zip).

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../index.html) |
[Delphi](../delphi/index.html) | [CSharp](../csharp/index.html) | [My
Books](../../books/index.html)
