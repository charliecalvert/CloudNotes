# Angular Basics

In this exercise you will learn how to create a fairly complete and quite powerful Angular project with the following features built in:

- Modules
- Controllers
- Unit testing with Jasmine and Karma
- Angular routing

This exercise depends on [Yeoman](http://yeoman.io/), an excellent tool which solves many problems for web developers. 

There are many [generators](http://yeoman.io/generators/) for use with yeoman. We are using the one called [generator-angular][genang].

[genang]:https://github.com/yeoman/generator-angular

## Step One

Ensure that all the pre-requisites are installed. Go to the command prompt and run this command:

    npm install -g grunt-cli bower yo generator-karma generator-angular

If you have already given one or more of the those commands, I don't think any harm will be done by issuing the command a second time. On the other hand, you only need to install these global utilities one time. There is no need to issue the command again. (You might, however, want to update them at some point, but that is a separate topic.) Remember that you can see what is currently installed globally with this command:

    npm list -g --depth=0

## Step Two

Once you have have the set up completed, then you want to create an angular project. Navigate to your repository and issue the following commands: 
 
    mkdir Week02-Angular
    cd Week02-Angular
    yo angular

When working through the prompts you get when you type **yo angular**, you should probably say **no** to SASS (with Compass) and yes to everything else. But you can use SASS if you want -- it's just that some would probably appreciate it if we don't learn another new tool right at this time in the course unless we absolutely have to use it. Also, to be honest, CSS templating is not a subject I know very well....

The **yo angular** command will take a long time to run, even on a reasonably fast machine. On a slow machine, it might take a significant period of time, perhaps 15 minutes or more. On my home machine, which is reasonably powerful, it takes 1 minute and forty seconds.

## Step Three

Run the application with this command:

    grunt serve

When you run grunt serve, the page should automatically be launched in Chrome. If it does not, you can browse to [http://localhost:9000](http://localhost:9000). Ultimately, of course, we should change the port to 30025 by editing **Gruntfile.js**.

Run the unit tests with this command:

    grunt test

When running the tests, you should see output that says: **Executed 2 of 2 SUCCESS**. And also **Done, without errors.**. That is part of what I would like to see in one of your screen shots.

## Step Four

Add your name to one of the HTML files such as **about.html** so that it appears on the main screen or on the about page. 

Take screen shots of the interface and of the results from running the tests.

## Turn it in.

Check in your project to BitBucket. Attach the two screen shots to your assignment when you submit it. As always, it is helpful, or at least nice, to provide the URL for your repository and the name of the directory where you submitted the assignment. 

Since this project was delayed so many times, I'm hardly in a position to get fussy if it is in **Week02-Angular** or **Week03-Angular** etc.... But it might be nice to include the name of the folder you used when you submit the assignment.


 
