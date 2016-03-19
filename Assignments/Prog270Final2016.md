## Folders

This document is not yet complete, but there should be enough information here to get you well started on the final.

The goals for the final are as follows:

- Create an attractive web site on both Pristine Lubuntu and EC2.
- Use the web site to show off [the work you have done][p270-res] this quarter
- Show that you know how to use Git, SSH and MakeHtml.

In particular, I want to see that you understand:

- How to use markdown to create
  - Headings
  - Paragraphs
  - Tables
  - Images
  - Lists

I also want to see that you understand:

- SSH, private keys, and public keys
- How to use the bash shell to copy, move and delete files.
- How to run simple scripts or programs from the bash shell
- How to deploy HTML, CSS, JavaScript and images to an Apache Web Server
- How to deploy CGI scripts and set up a database.

Finally, I want to see that you can use an markdown and Apache web server to create a set of related files that deal with a single theme.

## Expectations

As a teacher, I have two responsibilities:

- To provide students with an eduction
- To provide employers with an indication of a student's value as an employee

To satisfy the first requirement, I need to see evidence that you can complete certain technical tasks. To satisfy the second requirement, I need both evidence of technical skill, and also evidence that a student has a good attitude and a good work ethic.

Let's consider for a moment the theme that I want you to develop. If you create a page that contains nothing more than a heading and an image, I will conclude that you are interested in doing the least possible amount of work to satisfy the bare bones of a requirement. If that is the case, then I am obligated to let employers know something about your attitude and your work ethic. You would, in fact, have satisfied the requirements of the assignment, but on a level that would earn, at best, a C. To get an A or a B, I would want to see, not only a heading and an image, but also text explaining the purpose of the page, the purpose of the image, and how they fit into your larger theme. The text should, of course, be your text, and not text borrowed from another site. To get an excellent grade, you might want to work on the appearance of the page by adding bootstrap components that make the page appealing to the reader.

In short, I expect you not only to master the basic technologies we covered this quarter, but to also spend some time developing a site that demonstrates your ability to use these technologies to create something of value.

## First Steps

Divide your work up into Folders. The goals here are two fold:

- Create a nicely organized site.
- Demonstrate to me that -- one way or another -- you can work with the Linux file system. I don't care how you get the task done, I just want to see evidence that you can move files and folders around. Then I want to see that you can get your updated file structure in the **AllTest** folder of your repository.

To help you track down the various types of projects we have worked on, here is an updated list of the assignments for this quarter:

- [Prog 270 Resources][p270-res]

Put class work in one folder (walkingmap, etc.). Put your theme in another folder, and so on. For instance, create folders with these names in your **~/Documents/AllTest** folder:

- markdown-examples
- bootstrap-examples
- pictures
- mapping-database
- theme

Move files that demonstrate your mastery of markdown into the **markdown-examples** folder. Most of the files that contain images, belong in the **pictures** folder. The mapping examples and the presidents database example belong in the **mapping-database** folder. Files that contain bootstrap components belong in the **bootstrap-examples** folder. Your theme files belong in the theme folder.

**NOTE**: _I'm not insisting that you use the names, or even the organization, that I have spelled out above. I want to give you the freedom to be creative and to reach your own solutions, many of which may well be more original and interesting than the solution I provide. It would be very sensible just to follow the outline above, but other solutions would be accepted so long as they are creative and demonstrate your understanding of the Linux file system. Don't be too creative. It is, for instance, unlikely that an approach that put all your files in one folder would be a path to a good grade. Once again, if you are unsure what to do, following the pattern shown above might be a good idea._

Either use the **master-list** or put together a front page that points at each of these folders and explains what is in them.

After you make these changes, it is likely that you will need to entirely delete, or heavily edit, the contents of the **AllTest** folder in your repository, and the contents of the **/var/www/html** folder on both Pristine Lubuntu and on Ec2. When I look in the **AllTest** folder in your repository, I'll be hoping to see files laid out in a logical and easy to understand manner. I don't want to see old files that are no longer featured on your web site.

**NOTE**: _Because of the nature of Git, we can always get back to how your **AllTest** folder looked before you updated it for the final._

Here is an example **master-list**:

![example](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog270-final-2016-01.png)

**Image01**: _In this screenshote we can see the major folders, and some arbitrary sub-folders under them. The top level folders are most important, but some of the secondary folders, such as **markdown-examples/basics**, might be suggestive of ways you can organize your work._

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
