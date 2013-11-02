Week 07
=======

In Class
--------

###Unit Test Examples

You might also be interested in the tests for Crafty03. 

These tests provide the first instance we have seen of creating a 
mock object: 

```
beforeEach(inject(function($rootScope, $controller) {
	gameBoard = $rootScope.$new();
	gameEventService = { towerBroadcast: function() { return true; } };
	elfgameService = $rootScope.$new();
	$controller('GameBoard', { 
		$scope: gameBoard, 
		gameEventService: gameEventService, 
		elfgameService: elfgameService 
	});
}));
```

Notice this line from the code shown above: 

	gameEventService = { towerBroadcast: function() { return true; } };

This code mocks our event service by simply returning true rather than
actually send the message. This line looks as though it is retreiving 
a real gameEventService object, but it just using our mock:

	$controller('GameBoard', { 
		$scope: gameBoard, 
		gameEventService: gameEventService, 
		elfgameService: elfgameService 
	});
	
Now we can write tests that depend on making calls to the **towerBroadcast**
method of our **gameEventService**:

```
it("Check ElfGame Width", function() {
	var actual = elfgameService.reportEvent();
	expect(actual).toEqual(true);
});
```

This code calls **reportEvent** which in turn calls **gameEventServer.towerBroadcast**.

###JSON from Server

```
var getDataJson = $http.get('data.json');

getDataJson.success(function(data, status, headers, config)  {
	$scope.data = data;
});
	
getDataJson.error(function(data, status, headers, config) {
	throw new Error('Oh no! An Error!');
});
```

- [Example](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/JsonFromServer)
- [Key File](https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Design/JsonFromServer/index.js)
