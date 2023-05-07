---
layout: post
date: 2023-05-07 01:43:50 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/CssGuide/Validators.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/CssGuide
fileName: Validators.md
relativePath: /CssGuide/Validators.md
title: Validators
directoryName: CssGuide
category : css-guide
---

Validators
----------

Suppose you wrote: **@@media only screen and (min-width : 480px) {}**.
You should have had only one **@** symbol before a media query. Yet this
is the kind of error that is easy to overlook. A misplaced curley brace
or missing semicolon can also cause serious problems, yet be easy to
overlook.

The cure is to run your CSS through a
[validator](http://jigsaw.w3.org/css-validator/#validate_by_input+with_options).
It would have found this error for you.

-   Validators typically support at least two modes:
    -   One involves [checking a
        URL](http://jigsaw.w3.org/css-validator/#validate_by_uri+with_options)
        from a site on the Internet.
    -   If your site is on your home machine, or on an Intranet, then
        you can't pass in a URL. Instead you have to [paste in your
        code](http://jigsaw.w3.org/css-validator/#validate_by_input+with_options).
