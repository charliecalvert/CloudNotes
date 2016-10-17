## Overview

To get started deploying our pages to the web, we will use a Google product called [Firebase](https://firebase.google.com/).

If you have not done so already, create a **Source** directory:

<pre>
cd
mkdir Source
</pre>

Inside that directory, create a subdirectory called **firebase**:

<pre>
cd ~/Source
mkdir firebase
</pre>

Install firebase:

<pre>
npm install -g firebase-tools
</pre>

Login in to Firebase:

<pre>
firebase login
</pre>

Create sample code for your project and create some configuration files:

<pre>
firebase init
</pre>

Choose to support hosting, but toggle the database option off with your space bar. Use the public directory and don't choose single page app. Back up the default **index.html** created by firebase:

<pre>
cp public/index.html public/firebase.html
</pre>

Put the code you want in your public directory. In other words, configure MakeHtml to put your HTML in the ~/Source/public/firebase directory. Do this by changing the config/ElvenConfig.json file:

```javascript
{
  "calvert": {
    "base-dir": "/home/bcuser/",
    "bootswatch": "cosmos",
    "site-dirs": [
      "Documents/AllTest",
      "Documents/AllSite"
    ],
    "destination-dirs": [
      "/home/bcuser/Source/firebase/public/",  <==== HERE
      "/var/www/html/",
      "/home/bcuser/temp/test-site/"
    ]
  }
}
```

Note that we have added our firebase directory to the **destination-dirs** section of the JSON file. It should be the first item.

Copy public/master-list.html to public/index.html:

<pre>
cd ~/Source/firebase/public
cp master-list.html index.html
cd ..
</pre>

To preview before you deploy issue this command:

<pre>
firebase serve
</pre>

Then go to this URL: [http://localhost:5000/](http://localhost:5000/)

Deploy your app and browse to it.

<pre>
firebase deploy
</pre>

They will show you what URL to visit.

## Turn it in

Take a screen shot of what happens when you deploy your application. Attach the in screen shot to your canvas assignment. In the comments section, include the URL of your project running on the world wide web. The URL should look something like this, but not exactly like it:

- [https://elf01-31681.firebaseapp.com/](https://elf01-31681.firebaseapp.com/)
