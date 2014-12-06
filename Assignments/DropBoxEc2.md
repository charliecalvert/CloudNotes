## DropBox on EC2

The goals of this assignment are simple:

- If you don't already have a dropbox account, [create one](https://db.tt/6ZfOwOQg).
- Install DropBox on your EC2 instance.

## Details

On this [Elvenware page][elfone], I explain how to install DropBox on EC2.  Perform the install, using the script I provide. (Best to use the link to JsObjects to get the script). In most cases, you will be running a 64 image on EC2.

Once you have DropBox installed, create a screen shot similar to the one shown below showing your installed image:

![EC2DropBox](http://elvenware.com/charlie/books/CloudNotes/Images/DropBoxLinux01.png)

The image shown above depicts a listing (ls -la) of the $HOME/.dropbox folder:

	ls -la /home/ubuntu/.dropbox

I also want you to take a similar screenshot, but of the .dropbox-dist folder. Here is how to get the listing I want to see:

	ls -la $HOME/.dropbox-dist

And one more screenshot in this series:

	ls -la /home/ubuntu/.dropbox-dist/dropbox-lnx.x86_64-2.10.51/

**NOTE**: *I suppose it is possible that you have a different version of DropBox on your system, in which case the numbers at the end of the path shown above may be slightly different. It is not important that you have exactly that path in your screen shot; one similar to it will do.*

**NOTE**: *The screen shot shown above happens to be taken on a copy of Lubuntu running in VirtualBox. I want you screen shots to be of your EC2 instance.*

##Turn it in

Put all three screen shots in your Git repository in a folder called Week08_DropBox. Also put them in a folder of the same name on your Google Drive share that we have been using.

In the comment or text area in Canvas, submit the url of your repository and a link to your shared Google Drive folder. I guess I prefer the text area, as you can make nicer links there. But I'll take what I can get....

[elfone]: http://www.elvenware.com/charlie/development/cloud/DropBox.html