Week07 - Assignment
-------------------

You have several tasks:
 
- Install CouchDb
- Get the JsObjects demo CouchDb08 running on it.
- Put a screen shot of CouchDb08 on your AWS apache server in /var/www/
- Link to your screen shot from your index.html
- Create a CouchApp program and run at least your Game Grid out of it
- Create a screen shot, and serve it up from your aws apache server.
- Update the latest version of your repository with your index.html and bitmap files.
- Do the minimal install for Ubuntu 13.04 on VirtualBox

Strategy. Create your index.html file and its links to your bitmaps
on your home machine. Check it in to your repository in a folder called
HomeSite. Pull your repository on AWS. Copy the files to /var/www/.

	cp -r *.* /var/www/.
