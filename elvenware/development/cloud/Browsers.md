Browsers
========

Searching on Google
-------------------

Few skills are more important for computer professionals than
knowing how to conduct a good search. I use to think this subject
was entirely intuitive and did not need to be taught. Then I began
to see that there were a number of rules that I was using
implicitly, without conscious thought. They can be taught. Then I
realized that there some tricks that I knew that I hadn't bother to
teach. Then I realized there were tricks that I did not know. The
result is this page.

Let's start by thinking about how to search on Google. Below you
will find a number of examples of how to conduct searches.

Use only the KeyWords
---------------------

The main secret is learning to search on the right keywords. Don't
pose a question in a sentence as you would when asking a human
being. Instead, just list the keywords. Or else, use keywords and
some Google "tricks."

For instance, don't write this: "What are the first five presidents
of the United States?" Instead, write this: "Presidents US". If that
doesn't work try playing with your keywords: "USA Presidents",
"American Presidents", "Presidents American List." Finding the write
permutation is the key. If you do it enough, there will come a time
when you will just intuit what keywords to use in a search. Or
conversely, you will intuit why a search you composed didn't work,
and how to alter it to make it work.

There are rules here:

- Qualify your search. Don't search on "loops", search on
"JavaScript loops." This helps you avoid learning how to write a
Pascal loop when what you care about is looping in JavaScript.
- Put the the most important qualifying keyword first. Don't write
"loops JavaScript," write "JavaScript loops". You don't want to know
about loops in general, and then focus in on JavaScript. You want to
establish the domain, which is JavaScript, and then access for the
part of the domain you want to learn about, which in this case is
loops.
- Use negation, described below, to omit certain words you don't
want in your result set.
- Learn how to search on a particular site, as described below


Ignore Punctuation
-------

Google ignores punctuation in a search. It doesn't hurt to put it in, but
don't waste time fretting over it.

Search only on a Particule Site
----

Search for JavaScript loops on Elvenware:

-     [site:elvenware.com](https://www.google.com/search?q=site:elvenware.com JavaScript loops)

Find Related Sites
-----

-     [related:google.com](https://www.google.com/search?q=related:google.com)
-     [related:nytimes.com](https://www.google.com/search?q=related:nytimes.com)

Finds -- in theory -- all the other search engines on the web and the second
search finds all news sites. At least in theory. But it can be helpful. For
instance:

-     [related:slashdot.com](https://www.google.com/search?q=related:slashdot.com)
-     [related:jquery.com](https://www.google.com/search?q=related:jquery.com)
-     [related:w3schools.com](https://www.google.com/search?q=related:w3schools)

Search for an Exact Phrase
------

Put searches for exact phrases in quotes: "the midnight ride of Paul Revere"

["the midnight ride of Paul Revere](https://www.google.com/search?q="the midnight ride of Paul Revere")


Exclude Words
----

Use a dash to negate. All words but tea:

-    [-tea](https://www.google.com/search?q=-tea)

All words but tea party:

-    [-"Tea Party"](https://www.google.com/search?q=Party -"Tea Party")


## Link

If you want to see who links to a web site or a page on a site, you can use the **link operator**.  

- [link:stackoverflow.com](https://www.google.com/search?q=link:stackoverflow.com)


## Wildcards

Search on a phrase, but omitting certain words or phrases. Suppose you remember part of the Gettysburg address, but not all of it:

- ["Four * and seven years"](http://www.google.com/search?q="Four * and seven years")


## Filetype


-    [filetype:html](https://www.google.com/search?q=filetype:html JavaScript Types)


Page Titles
-----------

Search only for the title of a page    

-    [intitle](https://www.google.com/search?q=intitle:"JavaScript Types")


Define a Word
-------------

Use the word define:

-    [define:antidisestablishmentarianism](https://www.google.com/search?q=define:antidisestablishmentarianism)

Compose a Google URL
----

Sometimes you want to search not for a page, but for a Google Search page. In other words, you want to take a user to the Google search page, and show them the results of a particular query. To do that, write the Google URL, then a slash character, then the word **search**. After that place a question mark and the letter queue = your search. Like this, where the first examples shows how to see what Google comes back with when you search for jetbrains and students:

-    <http://www.google.com/search?q=jetbrains+students>
-    <https://www.google.com/search?q=related:jquery.com>

## More Search Tips

- [Google Search Basics](https://support.google.com/websearch/answer/134479?hl=en&ref_topic=3081620)
- [Google Search Operators](https://www.google.com/search?q=google+search+operators)
- [Use the advanced Search Page](https://www.google.com/advanced_search)
- <http://www.lifehack.org/articles/technology/20-tips-use-google-search-efficiently.html>


## Emulate a Mobile Device

In both the Chrome and FireFox desktop browsers you can emulate a mobile device. Here is device emulation in Chrome:

![DevEmChrome](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGbVh2enhYYUduYnM)

Here is the responsive device mode in FireFox:

![DevEmFF](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGVjlRbTR2RDJHWUE)

In Chrome, press F12 or Ctrl-Shift-I to bring up the developers tools. Notice the toolbar:

![Chrome](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGa1ZaRDhRRzA0S1E)

 1. Icon 1: Search
 2. The icon numbered 2 let's you toggle device emulation mode
 3. Icon 3: This shows there is an error in the source code for the page. Click it, and the drawer opens on the console page.
 4. The icon numbered 4 opens the drawer. You can use drawer to see the console while on the Source or Elements tab.
 5. Icon 5: The gear opens the settings page.
 6. Icon 6: Change the docking. You can dock the developer tools on the left or right. You can also float the developer tools in the own window. Long hold the developer tools icon to choose between docking on the left and right.
 7. Icon 7: Close the developer tools

In FireFox you can open the Web Developer tools by choosing F12 or Ctrl-Shift-I. Here are the main toolbar in the FireFox Web Developer Tools:

![FireFox](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGTm9Db2pIU0lsUDg)

- Icon 1: This is like the drawer in Chrome. It lets you toggle a console window even when you are not in console mode.
- Icon 2: Responsive Design Mode, which is like Device Emulation in Chrome
- Icon 3: The gear opens the settings
- Icon 4: Switch docking the Web Developer tools over to the right.
- Icon 5: Float the Web Developer tools in their own window.
- Icon 6: Close the Web Developer tools.

## Reset Chrome

Some trouble shooting tips to use if Chrome is misbehaving. Only do these things if your browser is completely breaking down and not acting rationally.

Are you on the latest version of Chrome? Go to this page and make sure you are completely up to date:

	chrome://chrome/

Another thing to try is to completely clear the history and remove all extensions. Press Ctrl-H and then choose Clear Browsing Data and clear everything. You will lose your passwords, your history, absolutely everything, but clearly something is wrong, and we need to find what it is. Try again whatever it was that made you want to reset the browser.

Then go to chrome://extensions/ and make sure everything is disabled. All extensions except Secure Shell. Try again. If that doesn't work, then remove all the extensions except Secure Shell. Try to connect again.

if it still doesn't work, go to chrome://settings/. Select the advanced options and choose *reset settings*. Try again. There are more details on this here:

https://support.google.com/chrome/answer/3296214?hl=en

Try again. If it still doesn't work, a next step might be to completely uninstall Chrome and then reinstall it.

Let me know if you can make any progress.

## Clear the Cache {#cache}

I have been burned a number of times by this issue. My current policy is something like this:

- If I get an error in the browser and can't figure out where its coming from right away
- Then I clear the cache before doing anything else.

It only takes a few seconds to clear the cache, and more than once it has made problems magically go away.

The link on the site about how to clear the cache is good, but I think there is a faster way in Chrome/Chromium:

- Go to the hamburger menu (three dashes in the top right corner)
- Select history (Ctrl-H)
- Clear the cache by selecting only Cached Images and Files from the list.

You can also use this shortcut in Chrome:

- **ctrl+shift+del**
