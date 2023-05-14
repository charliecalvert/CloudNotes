---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript/JavaScriptAutorun.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript
fileName: JavaScriptAutorun.md
relativePath: /web/JavaScript/JavaScriptAutorun.md
title: JavaScriptAutorun
directoryName: JavaScript
category : cssguide-guide
---



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
