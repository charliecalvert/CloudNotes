curl https://api.github.com/zen
 2009  curl https://api.github.com/users/defunkt

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
