---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/MarkdownBasics.md
relativePath: Assignments/MarkdownBasics.md
title: MarkdownBasics
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: MarkdownBasics.md
fileNameHTML: MarkdownBasics.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

The Markdown Basics document will help you get up to speed with a simple markup language called Markdown. You can easily convert markdown files to other formats such as HTML and PDF. Since markdown is much easier to write than HTML, it is a great way to create HTML documents.

Summary of what we are going to do:

1. First we create two markdown files. Attach these files to your assignment when you submit it.
1. Create two html files from the markdown files. Save them to disk.
1. Preview the markdown in Atom and block copy the output.
1. In Atom, also save the markdown as HTML. Place the HTML and your markdown in your Repository.</li>
1. Turn in the assignment.</li>

An old, funky, out of date, silent video that might still be helpful when you are learning markdown:

- [Funky Video](https://youtu.be/YZUruYmEFG0)

The video does not use the Atom editor that I now prefer.

## Install Atom

The Atom editor should already be installed on your Virtual Machine. If it is not, you can get it here:

- [https://atom.io/](https://atom.io/)
- Click on the **Download deb** link
- After the download completes, open up the File Manager, navigate to the download, and double click on it. A self explanatory dialog/application will load which will step you through the rest of installation process. More specifically, double click on the downloaded file to launch it in the **Package Installer**. Select the install button.

Once the install is complete, Atom should appear as an item in your Lubuntu **Development** menu. Open it and use it to work through the exercises in this assignment.

Enter the markdown code on the left, see the rendered result on the right when you choose **Ctrl-Alt-M**

## Markdown Writer

To install the **markdown-writer** package:

- Choose **Edit-Preferences** or **Ctrl-,** (Control + comma) to open the Settings menu
- Choose install
- Type in **markdown-writer**
- Press the install button

Now it is time to setup the key bindings.

- Go to the Atom **Settings** page.
- Choose **KeyBindings**
- Click the blue **your keybindings** link near the top
- At the end of the file, paste in the contents of [this file](https://github.com/zhuochun/md-writer/blob/master/keymaps/sample-linux.cson)

## Using Markdown

Markdown is a mark up language for creating documents. It is a tool for creating richly formatted documents with a simple easy to use syntax. For instance, if you underline some text, or place hash marks in front of it, then that marks it as an H1 header:

```
# Markdown

Markdown
=========
```

There are many other ways to mark up a document with markdown. You can also translate markdown to HTML.

One hash mark is an h1, two is an h2, etc:

```
# Markdown Level I
## Markdown Level II
### Markdown Level III
```

When shown in the right renderer, the text shown above would appear in large bold font:

# Markdown Level I
## Markdown Level II
## Markdown Level III

And so on.

## Lists

One of the most commonly used forms of markdown is the list:

```
- One
- Two
- Three
```

When rendered as HTML, this markdown looks like this:

- One
- Two
- Three

In other words, it produces this HTML:

```
<ul>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>
```

## Creating Links

Here is how to create a hyperlink:

```
[Elvenware](http://www.elvenware.com)
```

This creates a link like this:

[Elvenware](http://www.elvenware.com)

The HTML looks something like this:

```html
<a href="http://www.elvenware.com">Elvenware</a>
```

## Creating Pictures

Start with an exclamation point, a bang, and then put a few words in square brackets, then put the URL of the image in parenthesis.

```
  ![My Picture][elf-logo]
```

It looks like this:

![My Picture](http://www.ccalvert.net/charlie/images/elvenwarelogo.png)

## Creating a Longer Document {#creating-documents}

Here is a longer example:

```
# Markdown


This is a markdown document with a list in it.

- Alpha
- Beta
- Charlie
- Delta
- Echo

## Learn More

There is more information about [markdown](https://www.google.com/search?q=markdown) on the web.

Of course you can find information on sites like Elvenware:

- [Elvenware](http://www.elvenware.com)
- [CloudPages](http://elvenware.com/charlie/books/CloudNotes/CloudNotes.html)
```

Here is part of the output created by this markdown code:

## Markdown

This is a markdown document with a list in it.

- Alpha
- Beta
- Charlie
- Delta
- Echo


## Preformat and Code

It can also be useful to tell markdown to leave the formatting for a text alone. For those of you who know HTML, this is similar to using the PRE tag. It can be helpful when you are trying to render code that has complex formatting, or when you are displaying poetry, that again has its own special formatting.

We can render such text in several ways, but one of the simplest is by starting with a row of three back ticks **with no spaces between them**. You can usually also use four tildas, or simply indent the text you want to format. To mark the end of the formatted text, add another three backticks:

![Ozymadias Backtick][oz-back]

**NOTE**: _The exact way to turn off syntaix highlighting with a particular renderer is not clearly defined. Here I have used the class **text**. You might als try **nohighlighting**._

The markdown shown above is rendered like this:

# Ozymandias

```nohighlighting
I met a traveller from an antique land
Who said: `Two vast and trunkless legs of stone
Stand in the desert. Near them, on the sand,
Half sunk, a shattered visage lies, whose frown,
And wrinkled lip, and sneer of cold command,
Tell that its sculptor well those passions read
Which yet survive, stamped on these lifeless things,
The hand that mocked them and the heart that fed.
And on the pedestal these words appear --
"My name is Ozymandias, king of kings:
Look on my works, ye Mighty, and despair!"
Nothing beside remains. Round the decay
Of that colossal wreck, boundless and bare
The lone and level sands stretch far away.'
```
*Percy Bysshe Shelley*

Notice that putting asterisks around the author's name caused it to be
rendered in italics. Putting two asterisks would make the text appear
in bold print.

### HTML

If we are having trouble with backticks, we can also just use a standard HTML PRE tag. We can always fall back on HTML if our other choices don't work for us.

![Ozymandias as Markdown][oz-mark]

And here is what we want it to look like:

# Ozymandias

<pre>
I met a traveller from an antique land
Who said: 'Two vast and trunkless legs of stone
Stand in the desert. Near them, on the sand,
Half sunk, a shattered visage lies, whose frown,
And wrinkled lip, and sneer of cold command,
Tell that its sculptor well those passions read
Which yet survive, stamped on these lifeless things,
The hand that mocked them and the heart that fed.
And on the pedestal these words appear --
"My name is Ozymandias, king of kings:
Look on my works, ye Mighty, and despair!"
Nothing beside remains. Round the decay
Of that colossal wreck, boundless and bare
The lone and level sands stretch far away.'
</pre>

*Percy Bysshe Shelley*

## Markdown on the Web


We will create most of our markdown in **Atom**. You can optionally go to one of these sites and see if you can get started creating your own Markdown document on line:

- [http://markable.in](http://markable.in)
- [http://daringfireball.net/projects/markdown/dingus][daball]
- [http://dillinger.io/](http://dillinger.io/)


Some of these sites show the HTML that can be derived from markdown. If you know anything at all about HTML, take a moment to study the HTML produced from your markdown.

## Saving HTML

You can view the rendered HTML for your document by entering **Ctrl-Shift-M**. You can use that shortcut as toggle to open and close the rendered view. Another way to get to this command would be to press **Ctrl-Shift-P** and type in **markdown preview**.

To save as HTML, right click on the rendered preview and choose **Save as HTML**. (This only works if you have Atom 1.9 or greater installed, but that should be the case in our classes.)

## Render HTML, Save It, View Output on Google Sites {#render-html-to-site}

To convert markdown to HTML in **Atom**:

- Preview it,
- Right click and choose **Save as HTML**.

Place the both the markdown and HTML documents in a folder of your repository called **MarkdownBasics**.

- In particular, I want you to create two new documents:
	- Prog270 Test Document
	- Ozymandias
- While in Atom's preview mode for each document, select the text and press **Ctrl-C** to copy it.


## Google Sites

This part of the assignment is now obsolete. Do not attempt it. We should be using AWS S3 instead.

- Go to AWS S3.
- Upload your files
- Submit a link to your files on S3

Here, for instance, is an example of the kind of link I want to see on Google Sites:

![Google Site Markdown to HTML][gsmk]

Once again, here are the steps to get rendered Markdown into your Google Sites. In Atom, preview your document. Select the text and copy with **Ctrl-C**. In Google Sites, insert a **text box** into a new page. Press **Ctrl-V** to paste it into the **Text Box**. Provide links to your pages when you turn in the assignment. Don't forget to save your raw markdown and HTML code in your repository.

## Turn it in

Duplicate the "Longer Document" and the Ozymandias poem in two separate markdown files. Make sure that each file has the extension **.md**. For instance: **my-file.md**.

Place the markdown files you created in a folder of your repository called **MarkdownBasics**. Also put the HTML for these files in the same folder.

Provide links to the rendered HTML in your Google site.

Include at least one image on one of your pages.

## Learn More

There is more information about [markdown][go-mark] on the web.

Of course you can find information on sites like Elvenware:

- [Elvenware](http://www.elvenware.com)
- [CloudPages](http://elvenware.com/charlie/books/CloudNotes/CloudNotes.html)

There are many tools available that can convert the Markdown shown into HTML. If you feed one of those tools the original markdown shown near the top of this document, then it can produce HTML that looks like this:

If you take the HTML shown above, and save it to a file called Markdown01.html, then open the file in a browser. When rendered in a browser, the file looks like the screenshot shown below:

![Markdown01.png](https://s3.amazonaws.com/bucket01.elvenware.com/images/MarkdownBasics01.png)

Take a moment to consider what we are doing. We are using an extremely simple form of markup to create nicely formatted HTML files that look reasonably attractive on the web. Markdown is flexible enough so that you can provide complex formatting for the HTML pages you render. For instance, much of Elvenware is now created with simple markdown files like the one shown above. Relatively complex tools, such as Stackoverflow,  also use markdown as their primary means of formatting the text and code supplied by its users.

In this class we looking to find ways to create content of various kinds that can be shared between desktop machines, tablets, and phones. We are learning that we can create documents in Google Drive, in SkyDrive, on Google Sites, and on Evernote, and view them in all three places. We can also create markdown files and have them rendered in all three locations. In other words, this is another means of sharing information between multiple devices. As we will see, having information in simple text format like this provides special advantages that are hard to achieve with any of the other tools we have looked at so far.

**NOTE**: _Remember, when you see a tilda, you can mentally substitute the path to your home folder for it. So on a system where you are logged in as **bcuser**, then following are two ways of saying the same thing:_

- ~/Documents/Prog270
- /home/bcuser/Documents/Prog270

[gsmk]: https://s3.amazonaws.com/bucket01.elvenware.com/images/atom-google-site-test-01.png
[daball]: http://daringfireball.net/projects/markdown/dingus
[oz-mark]: https://s3.amazonaws.com/bucket01.elvenware.com/images/MarkdownBasics10.png
[oz-back]: https://s3.amazonaws.com/bucket01.elvenware.com/images/MarkdownBasics11.png
[elf-logo]: http://www.ccalvert.net/charlie/images/elvenwarelogo.png
[go-mark]: https://www.google.com/search?q=markdown
