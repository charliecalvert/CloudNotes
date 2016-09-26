## Overview

The Markdown Basics document will help you get up to speed with a simple markup language called Markdown. It is easy, and common to convert markdown to HTML. Since markdown is much easier to write than HTML, it is a great way to create HTML documents.

Summary of what we are going to do:

<ul>
<li>First we create two markdown files. Attach these files to your assignment when you submit it.</li>
<li>Now create two html files from the markdown files. Save them to disk.</li>
<li>Also create two blank pages in your Google Site.</li>
<li>To open up the HTML editor, select the HTML doo-hickey from the Control bar in your Google Site. Open up one of your HTML files in a text editor such as geany. Copy and Paste the HTML from your text editor to the HTML editor on your Google Site. One file on each page.</li>
<li>Save your work in Google Sites.</li>
<li>Provide links to both pages you created on your Google site</li>
<li>Turn in the assignment.</li>
</ul>

An old, funky, out of date, silent video that might still be helpful:

- [Funky Video](https://youtu.be/YZUruYmEFG0)

The video does not use the Atom editor that I now prefer.

## Install Atom

The Atom editor should already be installed on your Virtual Machine. If it is not, you can get it here:

- [https://atom.io/](https://atom.io/)
- Click on the **Download deb** link
- After the download completes, open up the File Manager, navigate to the download, and double click on it. A self explanatory dialog/application will load which will step you through the rest of installation process. More specifically, double click on the downloaded file to launch it in the **Package Installer**. Select the install button.

Once the install is complete, Atom should appear as an item in your **Accessories** or **Development** menu. Open it and use it to work through the exercises in this assignment. Enter the markdown code on the left, see the rendered result on the right when you choose **Ctrl-Alt-M**

To install the **markdown-writer** package:

- Choose **Edit-Preferences** or **Ctrl-,** to open the Settings menu
- Choose install
- Type in **markdown-writer**
- Press the install button

Set up the key bindings.

- Go back to the Settings page if you are not still there.
- Choose KeyBindings
- Click the blue **your keybindings** link near the top
- Paste in the contents of [this file](https://github.com/zhuochun/md-writer/blob/master/keymaps/sample-linux.cson)
  - In general you can overwrite the contents of the existing **keymaps.cson** file, which is just a long comment. Or keep the comments if you find them helpful. Of course, if there is something other than comments in the file, then you might want to preserve them.

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

#My Header

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
  ![My Picture](http://www.ccalvert.net/charlie/images/elvenwarelogo.png)
```

It looks like this:

![My Picture](http://www.ccalvert.net/charlie/images/elvenwarelogo.png)

## Creating Documents

Here is a longer example:

~~~~
Markdown
========

This is a markdown document with a list in it.

- Alpha
- Beta
- Charlie
- Delta
- Echo

Learn More
----------

There is more information about [markdown](https://www.google.com/search?q=markdown) on the web.

Of course you can find information on sites like Elvenware:

- [Elvenware](http://www.elvenware.com)
- [CloudPages](http://elvenware.com/charlie/books/CloudNotes/CloudNotes.html)
~~~~

Here is the output created by this markdown code:

Markdown
========

This is a markdown document with a list in it.

- Alpha
- Beta
- Charlie
- Delta
- Echo


## Preformat and Code

It can also be useful to tell markdown to leave the formatting for a text alone. For those of you who know HTML, this is similar to using the PRE tag. It can be helpful when you are trying to render code that has complex formatting, or when you are displaying poetry, that again has its own special formatting.

We can render such text in several ways, but one of the simplest is by starting with a row of three back ticks **with no spaces between them**. You can usually also use four tildas, or simply indent the text you want to format. To mark the end of the formatted text, add another three backticks:

![Ozymadias Backtick](https://s3.amazonaws.com/bucket01.elvenware.com/images/MarkdownBasics11.png)


**NOTE**: *The exact way to turn off syntaix highlighting with a particular renderer is not clearly defined. Here I have used the class **text**. You might als try **nohighlighting**.*

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

![Ozymandias as Markdown](https://s3.amazonaws.com/bucket01.elvenware.com/images/MarkdownBasics10.png)

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


We will create most of our markdown in **Remarkable**. You can optionally go to one of these sites and see if you can get started creating your own Markdown document on line:

- [http://markable.in](http://markable.in)
- [http://daringfireball.net/projects/markdown/dingus](http://daringfireball.net/projects/markdown/dingus)
- [http://dillinger.io/](http://dillinger.io/)


Some of these sites show the HTML that can be derived from markdown. If you know anything at all about HTML, take a moment to study the HTML produced from your markdown.

## Saving HTML

To convert markdown to HTML in **Remarkable**, choose **File | Export as HTML**. No go to your Google Site.

- Create two new documents:
	- Prog270 Test Document
	- Ozymandias
- While in edit mode for each document, click the HTML symbol at the far right of the toolbar to open the HTML editor.
- Open your HTML in Geany. Block copy it. Paste it in the HTML editor in Google Sites.
- Save your work and note the URL for your document.

## Turn it in

Duplicate the "Longer Document" and the Ozymandias poem in two separate markdown files. Make sure that each file has the extension **.md**. For instance: **my-file.md**.

Attach the files to your assignment. Just the raw text should be fine. I don't think you need to use a zip file. In Remarkable, save the text as HTML and paste it into two pages in your Google Site. Provide links to your pages when you turn in the assignment.

Here, for instance, is an example of the kind of link I want to see:

- [https://sites.google.com/site/charliecalvertbc/home/prog270testcalvert](https://sites.google.com/site/charliecalvertbc/home/prog270testcalvert)

Learn More
----------

There is more information about [markdown](https://www.google.com/search?q=markdown) on the web.

Of course you can find information on sites like Elvenware:

- [Elvenware](http://www.elvenware.com)
- [CloudPages](http://elvenware.com/charlie/books/CloudNotes/CloudNotes.html)

There are many tools available that can convert the Markdown shown into HTML. If you feed one of those tools the original markdown shown near the top of this document, then it can produce HTML that looks like this:

If you take the HTML shown above, and save it to a file called Markdown01.html, then open the file in a browser. When rendered in a browser, the file looks like the screenshot shown below:

![Markdown01.png](../Images/Markdown01.png)

Take a moment to consider what we are doing. We are using an extremely simple form of markup to create nicely formatted HTML files that look reasonably attractive on the web. Markdown is flexible enough so that you can provide complex formatting for the HTML pages you render. For instance, much of Elvenware is now created with simple markdown files like the one shown above. Relatively complex tools, such as Stackoverflow,  also use markdown as their primary means of formatting the text and code supplied by its users.

In this class we looking to find ways to create content of various kinds that can be shared between desktop machines, tablets, and phones. We are learning that we can create documents in Google Drive, in SkyDrive, on Google Sites, and on Evernote, and view them in all three places. We can also create markdown files and have them rendered in all three locations. In other words, this is another means of sharing information between multiple devices. As we will see, having information in simple text format like this provides special advantages that are hard to achieve with any of the other tools we have looked at so far.

## Step By Step Summary

Thanks to Erina Sugita who helped come up with this list:

1.  Open a blank page in Remarkable.
1.  Create the Ozymandias poem using markdown syntax and save it as **Ozymandias.md** in a folder called **~/Documents/Prog270**.
1.  Export the markdown (File -> Export HTML). Save it in the folder called **~/Documents/Prog270**. At this point, you have the **Ozymandias.md** and **Ozymandias.html** files in the **Prog270** folder
1.  Now, start Geany and open **Ozymandias.html**.
1.  Block copy the code between the BODY tags (Ctrl-C).
1.  Go to your Google sites home page and create a new page.
1.  Click the "html" link at the far right of the tool bar. This open an HTML editor.
1.  Paste the code in your clipboard into the HTML editor. (Ctrl-V)
1.  Save your Google Sites page.

Also do the steps outlined above for your **Prog270-Test-Document.md** file. When you submit the assignment, include **Ozymandias.md** and **Prog270-Test-Document.md**. You also need to include the URL for your Ozymandias and Test pages.

**NOTE**: *Remember, when you see a tilda, you can mentally substitute the path to your home folder for it. So on a system where you are logged in as **bcuser**, then following are two ways of saying the same thing:

- ~/Documents/Prog270
- /home/bcuser/Documents/Prog270
