---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android/CreateNewProject.md
relativePath: elvenware/development/android/CreateNewProject.md
title: CreateNewProject
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

Creating New Projects and Importing Existing Projects
=====================================================

This page covers the basic concepts of creating or opening a project in
Android. It also explains the structure of an Android Project.

Start a New Project {#start}
-------------------

-   **File | New | Project | Android | Android Project (Figure 1)**
-   Name the project. (Figure 2)
-   Choose an SDK Target (Figure 3)
-   Create a package name (Figure 4)

The Step by Step

![New Android Project](images/NewProjectAndroid.png)

**Figure 01: Create a new Android Project**

 

![New Project Name](images/NewProjectName.png)

**Figure 02: Naming a project**

![New Project Platform](images/NewProjectPlatform.png)

**Figure 3: Choose an SDK**

![New Project App Name](images/NewAppName.png)

**Figure 4: Set the package name**

This process creates a fully functional standard Android application. It
doesn't do much, it is really a form of Hello World project. But it
should be complete, should compile, and should be fully runable on an
Android device. At this stage, it is often a good idea to select
**Project | Build All** from the Eclipse menu just to be sure all is
going well. If you have problems with some other project, then right
click on that errant project in the**Package Explorer** and
choose**Close Project**.

Running the Application
-----------------------

Now it comes time to run the application. I connected my Android Tablet
to my development machine and selected my project in the **Workspace
Package Explorer** on the far left of the Eclipse IDE. I pushed the
green run button with the hint "Run TestAndroid." The dialog shown below
appeared.

![Run As Android Application](images/AndroidRunAs.png)

When I picked up my tablet, the application was installed on it, and it
was running correctly.

Importing a Project
-------------------

Copy a working project into your workspace

File | Import

General | Existing Projects into Workspace

Next

Browse for the directory that contains your project

![Import Existing Project](images/ImportExistingProject.png)

![Import Project Directory](images/ImportProjectDirectory.png)

If the Libaries (Project Build Target) aren't set up right you won't see
a node in the **Package Explorer** that says something like **Android
3.2**. In Figure X, see that TestAndroid has a build target of Android
3.2, while there is no corresponding node in the TestOpenGl project.

![No Project Build Target](images/NoProjectBuildTarget.png)

Figure X: TestOpenGLdoes not have its Project Build Target set up
properly.

-   Right click on the top node for your project and choose properties.
-   Turn to the Android Page and select an appropriate node, such as
    Android 3.2. See Figure Y.

At this stage, you should be good to go. For more details, bring up the
project properties again, or continue to browse them, and turn to the
**Jave Build Path** page. You can see the item in the filter list on the
left of Figure Y.

![Select project build target](images/SelectProjectBuildTarget.png)

**Figure Y: Selecting the project build target**

Occasionally you will get strange errors such as "unable to resolve
target Android 4" from a project that you import. If you can't seem to
resolve them using any of the normal methods, then try right clicking on
the project in the Package Explorer, and selecting **Android Tools | Fix
Project Properties.**

**The .Project File**
---------------------

One of the files that it pays to get to know is the **.project** file
that is created by Eclipse, and that resides in the root of your project
directory. This file must be present or the project will not open in
Eclipse. It contains two sets of information that are important. At the
top is the name of the name of the project as it appears in the Eclipse
Package Explorer. The next section shows the four main steps that the
IDE goes through when compiling a project:

-   Resource Handler
-   Precompile step
-   Java compilation
-   Valdek creation (ApkBuilder)

At the very body of the file is a quick description of the projects
nature, which shows that it is both a Java and an Android project.

~~~~ {.code}
<?xml version="1.0" encoding="UTF-8"?>
<projectDescription>
<name>bcLibraryUser2_Codrington</name>
  <comment></comment>
  <projects>
  </projects>
  <buildSpec>
    <buildCommand>
      <name>com.android.ide.eclipse.adt.ResourceManagerBuilder</name>
      <arguments>
      </arguments>
    </buildCommand>
    <buildCommand>
      <name>com.android.ide.eclipse.adt.PreCompilerBuilder</name>
      <arguments>
      </arguments>
    </buildCommand>
    <buildCommand>
      <name>org.eclipse.jdt.core.javabuilder</name>
      <arguments>
      </arguments>
    </buildCommand>
    <buildCommand>
       <name>com.android.ide.eclipse.adt.ApkBuilder</name>
       <arguments>
       </arguments>
    </buildCommand>
  </buildSpec>
  <natures>
    <nature>com.android.ide.eclipse.adt.AndroidNature</nature>
    <nature>org.eclipse.jdt.core.javanature</nature>
  </natures>
</projectDescription>
~~~~

Ninety-nine percent of the time you will never have to give this file a
thought, but every once in awhile something will go wrong with it. The
most likely problem being that the file might get last. As you can see,
it is not really that difficult to recreat this file, or copy it in from
a similar project. Most of it is identical from one Android project to
the next, with only the name at the top differing.

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../index.html) |
[Delphi](../delphi/index.html) | [CSharp](../csharp/index.html) | [My
Books](../../books/index.html)
