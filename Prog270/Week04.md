Week 04
=======

General
-------

Our goals this week:

- Tools: Become more comfortable with GitHub and Cloud 9 and markdown editors.
- CSS: Learn what CSS is, and how to link a stylesheet into an HTML file
- Media Queries: Learn about media queries and how to use them to adabt to mobile platforms

InClass
-------

- [Our Deck](http://bit.ly/17GSF8W)
- [Discussion](https://bc.instructure.com/courses/834458/discussion_topics/1738776/)
- [HTML file Structure on Elvenware](http://elvenware.com/charlie/development/web/HtmlGuide/GettingStarted.html#theStructureOfAnHTMLDocument)
- [CSS Basics on Elvenware](http://elvenware.com/charlie/development/web/CssGuide/BasicSyntax.html#top)
- [MediaQueries on Elvenware](http://elvenware.com/charlie/development/web/CssGuide/MediaQueries.html)
- [Useful MediaQuery Link](http://css-tricks.com/css-media-queries/)

Online
----

Here is where I will place assignments you should complete outside
of class time.

Neither of these assignments are complete yet, but the second and third
ones now contain enough detail so you can get some work done on them and
then come back later to learn additional details.

Assignment One: Media Queries
--------------

Please read this section of the [Media Queries](http://www.elvenware.com/charlie/development/web/CssGuide/BasicSyntax.html#cssColors) page on Elvenware:

- [CSS Colors](http://www.elvenware.com/charlie/development/web/CssGuide/BasicSyntax.html#cssColors)

As you know, Responsive Design is a technique for changing the 
features of a page via CSS when you change the size of the page. 
Below is the HTML and CSS source code for a page similar to the one 
described in the CSS Colors section of Elvenware:

```
<!DOCTYPE html>
<html>

<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title>Color Tables by Charlie Calvert</title>
<link href="ColorTables.css" rel="stylesheet" type="text/css" />
</head>

<body>

<header>
<h1>The Color Page</h1>
</header>

<article>
<p>And here is a table:</p>
<table>
<tbody>
<tr>
<td class="position01">Able</td>
<td class="position02">Beta</td>
<td class="position03" style="width: 50px">Cat</td>
</tr>
</tbody>
</table>

</article>


</body>

</html>
```

You can save the above HTML as **ColorTables.html**. Here is the CSS for 
that page, which you should save as **ColorTables.css**:

```
body {
	background-color: #007700;
	color: #004400;
}

p {
	font-size:large;	
}

header {
	background-color: #00AA00;
	color: #BBFFBB;	
}

article {
	background-color: #00FF00;
	color: #008800;		
}

.position01 {
	width: 50px;
	height: 50px;
	background-color: #BBFFBB;
	font-weight:bold;
}

.position02 {
	width: 50px;
	height: 50px;
	background-color: #88FF88;
	font-weight:bold;
}

.position03 {
	width: 50px;
	height: 50px;
	background-color: #55FF55;
	font-weight:bold;
}
```

Your goal is to fix the page so that it changes colors as it is 
resized. In particular, the pages have colors shading from blue when 
big, green when medium sized and red when small. 

The ColorTables page is made up entirely of shades of green. Your 
job is to create two more sets of colors, one that is shades of red, 
and the other that is shades of blue. When the Prog270Tables.html 
page is big, it should be all shades of blue, when it is in medium 
size it should be all shades of green, and when it is small it 
should be all shades of red.

You should provide two solutions:

- One that uses media queries to link in three different CSS pages. 
Use the media queries to select one CSS page for blue shades, one 
CSS page for green shades, and one CSS page for red shades.
- The HTML for your second solution should link to a single CSS page 
that contains media queries for all three sets of colors.

When you are finished, name your files Prog270Tables01-LastName.html 
and Prog270Tables02-LastName.html. Include these pages and their 
associated CSS files in a zip file called 
Prog270Tables-LastName.zip, where LastName is your last name. 

Feel free to use your creativity on the pages. You can add new 
content to the pages, but you must keep the table and have it be 
shades of the same color used on the rest of the page. Even on the 
green page you need not use the same shades of green that I use. 

If you find choosing colors using the #00FF00 type syntax confusing,
automate the process by using a tool such as Colorzilla. There you
will find a way to automatically generate colors expressed in #00FF00
syntax. (To be clear, I want you to use #00FF00 type syntax, but you
can automate the generation of those bits of code using Colorzilla.)

Some links:

- [Colorzilla for Chrome](https://chrome.google.com/webstore/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp?utm_source=chrome-ntp-icon)
- [Responsive Design on ELvenware](http://www.elvenware.com/charlie/development/web/CssGuide/MediaQueries.html#responsiveColors)
- [Responsive Colors](http://mediaqueri.es/)

Here is an example of how to combine three different "looks" for 
a page in a single CSS file. The appearance of the page changes
as you resize the browser:

```
/* Default */
body {
	background-color: #0088FF;
	color: #FFFFFF;
}

/* Medium */
@media screen and (max-width: 1024px) {
	body {
		background-color: #00FF00;
		color: #006600;
	}
}

/* Small */
@media screen and (max-width: 520px) {
	body {
		background-color: #FF0000;
		color: #440000;
	}
}	
```

- [Download the complete example](https://bc.instructure.com/courses/834458/files/30380635/download?wrap=1)

Remember that an example of how to link three CSS files from a single
page can be found in the MediaQuery examples:

- [Download the source](https://bc.instructure.com/courses/834458/files/30363026/download?wrap=1)

In particular, you will be interested in this code: 

```
<link rel='stylesheet' media='screen and (min-width: 1025px) and (max-width: 2800px)' href='Large.css' />
<link rel='stylesheet' media='screen and (min-width: 701px) and (max-width: 1024px)' href='Medium.css' />
<link rel='stylesheet' media='screen and (min-width: 10px) and (max-width: 700px)' href='Small.css' />
```

Assignment Two: Git
-------------------

Go to cloud nine. Click on your existing Prog270-LastName repository 
and open it up as a workspace. You will see it on the left near the 
bottom of the Cloud 9 Dashboard, in the section called **Projects on 
GitHub**. Do your work for this week in that workspace.

Create a folder in your workspace called Week04-Git. Put a README.md
file in it that includes a heading and at least once sentence of
text.

Check in your work:

	git add Week04-Git
	git commit -m "This is the second part of my week four assignment"
	git push
	
It is possible that you get an error that contains text similar to this:

```
To git@github.com:charliecalvert/Simple02.git
 ! [rejected]        master -> master (fetch first)
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
```

Clearly they are asking that you do a **git pull**, and then try once
again to push. In that case, the code you see might look something
like this:

```
C:\Src\Git\Simple02>git pull
remote: Counting objects: 36, done.
remote: Compressing objects: 100% (20/20), done.
remote: Total 29 (delta 12), reused 26 (delta 9)
Unpacking objects: 100% (29/29), done.
From github.com:charliecalvert/Simple02
   ddd5cf0..2b8590e  master     -> origin/master
 * [new branch]      myBranch   -> origin/myBranch
Merge made by the 'recursive' strategy.
 .gitignore           |  4 ++++
 README.md            | 10 +++++++++-
 Simple03/Test01.css  |  5 +----
 Simple03/Test01.html |  2 +-
 4 files changed, 15 insertions(+), 6 deletions(-)

C:\Src\Git\Simple02>git push
Counting objects: 12, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (10/10), done.
Writing objects: 100% (10/10), 4.36 KiB | 0 bytes/s, done
Total 10 (delta 2), reused 0 (delta 0)
To git@github.com:charliecalvert/Simple02.git
   2b8590e..6ee5809  master -> master
```

To turn in this assignment, simply submit the URL of your repository.

For the next part of this assignment, you should create a folder called 
Week04-Bootstrap01. Use that folder for the work you do for 
Assignment Three. 

You should work in the Prog270-LastName folder, and have both the 
Week04-Git and Week04-Bootstrap folders directly inside it. That should
end up looking like this:

```
Prog270-LastName
--- Week04-Git
--- Week04-Bootstrap.
```

See below for some notes on working with files and directories in
Git.

Assignment Three: Bootstrap Part I
---------------

Bootstrap is a library created by Twitter that is designed to make
it easy for your to create nice looking web pages that automatically
work on three screens:

- Desktop
- Tablet
- Phone

The first bootstrap Assignment is like the first Cloud Nine 
assignment: You will create some markdown, convert it to HTML paste 
it into an existing HTML file, and run it via Node on Cloud 9. This 
time, however, you will be linking in the bootstrap CSS and 
JavaScript that will give your page a special look that works well 
on multiple platforms. Consider just adding your code to a new
directory in the GitHub repository you have been using.

We are going to begin working with Starter Bootstrap Template which
is found here:

- <http://getbootstrap.com/examples/starter-template/>

If you right click on that page, and choose "Show Source," you can
find the the [source code for the page](view-source:http://getbootstrap.com/examples/starter-template/).

It consists of three parts:

- The header
- The body Part I
- The body Part II

I want you to create a page similar to this boilerplate starter page. The
page you create should be called index.html, and it should be hosted
on cloud 9 and placed in your repository. 

I have modified the bootstrap boilerplate code somewhat to make it 
easier for you to use. In particular, I have linked in CDN versions 
of the bootstrap CSS and JavaScript, as this help your page load 
faster it would if you used your own version. This also frees you up
from having to download and install a local version of these pages. 

I should add that a CDN is a server that caches copies of key 
libraries that are used by many developers. In our case, the 
bootstrap JavaScript library file, and its accompanying CSS are 
hosted on a CDN site. The one disadvantage of using a CDN, of 
course, is that you must be connected to the Internet to use these 
pages.  

Here is my version of the header:

```
<!DOCTYPE HTML>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Elven Bootstrap01</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="shortcut icon" href="favicon.png">
		<!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css">
		<!-- Optional theme -->
		<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-theme.min.css">
		<link href="index.css" rel="stylesheet" type="text/css" />
		<!-- Latest compiled and minified JavaScript -->
		<script src="//code.jquery.com/jquery.js"></script>
		<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
	</head>
```

I have included all the library code you need to get your bootstrap
page up and running. Note that I have referenced both **jquery** and 
**bootstrap.min.js**. This means that you can omit the two lines found 
at the bottom of the boilerplate Starter Page that bootstrap provides.
These are the links that begin with a **script** tag and contains
the words assets, dist, jquery and bootstrap. I link all that in above
so don't include it in your code. I will show you what to link in,
so there should be no confusion.

Notice also that the header shown above referencess two files that 
you must create:

- favicon.png
- index.css

The favicon.png image file is 32 X 32 pixels in size. To help you 
understand what you need to create, here is my favicon file:

- <img src="../Images/favicon.png" alt="favicon" style="width: 32px" />

You can create this file in the Paint program that comes with 
Windows. However, I suggest downloading and installing the free 
Paint.NET program if that option is available to you:

- [Paint.NET from CNET](http://download.cnet.com/Paint-NET/3000-2192_4-10338146.html)

The key point is that you must make a PNG file that is 32 X 32 pixels in
size.

The second file you will need to create is called index.css. It looks
like this:

```
body {
	padding-top: 50px;
}

.starter-template {
	padding: 40px 15px;
	text-align: left;
}

pre {
	width: 200px;
}

```

Just create a file with those contents and save it as **index.css**. 
Here is what it does:

- The body tag at the top ensures that there is a gap of 50 pixels at
the top of the body where the menu can be placed
- The starter templates creates a little padding at the top and right,
and then aligns the text to the left. Note that the CSS provided by
the bootstrap site aligns the text in the center. That will not work
for us, because the pages we are creating with our markdown are designed
to be flushed to the left. (Text is flush left by default, of course,
but I including an explicit reference here so that you can understand
why our code looks different from the bootstrap boilerplate.)

Finally, I have set the pre tag to have a width of 200px. This is
actually specific to my page. As you recall, my default markdown 
has a little poem in it about a frog and his pond. It is not a very
wide poem, so limit the size of the HTML element that contains it. 
This may have no effect on your code, or it may be the wrong effect.
You can play with this setting if necessary. In fact, you can play
with any of the CSS if you want.

Ok, we are done with the head. Beneath this you should place the body
and closing HTML tag:

```
<body>
  <!-- Place the two body elements here. -->
</body>
</html>
```

Now I will describe the code that goes beneath the comment in the
body. Here is the first part of the body:

```
  <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Project name</a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>
```

For now, you can leave this alone, but you will need to edit
it later. In particular, the links contain an href we will
need to be edit.

Here is the second part of the body:

```
<div class="container">

	<div class="starter-template">
		<!-- Place your converted markdown here -->
	</div>

</div><!-- /.container -->
```

As you can see, this code features a container, and inside that 
container is a place to put your converted markdown. The two class 
attributes shown here are included so that bootstrap will know how 
to "style" your page. In particular, note that you know how the 
starter-template style will look, since we defined it in 
**index.css**.

Once you have your page up and running, the next step is to get the 
menu working correctly. There are several ways to solve this 
problem, some of which are more sophisticated than the one I want 
you to implement. However, there are advantages to the "simple" 
solution I show here.

We are going to focus on these lines of codes from the first part of
the header:

```
	<li class="active"><a href="#">Home</a></li>
	<li><a href="#about">About</a></li>
	<li><a href="#contact">Contact</a></li>
```

The following code is called an anchor, and puts a hyperlink in your
page:

	<a href="#">Home</a>

The **a** in the tag stands for anchor. That is the name of the tag. 
The **href** attribute is a link to a place in the current document 
or to another page. For instance, if your web site had a page in it 
called **MyPage.html**, then you would create a hyperlink to that 
page with this code:

	<a href="MyPage.html">MyPage</a>

Your job is to create two pages:

- About.html
- Contacts.html

They should look more or less exactly like index.html, only they
should contain content appropriate to an About and Contact page.
You need not include real information on these pages, and in particular,
you should not include your email addresses, as SPAM bots can get
hold of them. It might be nice, however, to link to your Google Site. 

After you create these pages, you should modify your hyperlinks so
that clicking on the About link takes you to the about page, and etc.
Don't forget to link back to your home page (index.html) from the
appropriate link!

You will also need to make similar changes to the Project name link, 
but I will leave that as an exersize for you. 

Your server.js is now going to look something like this:

```
var http = require('http');
var url = require('url');
var port = process.env.C9_PORT || 1337;
var fs = require('fs');

function getPath(request) {
	return url.parse(request.url).pathname;
}

function onRequest(request, response) {
    var pathname = getPath(request);
    console.log("Request for " + pathname + " received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}

function first(request, response) {
	var path = getPath(request);
	console.log("Request for " + path + " received.");
	if (path === '/index.css') {
		var css = fs.readFileSync(__dirname + path);
		response.writeHead(200, {'Content-Type': 'text/css'});
		response.write(css);
	} if (path === '/About.html') {
		var css = fs.readFileSync(__dirname + path);
		response.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': '1877'});
		response.write(css);
	} if (path === '/Contacts.html') {
		var css = fs.readFileSync(__dirname + path);
		response.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': '1968'});
		response.write(css);
	} else {
	    var html = fs.readFileSync(__dirname + '/index.html');
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(html);
	}
    response.end();
}

http.createServer(first).listen(port);
console.log("Server has started:" + port);
```

Notice the lines called **Content-Length** and are set to values like
1877? You might need to change these to reflect the size your page.
You can see the page size by going to the appropriate directory
in the terminal and issuing the ls -la. It creates output like this:

```
charliecalvert@Test02:~/196291/Bootstrap01 (master) $ ls -la
total 36
drwxr-xr-x. 2 52581ead500446dad4000112 52581ead500446dad4000112 4096 Oct 18 13:24 ./
drwxr-xr-x. 8 52581ead500446dad4000112 52581ead500446dad4000112 4096 Oct 18 13:19 ../
-rw-r--r--. 1 52581ead500446dad4000112 52581ead500446dad4000112 1877 Oct 18 13:29 About.html
-rw-r--r--. 1 52581ead500446dad4000112 52581ead500446dad4000112 1968 Oct 18 13:26 Contacts.html
-rw-r--r--. 1 52581ead500446dad4000112 52581ead500446dad4000112 1178 Oct 18 13:19 favicon.png
-rw-r--r--. 1 52581ead500446dad4000112 52581ead500446dad4000112  118 Oct 18 13:19 index.css
-rw-r--r--. 1 52581ead500446dad4000112 52581ead500446dad4000112 3305 Oct 18 13:27 index.html
-rw-r--r--. 1 52581ead500446dad4000112 52581ead500446dad4000112  370 Oct 18 13:19 .project
-rw-r--r--. 1 52581ead500446dad4000112 52581ead500446dad4000112 1346 Oct 18 13:24 server.js
```

You can see that Contacts.html has a size of 1968 bytes. (I was surprised
to see that I needed to include this information in the header, but it
fixed a bug when I included it. I'll try to get more information by
class time.)

When you are done, do one of two things:

- Add your code to your GitHub repository, and submit a link to your
repository.
- Add your code to zip file, and submit the zip file.

Working with Files and Directories in Git
-----------------------------------------

Once you have made an add and/or commit in Git, then you should use 
Git to do things like delete or rename files. If you want to rename 
a directory from BootStrap01 to Week04-Bootstrap, then do it like 
this:

	git mv BootStrap01 Week04BootStrap

That's git, followed by the mv (move) command.

To delete a file that you have checked in, do this:

	git rm MyFile.js
	
To complete deleted a directory and its contents, do this:

	git rm -r MyDirectory

If you have not yet committed your work into Git then you don't need 
to call file manipulation commands through git. Instead you can just 
issue the command directly. For instance:

	rm MyFile.js

But once you commit your work, then you need to tell Git that you 
want to delete or rename a file. Then you use the commands shown 
above.

If you want to do your work on your Windows machine, you can first 
install Node, then do your work on your home machine, then commit 
your work to GitHub, then check it out of Git on Cloud 9 and test 
your code to confirm that it works. To run the server.js from the 
command line in Windows after installing Node, do this:

	node server.js
	
Remember that after you install Node, node won't be on the path of 
any Command windows that were open during the install. You have to 
close those command prompts, then reopen, then they should be able 
to find Node:

	C:\Src\Git\Simple02>node --version
	v0.10.20


