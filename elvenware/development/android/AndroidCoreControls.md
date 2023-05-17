---
layout: page
date: 2023-05-11 08:25:53 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android/AndroidCoreControls.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android
fileName: AndroidCoreControls.md
relativePath: /android/AndroidCoreControls.md
title: AndroidCoreControls
directoryName: android
category: android-guide
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

Core Controls (Widgets)
-----------------------

Index
-----

-   [Primary Controls](#primary)
-   [Button Click](#buttonClick)
-   [Change Text](#changeText)
-   [Lists](#lists)
-   [RadioButtons](#radiobutton)
-   [Links](#links)

This page focuses on getting control of the basic Android control set.
Buttons, TextViews, EditControls are all covered here.

Primary Controls {#primary}
----------------

All the primary Android controls are
[widgets](http://developer.android.com/reference/android/widget/package-summary.html).

-   TextView:
    [TextView](http://developer.android.com/reference/android/widget/TextView.html)
-   EditText:
    [EditText](http://developer.android.com/reference/android/widget/EditText.html)
-   Button:
    [Button](http://developer.android.com/reference/android/widget/Button.html)

Handling a Button Click {#buttonClick}
-----------------------

Create a new application. Open up the main layout file (**Package
Explorer | YourProject | res | layout**), called **Main.xml**. Modify it
so that it includes a second **TextView** and a **Button**:

~~~~ {.code}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
android:layout_width="fill_parent"
android:layout_height="fill_parent"
android:orientation="vertical" >

<TextView
android:layout_width="fill_parent"
android:layout_height="wrap_content"
android:text="@string/hello" />

<TextView
android:id="@+id/textView1"
android:layout_width="wrap_content"
android:layout_height="wrap_content"
android:text="Large Text"
android:textAppearance="?android:attr/textAppearanceLarge" />

<Button
android:id="@+id/button1"
android:layout_width="wrap_content"
android:layout_height="wrap_content"
android:onClick="onClicker"
android:text="@string/buttonString" />

</LinearLayout>
~~~~

Notice that I have set the **textAppearance** of the second TextView to
**textAppearanceLarge**, and it's **onClick** even to an as yet
unwritten method called **onClicker**.

Write code for the **onClicker**method:

You will need to add an import or two:

~~~~ {.code}
import android.view.View;
import android.widget.TextView;
~~~~

The following is your on click method:

~~~~ {.code}
public void onClicker(View view)
{
  TextView textView = (TextView)this.findViewById(R.id.textView1);
  textView.setText("My Text");
}
~~~~

Change Text in TextView using a Button and an Edit Control {#changeText}
----------------------------------------------------------

~~~~ {.code}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
android:layout_width="fill_parent"
android:layout_height="fill_parent"
android:orientation="vertical" >

<TextView
android:layout_width="fill_parent"
android:layout_height="wrap_content"
android:text="@string/hello" />

<EditText
android:id="@+id/editText1"
android:layout_width="match_parent"
android:layout_height="wrap_content"
android:hint="@string/editHint" >
<requestFocus />
</EditText>

<TextView
android:id="@+id/textView1"
android:layout_width="wrap_content"
android:layout_height="wrap_content"
android:text="@string/textResult"
android:textAppearance="?android:attr/textAppearanceMedium" />

<Button
android:id="@+id/button1"
android:layout_width="wrap_content"
android:layout_height="wrap_content"
android:text="@string/buttonChange"
android:onClick="onChangeText" />

</LinearLayout>
~~~~

You might get the warning: "This text field does not specify an
InputType or hint." Try creating a resource string that provides a hint
about what you want the user to enter into the text field. Right click
on the control in the designer and set the hint to your string resource.
Alternatively, explicitly fill in the **android:hint**:

~~~~ {.code}
<EditText
android:id="@+id/editText2"
android:layout_width="match_parent"
android:layout_height="wrap_content"
android:hint="@string/textEditMe" />
~~~~

And here is the button click method that will change the text:

~~~~ {.code}
public void onChangeText(View view)
{
  EditText editText = (EditText)this.findViewById(R.id.editText1);
  TextView textView = (TextView)this.findViewById(R.id.textView1);
  String data = editText.getText().toString();
  textView.setText(data);
}
~~~~

Create an addition program. Have the user enter two values and then add
them together and display them to the user.

RadioButtons {#radiobutton}
------------

The main layout:

~~~~ {.code}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
android:layout_width="fill_parent"
android:layout_height="fill_parent"
android:orientation="vertical" >

<TextView
android:id="@+id/textViewMain"
android:layout_width="fill_parent"
android:layout_height="wrap_content"
android:text="@string/hello" />

<RadioGroup
android:layout_width="fill_parent"
android:layout_height="wrap_content" 
android:orientation="vertical">
<RadioButton
android:id="@+id/radioButtonWalk"
android:layout_width="wrap_content"
android:layout_height="wrap_content"
android:onClick="onButtonDown" 
android:text="@string/rbWalk" />


<RadioButton
android:id="@+id/radioButtonDrive"
android:layout_width="wrap_content"
android:layout_height="wrap_content"
android:onClick="onButtonDown"
android:text="@string/rbDrive" />


<RadioButton
android:id="@+id/radioButtonFly"
android:layout_width="wrap_content"
android:layout_height="wrap_content"
android:onClick="onButtonDown"
android:text="@string/rbFly" />

</RadioGroup>

</LinearLayout>
~~~~

The Strings:

~~~~ {.code}
<?xml version="1.0" encoding="utf-8"?>
<resources>

<string name="hello">Hello World, SimpleRadioButtonActivity!</string>
<string name="app_name">SimpleRadioButton</string>
<string name="rbWalk">Walk</string>
<string name="rbDrive">Drive</string>
<string name="rbFly">Fly</string>

</resources>
~~~~

The Source Code

~~~~ {.code}
package com.elvenware.simpleradiobutton;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;

public class SimpleRadioButtonActivity extends Activity {

    RadioButton radioButtonWalk;
    RadioButton radioButtonDrive;
    RadioButton radioButtonFly;
    TextView textViewMain;
    
    @Override
    public void onCreate(Bundle savedInstanceState) 
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        textViewMain = (TextView)this.findViewById(R.id.textViewMain);
        radioButtonWalk = (RadioButton)this.findViewById(R.id.radioButtonWalk);
        radioButtonDrive = (RadioButton)this.findViewById(R.id.radioButtonDrive);
        radioButtonFly = (RadioButton)this.findViewById(R.id.radioButtonFly);        
    }
        
    public void onButtonDown(View view) 
    {    
        if (radioButtonWalk.isChecked())
            textViewMain.setText("You choose to walk");
        else if (radioButtonDrive.isChecked())
            textViewMain.setText("You choose to drive");
        else if (radioButtonFly.isChecked())
            textViewMain.setText("You choose to fly");
    }
}
~~~~

Links {#links}
-----

-   Download the [source for
    HandleButtonClick](../../downloads/Android/HandleButtonClick.zip)
-   Download [UseEditText](../../downloads/Android/UseEditText.zip)

 

 

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../index.html) |
[Delphi](../delphi/index.html) | [CSharp](../csharp/index.html) | [My
Books](../../books/index.html)
