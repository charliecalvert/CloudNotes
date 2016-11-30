## Overview

When working with WordPress, don't forget that most of the changes you make are done on the wp-admin page. You reach it with a URL like this:

- http://localhost/wordpress/wp-admin

You will have to log in.

## Link to your Page

On EC2, there should be a new menu item on your home page that points to your Wordpress Blog. It should have a name like **My Blog**.

## Working Strategies

While performing the tasks outlined below, and many other tasks, it might make sense to have two tabs open:

- One to the Wp-Admin page  (http://localhost/wordpress)
- One to your WordPress site as the end user will see it. (http://localhost/wordpress/wp-admin)

Flip back and forth between the two as you work. Or find some other style of working that suits you. For instance, there are often preview buttons that can give you a sense of what a change looks like without actually committing to the change.

## Picking a Theme

There are many themes. The one's that are maintained by Wordpress are the most commonly used. These have names based on the year of release:

- Twenty Fourteen
- Twenty Fifteen
- Twenty Sixteen

That implies that there will soon be a new release. You can use any theme you want, but I will focus on Twenty Sixteen in this discussion.

The key point to grasp is that this site is aimed at bloggers. You can do a lot with WordPress, and many people do, but the path of least resistance if blogging.

## Menus

The menus on Twenty Sixteen default to the top right. This means that if you want to show multiple items, you should create a dropdown.

Choose **Appearance | Menus**.

On the left you can see:

- A list of resources on your site with names like **Pages**, **Posts** and **Events**.
- Open up these lists, select an item or items
- Click the **Add to Menu** item
- On the right, drag with your mouse until you have menu that looks right to you.

## Database

In part because I didn't really see it coming, there has been some confusion between the EC2 home page and the Firebase home page.

The best solution might be to have two **index.md** home pages:

- One for firebase: index-firebase.md
- One for apache: index-apache.md

When you run npm start from the ~/Source/MakeHtml directory, you can configure package.json to help you automate the process of renaming these files. The core of it would be a command like this, which would be run after you ran **npm start**:

```text
mv ~/Source/firebase-database/public/index-firebase.html ~/Source/firebase-database/public/index.html
```

You could create a small script in the **~/Source/MakeHtml** directory called **run** that looked like this:

```text
npm start
mv ~/Source/firebase-database/public/index-firebase.html ~/Source/firebase-database/public/index.html
```

## PhpMyAdmin

For the database on EC2 or Pristine Lubuntu, it is nice to have a fancy tool that can help you manage the database. A common choice is a web app called PHPMyAdmin:

  sudo apt-get install phpmyadmin

You will be asked to enter select a webserver, which in our case is **apache**. You will also need to enter a password. I suggest you stick with the same one you are using for **mysql**.

Now browse to your new application:

```
http://locatlhost/phpmyadmin
http://11.11.11.11/phpmyadmin
```

In this case I have used **11.11.11.11** to represent any IP address. You should enter the one that points to your server:

```
http://<DOMAIN_NAME>/phpmyadmin
http://<IP ADDRESS>/phpmyadmin
```

## Aria

Here is the home page for Aria:

- <https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA>


## Turn it in

Submit the URL for your wordpress site on EC2. If there is any chance that it is not running, then you should submit a screenshot of it running as well as the address where you think it will be running. One simple way to do that, I believe, is to use the URL option in Canvas. That usually presents me with a clickable link to your page, and a screenshot of that page.

## Color Screens

This is under:

- Appearance
- Customize
- Color

There are about five color schemes to choose from. They have names like **black**, **gray**, **yellow**, and **red**.

Some of the color schemes have been tweaked to help with accessibility issues:

- <https://github.com/WordPress/twentysixteen/pull/360>

## Widgets

Under appearance, there are various widgets you can add to your page, such as a:

- Calendar

## No CSS

If you have text, but no CSS, see this:

- <http://www.elvenware.com/charlie/development/cloud/WordPress.html#no-css>

## Embed page

You can embed an entire web page in one of your pages. This is not a very good option, as a link is more appropriate. But you can do it. When creating your page, Write code like this:

```html
<iframe src="//www.ccalvert.net/books/CloudNotes/Assignments/Prog270Midterm2016.html"
  name="frame1" scrolling="auto" frameborder="no"
  align="center" height = "1000px" width = "100%">
</iframe>
```

## Links

- <https://help.ubuntu.com/lts/serverguide/phpmyadmin.html>
- <https://premium.wpmudev.org/blog/twenty-sixteen-review/>
