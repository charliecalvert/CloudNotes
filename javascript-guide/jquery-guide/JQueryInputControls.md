## jQuery and Input Controls

Declare an input control:

```html
<input id='inputData' type="text" value="Default data">
```

Get text from an input control:

```html
var inputData = $('#inputData').val();
```

Put text in an input control:

```html
var stringToShowUser = 'You entered: ' + inputData;
$('#inputData').val(stringToShowUser);
```
