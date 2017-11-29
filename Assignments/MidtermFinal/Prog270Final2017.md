## Overview

THIS DOCUMENT IS STILL A WORK IN PROGRESS. IT IS NOT THE FINAL FINAL, BUT HOPEFULLY CLOSE ENOUGH TO LET YOU GET STARTED.

The goal of the final is to demonstrate your ability to deploy web sites to the cloud. In particular, I want to see the following running simultaneously on EC2:

- Your Apache website running on Port 80
- Your Express program running on Port 30025
- Your Docker website with your site stored inside it running on Port 30026
- Your Docker website using the HTML stored in Apache directory and running on port 30027
- Your Firebase Login Application running on Firebase

## The Website

Your site should look more or less the same as it did on the Midterm, only this is a chance to polish and refine your code. The main page of your site should:

- Feature your last name
- If it is stored in /var/www/html/ then have the word Apache in it
- If it is stored in your Docker container, then it should have the word Docker in it.

For instance, create an H1, H2 or H3 tag near the top of the Home Page that says something like:

- My Vacation Site
  - Hosted on Docker

Here **My Vacation Site** might be in an H1 tag, and the **Hosted on Docker** tag could be a subheading with an H2 or H3 tag. The original source for your page should be written in Markdown, of course, using #, ## or ### to designate the type of your Heading tags.

The site should include the code for your custom web site, plus links to all your homework pages. You might, for instance, have the links to your custom Midterm site spelled out on the home page, and then a single single link to another page which contains links to your homework. For instance:

- My Vacation Site
  - Mexico
  - Canada
  - Alaska
  - Assignments

The specific implementation is up to you, the above is just a suggestion.

## Set Port for a Docker Container

Our docker containers have an instance of Apache in them running on Port 80. For the outside world, however, we want them running on a different port, say 10025:

    docker run --name charlie -d -p 10025:80 charliecalvert/apache

The above command does what what we want. It starts the image, mapping the Docker container's Port 80 to the hosts Port 30025.    

## Naming

I should be able to download from the Docker Hub the following:

- lastname/ubuntu-base
- lastname/apache
- lastname/make-html

The **make-html** image should contain your web site and all your homework.

In the **DockerCode** folder for your repo, put the Dockerfiles for each of you images:

- DockerCode
  - UbuntuBase
    - Dockerfile
  - Apache
    - Dockerfile
  - MakeHtml
    - Dockerfile

## Extra Credit Scripts

From the DockerCode folder, we should be able to give a single command to either either create and run or remove all your containers and images.

- DockerCode
  - UbuntuBase
    - build
    - delete
    - Dockerfile
  - Apache
    - build
    - delete
    - Dockerfile
  - MakeHtml
    - build
    - delete
    - Dockerfile
- buildA1ll
- deleteAll

The above shows the final hierarchy of scripts. Each directory has as **build** and **delete** script, where build creates and starts the image. The **delete** removes the container and the image. The **buildAll** and **deleteAll** call each of the scripts in turn. Maybe something like:

    cd UbuntuBase
    build
    cd ../Apache
    build
    ... and so on...

## EC2 Ports

View your EC2 instances **inbound rules** and make sure ports such as 30025 and 30026 are listed as open:

- [Details are here][ecsg]

## Turn it in

Provide links to your:

- Four projects running on EC2
- Your Firebase Login project running on the Firebase Servers

Make sure your repository contains your:

- Dockerfiles and any scripts you created in a directory called **DockerCode**
- Markdown files in a directory called **AllTest**
- HTML files in a directory called **FinalHtml**
- **ApacheHelpers** directory
- **Week10-ExpressBasics** directory
- Firebase Login code.

If you have any doubt as to whether or not I will be able to find your files, please spell out their location very clearly. It's late in the quarter, and if I can't find your file right away I might just assume they were not created or not assembled for the final.

## Attitude

Complete as much of the exam as you can. It is better to get it in, and get it in more or less on time, than to spin trying to complete something you don't understand.

I'm mostly interested in seeing that you:

- Show clear evidence that you learned something
- Did the homework more or less on time
- Came to class

Students start in different places. I'm looking for evidence that a student worked hard and learned something new rather than being overly concerned with whether they can complete each assignment perfectly.

When I was growing up, A's were not fetishized. People could and very frequently did get into Ivy League colleges with a B average. Today, in the technical world, what matters is the interview, not your grades. As a result, I try to keep things simple and give students the grade they deserve.

## Finding Assignments

A poorly maintained list of assignments is here:

- <http://www.ccalvert.net/>

## Close Down EC2 Instances

You can keep, delete, mangle, change in whatever way you want your EC2 instances after December 11, 2017. See the Canvas announcement on this subject for more information.

[ecsg]:http://www.ccalvert.net/books/CloudNotes/Assignments/Ec2GetStarted.html#step-04-b-security-groups
