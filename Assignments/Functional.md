# Functional

Create a single Express based application. On the client side, create a file called **Control.js**. Use that file to perform the exercises shown below. Display the output as you wish. A simple solution might be to show the output in a DIV. More complex solutions might use listBox or tree to display the data. 


Based on [JsObjects/JavaScript/Syntax/Functional](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Syntax/Functional). Use the examples you find there to help you complete this exercise.

**NOTE**: 'Your code must use array.filter, array.map, and array.mergeAll exactly as they appear in JavaScript, or in my code Functional examples. In particular, mergeAll must look exactly like this:':

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

**HINT**: *You could read the data in once and store it in an object scoped variable, and/or use a function that takes a callback to read in your data:*

```
function readData(callback) {
	$.getJSON('States.json', function(states) {
		callback(states);
	});
}
```
These might be helpful as well: 

```
function show(data) {
	$("#output").append('<li>{ ' + data + ' }</li>');
}

function showArray(data) {
	data.forEach(function(row) {
		$("#output").append('<li> ' + row + ' </li>');
	});
}
```

## Part I

Write a program that uses **Array.forEach** to itereate over this data and creates an array of objects. Each object should have two fields: **name** and **abbreviation**. The data for the two properties should be taken from [this larger array](elvenware.com/charlie/downloads/States.json.zip).

![Funky](https://drive.google.com/uc?view=export&id=0B25UTAlOfPRGQnh2U08wUTBiZzg)

## Part II

Add a method to the program that does the same things as in Part I, but using the built in Array.map function.

![Funky](https://drive.google.com/uc?view=export&id=0B25UTAlOfPRGYkdVek9UQjVVaFk)

## Part III

Create an array with five names in it:

	['Able', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot'];
 
And use the built in Array.filter method to return those objects begin with A.


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


