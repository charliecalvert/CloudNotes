# Map Express

The goal of this application is to show the user's current position on a map.

## The HTML and CSS

To get started, create an express application called **Week11MapExpress**. Set the port. In **routes/index.js**, set the application name.

In **views/index.jade**, you need a div in which you can put your map:

    div#map

We will also need to set up the CSS:

```css
body {  
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
  height: 100%;
  margin: 0;
  padding: 0;

}

html {
  height: 100%;
}

#map {
	background-color: blue;
	height: 100%;
	width: 100%;
}
```

## The Code

We need one variable in Control with object scope:

    var mapDiv;

There are a few more methods we need. Put in this case, things are very simple, all the code goes into Control.js. (For the final, you will arrange things differently, but for now, just put all the code in Control.js.) Here is an updated and simplified call to **getCurrentPosition**:

```javascript
function position() {

	var options = {
		enableHighAccuracy : true,
		timeout : 5000,
		maximumAge : 0
	};

	try {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(loadMap, showDebug, options);
		} else {
			showError("NOT-SUPPORTED");
		}
	} catch (evt) {
		alert(evt);
	}
}
```

Instead of just showing the user the position, we display the position on a map:

```javascript
function loadMap(position) {
	var latlng = new google.maps.LatLng(position.coords.latitude,
			position.coords.longitude);
	var mapOptions = {
		zoom : 8,
		center : latlng,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	var map = $("#map");
	mapDiv = new google.maps.Map(map[0], mapOptions);

	makeMarker('here', latlng.lat(), latlng.lng());
}
```

This function allows us to put a pin, or marker, on the map:

```javascript
function makeMarker(name, latitude, longitude) {
	var location = new google.maps.LatLng(latitude, longitude);

	var place = new google.maps.Marker({
		position : location,
		map : mapDiv,
		title : name
	});

	google.maps.event.addListener(place, 'click', function() {
		mapDiv.setCenter(location);
		mapDiv.setZoom(10);
	});
}
```

And here is ShowDebug:

```javascript
var showDebug = function(textToDisplay) {
	$("#debug").append('<li>' + textToDisplay + '</li>');
};
```


## The Constructor

The tricky part of this program is loading the Google API. If you simply want to load it like any normal human being, you could do something like this:

    <script src="http://maps.googleapis.com/maps/api/js?sensor=true" type="text/javascript"></script>

I'm sure you can see that this is way to easy, as it even eliminates the need to call the navigator to the position. Pathetic really. Definitely for the simple minded.

To make it interesting, we will use require, loading it in **layout.jade**:

```pug
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    script(src="javascripts/require.js", data-main="javascripts/Main")
  body
    block content
```

The problem, of course, is that trying to load it in **Main.js** with require doesn't work, even if we try to shim it in:

```javascript
require.config({
	paths : {
		"jquery" : ["http://code.jquery.com/jquery-1.11.1"],
		"googleMap": ["http://maps.googleapis.com/maps/api/js?sensor=true"],
		"Control": "Control"
	},
	shim : {
		"googleMap": ["jquery"]
	}

});  
```

Don't use the code above, as it does not work. Part of the problem here is that **api/js**, like **bin/www**, has no **.js** extension. As a result, require is not happy with it. There may be a simple solution to this problem, but I came up with this one, which is not simple, but nevertheless I find it interesting:

```javascript
var elf = {
	position : function() {
		this.control.position();
	}
}

define(function() {

	var Control = (function() {
		'use strict';
		var mapDiv;

		function Control() {
			loadScript();
		}

    function loadScript() {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&callback=elf.position';
      document.body.appendChild(script);
    }

		Control.prototype.position = function() { ... }

        // Code ommitted here
  });
});
```

We are, in effect, creating a poor man's require. It appends the call to load the script to the HTML we are loading, thus ensure that that GoogleApi javascript file does get loaded. It is also passes in the name of a callback:

callback=elf.position

Here is elf:

```javascript
var elf = {
	position : function() {
		this.control.position();
	}
}
```

But how does elf know about Control? We set that up in **Main.js**:

```javascript
require.config({
	paths : {
		"jquery" : ["http://code.jquery.com/jquery-1.11.1"],
		"Control": "Control"
	}
});

require([ "jquery", "Control" ], function(jq, Control) {
	'use strict';
	console.log("Main called.");
	elf.control = new Control();
});
```

The important line is this one:

    elf.control = new Control();

This is too fancy by far, but it does seem to work. I provide it just so you can understand that we have options even when the normal require API appears, at least to me, to not provide a solution. Granted, however, there is much about **require** that I don't know, and perhaps there is a simpler solution.

## Goto Location

Here is a method that can take you to any latitude or longitude on the map:

```javascript
function gotoLocation(latitude, longitude, zoomLevel) {
	var location = new google.maps.LatLng(latitude, longitude);
	mapDiv.setCenter(location);
	mapDiv.setZoom(zoomLevel);
	return location;
}
```

You can now set up a button click handler that will allow you to travel to Darwin, Australia:

```javascript
function gotoDarwin() {

	var darwin = gotoLocation(-12.461334, 130.841904, 14);

	var marker = new google.maps.Marker({
		position : darwin,
		map : mapDiv,
		title : "Hello World!"
	});

	google.maps.event.addListener(marker, 'click', function() {
		mapDiv.setZoom(8);
	});
}
```

## Turn It In

Place you code in your repository in a folder called **MapExpress**. Push. Submit the assignment.
