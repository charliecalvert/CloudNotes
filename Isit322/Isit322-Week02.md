---
creationLocalTime: 3/26/2022, 10:23:54 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Isit322/Isit322-Week02.md
relativePath: Isit322/Isit322-Week02.md
title: Isit322-Week02
queryPath: Isit322/
subject: Isit322
fileNameMarkdown: Isit322-Week02.md
fileNameHTML: Isit322-Week02.html
---


<!-- toc -->
<!-- tocstop -->

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

- [Configure Linux](/os-guide/linux/ConfigureLinux.html)
- [NPM Global Packages on Elvenware][elf-global-pack]
- [The Global Packages Script][elf-pack-script]

Some older Videos:

- [Old Cloud9 Node Video](http://youtu.be/C8N3Mck1jEk)
- [Koding.com with Git, Node, Karma and Grunt](http://youtu.be/b8cyqDcnDlo)

## Hints

In the VirtualBox Manager, choose **Settings | System | Acceleration** and confirm that **VT-x | AMD-V** is selected. You can confirm this at run time by selecting **Machine | System Info**. If you don't have virtualization help from the processor then your VM will either be very slow, or not work at all.

![vtx](https://s3.amazonaws.com/bucket01.elvenware.com/images/VirtualBoxVtxInfoAndroid.png)


[elf-global-pack]: /javascript-guide/NodeJs.html#npm-global-packages
[elf-pack-script]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/NodeInstall/InstallNodePackages.sh
