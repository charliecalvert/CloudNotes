---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Browser/NotesRouteBasics.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/Browser
fileName: NotesRouteBasics.md
relativePath: /Browser/NotesRouteBasics.md
title: NotesRouteBasics
directoryName: Browser
category : browser-guide
---

On the client:

```javascript
function getPostOptions(body) {
    return {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(body)
    };
}

function calculateCircumference() {
    const userRadius = document.getElementById('userInput').value;
    const query = {radius: userRadius};

    fetch('/calculateCircumference', getPostOptions(query))
        .then((response) => response.json())
        .then((response) => {
            const displayArea = document.getElementById('displayArea');
            displayArea.innerHTML = JSON.stringify(response, null, 4);
        })
        .catch((ex) => {
            console.log(ex);
        });
}
```


On the server:

```javascript
router.post('/calculateCircumference', function(request, response) {
    response.send({result: request.body.radius * Math.PI * 2});
});
```

Extra Credit:

In index.js:

```javascript

```

utils.js:


```javascript
const calculateCircumference = (radius) => {
    return radius * Math.PI * 2;
};

module.exports = calculateCircumference;
```
