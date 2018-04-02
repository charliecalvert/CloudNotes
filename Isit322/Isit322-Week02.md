<h3>Our main goals are:</h3>

<ul>
  <li>Unit testing</li>
  <li>REST with React and Express</li>
  <li>Start thinking about Programmable Web</li>
</ul>

### Cloud 9 and Koding

How to view your running application in Cloud 9. In **package.json**, add this line in the scripts section:

```javascript
"c9": "node_modules/.bin/webpack-dev-server --host $IP --port $PORT"
```

Perhaps like this:

```javascript
"scripts": {
 "start": "node_modules/.bin/webpack-dev-server",
 "test": "echo \"Error: no test specified\" && exit 1",
 "build": "node_modules/.bin/webpack",
 "c9": "node_modules/.bin/webpack-dev-server --host $IP --port $PORT",
 },
```

Now run it: npm run c9

Select, from near the top of the C9 IDE: **Preview | Preview Running Application**. A window opens with your app in it. You can optionally grab that URL and put it in a new tab for your browser.

## Older Links

This is mostly an FYI. These days, Cloud 9 ought to work fairly well out of the box.

Here are some links and a video that might help you work on Cloud 9 or Koding.com if either of those options appeal to you. These are from my 2016 course, and may not apply to the modernized Cloud 9 we are finding now.

*   [Configure Linux](http://www.elvenware.com/charlie/os/linux/ConfigureLinux.html)
*   [NPM Global Packages on Elvenware][elf-global-pack]
*   [The Global Packages Script][elf-pack-script]

[http://youtu.be/C8N3Mck1jEk</span>](http://youtu.be/C8N3Mck1jEk)[![](/images/play_overlay.png)](http://youtu.be/C8N3Mck1jEk)

Here is a video on Koding.com:

[http://youtu.be/b8cyqDcnDlo](http://youtu.be/b8cyqDcnDlo)

## Hints

In the VirtualBox Manager, choose **Settings | System | Acceleration** and confirm that **VT-x | AMD-V** is selected. You can confirm this at run time by selecting **Machine | System Info**. If you don't have virtualization help from the processor then your VM will either be very slow, or not work at all.

![vtx](https://s3.amazonaws.com/bucket01.elvenware.com/images/VirtualBoxVtxInfoAndroid.png)


[elf-global-pack]: (http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#npm-global-packages)
[elf-pack-script]: (https://github.com/charliecalvert/JsObjects/blob/master/Utilities/NodeInstall/InstallNodePackages.sh)
