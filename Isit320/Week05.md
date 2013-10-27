Week 05
-------

- [The Week 05 Deck](http://bit.ly/1fRfuzK)

Videos
------

- <iframe width="420" height="315" src="//www.youtube.com/embed/BEE66nNi-3c" frameborder="0" allowfullscreen></iframe>
- <iframe width="420" height="315" src="//www.youtube.com/embed/Zn6sN0Uf9z4" frameborder="0" allowfullscreen></iframe>
- <iframe width="420" height="315" src="//www.youtube.com/embed/k7Hr22oj7L0" frameborder="0" allowfullscreen></iframe>
- <iframe width="420" height="315" src="//www.youtube.com/embed/p1obmWF6Nks" frameborder="0" allowfullscreen></iframe>

Online
------

Here are your assignments and out of class work.

###Assignment One: Code Academy


Provide a link to the Profile page on Code Academy account showing 
that you have taken:

- Web Fundamentals: 100%
- JavaScript to at least: 75%
- [Example](http://www.codecademy.com/netslayer43536)

Please put your picture in your Code Academy site, or link to your 
Google Site, or provide some other means of clearly linking yourself 
to the URL you provide.


###Assignment 02: GitIgnore


When working in your repository, there are some files that you probably
don't want to check in. These include any files
in the following directories:

	.metadata
	.c9revisions
	node_modules

If you have already checked in these files to your repository, it is
simpler to leave there than to remove them. Nevertheless, you can
ensure that your folders don't get an larger than they are now.

Create a file called .gitignore. That's GITIGNORE with a PERIOD in front
of it: .gitignore.

Create or open the file in your editor. This sounds like a simple 
thing, but on Linux or Cloud 9, files that begin with a period are 
hidden. Right click on your folder in Cloud 9, and choose show 
hidden files. In Linux, type **ls -la** to see hidden files. 

Inside gitignore add the following three lines:

```
.metadata
.c9revisions
node_modules
```

The first folder holds information used workspaces in 
Eclipse/Aptana. The second folder holds backup copies of files you 
have edited on Cloud 9, and the third holds libraries used by Node. 
None of these directories needs to be stored on GitHub.

Add and check in your .gitignore file:

```
add .gitignore
commit -m "Adding GitIgnore File"
git push
```

When you are done, submit the URL of your repository.

###Assignment 03: Project Names

This is busy work, but it is very helpful to me if you create 
useful names for your projects in Aptana. Here is the contents of 
a typical .project file that is used by Eclipse/Aptana to define
the name of your project:

```
<?xml version="1.0" encoding="UTF-8"?>
<projectDescription>
        <name>week3</name>
        <comment></comment>
        <projects>
        </projects>
        <buildSpec>
                <buildCommand>
                        <name>com.aptana.ide.core.unifiedBuilder</name>
                        <arguments>
                        </arguments>
                </buildCommand>
        </buildSpec>
        <natures>
                <nature>com.aptana.projects.webnature</nature>
        </natures>
</projectDescription>
```

When I open this project in Aptana, it is called **week3**.

	<name>week3</name>

There are three problems with names like this in the context of our
course:

1. I can't tell whose project it is. Week3, yes, but Week3 by which 
student? 
2. Each project name in Aptana needs to be unique. If you submit a 
project named **week3**, and student x also submits a project with 
the name **week3**, then Aptana balks. I have to open the 
appropriate **.project** file, edit the name, and try again to import it. 
3. There might be multiple submissions for one week, and so naming 
the project week3 doesn't tell me which assignment from week3 is in 
the project folder.

Please go through all the .project files in your repository and set
their names using the following style:

- LastName-WeekXX-AssignmentName

You should be able to right click on the projects in Aptana/Eclipse
and rename them directly. This should change the contents of your
.project files, but please check to make sure that it does. If you
change the name of a project that has already been imported into 
Aptana by editing the .project file, then the next time you open 
Aptana you won't be able to open that particular project. You should
then delete the project from Aptana and reimport it, or do something
similar that has the same affect.

If you opt to edit the .project files directly, or you want to check 
your work, here is one entirely optional way to proceed. At the 
command prompt:

- Go to the root of your repository
- Enter this command: **dir /s /b .project > openProjects.bat**
- Edit openProjects.bat in NotePad++
- Use the regular expression shown below to tell NotePad++ to open
all your .project files.

**Note**: npp.bat is a batch file that I have on my path that points
to notepad++. Here is the contents of that batch file:

	"C:\Program Files (x86)\Notepad++\Notepad++.exe" %1 %1 %1

Here is how to search and replace using regular expressions in 
NotePad++:

![RegEx01](../Images/RegEx01.png)

**Figure01: See the [full size image](../Images/RegEx01.png)

Here is the regex:

- ^: Go to the beginning of the line
- (.*): Capture all the text on that line in a variable called \\1
- call npp: Enter the letters npp as literals. Or call npp.bat if you prefer.
- \\1: paste in the contents of the \1 variable, which is set to .*

So a RegEx of **^(.\*)** captures a line of text

And this RegEx replaces it with npp plus the captured line of text: **call npp \\1**

RegEx is a bit terse, and you don't really have to understand it. But
it is nice to know.

Here is what openProjects.bat looked like in one repository before
I edited it using search and replace as shown in the image:

```
C:\Src\Git\Isit320\A01\ISIT320-XXX\week1\ArrayTwoDimensions\.project
C:\Src\Git\Isit320\A01\ISIT320-XXX\week1\Branching01\.project
C:\Src\Git\Isit320\A01\ISIT320-XXX\week1\ForLoopNested\.project
C:\Src\Git\Isit320\A01\ISIT320-XXX\week1\Loops01\.project
C:\Src\Git\Isit320\A01\ISIT320-XXX\week1\PrimitiveTypes\.project
C:\Src\Git\Isit320\A01\ISIT320-XXX\week2\.project
C:\Src\Git\Isit320\A01\ISIT320-XXX\week3\.project
```

Here is what it looked like after edit it with the regular expression
shown in the image:

```
npp C:\Src\Git\Isit320\A01\ISIT320-XXX\week1\ArrayTwoDimensions\.project
npp C:\Src\Git\Isit320\A01\ISIT320-XXX\week1\Branching01\.project
npp C:\Src\Git\Isit320\A01\ISIT320-XXX\week1\ForLoopNested\.project
npp C:\Src\Git\Isit320\A01\ISIT320-XXX\week1\Loops01\.project
npp C:\Src\Git\Isit320\A01\ISIT320-XXX\week1\PrimitiveTypes\.project
npp C:\Src\Git\Isit320\A01\ISIT320-XXX\week2\.project
npp C:\Src\Git\Isit320\A01\ISIT320-XXX\week3\.project
```

Once it was edited, I could just run the batch file and all the 
project files opened in NotePad++. Here is what it looked like:

![NotePad++MultiEdit](../Images/RegEx02.png)

**Figure02: Open seven tabs at once in NotePad++. [See big image](../Images/RegEx02.png)**

When you are done, check in your work and submit the URL of your 
repository. I know this is busy work, and I should have made all this 
clear earlier, but lets straighten it out now. Thank you.
