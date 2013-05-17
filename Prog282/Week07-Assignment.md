Week07 - Assignment
-------------------

The overview for Week 7 is here:

<http://elvenware.com/charlie/books/CloudNotes/Prog282/Week07.html>

You have several tasks:
 
- Install CouchDb
- Get the JsObjects demo CouchDb08 running on it.
- Put a screen shot of CouchDb08 on your AWS apache server in /var/www/
- Link to your screen shot from your index.html
- Create a CouchApp program and run at least your Game Grid out of it
- Create a screen shot, and serve it up from your aws apache server.
- Update the latest version of your repository with your index.html and bitmap files.
- Optionally do the minimal install for Ubuntu 13.04 on VirtualBox

Strategy. Create your index.html file and its links to your bitmaps
on your home machine. Check it in to your repository in a folder called
HomeSite. Pull your repository on AWS. Copy the files to /var/www/.

	sudo cp -r * /var/www/.
	
The -r in the above command asks the copy command to copy files recursively.
That is, it will dive into any nested subdirectories and copy those directories
and the files that are in them. 

If you want more feedback, use the -v for verbose switch. The following 
examples shows copying some nested files and folders from the bar directory 
to the foo directory:

~~~~
charlie@ShantiServer03:~/bar$ cp -rv * ~/foo/.
bar -> /home/charlie/foo/./bar
bar/foo -> /home/charlie/foo/./bar/foo
bar/foo/bar.txt -> /home/charlie/foo/./bar/foo/bar.txt
bar/bar.txt -> /home/charlie/foo/./bar/bar.txt
root.txt -> /home/charlie/foo/./root.txt
~~~~

If you make a mistake, you can delete nested folders with this command:

	rm -r [SomeFolder]
	
For example:

	rm -r bar

Remember that if you are in /var/www, then the files are probably owned by **root**
and so you need to prepend your commands with **sudo**

	sudo cp -rv * /var/www/.
