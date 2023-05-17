---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Firebase/FirebaseLoginCuts.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/Firebase
fileName: FirebaseLoginCuts.md
relativePath: /Firebase/FirebaseLoginCuts.md
title: FirebaseLoginCuts
directoryName: Firebase
category : firebase-guide
---

## For Later

Don't do the sections from here down at this time.

## Content

Put the code you want in your public directory. In other words, configure MakeHtml to put your HTML in the ~/Source/public/firebase directory. Do this by changing the **config/ElvenConfig.json** file:

```javascript
{
  "calvert": {
    "base-dir": "/home/bcuser/",
    "bootswatch": "cosmo",
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

If you do not already have an **index.html** file set up, copy **public/master-list.html** to **public/index.html**:

<pre>
cd ~/Source/firebase/public
cp master-list.html index.html
cd ..
</pre>

## Copy JS, CSS and Images

Use the tools available, or modify them as necessary, to copy your CSS, JS and Images folders from the ApacheHelpers directory to your **firebase/public** directory.

You should follow a few bsaics steps to make sure all the proper files are being loaded. In Chrome, press F12 to open the Developer Tools. Switch to the Network page. Refresh you page. If everything is set up correctly, there should be no red 404 errors for your GET statements. Instead, you should see 200 or 304 in the Status column.

## Home Page

Don't read this. Skip this section, it is out of date.

Get your home page here:

    cp ~/Git/JsObjects/JavaScript/Syntax//JsonTable/public/favicon.png .
    wget https://s3.amazonaws.com/bucket01.elvenware.com/html/index.html    
    wget https://s3.amazonaws.com/bucket01.elvenware.com/stylesheets/firebase-express/main.css

Make sure the file we copied down is called is called **index.html** and not **index.html.1**. If necessary, delete **index.html** and rename **index.html.1** to **index.html**. Rename **style.css** to **main.css**.

## Obsolete

Don't read this. Skip this section, it is out of date.

The following files are no longer being used. Please ignore

Paste in the following at the bash prompt of the **public** directory for your project:

    wget https://s3.amazonaws.com/bucket01.elvenware.com/javascript/elven-fire-login.js
    wget https://s3.amazonaws.com/bucket01.elvenware.com/javascript/elven-fire-data.js

The **wget** command pulls files from the cloud using HTTP.

Open up **elven-fire-login.js** and paste in your configuration code in the **elfConfigure** method.
