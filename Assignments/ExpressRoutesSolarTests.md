
Get our jasmine server side configuration file from the Get Numbers project:

<pre>
cp GetNumbers spec/support/jasmine.json
</pre>

Copy jasmine-runner to the root of our project:

<pre>
cp GetNumbers/jasmine-runner.js .
</pre>

Change so that we skip files that begin with **test** and get only those that begin with **spec**:

```javascript
{
  "spec_dir": "spec",
  "spec_files": [
    "spec-*.js"
  ]
}
```

Add a script for running our test to **package.json**. Here I quote several lines to provide context, but you only need to add the line that starts with **test-server**:

```javascript
"private": true,
"scripts": {
  "test": "karma start",
  "test-server": "node jasmine-runner.js",
  "start": "nodemon ./bin/www"
},
"dependencies": {
```

We use the new script with the npm **run** command, something like this, where you execute the code on the first line:

<pre>
$ npm run test-server

> Week05-ExpressRoutesSolar@0.0.0 test-server /home/charlie/Git/prog272-calvert-2016/Week05-ExpressRoutesSolar
> node jasmine-runner.js

Spec started

  Elvenware Simple Plain Suite
    ✓ shows we can test

Executed 1 of 1 spec SUCCESS in 0.006 sec.
</pre>

Now you add in the [**supertest**](https://github.com/visionmedia/supertest) package. This package will allow us to test our routes from the command line:

  npm install supertest --save-dev  
