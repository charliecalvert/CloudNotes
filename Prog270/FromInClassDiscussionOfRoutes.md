---
creationLocalTime: 3/26/2022, 10:23:51 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Prog270/FromInClassDiscussionOfRoutes.md
relativePath: Prog270/FromInClassDiscussionOfRoutes.md
title: FromInClassDiscussionOfRoutes
queryPath: Prog270/
subject: Prog270
fileNameMarkdown: FromInClassDiscussionOfRoutes.md
fileNameHTML: FromInClassDiscussionOfRoutes.html
---


<!-- toc -->
<!-- tocstop -->

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}


var value = add(2, 5);

var difference = subtract(2, 5);


var requestQuery = { a: 2, b: 5 };
$.getJSON('/add', requestQuery, function(result) {
	console.log(result.sum);
}

$.getJSON('/subtract', requestQuery, function(result) {
	console.log(result.difference);
}


// server

router.get('/add', function(request, response) { 
    console.log('add called');
    console.log('The parameters passed are: ', request.query );
    
    var sum = request.query.a + request.query.b;
    
    response.send({ "result": "success", "sum": sum });
}

router.get('/subtract', function(request, response) { 
    console.log('subtract called');
    console.log('The parameters passed are: ', request.query );
    
    var difference = request.query.a - request.query.b;
    
    response.send({ "result": "success", "sum": difference });
}

router.get('/divide', function(request, response) { 
}


// Server
