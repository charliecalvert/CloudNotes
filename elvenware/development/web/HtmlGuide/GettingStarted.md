---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/HtmlGuide/GettingStarted.md
relativePath: elvenware/development/web/HtmlGuide/GettingStarted.md
title: GettingStarted
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: GettingStarted.md
fileNameHTML: GettingStarted.html
---

<!-- toc -->
<!-- tocstop -->

# Getting Started with HTML

HTML and CSS are markup languages. You can use them to define the
content and appearance of items on a page rendered in a browser or other
tool.

Here is a simple example:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Simple Document</title>
		    <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <h1>Simple Document</h1>
        <p>This is a simple HTML5 document.</p>
    </body>
</html>

```

There are two primary types of markup:

-   Semantic markup wrapped around the content found in HTML files. An
    HTML file usually has the extension **.html** or **.htm**.
-   Presentation markup found in a cascading style sheet. A cascading
    style sheet, or CSS file, is usually saved in a file with a **.css**
    extension.

We want to separate content and presentation. We use HTML tags to define
the structure of the content that we want to share with the user. This
includes text, video, and images. We use CSS to define the way the page
should appear. This includes thing like the pages color, the text color,
the text font and size, whether the text is italic or bold, etc. All
this should be defined in a CSS file, and kept separate from the content
defined in the HTML file.

-   Content and Structure: Semantic mark up in HTML files: Text, video,
    images, etc.
-   Presentation and Appearance: Stylesheets in CSS files: Text color,
    background color, font size and color, bold, italic, underlined,
    etc.

There are no rules that force you to separate content and style. In
fact, it is possible to mix them up, but the result is rarely pleasing
or useful.

The separation of content and presentation may be a purely voluntary
decision, but it is considered a best practice. That perhaps does not
state the matter firmly enough: it is considered a hallmark of well
written code that content is found in HTML files and presentation in CSS
files. To abandon this stratagem is usually a serious mistake.

## Web Design {#webDesign}

When building pages, it is most important to think about design. This is especially true of the mobile web.

- [Web Fundamentals](https://developers.google.com/web/fundamentals/)
- [One](https://developers.google.com/web/fundamentals/layouts/rwd-fundamentals/)

## Ports

Computers have an IP address which makes them reachable over the internet. But each computer supports many services, such as FTP, SSH, HTTP. We use ports to request a particular service. On computer X give me the service on Port Y;

<pre>
http://192.168.2.23:30025
</pre>

On the computer at 192.168.2.23, give me the service running on port 30025.

## Semantic HTML {#semanticHTML}

The word semantic used in this context can be confusing. The problem
stems from the fact that semantics, when applied to text, has a common
and well established set of associations that has nothing to do with web
pages. When we see text, and we hear the word semantics, we think about
the meaning of the text. In this context, however, that is not the
correct interpretation.

Semantics is the study of meaning. If you have a paragraph of text, and
you are trying to describe or define what it means, then you are
discussing the semantics of the paragraph. That is the way you have
probably used the word in the past.

Semantic markup is a different matter altogehter. It refers to the way
we can use HTML tags to give the elements in an HTML page meaning. In
this case, we are not talking about analyzing a paragraph to decide what
the words in it mean. Instead, we are assigning very broad, meta-level
meaning to the elements on a page.

Consider the following text:

*This is a paragraph.*

Now consider the following bit of HTML:

*\<p\>This is a paragraph.\</p\>*

In the second example we are marking up text by using the HTML \<p\>
tag. This tag gives semantic meaning to a the text. In particular, \<p\>
tags are used to assert that a chunk of text in an HTML document is a
paragraph. By surrounding a bit of text with a \<p\> tag, we are giving
it meaning, we are saying that it is a paragraph. We aren't analyzing
the text itself to discover what the text means, we are simply making a
very broad statement about the text: it is a paragraph.

You might, of course, object that you didn’t need to be explicitly told
that a paragraph is a paragraph: you could figure that out for yourself.
But a computer does not reason as you do. It is difficult, if not
impossible, to give a computer a page of text from a book and teach it
to distinguish between paragraphs, headers, lists, footnotes, side
panels, and so on. By using HTML tags, however, we can easily assign
semantic meaning to the elements of a page, and hence teach a computer
to distinguish between these elements. The markup does not help the
computer or the reader better understand the content, but only declare
whether a bit of text is a paragraph, a header, a footer, etc. This is
what we mean by semantic markup.

The words semantic HTML might sound complex. The idea behind them,
however, is very simple. It may be hard to discover the meaning of a
paragraph in the works of Emanuel Kant. It should not, however, ever be
difficult to discern that a bit of text in an HTML document is a
paragraph. In general, if it is difficult to parse and understand the
basic "HTML semantics" of an HTML page, then something is wrong. In
particular, it usually means that the developer has done a sloppy job of
constructing the page. HTML semantics is a simple subject, and an HTML
page should usually have mark up that is easy to understand.  

## More on Markup

As you have seen, we can use HTML to give meaning, to describe, the
content found in our pages. We don't use HTML markup to describe how a
page should look: that is the job of CSS. Instead, we use markup to give
meaning to the elements in a page. In particular, we are using HTML
markup to say that some piece of content is a paragraph, a header, a
footer, etc.

 Here are a few commonly used HTML tags:

-   \<p\>: This is a paragraph tag
-   \<h1\>: This is primary heading tag
-   \<h2\>: This is secondary heading tag
-   \<article\>: This tag marks the beginning of an article embedded in
    an HTML file
-   \<section\>: This tag marks the beginning of a section in an HTML
    file
-   \<div\>: This tag marks the beginning of a division in an HTML
    document

These various tags tell us nothing definitive about the way text should
be rendered. Instead, they tell us something about the meaning of the
content found within the tag. For instance, the text found inside a
\<p\> tag defines a paragraph. The text found in an \<h1\> tag defines a
header. The content found in an article tag is part of an article. It
says nothing about fonts or colors. It is just a way of saying "this is
a paragraph, this is a heading."

When put this way, the whole matter may seem trite, or obvious. However,
in the history of HTML, web developers tended to think of \<p\> tags as
a way to make text appear in a default font. The \<h1\> tag was a way to
create large text. As informed HTML developers,  we abandon all such
notions. For us, HTML is a syntax for creating tags that give meaning to
our content. We are not talking about the meaning of the sentences in a
paragraph. We are simply saying that a tag will tell us whether a block
of content is part of a header, or part of a paragraph, or part of some
other section of the document, such as footer or navigation section. For
instance, this paragraph that you are reading is found inside a \<p\>
tag. The \<p\> tells an HTML parser that this bit of text is part of a
paragraph. It says nothing about what the words in the paragraph mean.

Semantic HTML is helpful because it helps us write clean, easy to
understand markup. But its value goes beyond that. It can also help an
HTML parser extract information from a document. For instance, if an H1
tag is used only to specify major headings in a document, then a parser
can scan through a document, pull out the H1 elements, and come away
with a summary of the major points in the document. This concept helps
to form the roots of the Semantic Web, which is a way of making pages
intelligent enough so that they content can be parsed and linked by
automated tools. But we are now getting ahead of ourselves.

## First Steps {#firstSteps}

The first step is to gather together or imagine various forms of content
such as words, sentences, images, videos, sound clips, etc. Next one
creates and HTML page and places this content, or references to this
content, inside a set of tags. Collectively, these tags are known as
markup.

Consider the following sentence:

    Here is some content.

That sentence represents some content that you want to display to a
user. Here is how to "mark it up" by surrounding it with tags:

    <p>Here is some content</p>

The mark up here is a P tag, or paragraph tag. There are two bits of
markup, an opening tag and a closing tag. The opening tag consists of
two angle brackets, the closing tag of two angle brackets and a slash:

-   Here is an opening tag: \<p\>
-   Here is a closing tag: \</p\>

What do these tags do? Why do they exist? To best understand their role,
it helps to perceive them within a certain context. For instance,
suppose our content were to be displayed inside a web browser. In that
case, the browser would scan our content, find the tags, and render the
content based on the tags that it sees. In particular, it would see our
simple \<p\> tags and render the content between them as it feels a
normal paragraph should be rendered. This usually means that there
should be some white space before the paragraph, and a bit of white
space after it. In that context, the role of the \<p\> tag is to mark
the content inside it as a paragraph.

In general, the markup language called HTML is designed for one specific
purpose: to provide semantic context for the content in a document. In
that sense, it provides browsers with a hint about how to render
content. The \<p\> tag stands for paragraph, and its purpose is to tell
a browser that it should render the content found within it as a
paragraph. It doesn't say if the font used should be cursive, serif or
sans serif. It doesn't say what color it should be. Furthermore, it is
possible for all kinds of different tools, including the human eye, to
parse an HTML document, find things like \<p\> tags, and do any number
of arbitrary things with them, either explicitly when they are rendered,
or implicitly when we assign meaning of our own to them..

HTML is a meta language for marking up a document so that different
elements within it are given meaning or assigned to certain abstract
categories. What any one tool might do with that content is up to the
individual tool. For instance, we could build a tool that scans through
a document, finds all the content in the \<p\> tags, and counts the
number of words in that content. This tool would then tell the user how
many words are in the paragraphs of that document. This is not a task
that a browser normally performs, but HTML makes it possible for us to
perform such tasks. In practice, however, the primary thing HTML does is
provide semantic meaning to content, so that a web browser can render it
for a user based on some engineers or managers perception of what that
type of content should look like.

## The Structure of an HTML Document {#theStructureOfAnHTMLDocument}

So far we have focused on one single HTML tag. An HTML document
typically consists of a series of different tags arranged in different
sections. There is a great deal of variety in terms of what specific
tags appear in what specific order in an HTML document. Nevertheless,
there are discreet sections in an HTML document. The actual content of
these individual sections usually varies, but the sections themselves
are always present, and they usually appear in a clearly defined order

For instance, here is a very simple HTML document:

    <html>
    <body>
    <p>Hello world</p>
    </body>
    </html>

Start in the middle, with the content that reads **Hello World**. Note
that it appears inside an opening and closing \<p\> tag. Taken together,
this line of code, is called an element. The element includes the \<p\>
tags and the content inside it. So that one line has three different
parts:

-   The \<p\> tags
-   The content, which consists of the words **Hello World**
-   And the whole line taken together, which is called an element.

Tags, content, element. This is the bread and butter of HTML.

Notice that the paragraph element we have been discussing is folded
inside a \<body\> tag. All of the content that is going to be displayed
inside an HTML document should be defined within the \<body\> tag. It's
purpose is to tell the browser: "Okay, I'm about to start telling you
about the content that I want you to display.

Any one document might have many lines of content. For instance, here is
a document that contains a sonnet:

    <html>
    <body>
      <h1>Shakespeare Sonnet 1</h1>
      <p>From fairest creatures we desire increase,</p>
      <p>That thereby beauty's rose might never die,</p>
      <p>But as the riper should by time decease,</p>
      <p>His tender heir might bear his memory:</p>
      <p>But thou contracted to thine own bright eyes,</p>
      <p>Feed'st thy light's flame with self-substantial fuel,</p>
      <p>Making a famine where abundance lies,</p>
      <p>Thy self thy foe, to thy sweet self too cruel:</p>
      <p>Thou that art now the world's fresh ornament,</p>
      <p>And only herald to the gaudy spring,</p>
      <p>Within thine own bud buriest thy content,</p>
      <p>And tender churl mak'st waste in niggarding:</p>
      <p>Pity the world, or else this glutton be,</p>
      <p>To eat the world's due, by the grave and thee.</p>
    </body>
    </html>

This document has many \<p\> tags in it, but still all of the content
surrounded by those tags is wrapped inside a single \<**body**\> tag.
This pattern never varies inside well formed HTML documents: the content
found in the document is always wrapped in a **body** tag.

You might notice that this document contains not only **\<p\>** tags,
but also a single **\<h1\>** tag. This is called a heading tag, and it
tells the browser to render the words Shakespeare Sonnet 1 as a header.
It says nothing about what a header should look like. Usually, headers
are rendered in large bold print on a single line. The HTML shown here,
however, does not state that explicitly.

There are various levels of headings such as \<**h1**\>, \<**h2**\>,
\<**h3**\> etc. As a rule, \<**h1**\> tags are larger than \<**h2**\>
tags, and so on. There is nothing in this document, however, that
insists that this must be so. This hierarchical structure is a
peculiarity of heading tags. There is no such thing as tags called
**\<p1\>,****\<p2\>**, etc.

You have had a look at **\<p\>** tags, **\<h1\>** tags, and **\<body\>**
tags. But what is the purpose of the **\<html\>** tag?

It turns out that most documents have a certain amount of meta
information associated with them. This meta information usually appears
between the opening \<**html**\> tag and the opening \<**body**\> tag:

```html
    <html>
      <head>
        <title>Basho Haiku</title>
      </head>
      <body>
        <p>Clouds now and again</p>
        <p>Give a soul some respite</p>
        <p>From moon-gazing: behold!</p>
      </body>
    </html>
```

This document contains a **head** element, and inside it is a **title**
element. The title element is not considered part of the document's
content and the browser does not render it in the HTML page. However,
most browsers will display in the title in the tab found at the top of a
browser. A title differs from a header in that it is not part of the
main body of the content. There will only be one title in an HTML
document, while there might be many **\<h2\>** tags.

It turns out that you can put a great deal of information inside a
\<**head**\> tag. However, for now, I'm only going to show you the
**title** element. After you have had a chance to think about the broad
outlines of an HTML document, as show above in the Basho document, then
you can start learning about the many subtle pieces of a complex HTML
document.

Finally, you should add a DOCTYPE to the top your document. This tells
the browser which implementation of HTML your code supports. For
instance, if your code is designed for HTML5 or above, then you would
write this:

    <!DOCTYPE html>

Here is a complete HTML 5 document that includes the doctype:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>My Title</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
    </body>
</html>
```
Though I am no longer using it, many people still like to create XHTML
documents which can be set up like this:

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
     "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Untitled 1</title>
    </head>

    <body>

    </body>

    </html>

There is nothing really wrong XHTML per se, and I believe that all our
HTML documents should be written in such a way as to include only valid
XML, nevertheless, many people object to the length and complexity of
the DOCType tag shown here. It simply leaves me with a bad taste
reminiscent off all the horrible \<TABLE\> related code that was
generated circa the mid-oughts. I want my HTML files to be stark and
simple the way that good C\# or Java code is stark, simple and clean.
For instance, the exact DTD and namespace used to define the XHTML
standard is useful to only a few people, in very specific circumstances.
Why should it have to be included on every page we create? So I have
transitioned to HTML5.

I rarely create HTML documents from scratch. Instead I use HTML editors
that create pages like the ones shown above when I choose some option
similar to **File | New Document**.****You want, of course, to be able
to tell your editor whether you want to create an HTML5 document, XHTML
document, an HTML4 document, etc.

## Some Caveats and Guidelines {#someCaveatsAndGuidelines}

The glory of HTML is it's simplicity. Given nothing more than the
information I have presented so far, the next Shakespeare or Basho could
come along and turn the world on its head, writing all her plays, poems
or books with nothing but \<html\>, \<body\>, \<h1\> and \<p\> tags. I
would go on to say that I have a somewhat idiosyncratic believe that the
world would be a better place if that was exactly what we did. If there
were no such as thing as Microsoft Word documents, or PDF documents, or
any other such tool that tends to bind content to particular companies
and particular products, then information would be easier for us all to
access. And in a pure, ideal world, that would be true. And to some
extent, that wish has come true in the real world, in that most content
is available as HTML documents, and can be read by anyone with any
mainstream browser on any platform. This is the promise of HTML, and to
a large degree it has delivered on that promise.

There are, however, some complications. The problems begin with a few
simple objections:

-   Yes, I like headings and paragraphs, but I want more. I want bullet
    points, and numbered lists. I want tables. I want images. I want
    video content and music!
-   And others might want to see other fancier features such as colored
    backgrounds, colored fonts, drop caps, italic, bold and subscript.
-   And someone else might add: yes, your Shakespeare and Basho
    documents are all very nice, but when I display them in a browser,
    the rendering is not quite what I want. For instance, there is too
    much white space between each line in the poems.

And what is said above is really only just the beginning in a long list
of objections, feature requests, and nit picks that not only can, but
always do, surface when this topic comes up. It turns out that HTML has
answers to most of the objections, but they come at a price. That price
is complexity.

If you know enough about HTML, and you have the right browser running on
the right operating system, then you can correctly create and render
even very complex documents. These documents can contain all manner of
peculiar layout and many different multimedia features. The only problem
is that this visual richness and these panoply of features is the result
of the layering of increasing levels of complexity.

Is there anything that can be done to mitigate this surge of complexity
that stems from the desire to create richly formatted documents? It
turns out that there are solutions available, but that they in turn are
not always easy to understand. As in so many different creative fields,
it turns out that much of the best HTML is simple HTML, but that only
very skilled and knowledgeable developers know how to create simple HTML
that also meets the needs of users who want to see rich, beautifully
rendered content.

HTML has its roots in technologies that go back to at least the 1940s,
when Vannevar Bush first proposed the ideas that form the basis for what
we know as hypertext. Since the mid-nineties when the Internet gained
wide acceptance, variants of HTML very similar to those prevalent today
have been in wide use. In fact, most modern browsers can render a well
formed HTML document created in 1995.

It is 2012 as I write these sentences. This means that HTML has been in
widespread use for 15 to 20 years, depending a little on when you want
to mark the beginning of its use.

**NOTE**: *Tim Berners-Lee invented the World Wide Web in 1989, and the
first browsers that rendered an early version of HTML were released in
1991, and reached the general public in 1993. In June of 1993, the first
specification for the Hypertext Markup Language (HTML) was published.*

In terms of human history, a technology that is only 20 years old is
still very new. For instance, cars and airplanes were still in their
infancy twenty years after the first models were created. But twenty
years of web technology is longer than it seems. This is the result of
the speed and volume of communication enabled by the web. Hundreds of
thousands of serious computer scientists and developers have been using
HTML intensely over those twenty years, and they have all been talking
to each other in great depth over the Internet, and in various printed
publications. This means that people have learned a lot about how to
write well formed HTML. The pace at which knowledge in this field has
grown has been astounding. If I go into a book store and find a book on
HTML that was written five years ago, in 2007, I will be wary about much
of what it says. All the code in the book will almost certainly work
perfectly well in modern browsers, but it will not follow many of the
best and most thoughtful conventions that have been delivered over the
last five years. If you go back further, to say 2003, then any book on
HTML written at that time might be not so much useless, as just plain
dangerous. People had a lot of ideas in the early oughts about how to
write good HTML, and it has turned out that many of them wrong. There
were a few people who knew how to write good HTML even back then, but
there were many more whose heads were full of bad ideas. Let me put that
in more politically palatable manner: Most of us who were writing HTML
in 2003 were going about it wrong. We would have been better sticking
with the simpler HTML markup available in 1991, than trying to adopt
many of the principles that gained currency in the early oughts.

These recent developments in the art of writing and rendering HTML are
anything but trivial. Huge strides have been made in recent years, and
new developments are unfolding at a tremendous rate. There are few
subjects in technology that are under such intense development as the
tools and standards that make up the confluence of the three
technologies known as HTML, CSS and JavaScript.

Why am I going into all this at such great length? What is the point?
The problem HTML developers face is quite simple: There are many legal
ways to create a complex HTML document, but most of them are overly
complex, hard to read, and ugly to look at. Well designed HTML, on the
other hand, is frequently easy to read, simple in structure, and even
somewhat aesthetically pleasing. I'm talking here about the markup
itself, not the rendered content we see in the browser.

Given the threat of encroaching complexity, your job as a creator of
HTML documents should include a desire to write simple, well formed
documents that follow the best modern standards. I've gone into a number
of digression, and rambled at considerable length, but I did so for
reason. Here is a summary of the points I have tried to make in this
section:

-   There is a type of HTML document that is very easy to write and very
    easy to understand. It uses few tags, and performs a relatively
    simple, but powerful task.
-   Most users and developers are not happy to use this simple subset of
    HTML. They want to create richer content that has more complex
    layout and more pleasing aesthetic qualities.
-   HTML has, from the perspective of computer technology, a long and
    rather jaded history. People have found many ways to render complex
    documents, and most of them have proven to be less than ideal.
-   In recent years, and in particular since about 2007, a set of
    guidelines for developing well formed HTML documents that produce
    rich content with relatively simple code has emerged.
-   Your job is to first master the simple basics of HTML development,
    and to then adopt the right techniques for creating more complex
    documents.

I will end this section with one final thought: When in doubt, write the
simplest possible code. If you create a document that uses only
**html**, **body**, **head**, **h1** and **p** elements, then absolutely
no one has any grounds for objecting to it. It would render correctly,
and it would fully and completely perform its job. Assuming you have
laid your document out following the guidelines described above, then
you could present it to the most sophisticated developer in the world,
and they would have to pronounce it not just good, but perfect. They
would have no grounds to object to it. In fact, if you encountered a
developer who said something to the effect of: "This sucks, it is just
way to simple," then you would know for certain that the person you were
speaking to only thought he was an expert. He wasn't a real expert. Real
experts understand and appreciate the elegance of simple, well rendered
HTML documents.

## Separation of Concerns {#separateConcerns}

You should always:

- Put HTML in HTML files
- CSS in CSS files
- JavaScript in JavaScript files

The primary reason is to help you when it comes time to debug your
code. If you have a problem with CSS, you should not have to look through
all your HTML and JavaScripts files while trying to track it down. You
should only have to look in CSS files. And so on, for each file type.

Other Reasons:

-  Separation of concerns
-  Loose coupling

If you have a JavaScript error, you want to know that the problem is in a
JavaScript file. It is simply confusing to have to look through all your code,
HTML, CSS, and JavaScript to find the error. The same rule applies to CSS and
HTML problems.

Keep HTML in HTML files and you will know where to look for solutions. This
means that we like writing code like this:

    \$("#test01").addClass("green");

But we don't really like this:

    \$("#test01).css( { backgroundColor: "blue" } );

If you write code like this, you are putting JavaScript in your HTML:

    \<button id="myButton01" onclick="myObject.runButton01()"\>Click Me
    01\</button\>

Instead, it is better to put code like this in your JavaScript file:

    \$("#myButton01").click(myObject.runButton01);


## Web Servers and File System {#serve-file}

When you launch an HTML file in a browser, you might see one of two different types of URLs:

<pre>
  https://localhost/Foo/foo.html
  file:///home/charlie/temp/Foo.html
</pre>

The former URL indicates that your file is hosted by a web server. The second shows that it was served directly from the file system. In many cases, your HTML file will behave the same way regardless of how it is served. Web servers, however, provide many services that the file system simply will not provide. It may, for instance, know how to treat certain kinds of files, how to run scripts or programs, etc. As a result, some HTML files will not render correctly if not served by a web server.

If you are in doubt, use a web server rather than try to access your file from the file system. There are now many web servers available even on small, limited systems. We should learn how to use them. Learning how to open your file in a web server will save you time. In particular, you won't end up trying to debug problems that are due to your file being served from the file system rather than a web server. The irony, of course, is that it is specifically those who are least likely to be using a web server who are most likely to fail to see that an error stems from how a file is being served, rather than from its code.

## Validating a Document {#validatingADocument}

When we create a long document, and even a long document that contains
only very simple HTML elements, we will nonetheless might have the
nagging fear that it might contain errors. Most browsers know how to
ignore many of the typical errors that HTML coders often produce, but
nevertheless, sometimes even small errors can produce strange and
unexpected results. One of the most frustrating problems developers
encounter is that one browser might smoothly accept a minor error, while
the next browser might choke on it altogether. For instance, your page
might render correctly in the Internet Explorer, but blow up in Safari.
Or it might render correctly in Firefox 3.0, but blow up in Firefox
10.0.

To avoid encountering unexpected errors, it is a good idea to run your
page through an HTML validator. The validator will confirm that you have
created well formed HTML. Conversely, it can also identify errors in
your document, and specify the line, and sometimes even the place in the
line, where the error occurs. Even a validated document might still not
render correctly. For instance, some browsers incorrectly render valid
documents, and some browsers are out of date and don't know how to
render modern documents, and sometimes we write valid HTML that does not
do what we expect it to do because we don't really fully understand a
particular standard. Nevertheless, running your document through a
validator is a wise and intelligent step to take.

There are many kinds of HTML validators, but there are two kinds of
validators in wide use:

-   The validators built into sophisticated HTML editors such as
    Dreamweaver, Expression Web, Notepad++, Aptana or Komodo Edit.
-   The W3C editors found here:
    [http://validator.w3.org/](http://validator.w3.org/)
-   [Check this page](http://validator.w3.org/check?uri=http%3A%2F%2Fwww.elvenware.com%2Fcharlie%2Fdevelopment%2Fweb%2FHtmlGuide%2FGettingStarted.html&charset=%28detect+automatically%29&doctype=Inline&group=0)
-	[Microsoft Validator](http://www.modern.ie/en-us/report)
-	[Web Page Test Performance](http://www.webpagetest.org/)

It is even a relatively simple matter for a page to contains links that
enabled a user to check if a page is valid. For instance, you can[click
this link to see if this page is
valid](http://validator.w3.org/check?uri=http%3A%2F%2Fwww.elvenware.com%2Fcharlie%2Fdevelopment%2Fweb%2FHtmlGuide%2FGettingStarted.html&charset=%28detect+automatically%29&doctype=Inline&group=0)

## White Space Between Paragraphs {#whiteSpaceBetweenParagraphs}

I guess it could be argued either way, but I think you should use
paragraph tags to break up the text in your article sections. Some
people write this:

~~~~
    By his own account, he ran circles around the rain. <br /><br />
    It was a truth he contested with morbid intensity.
~~~~

While I would write this:

    <p>By his own account, he ran circles around the rain.</p>
    <p>It was a truth he contested with morbid intensity</p>

We use \<p\> tags to provide semantic meaning. They tell us something
about the content in a document. The \<br\> tag really doesn't mean that
much, or at least it doesn't tell us something specific, like: "The code
in this tag represents a single paragraph in a document." So we want to
use a \<p\> tag when we are in fact creating a paragraph. The \<br\> tag
can be useful inside of \<pre\> tags, or in other places where we want
to start a new line without starting a new entity that has some specific
semantic meaning such as a paragraph, a heading, an image, etc.

## GTE MSO 9 - SharePoint {#mso9}

If you place your HTML files on a SharePoint server, you may see a block
of code in your HTML that looks like this:

     <!--[if gte mso 9]><xml>
    <mso:CustomDocumentProperties>
    <mso:ContentType msdt:dt="string">Document</mso:ContentType>
    </mso:CustomDocumentProperties>
    </xml><![endif]-->

GTE means: Greater than or Equal

mso means: Microsoft Office

So this code states that if you are using Office 2000 or later, then the
block of code shown in the **if** statement should be executed.
Apparently the code is inserted when we up load the code to SharePoint.
If you use the explorer view to upload your files then this might now
happen to you. Another way to upload code that might help is described
here.
