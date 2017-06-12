# React Summary Prog 272

- There is a new [DataLoader.js][ndl]. It contains better error checking.
- There is a new [allmongo.js][amdb]. It contains better error checking.


## Overview

![Basic UML](https://s3.amazonaws.com/bucket01.elvenware.com/images/CongressUml.png)

## Details

![Detailed UML](https://s3.amazonaws.com/bucket01.elvenware.com/images/CongressDetailsUml.png)

## Update

Consider using this in **index.js**:

```javascript
function checkConnection(response, callback) {
    if (!connect.connected) {
        connect.doConnection('simple', (err) => {
            if (err) {
                response.status(500).send({error: err});
                callback(false);
                return;
            }
        });
    }
    callback(true);
}

router.get('/all-data', function(request, response) {
    'use strict';
    console.log('AllData route invoked.');
    checkConnection(response, (result) => {
        if (result) {
            console.log('Calling getAllData');
            allMongo.getAllData(response);
        }
    });
});
```

[ndl]: https://gist.github.com/charliecalvert/d9fc57f29e16de8970b88a3c89b9b410
[amdb]:https://gist.github.com/charliecalvert/a4ba71b3e195ad2810c0bfb3677f0e0f
