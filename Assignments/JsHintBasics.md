#JsHint Basics

Here is a file to examine:


    console.log("Week 3 Cordova Assignment - Convert Object");
    
    var ConsoleTest = true;
    if (ConsoleTest) {
    	console.log("index.js sanity check has started!");
    }
    
    
    // Object with embedded functions to convert:
    // 1. miles To Feet
    // 2. celcius To Fareheit Degree
    // 3. Square Root of an integer
    
     // query Selector
    
    document.addEventListener('DOMContentLoaded', function() {'use strict'
    //   var userInput = document.getElementById("userInputID").value;
    	document.getElementById('milesToFeetID').innerHTML = Convert.milesToFeet;
    	document.getElementById('celciusToFarenheitID').innerHTML = Convert.celsiusToFareheit;
    	document.getElementById('squareRootID').innerHTML = Convert.squareRoot;
    }, false);
    
    //var userInput = document.getElementById("userInputID").value;
    var userInput = document.getElementById("userInputID").val();
    //var userInput = $('#userInputID').val();
    
    Console.log(userInput);
    
    var Convert = {
    /*	
    	miles : 3,
    	celsiusDegree: 32,
    	numberToSquare: 9,		
    	feetPerMile : 5280,
    */
    
    	miles : userInput,
    	celsiusDegree: userInput,
    	numberToSquare: userInput,
    	feetPerMile : 5280,
    	
    	milesToFeet : function() {'use strict';
    		return this.miles * this.feetPerMile;
    		
    	celsiusToFarenheit : function() {'use strict';
    		return ((this.celsiusDegree * (9/5) + 32));
    		
    	squareRoot : function() {'use strict';
    		return this.numberToSquare * this.numberToSquare;	
    	
    	}
    };

Run JsHint against it. Fix all the errors. Clean up the dead code.



> Written with [StackEdit](https://stackedit.io/).