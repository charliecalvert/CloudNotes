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

Unit Testing
------------

Create a project that you want to test.

-   Create a unit test project. File | New | Android Test Project. See
    Figure 01.
-   Name your project. See Figure 02.
-   Select the project you want to test. See Figure 03.
-   Select your build target. See Figure 04.
-   Open up the src for your test project. Right click on the empty
    package and choose  New | Class
-   Create your test class descending from
    android.test.ActivityInstrumentationTestCase2\<T\> as Shown in
    Figure 5.
-   Now set up the code for your unit tests as shown in Listing 1. By
    default, the class that you are wanting to test can live comfortably
    as a parameterized value in your generic type
    ActivityInstrumentationTestCase2. You might get an error here, if
    you are using some library such as **andEngine** where your main
    class is not a direct descendant of **Activity.** To fix this, I
    went into LearningMan, Project | Properties | Java Build Path |
    Order and Export and checked **andengine.jar**, which is file where
    BaseGameActivity is defined. The point is that
    **LearningManActivity** does not implement Activity, but rather
    BaseGameActivity, and so I had to make sure that JUnit had access to
    **BaseGameActivity**, I assume because it needed to see that
    BaseGameActivity implements **Activity**.
-   Now all you need to do is override **setUp**and write a test, as
    shown in **Listing 2.**

![Creating a unit test project](images/UnitTest01-CreateProject.png)

**Figure 01: Creating an Android Test Project**

![Name your project](images/UnitTest02-NameProject.png)

**Figure 02: Name your project**

![Select the project you want to
test](images/UnitTest03-SelectProjectToTest.png)

**Figure 03: Select the project you want to test.**

![Select build target](images/UnitTest04-SelectBuildTarget.png)

**Figure 04: Select your build target.**

![Create a test class](images/UnitTest05-CreateTestClass.png)

**Figure 04: Create your test class.**

~~~~ {.code}
package com.elvenware.walking.test;

import android.test.ActivityInstrumentationTestCase2;
import com.elvenware.walking.LearningManActivity;

public class BasicTests extends ActivityInstrumentationTestCase2<LearningManActivity>
{
    public BasicTests()
    {
        super("com.elvenware.walking", LearningManActivity.class);
    }
}
~~~~

**Listing 1: Setting up your unit test.**

~~~~ {.code}
package com.elvenware.walking.test;

import android.test.ActivityInstrumentationTestCase2;
import com.elvenware.walking.LearningManActivity;

public class BasicTests extends ActivityInstrumentationTestCase2
{
    private LearningManActivity mActivity;

    public BasicTests()
    {
        super("com.elvenware.walking", LearningManActivity.class);
    }

    @Override
    protected void setUp() throws Exception 
    {
        super.setUp();
        mActivity = this.getActivity();
    }

    public void testText() 
    {
        assertEquals("Eduction and learning",
            (String)mActivity.getText(com.elvenware.walking.R.string.hello));
    }
}
~~~~

**Listing 2: A complete test**

Links
-----

[Hello,
Testing](http://developer.android.com/resources/tutorials/testing/helloandroid_test.html)

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../index.html) |
[Delphi](../delphi/index.html) | [CSharp](../csharp/index.html) | [My
Books](../../books/index.html)
