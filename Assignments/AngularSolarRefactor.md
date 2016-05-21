
As we move toward multiple folders, change the way we load files in the **files** section at the top of **karma.conf.js**:

```javascript
'public/javascripts/**/*.js',
```

Note the glob syntax (\*\*). This says that we want any javascript files (*.js) in **public/javascripts** or any of its sub-folders: (\*\*). Here are more details on glob syntax:

- <http://karma-runner.github.io/0.13/intro/configuration.html>
- <https://en.wikipedia.org/wiki/Glob_%28programming%29>
- <http://man7.org/linux/man-pages/man7/glob.7.html>
- <http://gruntjs.com/configuring-tasks#globbing-patterns>

Add error handler:


```javascript
$http.get('data/EnergyTypes.json')
        .then(function(res) {
            //renewableUtils.init(res.data);
            $scope.energyTypes = res.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
};
```

When you load **energy-types.js** in **layout.jade**, don't forget that you need to specify the directory where it lives.

Make sure menu collapses in mobile device mode:

<pre>
li.trigger-collapse(ng-class="{ active: isActive('/')}")
</pre>

```javascript
$(document).ready(function () {
    $(".navbar-nav li.trigger-collapse a").click(function(event) {
        $(".navbar-collapse").collapse('hide');
    });
});
```
