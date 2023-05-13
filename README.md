# CloudNotes

My markdown files for the CloudNotes site.

Ordered by class, with HTML in some cases, but only partial HTML.

## Database & Information Systems

I have a file system with about 100 directories. I need to keep track of each directory and information associated with that directory. The directory name might change over time. What is the best strategy for managing this information?

Options:

- store in a database
- Place a small file called info dot json in each directory
- store in a single file
- store in a single file with a database index
- store in a file system with a database index
- store in a file system with a database index and a search engine
- store in a file system with a database index and a search engine and a web server
- store in a file system with a database index and a search engine and a web server and a web client
- store in a file system with a database index and a search engine and a web server and a web client and a mobile client
- store in a file system with a database index and a search engine and a web server and a web client and a mobile client and a desktop client
- store in a file system with a database index and a search engine and a web server and a web client and a mobile client and a desktop client and a cloud server
- 
## Walk Markdown Files

In the lib directory is a file called [walk-markdown-files](lib/walk-markdown-files.mjs). It provides an example of how to walk through a Directory or recursive set of directories to see all the files present with a markdown extension, and to test if they have front matter or not.

Run it like this:

```javascript
node lib/walk-markdown-files.mjs
```

## RegEx

```regex
// , ([^-]*)-([^, ]*)
// const guideRegex = /([^-]*)-([^, ]*)/g;
// , "$1$2"
```

Turn the old style headers into the pound pound headers.

```regex
^(.*)\n--+
## $1
```

Figures:

```regex
^(!\[.*)\n
| $1_ |\n
```

## Figures

make it a table, like this:

```markdown
| ![Starting node in debug mode](images/Node01.png) |
|:--:|
| _Figure D01: Starting node in debug mode_ |
```

## Not Sure What This Is

npm i -D concat-stream gray-matter list-item markdown-link minimist
npm i -D mixin-deep remarkable repeat-string strip-color object.pick
npm i -D diacritics-map lazy-cache

```text
Could not find a declaration file for module 'elven-code'. '/home/ubuntu/Git/CloudNotes/node_modules/elven-code/index.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/elven-code` if it exists or add a new declaration (.d.ts) file containing `declare module 'elven-code';`ts(7016)
```

keys:

> Terminal › Integrated: Allow Chords
The configurable terminal.integrated.commandsToSkipShell setting determines which command's keybindings should always "skip the shell" and instead be handled by VS Code's keybinding system. By default, it contains a hard-coded list of commands that are integral to the VS Code experience but you can add or remove specific commands:

## Directory Structure

As 2023-05-12, the directory structure looks like this:

```text
/home/ubuntu/Git/CloudNotes/Comments
/home/ubuntu/Git/CloudNotes/Courseware-2017-08
/home/ubuntu/Git/CloudNotes/Prog280 +1ms
/home/ubuntu/Git/CloudNotes/Tips
/home/ubuntu/Git/CloudNotes/Isit320
/home/ubuntu/Git/CloudNotes/lib
/home/ubuntu/Git/CloudNotes/lib/css
/home/ubuntu/Git/CloudNotes/Prog109
/home/ubuntu/Git/CloudNotes/RootHome
/home/ubuntu/Git/CloudNotes/Assignments
/home/ubuntu/Git/CloudNotes/Assignments/CouchDb
/home/ubuntu/Git/CloudNotes/Assignments/Firebase
/home/ubuntu/Git/CloudNotes/Assignments/Express
/home/ubuntu/Git/CloudNotes/Assignments/Windows
/home/ubuntu/Git/CloudNotes/Assignments/CodeAcademy
/home/ubuntu/Git/CloudNotes/Assignments/Heroku
/home/ubuntu/Git/CloudNotes/Assignments/SmokeTests
/home/ubuntu/Git/CloudNotes/Assignments/Git
/home/ubuntu/Git/CloudNotes/Assignments/Linux
/home/ubuntu/Git/CloudNotes/Assignments/Docker
/home/ubuntu/Git/CloudNotes/Assignments/Mongo
/home/ubuntu/Git/CloudNotes/Assignments/EcmaScript
/home/ubuntu/Git/CloudNotes/Assignments/MidtermFinal
/home/ubuntu/Git/CloudNotes/Assignments/React
/home/ubuntu/Git/CloudNotes/Assignments/Aws
/home/ubuntu/Git/CloudNotes/Assignments/CloudNine
/home/ubuntu/Git/CloudNotes/Assignments/Npm
/home/ubuntu/Git/CloudNotes/Assignments/Json
/home/ubuntu/Git/CloudNotes/Assignments/WebCrafts
/home/ubuntu/Git/CloudNotes/Assignments/Browser
/home/ubuntu/Git/CloudNotes/Prog270
/home/ubuntu/Git/CloudNotes/Prog272
/home/ubuntu/Git/CloudNotes/.vscode
/home/ubuntu/Git/CloudNotes/Prog282
/home/ubuntu/Git/CloudNotes/Esig +1ms
/home/ubuntu/Git/CloudNotes/__tests__
/home/ubuntu/Git/CloudNotes/elvenware
/home/ubuntu/Git/CloudNotes/elvenware/os
/home/ubuntu/Git/CloudNotes/elvenware/os/Computers
/home/ubuntu/Git/CloudNotes/elvenware/os/windows
/home/ubuntu/Git/CloudNotes/elvenware/os/android
/home/ubuntu/Git/CloudNotes/elvenware/os/linux
/home/ubuntu/Git/CloudNotes/elvenware/os/linux/LinuxDays
/home/ubuntu/Git/CloudNotes/elvenware/books
/home/ubuntu/Git/CloudNotes/elvenware/books/delphi-four-unleashed
/home/ubuntu/Git/CloudNotes/elvenware/books/delphi-four-unleashed/chapter-08_files
/home/ubuntu/Git/CloudNotes/elvenware/Art
/home/ubuntu/Git/CloudNotes/elvenware/Art/photos
/home/ubuntu/Git/CloudNotes/elvenware/Art/photos/mom
/home/ubuntu/Git/CloudNotes/elvenware/Art/photos/svg
/home/ubuntu/Git/CloudNotes/elvenware/Art/photos/costa_rica
/home/ubuntu/Git/CloudNotes/elvenware/Art/photos/2003_11_CraterLake
/home/ubuntu/Git/CloudNotes/elvenware/Art/photos/2011_06_Kawaii
/home/ubuntu/Git/CloudNotes/elvenware/Art/photos/svg-test
/home/ubuntu/Git/CloudNotes/elvenware/Art/photos/family
/home/ubuntu/Git/CloudNotes/elvenware/Art/photos/dad
/home/ubuntu/Git/CloudNotes/elvenware/Art/poems
/home/ubuntu/Git/CloudNotes/elvenware/tools
/home/ubuntu/Git/CloudNotes/elvenware/development
/home/ubuntu/Git/CloudNotes/elvenware/development/database
/home/ubuntu/Git/CloudNotes/elvenware/development/database/NoSql
/home/ubuntu/Git/CloudNotes/elvenware/development/database/mysql
/home/ubuntu/Git/CloudNotes/elvenware/development/database/data
/home/ubuntu/Git/CloudNotes/elvenware/development/database/data/facts
/home/ubuntu/Git/CloudNotes/elvenware/development/database/mssql
/home/ubuntu/Git/CloudNotes/elvenware/development/git
/home/ubuntu/Git/CloudNotes/elvenware/development/web
/home/ubuntu/Git/CloudNotes/elvenware/development/web/Php
/home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript
/home/ubuntu/Git/CloudNotes/elvenware/development/web/CssGuide
/home/ubuntu/Git/CloudNotes/elvenware/development/web/CssGuide/MediaQuery
/home/ubuntu/Git/CloudNotes/elvenware/development/web/UnitTests
/home/ubuntu/Git/CloudNotes/elvenware/development/web/Server
/home/ubuntu/Git/CloudNotes/elvenware/development/web/HtmlGuide
/home/ubuntu/Git/CloudNotes/elvenware/development/web/Python
/home/ubuntu/Git/CloudNotes/elvenware/development/web/Python/WebChords
/home/ubuntu/Git/CloudNotes/elvenware/development/web/Python/WebChords/pythonScripts
/home/ubuntu/Git/CloudNotes/elvenware/development/web/Mobile
/home/ubuntu/Git/CloudNotes/elvenware/development/csharp
/home/ubuntu/Git/CloudNotes/elvenware/development/csharp/videos
/home/ubuntu/Git/CloudNotes/elvenware/development/java
/home/ubuntu/Git/CloudNotes/elvenware/development/regular_expressions +1ms
/home/ubuntu/Git/CloudNotes/elvenware/development/android
/home/ubuntu/Git/CloudNotes/elvenware/development/design
/home/ubuntu/Git/CloudNotes/elvenware/development/design/images
/home/ubuntu/Git/CloudNotes/elvenware/development/cloud
/home/ubuntu/Git/CloudNotes/Prog219
/home/ubuntu/Git/CloudNotes/Library
/home/ubuntu/Git/CloudNotes/Library/lib
/home/ubuntu/Git/CloudNotes/Library/lib/css
/home/ubuntu/Git/CloudNotes/Library/lib/js
/home/ubuntu/Git/CloudNotes/Library/lib/font
/home/ubuntu/Git/CloudNotes/Library/css
/home/ubuntu/Git/CloudNotes/Library/css/theme
/home/ubuntu/Git/CloudNotes/Library/css/theme/source
/home/ubuntu/Git/CloudNotes/Library/css/theme/template
/home/ubuntu/Git/CloudNotes/Library/css/print
/home/ubuntu/Git/CloudNotes/Library/plugin
/home/ubuntu/Git/CloudNotes/Library/plugin/notes-server
/home/ubuntu/Git/CloudNotes/Library/plugin/remotes
/home/ubuntu/Git/CloudNotes/Library/plugin/highlight
/home/ubuntu/Git/CloudNotes/Library/plugin/notes
/home/ubuntu/Git/CloudNotes/Library/plugin/markdown
/home/ubuntu/Git/CloudNotes/Library/plugin/print-pdf
/home/ubuntu/Git/CloudNotes/Library/plugin/multiplex
/home/ubuntu/Git/CloudNotes/Library/plugin/search
/home/ubuntu/Git/CloudNotes/Library/plugin/zoom-js
/home/ubuntu/Git/CloudNotes/Library/plugin/leap
/home/ubuntu/Git/CloudNotes/Library/plugin/math
/home/ubuntu/Git/CloudNotes/Library/plugin/postmessage
/home/ubuntu/Git/CloudNotes/Library/js
/home/ubuntu/Git/CloudNotes/Isit322
/home/ubuntu/Git/CloudNotes/Isit322/back
/home/ubuntu/Git/CloudNotes/Images
  ```
