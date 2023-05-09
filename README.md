# CloudNotes

My markdown files for the CloudNotes site.

Ordered by class, with HTML in some cases, but only partial HTML.

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
