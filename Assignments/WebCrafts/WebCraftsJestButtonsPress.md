## Overview

Learning more about testing.

## Refactor Tests

We want to better organize our tests. For now, were are going to have three files in **__tests__** directory:

- sanity.js
- home-buttons.js
- react-home.js

## Using jQuery in Tests

Right now I'm doing it like this:

```javascript
import jQuery from 'jquery';
global.jQuery = jQuery;
global.$ = jQuery;
```
