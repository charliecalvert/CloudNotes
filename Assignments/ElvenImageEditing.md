## Overview

I did some more work on the **Elven Image** Editing program. It can, if used properly, now create a script that will sort out the images you have used from those you kept.

Some images to use:

- [http://bit.ly/california-images](http://bit.ly/california-images)

The images, by default, have spaces in their names. This is almost always a problem waiting to happen. To fix it, unzip the images into:

```
/var/www/html/images/california
```

Like this:

```
mkdir /var/www/html/images/california
cp California.zip /var/www/html/images/california
unzip California.zip
```

Navigate to the directory where the images are now stored, and run the following command:

```
find -name "* *" -type f | rename "s/ /_/g"
```

This command changes a filename like **foo bar.zip** to **foo_bar.zip**.

## Step One: Install {#install}

Get the latest copy of ElvenImages and set up a script that will help you "install" it. There are three steps:

1. Update JsObjects
2. Copy the **renewElvenImages** script to **~/Source**.
3. Run **renewElvenImages**. This will put the latest **ElvenImages** code in **~/Sources** and run **npm install**.

```
jo
git pull
cp -r $JSOBJECTS/JavaScript/NodeCode/ElvenImages/renewElvenImages ~/Source/.
cd ~/Source
./renewElvenImages
```

## Step Two: Setup The Config File {#config-file}

Like MakeHtml, we have a config file. It looks something like this:

```
	"elvenImages": {
		"baseDir": "/var/www/html",
		"markdownFileWithImages": "/home/charlie/Documents/AllTest/california.md",
		"allImagesJsonFile": "all-images.json",
		"imageDir": "/images/california/",
		"notUsedDir": "/home/charlie/temp/not-used/california"
	}
```

Make sure it points at **bcuser** or **ubuntu** as appropriate. (This program will probably be run most often from pristine lubuntu, so **bcuser** is the most common choice.)

As a general rul, you can leave the **baseDir** and **allImagesJsonFile** alone. You should, however, commonly want to edit:

- **markDownFileWithImages**: This is the primary file that the program creates. You will typically open this file in a markdown editor and delete the images you don't want and comment the images you do want.
- **imageDir**: This is the folder that contains the images you want use in your page. Typically, you move the images from your camera to this folder. Right now, I'm thinking the **imageDir** will always be a subdirectory of **baseDir**. If this proves awkward, we can change it, but for now I'm thinking this is the right choice.
- **noteUsedDir** will be discussed later.

## Step Three: Run {#run}

If everything is set up right, then run the program:

```
npm start
```

Now open the **markdownFileWithImages** in a markdown editor. Delete the images you don't want, add comments for the images you do want.

I decided, at least for now, to not put the full path to the images in the **markdownFileWithImages**. Instead I used the relative path expected on our website. Here is an example full path:

```
/var/www/html/images/california/somefile.jpg
```

Here is an example relative path of the type I'm now using:

```
/images/california/somefile.jpg
```

This means that you won't see an image in the markdown editor by default. To fix this issue, create a symbolic link from the root of the system to the apache images directory:

```
sudo ln -s /var/www/html/images /images
```

After doing this, the images should show up when you open them in an editor.

**NOTE**: *Don't change any of the markdown code for displaying images. You can delete the lines, or leave them, but don't change them.*

**NOTE**: _I had trouble performing this step in **Remarkable**. I would try atom or possible haropad._

- Atom web site: <https://atom.io/>
- You should be able to install from the deb file. Try downloading the deb package, and then double clicking on it. Or:

```
sudo dpkg -i <DEB_PACKAGE>
```

Install the markdown writer: <https://atom.io/packages/markdown-writer>

The keymaps for the atom markdown writer:

```
# Default Keymaps for Markdown Writer
# https://atom.io/packages/markdown-writer
#
# Wiki: https://github.com/zhuochun/md-writer/wiki/Settings-for-Keymaps
#
".platform-linux atom-text-editor:not([mini])":
  "shift-ctrl-K": "markdown-writer:insert-link"
  "shift-ctrl-I": "markdown-writer:insert-image"
  "ctrl-i":       "markdown-writer:toggle-italic-text"
  "ctrl-b":       "markdown-writer:toggle-bold-text"
  "ctrl-'":       "markdown-writer:toggle-code-text"
  "ctrl-h":       "markdown-writer:toggle-strikethrough-text"
  "ctrl-1":       "markdown-writer:toggle-h1"
  "ctrl-2":       "markdown-writer:toggle-h2"
  "ctrl-3":       "markdown-writer:toggle-h3"
  "ctrl-4":       "markdown-writer:toggle-h4"
  "ctrl-5":       "markdown-writer:toggle-h5"
```

In the atom menu choose: **Edit | Preferences** to open the settings page. At the top of the key bindings page choose the link to **your keymap file**. It is called **keymap.cson** and can paste the following into it and hope that it works:

```
".platform-linux atom-text-editor[data-grammar~='gfm']":
  "shift-ctrl-K": "markdown-writer:insert-link"
  "shift-ctrl-I": "markdown-writer:insert-image"
  "ctrl-i":       "markdown-writer:toggle-italic-text"
  "ctrl-b":       "markdown-writer:toggle-bold-text"
  "cmd-'":       "markdown-writer:toggle-code-text"
  "cmd-k":       "markdown-writer:toggle-keystroke-text"
  "cmd-h":       "markdown-writer:toggle-strikethrough-text"
  "ctrl-alt-1":  "markdown-writer:toggle-h1"
  "ctrl-alt-2":  "markdown-writer:toggle-h2"
  "ctrl-alt-3":  "markdown-writer:toggle-h3"
  "ctrl-alt-4":  "markdown-writer:toggle-h4"
  "ctrl-alt-5":  "markdown-writer:toggle-h5"
  "shift-ctrl-O": "markdown-writer:toggle-ol"
  "shift-ctrl-U": "markdown-writer:toggle-ul"
  "shift-ctrl->": "markdown-writer:toggle-blockquote"
  'shift-ctrl-"': "markdown-writer:toggle-codeblock-text"
  "alt-P": "markdown-writer:jump-to-previous-heading"
  "alt-J": "markdown-writer:jump-to-next-heading"
  "cmd-j cmd-d": "markdown-writer:jump-between-reference-definition"
  "shift-alt-t": "markdown-writer:jump-to-next-table-cell"
```

To have the markdown preview show up in a right hand pane, choose **Ctrl-Shift-M**.

## Step Four: Delete or Move Unused Images {#not-used}

Once you have edited you page, you frequently find that there are now images in your **/var/www/images/xxx** directory that you no longer need. I've written a node script that **should** find all the remaining images in your **markdownFileWithImages** and compare them to a list of all the images that were in the file when it was first created.

**NOTE**: _When you can **npm start** a list of all images used was saved in the **allImagesJsonFile** which is called, by default, **all-images.json**._

The code finds the difference between the original set of images and images left in the **markdownFileWithImages**. It saves the difference in a script called **moveNotUsed.sh**. If you run this script, it will move all the images that are not being used to **notUsedDir** specified in the config file.

To create the script, run the program again with **npm start**. This time choose the menu item that says: **Find Used Images**.


Now run the bash script created by the **Find Used Images** menu choice.  To run it, do something like this:

```
sh moveNotUsed.sh
```

**NOTE**: _Because of space considerations, please don't leave more than ten, and perferably about 5, images in the folder you used for this assignment._

## Step Five: Move to EC2 {#move-to-ec2}

Run **MakeHtml** and test your page on the Pristine Lubuntu Apache Server.

Now move the images you kept and the **markdownFileWithImages** that you created into your repository. Push.

SSH to Ec2. Pull your repository. Copy your images to your **/var/www/images/XXX** directory. Run **MakeHtml** and view your converted **markdownFileWithIimages** HTML file via your elastic IP.

## Turn it in

When you submit the assignment:

- Make sure your images and **markdownFileWithImages** is in your repository.
- Put the screen shot of your HTML file running on localhost on Google Drive in a folder called ElvenImageEditing.
- Put the screen shot of your HTML file running on the elastic ip for your AWS server in the same Google Drive folder
- Use the text page on Canvas, provide a clickable link pointing at your page running on your AWS elastic IP.
