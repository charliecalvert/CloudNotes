## Overview

I'm no longer using [js-beautify][jsbea] but I'll keep this text in case I ever need it.

[jsbea]: https://github.com/beautify-web/js-beautify

## Beautify Files

I'm moving from [js-beautify][jsbea] to [prettier][pret], but don't quite want to delete this section yet. Use **prettier** instead of js-beautify because it handles JSX much better.

Before we had prettier, we used js-beautify, but not on all files in a directory. Create a script called **beauty** with this content:

```bash
#! /bin/bash

find . -iname '*.js' | grep -vFf skip | xargs js-beautify -r
```

In the above code, **skip** is a text file containing a list of files or directories that you want to ignore. For instance the file might contain a list like this:

```bash
bundle.js
registerServiceWorker.js
node_modules
```

Both **beauty** and **skip** might go in the root of a project or the root of your repository.

Alternatively, you could do this:

```bash
find . -iname *.js -type f -not -path '**/node_modules/**' -not -path '**/bundle.js' -not -path '**/registerServiceWorker.js' -print0 | xargs -0 js-beautify -r
```
