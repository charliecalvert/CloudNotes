---
creationLocalTime: 5/30/2022, 10:14:46 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/jquery-guide/JQueryInputControls.md
relativePath: jquery-guide/JQueryInputControls.md
title: JQueryInputControls
queryPath: jquery-guide/
subject: jquery-guide
fileNameMarkdown: JQueryInputControls.md
fileNameHTML: JQueryInputControls.html
---


<!-- toc -->
<!-- tocstop -->

## jQuery and Input Controls

Declare an input control:

```html
<input id='inputData' type="text" value="Default data">
```

Get text from an input control:

```html
var inputData = $('#inputData').val();
```

Put text in an input control:

```html
var stringToShowUser = 'You entered: ' + inputData;
$('#inputData').val(stringToShowUser);
```
