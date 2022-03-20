---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Server/ServerSideIncludes.md
relativePath: elvenware/development/web/Server/ServerSideIncludes.md
title: ServerSideIncludes
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: ServerSideIncludes.md
fileNameHTML: ServerSideIncludes.html
---

<!-- toc -->
<!-- tocstop -->

Turn on Server Side Includes in IIS {#ssi}
-----------------------------------

Server Side Includes, or SSI, is a powerful, but not perfect,
technology. It can be extremely useful, but it is not without drawbacks.
Alternatives to SSI include various solutions that drive your site with
scripting engines such as Python or PHP. The primary advantage of the
technology is that it allows you to place code that is repeated
throughout your site in a single file that can be included in multiple
files. Thus you can do something such as write a menu only one time, and
include that menu in multiple HTML files.

Open  the control panel:**Control Panel | Programs | Turn Windows
features on or off**

Select and turn on  **Internet Information Services | World Wide Web
Services | Application Development Features | Server Side Includes**.

The files you create should use a .SHTML extension.

Summary:

-   Windows Server 2008: Server Manager | Roles
-   Windows 7: 
    -   Control Panel | Programs 
    -   Turn Windows Features on or Off
    -   IIS | World Wide Web | App Devlopment

-   Some [documentation](http://www.iis.net/ConfigReference/system.webServer/serverSideInclude).
-   See next slide for screen shot.

![Turn on Server Size Include in IIS][tosinc]



### Syntax

To create an include, we use a syntax like this:

~~~~ {.code}
<!--#include file="iis.inc" -->
~~~~

You simply insert information like that shown above whereever you want
to include another file insider your HTML file. For instance, here is a
complete HTML file with a server side include:

~~~~ {.code}
<html>
<body>
  <p>Here is a server side include:</p>

  <!--#include file="iis.inc" -->
</body>
</html>
~~~~

The include file, which can have any name, but which in this case we
call iss.inc, might look like this:

~~~~ {.code}
<p>This text will be included in another file</p>
~~~~

If the file you want to include in another file is in your current
directory, then use the syntax shown above. Often, however, you want to
include a file in many different HTML files. In that case, it is often
best to place this file in a single location, and refer to it with this
syntax, where we replace the word **file** with the word **virtual,**
and we trace our path from the root of the site:

~~~~ {.code}
  <!--#include virtual="/includes/iis.inc" -->
~~~~

The root of your site is often called **html** on Apache, and
**wwwroot** on iis. There are, however, no hard and fast rules as to
where the root of your site is located. Just think of it as the place
where you put your main index file, the file that serves as the entry
point for your entire site.

### The Handler Mappings

By default, any file with a .**shtml** extension will be searched by the Apache
Web Server for server side includes. On Linux, you can use a neat trick
to bring other files. Create a .**htaccess** file with the following
contents:

~~~~ {.code}
Options +Includes
AddType text/html .shtml
AddOutputFilter INCLUDES .shtml
XXBitHack on
~~~~

This key line here is XBitHack on, which states that any file with
executable permissions will be searched for includes. This means that
you can write the following to make the web server search a file for
server side includes:

~~~~ {.code}
chmod x+ myfile.html
~~~~

On Windows, I don't know a good way to do the same thing. Instead, we
are forced to either rename our files to xxx.shtml, which can break
links and cause confusion, or else we use Handler Mappings to treat all
html files on a site or in a folder as potentially containing server
side includes. Handler Mappers allow us to tell IIS how files with
certain extensions, that is, files of certain types, should be
processed.

First bring bring up the Inernet Information Server Manager. Select your
site. Click on the Handler Mapping icon. Select **Add Module
Mapping.** Fill it in as follows:

![Handler Mappings for HTML files][hm1]

![Handler Map Files Page][hm2]

![Handler Map Files Page][hm3]

And set the **Access** to **script**.

If you group the entries in the Handler Mappings page by Path Type, you
should also be able to find the Handler Mapping for .shtml files. You
are essentially imitating what they did there. My reasoning is simple:
Microsoft engineers defined what is done for .**shtml** files. If they
don't know the right thing to do, then who does?

[![The Handler Mappings Page in Internet Information Server][hmsm4]][hm4]

**Figure X: The Handler Mappings Page in Internet Information Server.
(Click to enlarge.)**

In the above figure, our new entry is at the bottom center, with a path
of **.html.** The .**shtml** entry created by the system when we turned
on SSI, is just a line or two above it.

<!--       -->
<!-- Links -->
<!--       -->

[tosinc]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/charlie-images/development/ServerSideInclude.png
[hmsm1]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/charlie-images/development/HandlerMapping01Small.png
[hm1]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/charlie-images/development/HandlerMapping01.png
[hmsm2]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/charlie-images/development/HandlerMapping02Small.png
[hm2]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/charlie-images/development/HandlerMapping02.png
[hmsm3]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/charlie-images/development/HandlerMapping03Small.png
[hm3]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/charlie-images/development/HandlerMapping03.png
[hmsm4]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/charlie-images/development/HandlerMapping04Small.png
[hm4]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/charlie-images/development/HandlerMapping04.png
