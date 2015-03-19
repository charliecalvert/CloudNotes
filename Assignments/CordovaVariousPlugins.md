# Cordova Plugins In Class

Project name: 

Week11-InClassPlugins

Use the scripts from **JsObjects/Utilities/Cordova**

Put **plugins** in your **.gitignore**. Save the code to set up plugins in **SetupPlugins**:

```
#! /bin/bash

cordova plugin add org.apache.cordova.camera
cordova plugin add org.apache.cordova.vibration
```

Code in non-angular app{

```
elf.Control=(function() {

    function Control() {
        elf.utilities.showMessage('Control loaded');
        $('#buttonHome').load('ButtonHome.html', function() {
            $('#vibrate').click(vibrate);
            $('#photo').click(photo);
        });
    }

    function vibrate() {
        elf.utilities.showMessage('Vibrate');
        navigator.vibrate(1000);
    }


    function photo() {
        elf.utilities.showMessage('Photo');
        navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });

        function onSuccess(imageData) {
            var image = document.getElementById('elfImage');
            image.src = "data:image/jpeg;base64," + imageData;
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }

    return Control;

})();

$(document).ready(function() {
    new elf.Control();
});
```

So how do we move it over? Try it first with scope methods, and then
with controllerAs.

Buttons in non-angular app:

```
<div>
    <button id="vibrate">Vibrate</button>
</div>
<div>
    <button id="photo">Photo</button>
</div>

```

Buttons in Angular App:

```
<div>
    <button ng-click="vibrate()">Vibrate</button>
</div>
<div>
    <button ng-click="photo()">Photo</button>
</div>
```


No **ng-app** because we using **angular.bootstrap()** to create the app.

Don't forget near bottom of index.html:

```
<script src="scripts/controllers/Plugins/PluginVarious.js"></script>
<script type="text/javascript" src="cordova.js"></script>

<!-- endbuild -->

    <script type="text/javascript">
        document.addEventListener('deviceready', function onDeviceReady() {
            angular.bootstrap(document, ['statesApp']);
        }, false);
    </script>

```

## Tips

Don't forget to use:

- chrome://inspect
- python3 -m http.server 30025

Both ways to debug application. See the slides.