Week 07
=======

In Class
--------

###Unit Test Examples

You might also be interested in the tests for Crafty03. 

- [Mock Example](/charlie/development/web/JavaScript/Angular.html#basicMock)

###JSON from Server

Retrieve JSON from a server:

- [JSON Example](/charlie/development/web/JavaScript/Angular.html#jsonFromServer)

- [Example](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/JsonFromServer)
- [Key File](https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Design/JsonFromServer/index.js)

Online
------

###Assignment 03

Use this function to extend the range of the string class:

```
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}
```
