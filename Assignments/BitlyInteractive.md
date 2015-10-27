# Bitly Interactive


## The interface

Now stop unit testing and start the program normally: npm start.

Copy the bitly-links.js to the public/javascripts directory. Load it from document ready.

Using our mixins, create an interface that will show at least the link, aggregate link, keyword_link and title for the first record. They should appear as the program loads so the user sees them by default once the program has loaded.

Here is how to check a checkbox in JavaScript:

```javascript
// with jquery
if (bitlyLink.private) {
    $("#checkBoxPrivate").prop('checked', true);
}

// With the JavaScript DOM:
if (bitlyLink.archived) {
    document.getElementById("checkBoxArchived").checked = true;
}
```
