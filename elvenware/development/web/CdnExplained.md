---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/CdnExplained.md
relativePath: elvenware/development/web/CdnExplained.md
title: CdnExplained
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
---

<!-- toc -->
<!-- tocstop -->

## Overview

Online Code and CDN Explained.

CDN stands for Content Delivery Network. The goal of CDN is to store
important libraries at an URL so that you can include that URL in the
head element of your HTML files when you need to link in a particular
library. Some of the CDN sites, such as Google's, link to a wide range
of libraries. It is therefore worthwhile becoming familiar with that CDN
site, and the libraries that it caches for you. Other important sites
include the jQuery CDN and the Microsoft CDN.

-   Here is the [Google
    Library](http://code.google.com/apis/libraries/devguide.html)
    -   [https://developers.google.com/speed/libraries/devguide](https://developers.google.com/speed/libraries/devguide)

-   jQuery on Google CDN:
    -   [https://developers.google.com/speed/libraries/devguide](https://developers.google.com/speed/libraries/devguide)

-   jQuery CDN on jQuery site:
    -   [http://code.jquery.com/](http://code.jquery.com/)

-   Here is the Microsoft Ajax CDN:
    -    [http://www.asp.net/ajaxlibrary/cdn.ashx](http://www.asp.net/ajaxlibrary/cdn.ashx)

-   Here is the [Google Code
    Playground](http://code.google.com/apis/ajax/playground/?exp=libraries#jqueryui)
    though I would avoid google.load....

An example of using CDN:

```html
<script type="text/javascript" src="http://code.jquery.com/jquery-1.7.2.min.js"></script> 
```

It may surprise you to learn that it is probably best to use
**http://XXX** style URLs in your code rather than hosting the files
yourself. Although there could obviously be exceptions to this rule, it
should be obvious that Google, jQuery or Microsoft will do a better job
of caching and serving up these files than your site. So if you host
your site on the web, go ahead and use this technique. If you hose your
site for Intranet that lies behind a firewall, then maybe you should and
maybe you shouldn't. My guess is that you probably should. But if you
are on a public site, then use the URL that points to a public CDN.

- [CDN on Wikipedia](http://en.wikipedia.org/wiki/Content_delivery_network)
