---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/HtmlGuide/MetaViewport.md
relativePath: elvenware/development/web/HtmlGuide/MetaViewport.md
title: MetaViewport
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: MetaViewport.md
fileNameHTML: MetaViewport.html
---

<!-- toc -->
<!-- tocstop -->

This page is now obsolete. Go here:

- [Html Syntax](HtmlSyntax.html#metaTag)

Meta Tags
---------

Meta tags \<meta\> go in the header and will not be displayed in a
document. They are used by the browser itself, by search engines and
spiders. They provide information about the page in which they reside.

Two of the most important things you can put in a meta tag are a
description and list of keywords.

The tag usually has two attributes, the name and a required content
attribute. Sometimes you will find scheme and http-equiv attributes.
Don't use both http-equiv and name. They are either-or options.

```html
<meta name="description" content="Learn about the HTML meta tag" />
<meta name="keywords" content="HTML, Elvenware, meta, tag, content, name" />
```

Name Viewport
-------------

```html
<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0" />
```

See also, [media queries](/css-guide/MediaQueries.html).
