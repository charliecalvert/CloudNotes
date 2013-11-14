Week08 {#top}
======

The main goals and links for this week are:

- [CloudNotes TOC](../CloudNotes.html)
- Review issues in [MidTerm](Week07.html#midterm-part-i)
- Databases 
- [Day 15 Deck](http://bit.ly/16ZBljB)

In Class
--------

- [Day 15 Deck](http://bit.ly/16ZBljB)


###Genymotion

[Genymotion](http://www.genymotion.com/) has prebuilt AndroidX86 VMs 
and includes a nice Nexus emulator. Using Genymotion is optional, 
but useful. There is custom Windows install for Genymtion, but the 
VMs they create install automatically into VirtualBox. (Get the install
that does not include VirtualBox, as you have that installed already.)

Like Android 4.3, this might not work on all systems. And of course,
it probably won't install into N252 machines, since it requires 
Admin priviliges to do the install.

- [URL for Genymtion](http://www.genymotion.com/)


Online
------

###Asignment01-LastPass {#lastpass}

- Create an account on LastPass. Send me a screen shot of your 
recently used list, showing that you have used Lastpass to sign
in to at least three accounts, including your BC mail. You may 
use a bitmap editor to blank out the email for all but your BC
mail account.

![LastPass Recently Used](../Images/LastPass01.png)

- [Full size image](../Images/LastPass01.png)

Place your screen shot an Week08-LastPass folder in your repository
and submit the URL of your repository.

###Git Practice {#gitPractice}

- On Windows, create a folder in your repository called **Week08-GitPractice**
- Add two files called
	- **Test01.md**
	- **Test02.md**
- Create a folder called **images**
- Go to GitHub for Windows and navigate to your repository
- Step01. Before you check in your new code, take a screenshot of 
GitHub for windows and put it in your images folder
- Check in your code
- Open up Cloud Nine
- Pull down your latest additions to Git
- Take a screeshot and put it in your images folder
- Open Lubuntu
- Pull down your code and take a screen shot of it in Lubuntu
- In cloud nine, using the terminal window, navigate to your 
Week08-GitPractice and issue this command: **ls -la > CloudNine.txt**
- Check in and push your code in Cloud Nine
- Pull your code in Lubuntu
- In Lubuntu navigate to your Week08-GitPracticeFolder and issue this
command: **ls -la > Lubuntu.txt**
- Checkin and push your code from Lubuntu
- Pull your code in Windows.
- Navigate to your Week08-GitPractice folder and at the command
line issue this command: **dir /od > Windows.txt**
- Checkin and push your code and submit your Git URL.

On the images below, right click and pick "open image in new tab" to see
a full sized image.

![Step01](../Images/GitPractice01.png)
![Step02](../Images/GitPractice02.png)

###MongoDb {#mongo}

This is your main assignment. It is similar to the midterm, only
this time the data will be updatable. 

If you have not done so already:

- Go to [https://mongolab.com/](https://mongolab.com/)
- Create an account
- Create a database
- Create a collection
- Put some data in the collection

Here is some sample data

```
{
    "firstName": "A",
    "lastName": "B",
    "address": "C",
    "city": "D",
    "state": "E",
    "zip": "F",
    "phoneHome": "G",
    "phoneMobile": "H",
    "email": "I"
}
```

Modify the program linked from the assignment page on Canvas so
that you can connect to your data in your database. Add at least
three records to your database. 

Check in your code in a folder of your repository called Week08-Mongo.
Include a screenshot of your collection in MongoLab site.

More later.


- [Mongo Lab Api](https://support.mongolab.com/entries/20433053-Is-there-a-REST-API-for-MongoDB-)
