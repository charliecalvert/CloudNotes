## Overview

Comments on the Functional City State assignment.

The first one should be easy for most of you:

```javascript
    function iterateWithForEach() {
        elfUtils.clear();
        elfUtils.readData(function(states) {
            states.forEach(function(item) {
                var data = item.state.name + ', ' + item.state.abbreviation;
                elfUtils.show(data);
            });
        });
    }
```

The second problem is the same as the first, only we use **map** instead of **for each**:

```javascript
function mapIt() {
        elfUtils.clear();
        elfUtils.readData(function(states) {
            var stateAbbreviation = states.map(function(item) {
                return item.state.name + ', ' + item.state.abbreviation;
            });
            elfUtils.showArray(stateAbbreviation);
        });
    }
```

I think you can see fairly easily how to do Filter example:


```javascript
function filterArray() {
        clear();
        var data = ['Able', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot'];
        data = data.filter(function(item) {
                return (item[0] === 'A');
        });
        show(data);
}
```

It's really just a matter of passing a predicate (function that returns a boolean value) to the built-in filter method. Set up a condition in the predicate that only returns true for the rows that you want to pass the filter. All other rows fail, and are excluded from the results.

In Part IV, call **mergeAll** to flatten the two arrays into one array, then call map to make the resulting data a bit more presentable. It's arguable that the call to map isn't even needed, but it is nice to see what it can do for us:

```javascript
function mapSimple() {
        clear();
        var result = states1.mergeAll().map(function(data) {
                return JSON.stringify(data.state, null, 4) + '<hr>';
        });
        $("#output2").html(result);
}
```

The point is that we can use method chaining to do it all in one call. We don't have call **mergeAll** first, then in a separate step, call **map**. We can simply use method chaining to link the calls together. We don't do this:
 
```javascript
var result = states1.mergeAll();
var result2 = result.map(function etc....
```

Instead we chain them together:

```javascript
states1.mergeAll().map(function etc....
```

This is more concise and easier to read.

And then finally, the last one really is a bit tricky, but it is perhaps a fun challenge for some developers. It is a nice little puzzle. See if you can figure out how it works:

```javascript
function mergeMap() {
        clear();
        var data = states2.map(function(obj) {
            return obj.states;
        }).mergeAll().map(function(item) {
            return item.state.name +  "; " + item.state.capital;
        });
        showArray(data);
}
```
