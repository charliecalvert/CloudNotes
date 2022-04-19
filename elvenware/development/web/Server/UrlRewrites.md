---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Server/UrlRewrites.md
relativePath: elvenware/development/web/Server/UrlRewrites.md
title: UrlRewrites
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: UrlRewrites.md
fileNameHTML: UrlRewrites.html
image: ./course/course-javascript.jpg
subject: Server
queryPath: elvenware/development/web/Server/
---

<!-- toc -->
<!-- tocstop -->

URL Rewrites in IIS
-------------------

A URL Rewrite enables a webserver to redirect content to the browser
without signaling the user that this is happening. This is useful if you
want to serve up special content to users of a particular browser or
device. The user asks to go to SomePage.html, and you change the content
of that page depending on the device, browser or some other criteria.
For instance, you might serve up SomePageBig.html for users on a
desktop, and SomePageSmall.html for users on a phone. The user does not
have to know this is happening, the address bar will only show
SomePage.html.

On IIS, URL Rewrites are a feature requiring a separate install. Before
trying to install Url Rewrites, you should install the [Web Platform
Installer](http://www.microsoft.com/web/downloads/platform.aspx), since
it gives you access to various tools that you may or may not find
useful. Now you are ready to install the [URL Rewrite
Module](http://www.iis.net/download/urlrewrite). On the download page,
look at top right for the link. It is hidden in plain sight.

-   Download Page:
    [hhttp://www.iis.net/download/urlrewrite](http://www.iis.net/download/urlrewrite)
-   Web Platform Installer:
    [http://www.iis.net/webpi](http://www.iis.net/webpi)

After the install, you have a new icon in the InetMgr.

### Writing a Rule

Our goal is to write a rule that ensures the following:

-   When we ask for index.html we are served bar.html
-   The URL in the address bar still says index.html
-   But we are really getting bar.html
-   This should happen only in Chrome
-   All other browsers behave normally

To get Started, follow these steps:

-   Click Add Rule
-   Choose Blank Rule
-   Name: MyRule
-   Pattern: index.html (Test it, make sure it is green)

In the Conditions section choose:

-   Add
-   Condition Input: {HTTP\_USER\_AGENT}
-   Pattern: Chrome --- Is it Googles Browser?
-   To test it, get a user-agent string from the log
    -   Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.1 (KHTML, like
        Gecko) Chrome/14.0.835.202 Safari/535.1

The final step is to say the name of the new rule:

-   Rewrite URL: Bar.html
-   Click the Apply button

Now it is time to test it:

-   Go to your Chrome browser
-   go to index.html
-   The browser should say it is loading index.html
-   But it really load Bar.html

The rule gets written out as XML to your **web.config** file, which is
found in a directory for your site:

```xml
<rewrite>
  <rules>
    <rule name="MyRule">
      <match url="page8.html" />
      <conditions>
        <add input="{HTTP_USER_AGENT}" pattern="Chrome" />
      </conditions>
      <action type="Rewrite" url="bar.html" />
    </rule>
  </rules>
</rewrite>
```
