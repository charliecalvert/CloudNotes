---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Tips/SimpleQueueTips.md
relativePath: Tips/SimpleQueueTips.md
title: SimpleQueueTips
queryPath: Tips/
subject: Tips
fileNameMarkdown: SimpleQueueTips.md
fileNameHTML: SimpleQueueTips.html
---


<!-- toc -->
<!-- tocstop -->


#Queue Tips

Some tips and comments on the Simple Queue Assignment.

## The Utilities {#utils}

There are various utilities that we use over and over again. It is nice to put them in a file so that we can access them easily from multiple projects. Here is my Utilities file for this project:

```
Elf = {};

Elf.Utils = {
	
};


// Based on http://stackoverflow.com/a/16436975
Elf.Utils.arraysEqual = function(array01, array02) {  
  if (array01 == null || array02 == null) { return false; }
  if (array01.length != array02.length) { return false; }
  if (array01 === array02) { return true; }

  for (var i = 0; i < array01.length; ++i) {
    if (array01[i] !== array02[i]) return false;
  }
  return true;
};

Elf.Utils.padNumber = function(numberToPad, width, padValue) {
    'use strict';
    padValue = padValue || '0';
    numberToPad = numberToPad + '';
    if (numberToPad.length >= width) {
        return numberToPad;
    } else {
        return new Array(width - numberToPad.length + 1).join(padValue) + numberToPad;
    }
};

Elf.Utils.stripWhiteSpace = function(value) {
    'use strict';
    return String(value)
        .replace(/ /g, '')
        .replace(/\t/g, '')
        .replace(/\r/g, '')
        .replace(/\n/g, '');
};

Elf.Utils.stripPunctuation = function(value) {
    'use strict';
    return String(value)
        .replace(/\./g, '')
        .replace(/!/g, '')
        .replace(/\?/g, '')
        .replace(/,/g, '');
};

Elf.Utils.htmlEscape = function(str) {
    'use strict';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
};

Elf.Utils.htmlUnescape = function(str) {
    'use strict';
    return String(str)
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
};
```

##Stacks

Below is a partial implementation of the stack class. Notice that we are using the modular pattern. We also defined property to get the **length** and then wrap the push method of the array class:

```
    var SimpleStack = ( function() {

		var dataStore = [];

		function SimpleStack() {
			dataStore = [];

			Object.defineProperty(this, "length", {
				get : function() {
					return dataStore.length;
				},
				enumerable : true, // We can see it
				configurable : false // We can't delete it
				// writable: false    // We can't add writable if we use accessors like get
			});

		}


		SimpleStack.prototype.push = function(value) {
			dataStore.push(value);
		};
```

##Palindrome {#palindrome}

We start with an empty datastore and push our string, letter by letter, into it:

```
	for (var i = 0; i < value.length; i++) {
		dataStore.push(value[i]);
	}
```

Then we pop the values off it:

```
	var result = '';
	while(dataStore.length > 0) {
		result += dataStore.pop();
	}		
```

Then we check if the two strings are equal. Here is the complete solution:

```
	var cleanString = function(value) {
		result = Elf.Utils.stripWhiteSpace(value);
		result = Elf.Utils.stripPunctuation(result);
		return result.toLowerCase(); 
	};

	SimpleStack.prototype.toPopString = function() {
		var result = '';
		while(dataStore.length > 0) {
			result += dataStore.pop();
		}		
		return result;	
	};

	SimpleStack.prototype.isPalindrome = function(value) {
		value = cleanString(value);			
		for (var i = 0; i < value.length; i++) {
			dataStore.push(value[i]);
		}
		var result = this.toPopString();
		console.log('palindrome = ', value, result);
		return (result === value);
	};
```

##Formatting Code

If you are using Express, there is a built in tool to properly format your code (Shift-Ctrl-F). If you are using Geany, there is no good built in tool that I have found. You can, however, go here: 

- <http://jsbeautifier.org/>

Just block copy your entire file, paste it into the js beautifier page, press the beautify button, then block copy your formatted code and paste it back into Geany, overwriting the original, poorly formatted code, with your new, well formatted code. If the beautifier can't format your code, that usually means that you have a syntax error in your code. Use the following site to find the error:

- <http://www.jshint.com/>


> Written with [StackEdit](https://stackedit.io/).