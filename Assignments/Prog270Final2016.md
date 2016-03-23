## Folders

The goals for the final are as follows:

- Create an attractive web site on both Pristine Lubuntu and EC2.
- Use the web site to display [the work you have done][p270-res] this quarter
- Demonstrate ability to use Git, SSH and programs like **MakeHtml**.

For instance, I want to see that you understand how to use markdown to create

  - Headings
  - Paragraphs
  - Tables
  - Images
  - Lists

I also want to see that you understand:

- SSH, private keys, and public keys
- How to use the bash shell to copy, move and delete files.
- How to run scripts or programs from the bash shell
- How to deploy HTML, CSS, JavaScript and images to an Apache Web Server
- How to use the Apache web server to deploy CGI scripts that access a MySQL database.
- How to perform simple tasks creating databases and tables with **mysql** client.

Finally, I want to see that you can:

- Demonstrate basic organization skills
- Use markdown and the Apache web server to create a set of related files that deal with a single theme.

**NOTE**: _After you have received a final grade, consider whether or not you want to turn off your running EC2 instance on AWS._

## Overview

A primary goal of this assignment is to organize and display the work you have done this quarter. You don't necessarily have to create any new pages, though some might be useful if they help you to organize your already existing work.

Think of it this way: I'm asking you to **create a site that contains all the files you created this quarter.** You don't necessarily need to create new files, you just need to show the files you did create.

I'm also asking you to organize the files you created. I want you to create folders for each kind of file you created. Then sort all your files into types and put related files into the appropriate folder.

For instance, if this quarter we had studied lions, and tigers and bears, then you would create three folders:

*   Lions
*   Tigers
*   Bears

All the files related to lions go into the **Lions** folder, tiger material would go in the **Tigers** folder, and so on. If it helps to create one or more overview files, then create them also. For instance, you could create a file called **AboutLions.html**, and put it in the **Lions** folder. In that overview file you could summarize what you learned about lions, and then have links from that file to the individual lion files you created earlier in the quarter. For instance, you might write something like this: "Lions like to pace back and forth in their cages." Then provide a link to a file that has pictures and descriptions of lions pacing in their cages. Next, you might write: "Male lions have a nice thick mane". Then provide a link to a page that has pictures and descriptions of lions with a nice mane.

Please understand that this is a hypothetical example, I'm not really expecting to see a **Lions** folder nor an **AboutLions.html** file, nor pictures of a lion's mane. Instead, I want to see folders and files related to the content we developed this quarter. In particular, one folder I actually am looking for would be called **markdown-examples.** In it, I'm expecting to see files we created earlier in the quarter that contain basic markdown syntax such as paragraphs, lists, headings, etc. Or rather, I'm expecting your website to contain the HTML files created from that markdown.

Be sure a user can access all the content on your site simply by clicking links. The **master-list.html** and **summary.html** files perform this service automatically. You can use these without modification, you can use them as the basis for your own files, or you can provide an entirely different system. The overall goal, however, is to move from **index.html** or **master-list.html** to other pages in such a way that all the content on your site can be reached.

**NOTE**: _As a rule, the user should be able to reach any one file with no more than three clicks. Once you have landed on the site's home page, you should not need to click more than three times to reach any one file. If your site is large enough, it may take dozens or even hundreds of clicks to see all the files, but any one file should be no more than three clicks from the home page. There are occasions when it makes sense to violate this rule, but in general, it provides a good guideline that is worth trying to follow._

## First Steps

Divide your work up into Folders. The goals here are fairly simple:

- Create a nicely organized site.
- Demonstrate to me that -- one way or another -- you can work with the Linux file system. I don't care how you get the task done, I just want to see evidence that you can move files and folders around.
- Then I want to see that you can get your updated file structure in the **AllTest** folder of your repository.
- And finally, you need to copy these files out to your EC2 server so they can be viewed on the world wide web.

To help you track down the various types of projects we have worked on, here is an updated list of the assignments for this quarter:

- [Prog 270 Resources][p270-res]

Put class work in one folder (walkingmap, etc.). Put your theme in another folder, and so on. For instance, create folders with these names in your **~/Documents/AllTest** folder:

- markdown-examples
- bootstrap-examples
- pictures
- mapping-database
- theme

Move files that demonstrate your mastery of markdown into the **markdown-examples** folder. Most of the files that contain images, belong in the **pictures** folder. The mapping examples and the presidents database example belong in the **mapping-database** folder. Files that contain bootstrap components belong in the **bootstrap-examples** folder. Your theme files belong in the **theme** folder.

**NOTE**: _I'm not insisting that you use precisely these names, or even this organization. You have the freedom to be creative and to reach your own solutions, many of which may well be more original and interesting than the solution I provide. It would, however, also be very sensible just to follow the outline above. In short, a range of solutions would be accepted so long as they demonstrate good organizational skills and reflect a reasonable comprehension of Linux file system basics. Don't be too creative. It is, for instance, unlikely that an approach that put all your files in one folder would be a path to a good grade. Once again, if you are unsure what to do, following the pattern shown above might be a good idea._

When organizing your site, remember that you can either use the **master-list** or put together your own set of linking pages that provides access to the content in each of these folders.

## Edit Your WOrk

After you make these changes, it is likely that you will need to entirely delete, or heavily edit, the contents of the **AllTest** folder in your repository, and the contents of the **/var/www/html** folder on both Pristine Lubuntu and on Ec2. When I look in the **AllTest** folder in your repository, I'll be hoping to see files laid out in a logical and easy to understand manner. I don't want to see old files that are no longer featured on your web site. I also don't want to unnecessary copies of files. For instance, if you have moved a file from one location to another in **~/Documents/AllTest,** do whatever is necessary to enusure that the change is properly mirrored in your repository.

**NOTE**: _Don't worry too much about losing your work. Because of the nature of Git, we can always get back to how your **AllTest** folder looked before you updated it for the final._

Here is an example **master-list**:

![example](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog270-final-2016-01.png)

**Image01**: _In this screenshot we can see the major folders, and some arbitrary sub-folders under them. The top level folders are most important, but some of the secondary folders, such as **markdown-examples/basics**, might be suggestive of ways you can organize your work._

**NOTE**: _One other goal of this exercise: prove to me that you have some organizational skills. The ability to discover and follow patterns is useful for people who use computers._

## Markdown

Create the following elements using markdown:

- Headings (h1, h2, h3)
- Paragraphs (p)
- Preformated (pre). Examples of poems and of JavaScript code.
- Tables

A page from the **markdown-examples** folder:

![headings](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog270-final-2016-02.png)

I will, of course, be expecting to find the markdown that produced this page in the **AllTest** folder in your repository.

## Pictures

- Some simple markdown for showing an image
- The California and Canada files

## Bootstrap

Create two files called **bootstrap-demo01.md** and **bootstrap-demo02.md**. The first, include at least the following:

- [buttons](http://getbootstrap.com/css/#buttons) of various [sizes](http://getbootstrap.com/css/#buttons-sizes) and [colors](http://getbootstrap.com/css/#buttons-options)
- [alerts](http://getbootstrap.com/components/#alerts)
- labels

In the second, include at least the following

- tables
- carousel
- [text of various colors](http://getbootstrap.com/css/#helper-classes-colors)
  - <p class=text-danger>Like this dangerous text.</p>
  - <p class="text-success">And this successful text.</p>
- [responsive images](http://getbootstrap.com/css/#images-responsive)

Some **Extra Credit**:

- [round images](http://getbootstrap.com/css/#images-shapes)

An example round image:

<img src="https://s3.amazonaws.com/bucket01.elvenware.com/images/2015-12-19_09.35.18-small.jpg" alt="California" class="img-circle">

## Network Page

You should turn frequently to the the network pages in the Chrome and Firefox developer tools. Access them with F12 or Ctrl-Shift-I. Press F5 if necessary to refresh the display.

The images below show that **first-style.css**, **style.css**, **googlecode.css**, **elven-help.js** and the elvenware logo have all been loaded.

<div class="panel panel-default">
  <div class="panel-heading">The Network Page in Chrome</div>
  <div class="panel-body">
![Developer Tools Network Page Chrome][network-chrome]
  </div>
</div>

<div class="panel panel-default">
  <div class="panel-heading">The Network Page in Firefox</div>
  <div class="panel-body">
![Developer Tools Network Page Firefox][network-firefox]
  </div>
</div>

[network-chrome]: https://s3.amazonaws.com/bucket01.elvenware.com/images/network-chrome.png
[network-firefox]: https://s3.amazonaws.com/bucket01.elvenware.com/images/network-firefox.png
[p270-res]: http://www.ccalvert.net/books/CloudNotes/Prog270/Prog270-Resources-2016.html

## Turn it in

I'll want to see

- Your work in the **AllTest** and **ApacheHelpers** folders of your repository
- A link to your site running on EC2
- A screen shot of your site running on **localhost** (Pristine Lubuntu).
- A screen shot of you running **MakeHtml** on EC2. I'm expecting to see output that shows at least five or six file names from the HTML for your site.
- A screen shot showing you using **git pull** to update at least one file on your ec2.
- **Extra Credit** A screen shot of the network page in either Chrome or Firefox. Before taking the screen shot, press F5 or do something else to refresh the page. Hopefully there will be no red on the page indicating files that were not found.

**NOTE**: _After you have received a final grade, consider whether or not you want to turn off your running instance on EC2._

## Grading

In Canvas, the final and midterm are assigned 100 points, indicating that I am grading them on a scale of 0 to 100. But each of these assignments are worth 1/3 of your grade, and combined, they are worth nearly 2/3 of your grade. Details in the [Syllabus][syllabus].

For instance, if we had had only two assignments this quarter, then a student might have received these scores:

- Assignment One: 100
- Assignment Two: 98
- Midterm: 80
- Final: 80

I average out the assignments, then find the average of the assignments average plus the midterm and final. Then a score might be calculated something like this:

```
Assignments average: 99
Midterm: 80
Final: 80

Final Score: 86
```

Conversely, if the average for the assignments was 80, then a good score on the Final and Midterm can help turn that work into an A:

```
Assignments average: 80
Midterm: 98
Final: 100

Final Score: 93
```

I then have a little fudge factor to help someone with a 91 average to get a 92, if their class participation, enthusiasm, and overall effort indicated that they deserved that reward.


[syllabus]: https://docs.google.com/document/d/1XHeHxdevWWhLTK5N1NRsmyAqtMNakDOqKEtJMG5MfH0/edit?usp=sharing

## Expectations

As a teacher, I have two responsibilities:

- To provide students with an eduction
- To provide employers with an indication of a student's value as an employee

To satisfy the first requirement, I need to see evidence that you can complete certain technical tasks. To satisfy the second requirement, I need both evidence of technical skill, and also evidence that a student has a good attitude and a good work ethic.

Let's consider for a moment the theme that I want you to develop. If you create a page that contains nothing more than a heading and an image, I will conclude that you are interested in doing the least possible amount of work to satisfy the bare bones of a requirement. If that is the case, then I am obligated to let employers know something about your attitude and your work ethic. You would, in fact, have satisfied the requirements of the assignment, but on a level that would earn, at best, a C. To get an A or a B, I would want to see, not only a heading and an image, but also text explaining the purpose of the page, the purpose of the image, and how they fit into your larger theme. The text should, of course, be your text, and not text borrowed from another site. To get an excellent grade, you might want to work on the appearance of the page by adding bootstrap components that make the page appealing to the reader.

In short, I expect you not only to master the basic technologies we covered this quarter, but to also spend some time developing a site that demonstrates your ability to use these technologies to create something of value.
