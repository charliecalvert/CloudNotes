# Week 11

The focus for this week will be:
- Plex
- Review of cloud basics

## Plex Details

- [Download Page](https://plex.tv/downloads)
- [64 Bit Ubuntu](http://downloads.plexapp.com/plex-media-server/0.9.9.7.429-f80a8d6/plexmediaserver_0.9.9.7.429-f80a8d6_amd64.deb)
- [32 Bit Ubuntu](http://downloads.plexapp.com/plex-media-server/0.9.9.7.429-f80a8d6/plexmediaserver_0.9.9.7.429-f80a8d6_i386.deb)

    dpkg -i [PACKAGE NAME HERE]
    sudo apt-get -f install
    
Now go to the web interface by typing something like one of the following:

    http://localhost:32400/manage/index.html
    http://192.168.2.20:32400/manage/index.html
    
If you want to uninstall the package, use -r:

    dpkg -r [PACKAGE NAME HERE]
    
## What Platform am I on?

Use these tools to determine if you are on 64 bit or 32 bit Linux:

- [Script from JsObjects](https://github.com/charliecalvert/JsObjects/blob/master/Utilities/SetupLinuxBox/SystemCheck.sh)

Most of you are using the 32 bit version of Lubuntu.

## The Final

I have not written the final yet, but it will likely contain the following elements. It will test if you can use:

- Google Drive?
- One Drive (SkyDrive)
- EverNote
- AwsBasicS3
- StackEdit

> Written with [StackEdit](https://stackedit.io/).