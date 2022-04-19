---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android/UI.md
relativePath: elvenware/development/android/UI.md
title: UI
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: UI.md
fileNameHTML: UI.html
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

See the Google IO 2011 App
--------------------------

Action Bar
----------

The ActionBar at the type

It is divided into three sections, with the actions on the right.

There is a separate API

THeme.Holo for SDK 11 or above

You can split an action bar into two levels

### Multi-pane layouts

Helpful on big screens like a tablet

Stretch, Stack, Expand/Collapse, Show/Hide

You should have the same features in portrait and landscape.

#### Fragments and Multi-pane

The Fragment Class or Fragment Tag.

These are fragments of an Activity

Unit of reuse between Activities

Separation of concerns

Fragments don't necessarily have views.

Fragments are backward compatible with even 1.0?

drawable-ldpi/mdpi/hdpi is low density, medium density, high density

Activities can inflate layouts with different  gragment configurations.
You ahve layout-xlarge, layout-medium, etc.

Use CarouselView, but avoid Gallery. Use FragmentPager, Workspace for
showing one item at a time.

[http://j.mp/io2011-carousel-sample](http://j.mp/io2011-carousel-sample)

Everyone uses fragments, but Phones tend to use SessionsActivity, while
tablets use SessionsMultiPaneActivity

Phones: 10dp, 18sp, 36dp, Tablets: different sizes.

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../index.html) |
[Delphi](../delphi/index.html) | [CSharp](../csharp/index.html) | [My
Books](../../books/index.html)
