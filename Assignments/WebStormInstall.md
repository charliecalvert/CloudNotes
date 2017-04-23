## WebStorm

I'm not sure if you should do step 1 or 2 first:

- Create an account on [JetBrains](https://account.jetbrains.com/login) using your student email.
- Get a student license: [Student](https://www.jetbrains.com/shop/eform/students)
  - Email usually sent in a few minutes
- [Download WebStorm](https://www.jetbrains.com/webstorm/)

The exact name of the file you downloaded may differ, but in general, to decompress the download, do this:

```bash
cd ~/Downloads
tar xvfz ~/Downloads/WebStorm-2017.1.tar.gz
```

If you have a copy of WebStorm already, that is, if you are updating, make sure Webstorm is not running. Now delete the old copy of WebStorm.

```bash
rm -r ~/bin/webstorm/
```

Put your newly downloaded version in place:

```bash
mv ~/Downloads/WebStorm-171.3780.79/ ~/bin/webstorm
```

Start webstorm the first time from the command line. Thereafter you can use the system menu to start it:

```bash
~/bin/webstorm/bin/webstorm.sh
```

Again, the exact name of the decompressed folder may differ in minor ways.

- Do import settings
- To make sure you are registered, sign in again to your JetBrains Account if prompted to do so.

![WebStormLicense](https://s3.amazonaws.com/bucket01.elvenware.com/images/WebStormLicense.png)

## Activation Key

If all else fails, go the jetbrains website, and sign in. Go to your account, which should take you to the licenses page. At any rate, the licenses page should be available from your Account page:

- <https://account.jetbrains.com/licenses>

You should be able to download an activation key. You can paste that key into sign in dialog in Webstorm. That dialog usually just appears magically, but if it doesn't, try **Help | Register** from the menu.
