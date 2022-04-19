---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/regular_expressions/index.md
relativePath: elvenware/development/regular_expressions/index.md
title: Index
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: index.md
fileNameHTML: index.html
image: ./course/course-javascript.jpg
subject: regular_expressions
queryPath: elvenware/development/regular_expressions/
---

<!-- toc -->
<!-- tocstop -->

# Regular Expressions

[Python Reg Expressions](PythonRegEx.html)

## HTML: Find all the Style (or span) Tags

The problem here is that there can be a lot of junk in the tags. So you want to use something like: **style.\***. The problem is that you run across greediness. The parser won't stop at the end of the tag.

Suppose you have this:

<p>Bar</p>

Your goal is to find <p>, but instead, you keep selecting this: <p>Bar</p>.

A technique called negation is one way to turn off greediness. Search on this string **p\[^>\]\***. It will find <p>. The negation means that it will find all characters except the closing angle bracket. It selects until it finds the closing angle bracket.

For instance here is how to find all the class properties in Expression Web:

**:bclass="\[^"\]\*"**

Or in a Posix compliant tool like NotePad++:

**\\sclass=\[^>\]\***

The **:b** would be a space, in Expression Web, but in many other RegEx dialects it **\\s**. Then look for the word **class** followed by an equals sign and an opening quote. The next character is the negation. We look for any characters we find  until we stumble upon another quotation symbal. Then we stop. But just to make sure we return something that includes that final quote, and nothing else, we explicitly reference that closing quote after the negation.

Here is how to do the same thing for styles:

:bstyle="\[^"\]\*"

This kind of construct can help you find newlines:

<span**$\\r\\n**(\[^>\]\*)
>$\\r\\n(</span></span>\[^>\]\*)

I the first of the above examples, you can remove the new line by replacing the result with this, which \\1 represents the result returned by the part inside parenthesis:

<span \\1

Here is a way to remove all the empty spans from a file in Expression Web:

**<span>|<.span>**

It looks for <span> or </span> and removes them.

Find opening span tag:

```html
<span[^>]*>
```

## Some Expressions

C# has a good regular expression parser in it. But not all regular expression parsers are good, especially those in editors. The one I rely on the most is built into notepad++.

Look above for the simplest way to find a style tag in a regular expression. But here are some expressions that might be useful in some cases.

*   **Find Style**: \\s?style="\[A-Za-z0-9=:;"-\\s\]\*
*   **Find font-family**: font-family\\:\\s\['A-Za-z, -\]\*;\\s?
*   **Find line-XXXX: YYY**: line-\\w\*:\\s\[a-z0-9.\]\*\\w\\w;\\s?
*   **Find font-XXXX**: YYpx: font-\\w\*:\\s\[0-9.\]\*\\w\\w;\\s?
*   **Find text-XXXX: YYY**: text-\\w\*:\\s\[a-z0-9.\]\*\\w\\w;\\s?
*   **Find padding-XXXX: YYY**: padding-\\w\*:\\s\[a-z0-9.\]\*\\w\\w;\\s?
*   **Find letter-XXXX**: YYY: letter-\\w\*:\\s\[a-z0-9.\]\*\\w\\w;\\s?
*   **Find webkit-XXXX:YYY**: -webkit-\[a-z-\]\*:\\s\\w\*;\\s?

## Regular Expression in C#

See [this page](../csharp/RegularExpressions.html).
