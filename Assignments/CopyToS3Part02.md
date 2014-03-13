# Copy To S3 Part 02

Here is where we are headed over the remaining weeks of the class:

- Convert **AwsBasicS3** so that it stores all its **config** files and markdown files in MongoDb.
- Convert the interface so that it can be run from a mobile device. 
- Create some units tests
- Move at least some of the markdown files we create into a database

Under consideration and/or Extra credit:

- Provide the ability to save one folders worth of files to the database under a given name, and replace them with another set of files with a different name.
- Use a tool like [page down](http://code.google.com/p/pagedown/) to integrate editing markdown on your mobile device.

Most of this work will be on my end, but we should also find ways to add:

- PubSub
- RequireJs

Is this the final? Yes, probably, but we will take it in pieces. We have a few weeks to divide the project up into discreet tasks, as described below. You will be grade on each task as weekly homeworks, and then presumably the finished product will be the final. We can negotiate as to what is the best, and most reasonable final. If I'm asking too much, we can find a reasonable middle ground.

## The Primary Use Case

You are sitting in your bedroom with your phone and realize you want to update part of your web site. Using your phone, you make a change to a markdown file, then push a button and see the update published on S3. We won't be able to get all that working this quarter, but that is where we are headed.

## Interface Details

The interface should probably be written in either [bootstrap](http://getbootstrap.com/) or [jqueryMobile](http://jquerymobile.com/). The keypoint is that it should be navigable on a phone, not just on a tablet or PC. (If the best you can do is make it work on a tablet, then that won't be the end of the world, but go for the phone if you want the best grade!)

You should include:

- The ability to edit the **config** files on your phone
- One page for configuring **MarkdownTransform**
- A single page that you can use to configure both **CopyToS3** (aka walkdirs) and **BucketLists**.
- A page for running **MarkdownTransform**, **CopyToS3** and **BucketLists**
- A way to view the output
- Links to the code running on both your server and on S3

## Strategy

All of the work that AwsBasicS3 does is performed on a server. You will only be controlling the action from a mobile device. It would be nice, however, to store some of the files that we use in a database. Let's think for a moment about what that involves.

### Scenario 01

At first, we can run variations on the current program.

- We create markdown files on StackEdit and save them to Google Drive or Drop Box
- The Google Drive or Drop Box app is running locally, so we have a local copy of the markdown files as soon as we create or edit them.
- We transform the markdown to HTML and copy it to a local web site. We can use Apache, IIS, or the [NodeStatic](https://github.com/cloudhead/node-static) sample found in **/JsObjects/JavaScript/NodeCode/StaticSite** to set up the web site. 
- Set up a **Options.config** to copy the files to S3 and perform the copy.

### Scenario 02

However, I'd ultimately like to be able to do something at least vaguely like this:

 1. Have a single folder where you can store your markdown files.
 2. Teach AwsBasicS3 to copy all the markdown files from that folder to your database and save them under a specific name and a     set of keyworks. For instance, all the files from **CloudNotes/Prog272**
    could be stored in the database under that name. 
 3. When we want to edit them, enter a command to send to our folder, which is part of Google Drive or DropBox. 
 4. Then we edit the markdown in StackEdit.
 5. When they look right, we transform them to HTML, and copy to them to S3. 
 6. Finally, the updated markdown files are copied back into the database.

The above, however, is probably too ambitious. It might be enough to simply copy the markdown files from any given folder into the database.

## Week 10 Assignment

- Store the config files the database
- Provide a means to edit them in **AwsBasicS3**.

If you have extra time, think about strategies for performing the following task:

- Copy all the files your create in StackEdit and save to DropBox or Google Drive to the database.

The last step is still assuming scenario 1. Suppose your saving Poems. In StackEdit you have create created two folders: **Shakespeare**, **Shelley**. Your program copy any files found either of those folders to your database. Use one of our existing programs such as **MongoTalk** to display the files.

## Turn It In

Place your code in a folder called Week10-CopyToS302 and place it in your repository. Submit the URL of that folder when you turn in the assignment. Make sure the name in your **.project** file for Eclipse includes your last name: **Week10_CopyToS3_LastName, where LastName is your last name.



> Written with [StackEdit](https://stackedit.io/).