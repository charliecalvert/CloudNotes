---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android/AndroidApplications.md
relativePath: elvenware/development/android/AndroidApplications.md
title: AndroidApplications
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: AndroidApplications.md
fileNameHTML: AndroidApplications.html
image: ./course/course-javascript.jpg
subject: android
queryPath: elvenware/development/android/
---

<!-- toc -->
<!-- tocstop -->

Android Applications
--------------------

Every Android application is run in a sandbox. Each application is a
different user and has a ID, which it will never know. It is possible to
link two applications by allowing them to share an ID. Each ID has its
own VM and its own Linux process. It is completely isolated from the
rest of the OS unless it is given specific privileges.

An android application has components, each of which is declared in the
manifest. There are four different types of components:

-   Activities
-   Services
-   ContentProviders
-   Broadcast Receivers

android.app.Application
-----------------------

This class gets called before the main Activity. You can use it to keep
track of your current state, usually for debugging. For instance, you
can override  the onCreate and onTerminate methods. Specify the name of
this class in the Manifest:

``` {.code}
<application android:name=".MyApplication" ...etc
```

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../index.html) |
[Delphi](../delphi/index.html) | [CSharp](../csharp/index.html) | [My
Books](../../books/index.html)
