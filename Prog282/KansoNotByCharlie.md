---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Prog282/KansoNotByCharlie.md
relativePath: Prog282/KansoNotByCharlie.md
title: KansoNotByCharlie
queryPath: Prog282/
subject: Prog282
fileNameMarkdown: KansoNotByCharlie.md
fileNameHTML: KansoNotByCharlie.html
---


<!-- toc -->
<!-- tocstop -->

Kanso Document Found on the Web
================================
I (charlie) did not write this.  I found it on the web.
Intro
-----
On Tue, May 10, 2011 at 12:15 AM, caolan <caolan.mcmahon@xxxxxxxxx> wrote:
At the request of Chris Anderson, here's my introduction to Kanso, a
framework and command-line tool for writing CouchApps
Body
----
I'd like this thread to read like 'the alternative guide to CouchApps', if
you're the author of another framework or tool for writing CouchApps, please
feel free to add your own introduction here. It could be a really useful
resource for developers currently surveying the CouchApp landscape.

Kanso came together as a combined solution to two problems. Firstly, I
wanted to improve the experience of developers working with standard
CouchApps. I was used to writing code for node.js and wanted a similar
experience when writing CouchApps. That meant using CommonJS modules to
compose the final design doc, using require() instead of special comments to
include files.
This solution was similar to Mikeal's node.couchapp.js (although I wasn't
aware of that project at the time), but it implemented a CommonJS
environment which matched CouchDB's implementation instead of running the
modules in a node.js environment.
This meant the modules were actually uploaded to CouchDB and run there,
instead of being run client-side just to produce a JSON document. A really
interesting effect of doing it this way was the ability to use the module's
context in your list, show and update functions. All of a sudden you could do:
   var templates = require('templates');
   exports.testshow = function (doc, req) {
       return templates.render('blah');
   };
Instead of needing to be self-contained, now you could reference other
functions in the module or import other modules. This seemed like a much
more natural style.
The second problem I wanted to address was the issue of dealing with
fall-backs in CouchApps. It was important to me that my CouchApps supported
search- engines by rendering static pages that are easy to index, and that
it provided a useful fall-back if all else failed.
Previously, this meant writing your application twice. Once for your
client-side code (using backbone, or sammy, or evently...) and again using
CouchDB's API (list, show, update, rewrites...). The realization I had with
Kanso, was if we're already defining most of our application's behaviour
using the design doc API, there's no reason we can't re-use most of that on
the client-side.
The combined solution to both of these problems is what Kanso is really
about. It means defining your apps using the familiar rewrites, list, show,
update and validation functions and having them run on the client-side when
available and on CouchDB when that's not possible. Everything else is just
bells and whistles designed to save you time.
What you end up with is a pure CouchApp, as Benoit would define it ;)
An application hosted directly from CouchDB with no other layers
required.
Of course, the bell and whistles are incredibly useful too ;) The Types
system provides a flexible and powerful way to define permissions and
validation of documents. If you've ever found your validate_doc_update
function grow uncontrollably, then this is for you! The admin app allows you
to explore and define you data and document types before having to get your
hands dirty with UI code... and there are a host of other helpful functions
for dealing with cookies, or flash messages to persist a message between
redirects...
If you're interested in Kanso, head over to http://kansojs.org and take a
look at tutorial :) You can also find Kanso on GitHub:
https://github.com/caolan/kanso
