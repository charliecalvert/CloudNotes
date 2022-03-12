---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android/CordovaBower.md
relativePath: elvenware/development/android/CordovaBower.md
title: CordovaBower
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
---

<!-- toc -->
<!-- tocstop -->

Very nice. The one thing that would have been nice would have been to set up bower.json in your Cordova folder so that it:

A) Existed
B) Put the components in the right place.

I should have talked about this during class, but did not quite see

A) How simple it would be
B) How useful it would be.

Still, it would have been nice had you thought of it.

Your **.bowerrc** ought to look like this:

```
{
  "directory": "www/bower_components"
}
```

## Clean and Setup {#clean-setup}

One thing I have noticed that has become a real problem: Cordova
applications, and particularly their plugins, have to be set up 
correctly. If there are plugins listed in **plugins/android.json**
and they are not available, and not installed into **platforms**,
then your application will not work correctly.

This issue has become so troublesome to me that I believe all Cordova
applications have to come with three files, or one file that does
three things at the right time:

- Clean: A script to delete the contents of **plugins** and **platforms**
- Setup: A script to add and run bower, and to add platforms and install plugins
- install: A script to install on the phone.

The details of how to implement these scripts could be varied or improved.
The most important point is that you should be able to run Clean, Setup,
and install and and have your app work. Nothing should be turned in until
this done.

**NOTE**: *The quarter is about over, and so this may not seem like a 
pressing issue. But you will care later. You will want to write 
mobile applications in the future, and take it from me: you need these
scripts. I have now installed dozens, probably many more, cordova
applications. I'm learning the hard way what needs to be done.

Though it could no doubt be improved, here is a sample Clean script:

```
#! /bin/bash

PLATFORMS=platforms
PLUGINS=plugins
BOWER=www/bower_components

if [ -d "$PLATFORMS" ] ; then
    rm -r $PLATFORMS
fi

if [ -d "$PLUGINS" ] ; then
    rm -r plugins
    mkdir plugins
fi

if [ -d "$BOWER" ] ; then
    rm -r $BOWER
fi
```

Fuss with the **Clean** script until the plugins directory is empty after
you run it. Cancel that. I've decided we should just delete the **plugins** 
directory altogether and recreate it...

Sample **Setup**:

```
#! /bin/bash

cordova platform add android
cordova plugin add http://github.com/apache/cordova-plugin-geolocation.git
bower install
```

Be careful. Don't copy the **Setup** script verbatim. Decide what plugins
your app needs and install only those.

Sample install:

```
#! /bin/bash

cordova build android
adb uninstall com.pennockprojects.week08cordova
adb install platforms/android/ant-build/CordovaApp-debug.apk
```

