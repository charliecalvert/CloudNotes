#Queue Specification

On Elvenware, you can find a page that specifies the basic operations performed by Queues and Stacks.

- [Data Structures on Elvenware][DataStructures]

For this assignment, you can use the [**Simple Queue**][SimpleQueue] example from JsObjects as a starter project and a resource. When you it into your Git repository, however, I want you to call the assignment **Week03QueueSpec**. To complete the submission process, simply give the URL of your Git repository.

##Part 01
Using a [constructor function][ConstructorFunction] create your own stack and queue classes. Now write tests that prove the following:

For Queues, create the following tests: 

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
- Show that you can push the following items onto the stack: alpha, bravo, charlie and that the length of the stack is set to three.
- Push the same three items and pop once. Show that the return value is **charlie**.
- Push the same three items and pop twice. Show that the length is set to 1.
- Show that your stack throws an exception if you try to pop an item off an empty stack.
- Add a **testPalindrome** method to your stack class. It should test that a string or a number is a palindrom if all white space is removed. This is fairly easy, since you can push three letters onto your stack, then pop them to get them back in reverse order. If the items pushed are identical to the items popped, then you have a palindrome. Show that 230032 is a palindrome but that 230012 is not. Show that "Was it a car or a cat that I saw?" is a palindrome but that "Was it a bat or a rat that I saw?" is not. When implementing your palindrome first remove all white space, then make all capitals into [small letters][small], then all punctuation.

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

> Written with [StackEdit](https://stackedit.io/).