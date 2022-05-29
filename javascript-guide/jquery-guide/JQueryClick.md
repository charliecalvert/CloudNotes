## jQuery Click

Assign on [OnClick](http://api.jquery.com/click/) event handler to a tag:

- \$("p").click(f(){});
- Here f() will be executed whenever p's are clicked.
- It's like writing &lt;p click(f(){});&gt;

Customize OnClick events so code of our own is called. Instead of the traditional OnClick event executing our code executes instead. This method can be used in Ajax so that Anchor clicks don't load a page, but load certain tags from a page and insert them into the current document. See [this page][onClickHandlerElf] for an example.

[onClickHandlerElf]: http://www.elvenware.com/charlie/development/web/JavaScript/OnClickHandler.html

## Pass Parameters with Click

You can pass in parameters when you set up **click** events. Suppose you respond to a button click by calling a method named **foo**:

 $("#button01").click(foo);

To set up this example, our implementation of **foo** need not be complex:

```javascript
function foo() {
  return 2
};
```

Now suppose you want to pass in a parameter to **foo**:

```javascript
function foo(x) {
  return 2 * x;
}
```

jQuery makes it easy to pass in the parameter inside a JavaScript object like this:

```javascript
 $("#button01").click({ x: 2 }, foo);
```

Then implement foo like this:

```javascript
function foo(event) {
  var x = event.data.x;
  return 2 * x;
}
```

Event handlers are always passed an event object, even if we don't usually use it. In this case, we see that we can add data to the event object that is being passed in:

```javascript
var x = event.data.x;
```

Note that the parameter you pass in becomes a property of **event.data**.

What we are doing is documented here:

- <http://api.jquery.com/click/>

It's the second example they show that we want to focus on:

```javascript
.click( [eventData ], handler(eventObject) )
```

See also:

- <http://api.jquery.com/event.data/>
- <http://api.jquery.com/category/events/event-object/>
- <http://stackoverflow.com/a/9467172/253576>

### The HiJack Callback

- When someone clicks the part of index.html now in IPhoneGo, this
    method is called
- It prevents the default anchor href handler
- Then it calls loadPage() with a URL
- loadPage takes the \#content from the URL (Page0X.html) and puts it
    in the container of IPhoneGo.html.

