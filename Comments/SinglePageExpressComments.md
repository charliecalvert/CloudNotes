# Week08-SinglePageJade

by Charlie Calvert

This application shows how to:

- Build a single page application
- Run tests against hardcoded HTML fixture loaded in **beforeEach**
- Run Jasmine JQuery against an HTML fixture stored in an HTML file and loaded at run time.
 
## Common Errors: Page Two Jade {#Page Two Jade}
 
Don't forget to include the updated Jade for **Page Two**:

```jade
h1 Page Two

button#pageTwoButton Page Two Button

hr

div
    p#display
    p#pageTwoButtonDisplay

div
    p#error
```

## Set up Jasmine Tests Properly

Use our **check-karma-grunt-config** file to confirm that you have at least a few of the key pieces in place.

Further details are in [GruntCheck03][gc03].

[gc03]: http://www.ccalvert.net/books/CloudNotes/Assignments/GruntCheck03.html