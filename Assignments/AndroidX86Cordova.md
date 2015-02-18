# AndroidX86 Cordova

Submit a screen shot of your Cordova project running in Androidx86 inside VirtualBox.

Be sure that:

- Your name is visible in the application in the H1 tag of your **www/index.html** file.
- The **DEVICE IS READY** bar is green.
- The VirtualBox chrome is visible. For instance, the words **Oracle VM VirtualBox** should appear at the top, and the icons near the words **Right Ctrl** (or the MAC/Linux equivalent host key) are visible on the bottom.

Here is the body of index.html, with the place where I want to see your name called out in square brackets:
```html
    <body>
        <div class="app">
            <h1>[YOUR NAME GOES HERE]</h1>
            <div id="deviceready" class="blink">
                <p class="event listening">Connecting to Device</p>
                <p class="event received">Device is Ready</p>
            </div>
        </div>
        <script type="text/javascript" src="cordova.js"></script>
        <script type="text/javascript" src="js/index.js"></script>
    </body>
```

![AndroidX86Cordrova](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGb3BKVmdtMG5XZVU)

You need not write APACHE YOURNAME. It can YOURNAME CORDOVA or whatever (within reason) strikes your fancy, so long as it is in the H1 tag and it contains your name.

