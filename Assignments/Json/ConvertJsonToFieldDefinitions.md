## Overview

This program can, and probably should, be written in ES5. Put in a directory called **git-convert** that is part of the **GitExplorer** project. In short, you will have three directories in the root of the project:

- client
- git-convert
- server

The goal is to convert the **git-user.json** file that we get from GitHub into one of our **field-definitions**.

## Get Copy of JSON

First, get the JSON:

```bash
curl https://api.github.com/users/charliecalvert > git-user.json
```

The file 'git-user.json' contains the JSON you will be working with. You will need to load this with **fs.readFile**, as described below.

## Debug Logger

If at all possible, use the [debug][debug-npm] package for logging. You will run **npm init** to create **package.json** and then add the **debug** module to it:

```bash
npm install debug --save
```

And in your code:

```javascript
var debug = require('debug')('git-convert');
debug('this is a test');
```

At the command line, say that you want to see debug messages for **git-convert**:

```bash
export DEBUG='git-convert'
```

Now run your program and you should see: **git-convert this is a test +Xms**

Now at the command line turn logging off:

```bash
export DEBUG=
```

Which set DEBUG to nothing, which makes our logging statements go away. You can achieve the same effect by setting DEBUG to anything but **git-convert**.

Except at the very end, to output your final result, don't use **console.log**. Instead, use the debug module in at least 3 places.

You can read more here, but for now you need go no further than example shown above. You need not turn on any special features.:

- [DEBUG on NPM][debug-npm]

I'll accept your assignment with **console.log** instead of **debug**, but it will cost 3 points.

[debug-npm]:(https://www.npmjs.com/package/debug)

## Promises

If at all possible, use a [promise][promise-mdn] when reading the JSON file you created with your call to **curl**:

```javascript
var fs=require("fs");

function readFile(fileName) {
    return new Promise(function(resolve, reject) {
        fs.readFile( /*YOUR CODE HERE*/ );
    });
}

readFile('git-user.json').then(function(text) {
    // CODE OMITTED. This is where you solve the core of the assignment.
});       
```

**NOTE**: _Don't get intimidated by promises. They are really quite easy to use. And I know we have not covered them in any depth this quarter or last, but I want to see if you can figure it out on your own._

I'll accept it without the promise, but it will cost 3 points. In other words, if you just call **fs.readFile** with a callback instead of **.then** chained method, that will be okay, sort of.

[promise-mdn]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

## Create output

You will need to iterate over the contents of the GitHub JSON file you load from disk. Remember that you are reading a text file, and JSON is an object, not a string. So you will have to do some conversion.

Then you will need to iterate over your JSON. In ES5, this is an appropriate way to get started:

```javascript
for (var property in json) {
    if (json.hasOwnProperty(property)) {
      // YOUR WORK HERE
    }
}
console.log( /* LOG YOUR ARRAY OF OBJECTS */)
```

You'll need an array. Create some objects, each shaped like one entry in our **field-definitions** file.  Push the object into the array.

Sample output might look something like this. Make sure it is valid JSON. (Go to Google or similar and search on "json validator"):

```javascript
[
    {
        "id": "login",
        "label": "login-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "id",
        "label": "id-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "avatar_url",
        "label": "avatar_url-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "gravatar_id",
        "label": "gravatar_id-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "url",
        "label": "url-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "html_url",
        "label": "html_url-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "followers_url",
        "label": "followers_url-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "following_url",
        "label": "following_url-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "gists_url",
        "label": "gists_url-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "starred_url",
        "label": "starred_url-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "subscriptions_url",
        "label": "subscriptions_url-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "organizations_url",
        "label": "organizations_url-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "repos_url",
        "label": "repos_url-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "events_url",
        "label": "events_url-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "received_events_url",
        "label": "received_events_url-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "type",
        "label": "type-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "site_admin",
        "label": "site_admin-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "name",
        "label": "name-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "company",
        "label": "company-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "blog",
        "label": "blog-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "location",
        "label": "location-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "email",
        "label": "email-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "hireable",
        "label": "hireable-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "bio",
        "label": "bio-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "public_repos",
        "label": "public_repos-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "public_gists",
        "label": "public_gists-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "followers",
        "label": "followers-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "following",
        "label": "following-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "created_at",
        "label": "created_at-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "updated_at",
        "label": "updated_at-name",
        "type": "paragraph",
        "sample": "login-unknown"
    }
]
```

## Why output text

Why do I have the program output text? Because this is the Linux way of doing things.

```bash
npm start > 'field-definitions.js'
```

All I really care about at this time is that you create the proper set of fields, as shown above. We can tweak the structure of **field-definitsion.js** to make it usable in our program at a later date.

## Turn it in

I want to be able to pull your project, navigate to the **GitExplorer/git-convert** folder, and then run the following command:

```bash
npm start
```

I will expect to see the array of objects shown above or something much like it. For now, all the fields can be of type **paragraph**. Or what have you. Just give me something that looks more or less like the above, and I'll be happy. I hope.
