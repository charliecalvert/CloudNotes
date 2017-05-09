# Git Hub API

Learn how to call the [GitHub API](https://github.com/github-tools/github).

## Node Support for ES6 {#node-green}

Note that let and const are fully supported.

- [Node Green](http://node.green/)

Get your version of node:

```
$ node --version
v7.9.0
```

## GitHub API

- [GitHub API Docs](http://github-tools.github.io/github/)
- [Get a GitHub API oauth token][git-token]
- [OctoNode alternative API](https://github.com/pksunkara/octonode)

npm install --save github-api

var GitHub = require('github-api');



[git-token]: https://github.com/settings/tokens

## Examples

curl https://api.github.com/zen
 2009  curl https://api.github.com/users/charliecalvert

 2011  curl -i https://api.github.com/repos/twbs/bootstrap
 2012  curl -i https://api.github.com/repos/charliecalvert/JsObjects
 2013  curl -i https://api.github.com/repos/charliecalvert/repos
 2014  curl -i https://api.github.com/repos/charliecalvert
 2015  curl -i https://api.github.com/users/charliecalvert/repos

## Time till Renew

 curl https://api.github.com/users/charliecalvert

And see this line:

```javascript
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 58
X-RateLimit-Reset: 1492098563
```

Convert the reset time:

```javascript
var f = new Date(1492098563 * 1000);
console.log(f); => "Thu Apr 13 2017 08:49:23 GMT-0700 (PDT)"
```
