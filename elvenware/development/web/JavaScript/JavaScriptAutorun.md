---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript/JavaScriptAutorun.md
relativePath: elvenware/development/web/JavaScript/JavaScriptAutorun.md
title: JavaScriptAutorun
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
subject: JavaScript
---

<!-- toc -->
<!-- tocstop -->



## Overview

We automatically run JavaScript in the included file.

## Details

We include a JS file:

```html
<script src="../Scripts/AutoRun.js" type="text/javascript"\>\</script>
```

And inside it we execute JavaScript:

```javascript
document.write("\<p\>JavaScript text run automatically\</p\>");
```

The point is that arbitrary JavaScript is run without us ever explicitly
calling it. This can be useful or dangerous, depending on how it is
used.

 
<script src="/javascripts/dev-web/AutoRun.js" type="text/javascript"></script>
