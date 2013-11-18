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

Terrence added these helpful notes in the discussion area:

Here are the detailed steps. Folks who have installed the plug-in can 
probably duplicate this and get the desired results:

- Sign into LastPass from the browser plug-in. 
- Click the LastPass icon on the browser (see screen shot)
- fill in the applicable fields, and click Login. 

![Detail of Lastpass icon](../Images/LastPass02.png)

You should now be signed in to LastPass and the icon changed color 
from black to red to indicate this. (The icon is black when you are 
not signed in.)

Now: 

- Log onto a site in your vault by using LastPass. 
- Click the icon again, click Sites, and click a listed site to automatically log on to it.
- Open your LastPass vault. 
- Click the icon again, and click My LastPass Vault. 

You will probably see a default folder named "(none)" that lists the 
sites you added to LastPass. You should now also see a "recently 
used" folder above this that shows the last sites you visited.

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

I tried to make it easier to fix up database name and collection. See
MondoData.js:

```
.constant('CONFIG', {
    DB_NAME: 'elvenlab01',
    COLLECTION: 'address',
    API_KEY: 'qfSxFoUGHBA1EuUlqhux_op2fy6oF_wy'
})
```

For instane, if your database was called **lucydatabase**, and your
collection was called **lucydata** and your API_KEY was **qmykey1**, then you
would change the above code to read like this:

```
.constant('CONFIG', {
    DB_NAME: 'lucydatabase',
    COLLECTION: 'lucydata',
    API_KEY: 'qmykey1'
})
```

I also want you to create one page that links to the Pictures menu
item that is similar to the custom page you created for the midterm.
It should, for instance, contain custom text and pictures. 

You should also modify the About the page so that it is attactive
and contains reasonable data, rather than the default data that I
have included in the sample about page provided with the starter
code.

Key Points:

- Connect to your own database using your own key
- Use your own data. Make sure you can add, delete and modify records
- Follow the format (firstName, lastName, address, etc) outlined
above.
- Create a customer **Pictures** page with text and images
- Modify the about page.
- In your repository, include screenshots showing your application 
running in Cloud Nine and Lubuntu
- Check your work into your repository

I provide some default images for the "carousel" at the top of the
main page. You can use those images or create different images.

Don't forget to ask questions in the discussion area.

- [Mongo Lab Api](https://support.mongolab.com/entries/20433053-Is-there-a-REST-API-for-MongoDB-)

On Carousels
------------

The bootstrap demo we look at includes a carousel.

Carousels give users the opportunity to iterate over a series of 
options, much like a menu. Picture galleries are often implemented 
as carousels:

- <http://wowslider.com/>

Examples of major sites and tools that use carousels include:

- Amazon. If you go to a product page in Amazon, you will find a 
section called "Customers who bought this product also bought..." 
That section is a carousel that allows shoppers to pick products 
that might be related to the current selection.
- Netflix. When you sign in you are present with a view of multiple 
rows of movies. Each row is a carousel. You can rotate through the 
carousel and select movies.
- Chrome. Chrome uses a carousel on the apps page. You have probably 
noticed the icon in the upper left hand corner of the Chrome browser 
with an icon like a colored grid of dots. It is labeled apps. If you 
sellect that item, you are taken to the apps page with this URL: 
[chrome://apps/](chrome://apps/). You can shop for Apps in the Chrome 
store that is linked from the Apps page. If you fill up one page with 
Chrome Apps, then a carousel will allow you to move to the next page.

This site provides more examples and variations on what can be done 
with carousels:

- <http://coolcarousels.frebsite.nl/>

An interesting variation on the carousel is the Windows 8/8.1 start 
screen. Like a carousel, it allows the user to scroll through a 
serious of options. But instead of dividing the options into pages, 
the choices simply scroll by, much as they would if you were looking 
at an ancient Chinese scroll:

- <https://www.google.com/webhp#q=chinese+scrolls>
