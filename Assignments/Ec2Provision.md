## Description

Create and provision an EC2 instance suitable for node development in one of Charlie's classes.

## Provision EC2

This assignment is perhaps not entirely complete, but here is enough to get you started. Perform the following tasks:

 - Update your server  
 - Install Git 
 - Download JsObjects from GitHub into your Git folder.
 - Install Node 
 - Install MongoDb 
 - Install Lamp
 
Use the notes found here:
 
- <http://www.elvenware.com/charlie/os/linux/ConfigureLinux.html>
 
**NOTE**: *There is no need to install SSH and Java on EC2. Those just happen to be found on the reference page I'm using for this assignment.*

We can go over this in class, but you will also need to understand how to open up ports, such as 30025, on AWS. For this assignment, you must at least get as far as opening up Port 80:

- <http://www.elvenware.com/charlie/development/cloud/WebServices.html#ec2SecurityGroups>

## Turn it In

To turn in the assignment, you should provide a screen shot showing:

- A listing of your Git (ls -la ~/Git). A sample screen shot is shown below, but it has more directories in it than your's will have.
- A listing of the JsObjects directory (ls -la ~/Git/JsObjects)
- A listing of your .ssh folder: (ls -la ~/.ssh
- A link to your site and/or a screen shot of it running. It should show the Apache welcome screen, as shown below. This part of the assignment will not work unless you have first opened up Port 80.

Here is a sample listing screen shot:

![Git Listing](http://www.elvenware.com/charlie/books/CloudNotes/Images/Ec2Listing01.png)

Here is a sample of what the Apache welcome screen should look like:

![Lamp](http://www.elvenware.com/charlie/books/CloudNotes/Images/LampApache2.png)

## More Information

The following document used in another class also contains information that you might find useful:

 - [AwsEc2Expert](http://www.elvenware.com/charlie/books/CloudNotes/Assignments/AwsEc2Expert.html)

> by [Charlie Calvert](http://elvenware.com/charlie).