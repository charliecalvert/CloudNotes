---
creationLocalTime: 6/3/2022, 12:19:43 PM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/jquery-guide/JQueryTesting.md
relativePath: jquery-guide/JQueryTesting.md
title: JQueryTesting
queryPath: jquery-guide/
subject: jquery-guide
fileNameMarkdown: JQueryTesting.md
fileNameHTML: JQueryTesting.html
---


<!-- toc -->
<!-- tocstop -->

## Set up an HTTP Web Server for Testing

Remember that jQuery is JavaScript, and that means that some features of JQuery might not work right unless you have scripting turned on. It is also a best practice to test your pages on an **HTTP WebServer**. There are many web servers available for developers, but I usually set up IIS in Windows, or Apache in Linux, and use those servers to test my code. I discuss setting up servers in the Web Server section:

- [Server Guide](/server-guide/index.html)
- [Old Link](/charlie/development/web/Server/index.html)

```html
http://www.elvenware.com/charlie/development/web/Server/index.html
```

When everything is set up correctly, your URL should not look like the
first of the following examples, and should look like the second:

- [file:///J:/Web/Elvenware/charlie/foo.html](http://www.example.com) -- not always jQuery friendly
- [http://localhost:8000/charlie/foo.html](http://www.example.com)

Many HTML editors allow you to configure how they launch pages when you
click a preview button. When set up correctly they do not launch a page
with a file URL, but with an HTTP URL. The URLs that begin with HTTP
usually ensure that jQuery will work properly. To set up Expression Web
to preview your pages with right kind of URLs, do the following:

- From the menu, select **Site | Site Settings | Preview**
- Select: **Preview using a custom URL for your local web site.**For
    example, enter**: <http://localhost:8000>**

The actual URL you enter will differ depending on how you have set up
your local web server for testing. And of course the option you choose
will be different if you are using a different editor.
