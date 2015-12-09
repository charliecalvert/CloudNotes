## Overview

Nao-Explorer by Charlie Calvert

## Jade

The jade shown belie provides an example of what I was looking for in this assignment. It is actually more than I wanted: this is the complete interface for my version of the program, and I was looking for only a subset of this.

The keypoint was that you needed buttons with specific ID's and captions, like this:

```
button#leftArm.btn.btn-success Left Arm
```

As you can see, this button has an ID of **leftArm** and a caption of **Left Arm**. That would fulfill the specification laid out by tests like this:

```javascript
    it('expects a button with an id of #leftArm', function() {
        var button = document.getElementById('leftArm');
        var id = $(button).attr('id');
        expect(id).toBe('leftArm');
    });

    it('expects a button with a caption of Left Arm', function() {
        var button = document.getElementById('leftArm');
        var caption = button.innerHTML;
        expect(caption).toBe('Left Arm');
    });
```

My thought was that these tests give you enough of a hint as to what the jade needed to look like that you should be able to figure it out, to reverse engineer it, as it were.

My Jade currently looks like this:

```jade
extends layout

block content
	h1= title
	p Welcome to #{title}

	div
		button#leftArm.btn.btn-success Left Arm
		button#behaviors.btn.btn-success Get Behaviors
		button#network.btn.btn-success Network

	div
		button#getInfoCount.btn.btn-success Get Info Count
		button#parse.btn.btn-success Show Behaviors as String
		button#showAllObjects.btn.btn-success Show Behaviors as Array

	div
		button#getPostureList.btn.btn-success Get Posture List
		button#postures.btn.btn-success Postures

	div
		button#getAnimationTypes.btn.btn-success Get Animation Types
		//  button#getAnimationCategoryFromType.btn.btn-success Get Animation Category from Type
			button#getAnimationActions.btn.btn-success Get Animation Actions


	div
		ul#robotResult

	div
		pre#debug
```

## Linking Jasmine-JQuery

Some students had problems in their **karma.conf.js** file, the most serious involved the path to **jasmine-jquery**. A student wrote in the **files** configuration object from **karma.conf.js**:

```javascript
'public/components/jquery/dist/jasmine-jquery.js',
```
In most cases, it should be:

```javascript
'node_modules/jasmine-jquery/lib/*.js',
```

## Links

Real Time Messages: <https://github.com/primus/primus>

Behaviors:

- [Install][inst-beh]
- [Fluent Nao, just an fyi](https://github.com/dnajd/FluentNao/)

[inst-beh]: http://doc.aldebaran.com/1-14/naoqi/core/albehaviormanager-api.html#ALBehaviorManagerProxy::getInstalledBehaviors



