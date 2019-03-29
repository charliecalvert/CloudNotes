# Prog 272 Week 11

Our Main Goals are to learn more about:

-   MongoDb and multiple collections.
-   Grunt and JsHint
-   Deploy
-   Karma
-   Static sites (node-static)

## Problems with Automatic semicolon insertion

- [From Stackoverflow](http://stackoverflow.com/a/2846298/253576)

This code is dangerous because of possible semi-colon insertion:

    if (request.query.createFolderToWalkOnS3 === true
			|| request.query.createFolderToWalkOnS3 === "true")
		request.query.createFolderToWalkOnS3 = true;

The lesson here is not to start a line with an OR symbol.

## Environment variables in Eclipse

If you run Node in Eclipse, to access JSOBJECTS, you made need
to choose Run | Run Configurations | Environment | Select

## MongoDb and Multiple Collections

The primary example is on JsObjects:

- [MongoMultiCollection](https://github.com/charliecalvert/JsObjects/tree/master/Data/MongoMultiCollection01)

## Enid Clipse

This is very old and outdated material.

- [Node Eclipse Website](http://www.nodeclipse.org/)
- [Comments on StackOverflow](http://stackoverflow.com/a/15150072/253576)
- [Elvenware Details](/javascript-guide/NodeJs.html#debug-node-in-eclipse)

Here is what I have installed on my system:

![Charlie's Installed Tools](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/javascript/NodeEclipse01.png)

## Transient Shares on Google Drive

When using VirtualBox you can share a folder between you host OS and the guest OS that is running in the VM. Here we discuss how to share a drive between a Windows host and Linux Guest. In particular, we will share the GoogleDrive folder found on Linux.

Start by setting things in VirtualBox. Here we define the folders on the host machine that we want to share:

![Create the share](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud-images/VirtualBoxShareGoogle01.png)

In the shared folders dialog click the plus symbol near the upper right hand corner. That will open up the following dialog:

![Set up the share](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud-images/VirtualBoxShareGoogle02.png)

Use the **Share** dialog to define the path to the folder that you want to share and give it a name. I suggest that you do not share folders that have spaces in their path, and I suggest that you give the share a name that does not have spaces in it.

We are creating a transient share that we have to explicitly mount. It will be read-write. A transient share disappears after you close your guest OS.

After you have things set up in VirtualBox on the host machine you need to also make some changes on the guest OS. Go to the guest machine and create the folder where the shared folder will be mounted:

    sudo mkdir /media/GoogleDrive
    sudo chown $USER:$USER /media/GoogleDrive

Now mount the drive:

    sudo mount -t vboxsf -o uid=1000,gid=1000 GoogleDrive /media/GoogleDrive

Is maintain a script with the exact settings shown above on GitHub in [JsObjects](https://github.com/charliecalvert/JsObjects/blob/master/Utilities/SetupLinuxBox/MountGoogleDrive.sh).

## Grunt and Deploy

## Shell Scripts

-   SetupLinux.sh

ELF own and run
---------------

-   Then we use that to keep track of associations between objects.
-   Associations, aggregation, composition
-   An association is any relationship between two objects
-   An aggregation is a "has a" relationship
-   Composition is the case where one object cannot exist without its parent,
    then it is called composition. A container, where the contained object
    cannot exist without its container.

TryCatch
--------

We have an example in JSObjects:

<https://github.com/charliecalvert/JsObjects/tree/master/JavaScriptObjects/TryCatch>

Async Unit Tests and Stop Start
-------------------------------

-   ElvenTests: makeRow, getAllRows
