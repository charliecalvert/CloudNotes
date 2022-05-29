## Document Ready Function

The following code will be called when the page is loaded and ready to
be manipulated by jQuery or other JavaScript. It is similar to the
standard JavaScript**onLoad** event, only you can you have multiple
copies of this method associated with a single page and jQuery will
ensure they are each called at the appropriate time.

```javascript
$(document).ready(function() {
    $("#paragraph01").html("This sentence added by jQuery");
});
```

Though most explanations I've seen are not very specific about the
advantages that document ready has over handling an **onLoad** event,
all sources do seem to agree that it is superior. Perhaps document.ready
executes after the document has loaded but before the images are loaded?
I'm not clear, but everyone gets very emphatic that jQuery document is
superior to **onLoad.** (I'm not being cynical about jQuery itself, but
rather about the people who write on this subject, myself included, I'm
sure!