---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/AndroidStates.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: AndroidStates.md
relativePath: /AndroidStates.md
title: AndroidStates
directoryName: Assignments
category : assignments-guide
---

# Mobile State Population

The goal is to query the census bureau about state populations. Create a web that does this. Then create an Cordova based mobile app that does that same thing.

## Getting Started

You need to [get a key](http://www.census.gov/data/developers/data-sets.html) from the US Census bureau.

Deck with at least a few notes on US Census: [http://bit.ly/elven-programmable-web](http://bit.ly/elven-programmable-web)

I want you to turn in two projects:

- Week04-StatePopulation (A web app)
- Week04-MobileStatePopulation (Essentially the same app, but on a mobile device with Cordova)

Watch the video: [http://youtu.be/VFb4cn7Bg5Q][video]

[video]: http://youtu.be/VFb4cn7Bg5Q



## Don't Check in the platform Directory

Before turning in the Cordova project, be sure to add **platforms** to your **.gitignore** file. When you type **cordova platform add android**, a number of big files get placed in the **platforms/android** directory. Before you issued the command, the platforms directory should be empty. Just to be sure we don't check in any platform specific code, let's omit the whole **platforms** folder, which I can easily recreate on my side.

To be sure everything is working out correctly, after you add **platforms** to your **.gitignore** file, go ahead and add everything in your project:

	git add .

Now check your status:

	git status

If you see that somehow **platforms** is being added to your check in, you can easily undo the **add** like this:

	git reset platforms

The actual path to your **platforms** directory may differ. For instance, it might look like this:

	git reset Cordova01/platforms

Or what have you. The point is that it is easy to undo a **git add**. Now fiddle with your **.gitignore** file and try again. Please try to avoid checking in the **platforms** folder.

## Hints

I was able to start the web app from WebStorm by right clicking my HTML file in the **Project** window at the left of the IDE. I chose **run** from the menu.

The **package.json** file, with a few fields you should change to mark your own repository and homepage.

```
{
  "name": "StatePopulation",
  "version": "1.0.0",
  "description": "Query the Census Bureau",
  "main": "index.js",
  "scripts": {
    "test": "mocha --watch Test"
  },
  "repository": {
    "type": "git",
    "url": "http://git@github.com/charliecalvert/JsObjects.git"
  },
  "keywords": [
    "javascript"
  ],
  "author": "Charlie Calvert",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/charliecalvert/JsObjects/issues"
  },
  "homepage": "http://www.elvenware.com/charlie",
  "devDependencies": {
    "mocha": "^2.1.0",
    "chai": "^1.10.0",
    "grunt": "^0.4.5",
    "grunt-contrib-clean": "~0.6.0",
    "grunt-contrib-compress": "~0.13.0",
    "grunt-contrib-copy": "~0.7.0",
    "grunt-contrib-jshint": "~0.10.0"
  }
}
```

There is nothing new about the call to \$.ajax:

```
$.ajax({
     type: 'GET',
     url: queryUrl,
     success: successFunc,
     error: errorFunc
});
```

For a bit I thought that turning off caching might help (**cache: false**). However, this seems to break my queries, so don't use that option.

How to create the URL you pass in when calling \$.ajax:

```JavaScript
params = "&for=state:" + $("#statePick option:selected").attr('data_index');
var queryUrl = "http://api.census.gov/data/2010/sf1?key=" + myKey + "&get=P0010001,NAME" + params;
```

The select code:

```
<select>
	<option data_index="01">Alabama</option>
	<option data_index="02">Alaska</option>
	<option data_index="04">Arizona</option>
	<option data_index="05">Arkansas</option>
	<option data_index="06">California</option>
	<option data_index="08">Colorado</option>
	<option data_index="09">Connecticut</option>
	<option data_index="10">Delaware</option>
	<option data_index="11">District of Columbia</option>
	<option data_index="12">Florida</option>
	<option data_index="13">Georgia</option>
	<option data_index="15">Hawaii</option>
	<option data_index="16">Idaho</option>
	<option data_index="17">Illinois</option>
	<option data_index="18">Indiana</option>
	<option data_index="19">Iowa</option>
	<option data_index="20">Kansas</option>
	<option data_index="21">Kentucky</option>
	<option data_index="22">Louisiana</option>
	<option data_index="23">Maine</option>
	<option data_index="24">Maryland</option>
	<option data_index="25">Massachusetts</option>
	<option data_index="26">Michigan</option>
	<option data_index="27">Minnesota</option>
	<option data_index="28">Mississippi</option>
	<option data_index="29">Missouri</option>
	<option data_index="30">Montana</option>
	<option data_index="31">Nebraska</option>
	<option data_index="32">Nevada</option>
	<option data_index="33">New Hampshire</option>
	<option data_index="34">New Jersey</option>
	<option data_index="35">New Mexico</option>
	<option data_index="36">New York</option>
	<option data_index="37">North Carolina</option>
	<option data_index="38">North Dakota</option>
	<option data_index="39">Ohio</option>
	<option data_index="40">Oklahoma</option>
	<option data_index="41">Oregon</option>
	<option data_index="42">Pennsylvania</option>
	<option data_index="44">Rhode Island</option>
	<option data_index="45">South Carolina</option>
	<option data_index="46">South Dakota</option>
	<option data_index="47">Tennessee</option>
	<option data_index="48">Texas</option>
	<option data_index="49">Utah</option>
	<option data_index="50">Vermont</option>
	<option data_index="51">Virginia</option>
	<option data_index="53">Washington</option>
	<option data_index="54">West Virginia</option>
	<option data_index="55">Wisconsin</option>
	<option data_index="56">Wyoming</option>
	<option data_index="72">Puerto Rico</option>
</select>
```
And this one:

```
    <select id="populationPick">
        <option data_index="P0010001">total</option>
        <option data_index="P0080003">whites</option>
        <option data_index="P0080004">blacks</option>
        <option data_index="P0080006">asians</option>
        <option data_index="H00010001">house_units</option>
        <option data_index="H0100001">occupied_house</option>
    </select>
```

## No access control

You might get an error message like this:

```
 XMLHttpRequest cannot load http://api.census.gov/data/2010/sf1?key=f2be9166735a2e23ac561c42ebcec7dfecaafc44&get=P0010001,NAME&for=state:01&_=1422639787489. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:63342' is therefore not allowed access. The response had HTTP status code 400.
```
This makes it look like we are getting cross domain error. But that is not the case. For me, this error usually just means that I have some syntax error in my program. When I fix the syntax error, then the message shown above goes away. We will probably be able to avoid this mess altogether if we create the mock (httpbackend) tests in jasmine.

## Turn it in

Submit both projects and a screen shot of your application running in a VirtualBox AndroidX86, or on your phone, or both. Feel free to add a bit of CSS to make it more interesting.

![AndroidStates](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGN1JZZE1FYlEwUlk)

Here is what the web app looks like, at least on my system:

![WebApp](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGMWtPeDAyMXI5djA)
