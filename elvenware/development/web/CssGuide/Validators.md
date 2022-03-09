---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/CssGuide/Validators.md
relativePath: elvenware/development/web/CssGuide/Validators.md
title: Validators
debug: aec has both but checking ELF code
creationLocalTime: 3/8/2022, 3:55:50 PM
---

<!-- toc -->
<!-- tocstop -->

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
