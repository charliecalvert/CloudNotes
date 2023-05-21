Markdown
--------

Markdown allows you to write a simple syntax defining a file. The markdown file
can be read on its own, or converted to:

- HTML
- WikiMedia
- PDF
- Word
- etc

The point is to have one source file that can be used in multiple places.
Perhaps more importantly, it ensures that we don't get locked into any one
technology.

We use a slightly expanded syntax for markdown that can be compiled with Pandoc.
You can install it from here:

<http://johnmacfarlane.net/pandoc/installing.html>

The drawback is that it has only a limited number of things it can handle:

- Headings
- Plain text (Paragraphs)
- Lists
- Figures (images)
- Tables
- A few other simple items.

Read the documentation here:

<http://johnmacfarlane.net/pandoc/README.html#pandocs-markdown>

You will also want to read this, of which the above is subset:

<http://johnmacfarlane.net/pandoc/README.html>

Pandoc
------

If Pandoc is hard for you to install, instead use Dillinger:

<http://dillinger.io/>

Use this with NPPExec in NotePad++. it will convert the markdown file currently
in the editor to standalone HTML file with the same root name. For instance, it
will convert *foo.md* to*foo.html*.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
"C:\Program Files (x86)\Pandoc\bin\pandoc.exe" -s -t html5 -o $(CURRENT_DIRECTORY)\$(NAME_PART).html "$(FULL_CURRENT_PATH)"
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

It means:

- Run Pandoc: "C:Files (x86).exe"

- Create an standalone HTML5 file: -s -t html5

- Put the output here: \$(CURRENT_DIRECTORY)\$(NAME_PART).html

- Convert contents of file in the NPP editor: "\$(FULL_CURRENT_PATH)"
