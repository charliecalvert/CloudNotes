---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/CssGuide/StyleSheetChanger.md
relativePath: elvenware/development/web/CssGuide/StyleSheetChanger.md
title: StyleSheetChanger
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
---

<!-- toc -->
<!-- tocstop -->

High Styling
============

This page shows how to allow the user to switch between CSS style sheets
with a mouse click. Click on the links below to see how it works:

-   [style1](#)
-   [style2](#)
-   [style3](#)

Link in multiple files and five them a title attribute:

``` {.code}
<link href="../../libs/css/style3.css"
    rel="stylesheet"
    type="text/css"
    title="style3" />
```

Create links in your document that look like this:

``` {.code}
<a href="#" onclick="setStyleSheet('style1');">style1</a>
```

Here is the JavaScript used to drive this feature:

``` {.code}
function setStyleSheet(title)
{
    var sheetName;
    var count = 0;

    if (!title) return;
    var tags = document.getElementsByTagName('link');

    while (sheetName = tags[count])
    {
        var styleIndex = sheetName.getAttribute('rel').indexOf('style');
        if( styleIndex != -1 && sheetName.getAttribute('title') )
        {
            sheetName.disabled = true;
            if(sheetName.getAttribute('title') == title)
            {
                sheetName.disabled = false;
            }
        }
        count++;
    }  
}
```

The driving force here is the title attribute on your link tag. This
title is sent to the JavaScript function. It looks for a link tag that
has this title. If it finds it, it activates it.
