# Comments on Week04-DeliciousQuery

Various comments on creating filters. The recently enhanced question about filters can be found here:

- [DeliciousQuery: Filters][df]

[df]: http://www.ccalvert.net/books/CloudNotes/Assignments/DeliciousQuery.html#filter

## The Array of URLs

I have updated the question asking for an "array containing only the URL from each object". Hopefully it is now easier to understand. The updated question is here:

- [Updated Create Array Question][car]

[car]: http://www.ccalvert.net/books/CloudNotes/Assignments/DeliciousQuery.html#create-array

## Mapping

The JavaScript **map** function takes an array of one sort, and converts it into a modified array of a similar type. You pass it to a callback, and each element in the array will be passed to it. Inside that callback, you can transform the objects in the array. After map returns, you have a new array, one in which each element of your array has been transformed by your callback.

I have updated the question on mapping to provide more explanation of what I want. You can see the updated question here:

[updated mapping question][umq]

Please review the initial paragraphs in that section and see if they can help you better understand how to create maps.

[umq]: http://www.ccalvert.net/books/CloudNotes/Assignments/DeliciousQuery.html#create-map

## Tags Map

This section is for people who are getting an error such as:

```bash
TypeError: 'undefined' is not an object (evaluating 'link.tags.indexOf')
```

To make the filters work properly, you have to first create a map from the original JSON to an array of objects that include a field called tags:

```javascript
queryDelicious.getDescriptionTag = function() { 'use strict';
	return this.deliciousLinks.map(function(link) {
		return { "description": link.d, "url": link.u, "tags": link.t };
	});
};
```

Only then will the filter be able to find a field called tags:

```javascript
queryDelicious.filter = function(map, filter) { 'use strict';
	return map.filter(function (link) {
		return link.tags.indexOf(filter) > -1;
	});
};
```

You will have to call **getDescriptionTag** before calling your filter.

## The Wrong Way

It might be tempting to do something like this when creating a map:

```javascript
queryDelicious.getDescriptionTag = function(subject) { 'use strict';
    var data=queryDelicious.deliciousLinks;
    var dTMap=[];
    $.each(data, function(index, obj) {
        var dTObj = {};
        dTObj.description=obj.d;
        dTObj.url=obj.u;
        dTObj.tags=obj.t;
        dTMap.push(dTObj);
    });
    return dTMap;
};
```

This is valid JavaScript, and it performs reasonably well. However, it is:

* Not what I'm asking for in this assignment
* Not an example of functional programming. We want to tell the compiler what to do, not how to do it. We just tell the compiler: **map**. We never really define how the map should be made. That is a difference between functional and imperative programming.

The "correct" way to handle this map is shown above, in the section on **Tag Maps**.

## Wrong Way 2 {#wrong-way-two}

Consider this code:

```javascript
    getMapMidSize: function() { 'use strict';
        var arrayLength = [];
        $.each(data, function(index, obj) {
            arrayLength.push(obj.length);
            return arrayLength;
        });
    },
```

This code does not use the JavaScript **map** function. We are trying to learn how to use that function to transform an ugly or ungainly array of objects into one that is well suited to our application. In this assignment, all the methods that are named **getMapXXXSize** should call the **map** method. Once again, here is an example call similar to the one that should be found in **getMidSizeMap** method:

```javascript
	getMap: function() { 'use strict';
		return this.deliciousLinks.map(function(link) {
			return { 'url': link.u };
		});
	}
```

The key code is the call to **map**:

```javascript
deliciousLinks.map(function(etc...
```

Reference: [map][mdn-map]

[mdn-map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map


## Handling Filters

Don't forget to read the hint on handling filters:

- [Handling Filters][handling-filters]

[handling-filters]: http://www.ccalvert.net/books/CloudNotes/Assignments/DeliciousQuery.html#working-with-filters

## Calling Filters

When you call the filter method, make sure that the signature of the call matches the signature of your method. For instance, here is a typical declaration for the filter method:

```javascript
filter: function(map, filter) { 'use strict';

```

And here is a call to **filter**:

```javascript
var map = queryDelicious.filter();
```

Clearly this latter call is going to fail since we are not passing in an parameters. A correct call might look like this:

```javascript
var map = queryDelicious.getDescriptionTag();
var filter = queryDelicious.filter(map, 'nodejs');
```






