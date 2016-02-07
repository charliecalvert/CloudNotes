# Overview

Create a single Express based application called **Week02-Functional**:

- **CreateExpressProject Week02-Functional**

Create or use an existing client side file called **public/control.js**. Implement the exercises shown below in that file. Display the output as you wish. A simple solution might be to show the output in a DIV. More complex solutions might use listBox or tree to display the data.

## Background

Your work can be based on the examples found in [JsObjects/JavaScript/Syntax/Functional](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Syntax/Functional). Use the examples you find there to help you complete this exercise.

**NOTE**: *Your code must use both the native [array.filter][af], [array.map][amap] exactly as they appear in JavaScript, or in my code Functional examples. There is no mergeAll in JavaScript at this time, and so you can use this method:*

```
Array.prototype.mergeAll = function() {
	'use strict';
    var results = [];
    this.forEach(function(subArray) {
        subArray.forEach(function(number) {
            results.push(number);
        });
    });
    return results;
};
```

[af]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
[amap]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
[amerge]:

## Display and Read

Recall that you can create an empty list in your HTML with the following Jade:

```HTML
ul#output
```

If you want to add a list item to an HTML list, you could use a function like this:

```javascript
function show(data) {
	$("#output").append('<li>{ ' + data + ' }</li>');
}
```

If you want to load an entire array into an HTML list, you could use a function like this:

```javascript
function showArray(data) {
	data.forEach(function(row) {
		$("#output").append('<li> ' + row + ' </li>');
	});
}
```

## Reading Data from Disk

Later in this assignment, I will ask you to download a zip file that contains a data file called **States.json**. Place that JSON file in a directory called **public/data**.

At run time, you could read the data in once and store it in an object scoped variable, and/or use a function that takes a callback to read in your data:

```
function readData(callback) {
	$.getJSON('data/States.json', function(states) {
		callback(states);
	}).done(function() {
   showDebug( "Config loaded second success" );
  })
  .fail(function(jqxhr, textStatus, error) {
      showDebug( "Walk loaded error: " + jqxhr.status + ' ' + textStatus + ' ' + error );
  })
  .always(function() {
      showDebug( "Config loaded complete" );
  });
}
```

## Part I

Write a program that uses **Array.forEach** to itereate over this data and creates an array of objects. Each object should have two fields: **name** and **abbreviation**. The data for the two properties should be taken from [this larger array][states-json-zip].

[states-json-zip]:https://s3.amazonaws.com/bucket01.elvenware.com/downloads/states.json.zip

![Funky](https://drive.google.com/uc?view=export&id=0B25UTAlOfPRGQnh2U08wUTBiZzg)

## Part II

Add a method to the program that does the same things as in Part I, but using the built in **Array.map** function.

Now that the program can do more than one thing, you will need some buttons or links to switch back and forth between the task outlined in Part I, and the task outlined in Part II. In the screenshot, the buttons are labelled **For Each** and **Map**.

![Funky](https://drive.google.com/uc?view=export&id=0B25UTAlOfPRGYkdVek9UQjVVaFk)

## Part III

Create an array with five names in it:

	['Able', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot'];

And use the built in Array.filter method to return those strings that begin with A.


## Part IV

Use **MergeAll** and one call to **map** to flatten the following:

```
var states1 = [
        [ {
			"state" : {
				"name" : "ALABAMA",
				"abbreviation" : "AL",
				"capital" : "Montgomery",
				"most-populous-city" : "Birmingham",
				"population" : "4708708",
				"square-miles" : "52423",
				"time-zone-1" : "CST (UTC-6)",
				"time-zone-2" : "EST (UTC-5)",
				"dst" : "YES"
			}
		}, {
			"state" : {
				"name" : "ALASKA",
				"abbreviation" : "AK",
				"capital" : "Juneau",
				"most-populous-city" : "Anchorage",
				"population" : "698473",
				"square-miles" : "656425",
				"time-zone-1" : "AKST (UTC-09)",
				"time-zone-2" : "HST (UTC-10)",
				"dst" : "YES"
			}
		}, {
			"state" : {
				"name" : "ARIZONA",
				"abbreviation" : "AZ",
				"capital" : "Phoenix",
				"most-populous-city" : "Phoenix",
				"population" : "6595778",
				"square-miles" : "114006",
				"time-zone-1" : "MT (UTC-07)",
				"time-zone-2" : "",
				"dst" : "NO"
			}
		}, {
			"state" : {
				"name" : "ARKANSAS",
				"abbreviation" : "AR",
				"capital" : "Little Rock",
				"most-populous-city" : "Little Rock",
				"population" : "2889450",
				"square-miles" : "53182",
				"time-zone-1" : "CST (UTC-6)",
				"time-zone-2" : "",
				"dst" : "YES"
			}
		} ],
        [ {
			"state" : {
				"name" : "CALIFORNIA",
				"abbreviation" : "CA",
				"capital" : "Sacramento",
				"most-populous-city" : "Los Angeles",
				"population" : "36961664",
				"square-miles" : "163707",
				"time-zone-1" : "PT (UTC-8)",
				"time-zone-2" : "",
				"dst" : "YES"
			}
		}, {
			"state" : {
				"name" : "COLORADO",
				"abbreviation" : "CO",
				"capital" : "Denver",
				"most-populous-city" : "Denver",
				"population" : "5024748",
				"square-miles" : "104100",
				"time-zone-1" : "MT (UTC-07)",
				"time-zone-2" : "",
				"dst" : "YES"
			}
		}, {
			"state" : {
				"name" : "CONNECTICUT",
				"abbreviation" : "CT",
				"capital" : "Hartford",
				"most-populous-city" : "Bridgeport",
				"population" : "3518288",
				"square-miles" : "5544",
				"time-zone-1" : "EST (UTC-5)",
				"time-zone-2" : "",
				"dst" : "YES"
			}
		}, {
			"state" : {
				"name" : "DELAWARE",
				"abbreviation" : "DE",
				"capital" : "Dover",
				"most-populous-city" : "Wilmington",
				"population" : "885122",
				"square-miles" : "1954",
				"time-zone-1" : "EST (UTC-5)",
				"time-zone-2" : "",
				"dst" : "YES"
			}
		} ]
	];
```

It should look like this when you show the result in a PRE tag with all records in the same array. The point of the exercise is that the nested arrays disappear. You start with two arrays, and end up with one array. You flatten two arrays into one array:

```
{
    "name": "ALABAMA",
    "abbreviation": "AL",
    "capital": "Montgomery",
    "most-populous-city": "Birmingham",
    "population": "4708708",
    "square-miles": "52423",
    "time-zone-1": "CST (UTC-6)",
    "time-zone-2": "EST (UTC-5)",
    "dst": "YES"
}
{
    "name": "ALASKA",
    "abbreviation": "AK",
    "capital": "Juneau",
    "most-populous-city": "Anchorage",
    "population": "698473",
    "square-miles": "656425",
    "time-zone-1": "AKST (UTC-09)",
    "time-zone-2": "HST (UTC-10)",
    "dst": "YES"
}
etc...
```

## Part V

Now use this data:

```
var presidents = [
    {
        "name": "Older",
        "states": [
            {
                "state": {
                    "name": "ALABAMA",
                    "abbreviation": "AL",
                    "capital": "Montgomery",
                    "most-populous-city": "Birmingham",
                    "population": "4708708",
                    "square-miles": "52423",
                    "time-zone-1": "CST (UTC-6)",
                    "time-zone-2": "EST (UTC-5)",
                    "dst": "YES"
                }
            },
            {
                "state": {
                    "name": "ALASKA",
                    "abbreviation": "AK",
                    "capital": "Juneau",
                    "most-populous-city": "Anchorage",
                    "population": "698473",
                    "square-miles": "656425",
                    "time-zone-1": "AKST (UTC-09)",
                    "time-zone-2": "HST (UTC-10)",
                    "dst": "YES"
                }
            },
            {
                "state": {
                    "name": "ARIZONA",
                    "abbreviation": "AZ",
                    "capital": "Phoenix",
                    "most-populous-city": "Phoenix",
                    "population": "6595778",
                    "square-miles": "114006",
                    "time-zone-1": "MT (UTC-07)",
                    "time-zone-2": "",
                    "dst": "NO"
                }
            },
            {
                "state": {
                    "name": "ARKANSAS",
                    "abbreviation": "AR",
                    "capital": "Little Rock",
                    "most-populous-city": "Little Rock",
                    "population": "2889450",
                    "square-miles": "53182",
                    "time-zone-1": "CST (UTC-6)",
                    "time-zone-2": "",
                    "dst": "YES"
                }
            }
        ]
    },
    {
        "name": "Younger",
        "states": [
            {
                "state": {
                    "name": "CALIFORNIA",
                    "abbreviation": "CA",
                    "capital": "Sacramento",
                    "most-populous-city": "Los Angeles",
                    "population": "36961664",
                    "square-miles": "163707",
                    "time-zone-1": "PT (UTC-8)",
                    "time-zone-2": "",
                    "dst": "YES"
                }
            },
            {
                "state": {
                    "name": "COLORADO",
                    "abbreviation": "CO",
                    "capital": "Denver",
                    "most-populous-city": "Denver",
                    "population": "5024748",
                    "square-miles": "104100",
                    "time-zone-1": "MT (UTC-07)",
                    "time-zone-2": "",
                    "dst": "YES"
                }
            },
            {
                "state": {
                    "name": "CONNECTICUT",
                    "abbreviation": "CT",
                    "capital": "Hartford",
                    "most-populous-city": "Bridgeport",
                    "population": "3518288",
                    "square-miles": "5544",
                    "time-zone-1": "EST (UTC-5)",
                    "time-zone-2": "",
                    "dst": "YES"
                }
            },
            {
                "state": {
                    "name": "DELAWARE",
                    "abbreviation": "DE",
                    "capital": "Dover",
                    "most-populous-city": "Wilmington",
                    "population": "885122",
                    "square-miles": "1954",
                    "time-zone-1": "EST (UTC-5)",
                    "time-zone-2": "",
                    "dst": "YES"
                }
            }
        ]
    }
]
 ;
```

Both flatten (mergeAll) and map the data to a set of new objects containing the state name and its capital. I needed two calls to map.

![Funky](https://drive.google.com/uc?view=export&id=0B25UTAlOfPRGVDc2cnhoLUpqNXM)

## Turn it in

Place your work in your repository in the folder specified above. When you submit the assignment, include a link to your repository or a URL for your repository, or something that will get me to your repository.
