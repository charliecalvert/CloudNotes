## Nao Explorer

Update error handler in **app.js**:

```javascript
if (app.get('env') === 'development') {
    console.log("Using Development error handler");
    app.use(function(err, req, res, next) {
        'use strict';
        console.log("Development error handler called");
        res.status(err.status || 500);
        console.log("About to render error", err);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
```