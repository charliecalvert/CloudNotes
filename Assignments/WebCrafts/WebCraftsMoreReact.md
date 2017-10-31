## Overview

Additional hints on getting WebCraft converted to React.

## Git Ignore

If you haven't done so already, add add two items to your **.gitignore file**:

```nohighlighting
bundle.js
bundle.js.map
```

These can both be big files, and care easily reproduced from existing source, so there is no need to check them in. If you are checking them in at this time, remove them with code like these:

```nohighlighting
git rm public/javascripts/bundle.js
git rm public/javascripts/bundle.js.map
```
