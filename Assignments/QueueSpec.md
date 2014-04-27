#Queue Specification

On Elvenware, you can find a page that specifies the basic operations performed by Queues and Stacks.

- [Data Structures on Elvenware][DataStructures]

For this assignment, you can use the [**Simple Queue**][SimpleQueue] example from JsObjects as a starter project and a resource. When you it into your Git repository, however, I want you to call the assignment **Week03QueueSpec**. To complete the submission process, simply give the URL of your Git repository.

Another good resource is the Array All program in JsObjects.

- [ArrayAll](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Syntax/ArrayAll)

##Part 01
Using a [constructor function][ConstructorFunction] create your own stack and queue classes. Now write tests that prove the following:

For Queues, create the following tests. For each test create a new instance of your queue and initialize as needed: 

- You can create a queue class. Prove that the constructor does not return **null**.
- A freshly constructed queue is **empty**
- For the next questions, begin by inserting **alpha**, **bravo**, **charlie** in the queue. 
- Prove that **front** returns alpha.
- Prove that **back** returns **charlie**
- Prove that calling **front** does not change the length of the queue
- Use a **while loop** to prove that **dequeue** returns three items before empty becomes true. 
- Use a **for loop** to prove that **dequeue** first returns **alpha**, then **bravo** then **charlie**.
- Use a loop to insert to 100,000 strings in the queue. The first item should be **Item000001**. The last item should be **Item100000**. Use the **padNumber** shown below to create the items you place in the queue. You can study the [unit tests][UnitTest] file from [**UtilsTest**][UtilsTest] project to learn how to use **padNumber**. The **padNumber** method is found in [**ElfUtils.js**][ElfUtils]. Write a test proving that you inserted 100,000 items and that the first item is Item000001 and the last is Item100000.
- Use a loop to insert 100,000 items as above. Show that the first 3 items you **dequeue** are **Item000001**, **Item000002** and **Item000003**.


```
    var padNumber = function(numberToPad, width, padValue) {
    	'use strict';
    	padValue = padValue || '0';
    	numberToPad = numberToPad + '';
    	if (numberToPad.length >= width) {
    		return numberToPad;
    	} else {
    		return new Array(width - numberToPad.length + 1).join(padValue) + numberToPad;
    	}
    };
```

##Part 02

For Stacks, create the following tests:

- Show you can create a stack class.
- Show that you can push the following items onto the stack: **alpha**, **bravo**, **charlie**. After pushing the items, show that the length of the stack is set to three.
- Push the same three items and pop once. Show that the return value is **charlie**.
- Push the same three items and pop twice. Show that the length is set to 1.
- Show that your stack throws an exception if you try to pop an item off an empty stack.
- Add a **testPalindrome** method to your stack class. It should test that a string or a number is a palindrom if all white space is removed. This is fairly easy, since you can push three letters onto your stack, then pop them to get them back in reverse order. If the items pushed are identical to the items popped, then you have a palindrome. Show that 230032 is a palindrome but that 230012 is not. Show that **Was it a cat I saw?** is a palindrome but that **Was it a bat or a rat that I saw?** is not. When implementing your palindrome first remove all white space, then make all capitals into [small letters][small], then all punctuation.
- Create a **removeItem** method. It should remove items from the middle of the stack. (Not necessarily the middle item, but anywhere in the midst of the stack. That is, someplace other than the end or beginning.) Prove it works with your test. For example, push **alpha**, **bravo**, **charlie**, **delta**, **echo**. Then remove **bravo** but leave the rest intact.

```
    function stripWhiteSpace(value) {
    	'use strict';
        return String(value)
        	.replace(/ /g, '')
        	.replace(/\t/g, '')
        	.replace(/\r/g, '')
        	.replace(/\n/g, '');	
    }
    
    function stripPunctuation(value) {
    	'use strict';
        return String(value)
        	.replace(/\./g, '')
        	.replace(/!/g, '')
        	.replace(/\?/g, '')
        	.replace(/,/g, '');	
    }
```
Again, you can visit [ElfUtils][ElfUtils] to learn more about these methods.

[SimpleQueue]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/SimpleQueue
[DataStructures]: http://www.elvenware.com/charlie/development/web/JavaScript/DataStructures.html
[ElfUtils]: https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/UnitTests/UtilsTests/ElfUtils.js
[UtilsTest]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/UnitTests/UtilsTests
[UnitTest]: https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/UnitTests/UtilsTests/tests/test.js 
[small]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase
[ConstructorFunction]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Using_a_constructor_function

#Some Hints and Tricks

I'm adding this section for two reasons:

- It may provide some clues as to how to move forward for those who are trying to get started with this project.
- It provides some jumping off places for advanced students who want to do a bit more. 

Take exactly as much as you want from these hints. Don't deliberatly make the assignment harder than it already is by trying to take on things like the modular pattern, or properties, that might confuse you. On the other hand, if you see some code in here that helps you understand how your code should look, then please go ahead and use it.

In class, we talked about the Jasmine **beforeEach** method which can be used in your test code. It is so useful, and so easy to use, that I thought I would give it to you here, in case you want to use it:

    describe("A Queue Simple Suite", function() {
    	'use strict';
    	
    	var simpleQueue = null;
    	
    	// This method is called before each test
        beforeEach(function() {
    		simpleQueue = new SimpleQueue();
    	});
    
        // Call this method if you want to automatically load certain values
    	function loadDefaultValues() {
    		simpleQueue.enqueue('Alpha');
    		simpleQueue.enqueue('Bravo');
    		simpleQueue.enqueue('Charlie');
    		simpleQueue.enqueue('Echo');
    		simpleQueue.enqueue('Delta');
    	}
        
        it("tests loadDefaults without giving away too many other answers", function() {
    		loadDefaultValues();
    		var len = simpleQueue.length();
    		for (var i = 0; i < len; i++) {
    			simpleQueue.dequeue();
    		}
    		expect(simpleQueue.empty()).toBe(true);
    	});
    	
    	etc...
    	
To have the beforeEach method called before each of your tests, all you need to do is include it in your tests, as shown above. 

Note to beginners: All the code shown above would be found in your test code, probably in the file called **QueueSimpleSpec.js**.

- [Jasmine beforeEach](https://github.com/pivotal/jasmine/wiki/Before-and-After)

##Properties

In the code shown above, you might notice that we call **length** as function: **length**(). This is a bit awkward. If you want, you can use a property instead:

    function SimpleQueue() {
		dataStore = [];
		
		Object.defineProperty(this, "length", {
	        get: function() {
	            return dataStore.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    
    	SimpleQueue.prototype.enqueue = function() {
        etc...

The code shown above would be found in your copy of **SimpleQueue.js**. After adding the property, you can now access the length property in your tests like this:

	var len = simpleQueue.length;  // No longer need to call length(). Now its a property.
    for (var i = 0; i < len; i++) {
    	simpleQueue.dequeue();
    }

In the code shown above, we use a relatively new feature of JavaScript called a [property][defprop]. There are several ways to use properties. In this case we define a read-only property implemented primarily in the **get** function. If you want to jump ahead and see what else can be done, you can visit the [Properties][props] folder in JsObjects.

[props]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Properties
[defprop]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

By the way, the code shown above works exactly the same way if you are using the Modular pattern:

    var SimpleQueue = (function() {
    	
    	var dataStore = null;
    	
    	function SimpleQueue() {
    		dataStore = [];
    		
    		Object.defineProperty(this, "length", {
    	        get: function() {
    	            return dataStore.length;
    	        },
    	        enumerable: true,
    	        configurable: true
    	    });
    	}
    
    	SimpleQueue.prototype.enqueue = function() {
        etc...
	  
My tests look exactly the same whether I use a standard constructor function or the modular pattern. (Mike, as mentioned in class on Wednesday, creating properties is another place where it is okay to use **this**.)

In this assignment, there are other places, such as **back** and **front**, where you could use properties. Doing so is optional, but if you want to learn a little more now, rather than later, then go ahead....

Newcomers to JavaScript: Don't worry too much about the Modular pattern unless you are comfortable with it. The main thing for you here is that there are several tips as to how to put together your **queue** class.

> Written with [StackEdit](https://stackedit.io/).