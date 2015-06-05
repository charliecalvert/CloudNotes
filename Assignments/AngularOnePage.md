## Description

Incorporate the Moongoose editor material into your midterm project. Start by copying your existing midterm into a folder called **Week10-AngularOnePage**.

We will break this assignment into parts. To complete this assignment, complete only Part I. We will do Part II after class on Monday:

1. Add a menu and multiple pages that allow the user to switch between the following views:
  - Home
  - Edit
  - Subjects
  - Comments
  - About
1. In a later assignment we will incorporate the Mongoose database into our program.

For this assignment, I expect you to complete part 1, and to make a start on part 2. In a later assignment we will complete part 2.

## Single Page

This is the part due first. The key features needed to turn our midterm into a true single page app are:

- An expanded menu similar to the one found in the **MongooseEditor** assignment.
- Multiple pages that can be swapped in while maintaining an unchanged header. Again, this is similar to the functionality found in the **MongooseEditor** project.

In most cases, this should be a fairly straightforward operation. There are, however, one or two midterm projects created by students where incorporating these new pages might be a bit tricky. I think, however, that everyone should be able to create the following pages with little trouble:

- Home
- Edit
- Comments
- About

It's the subjects page that is likely to cause problems in a few cases. For now, I'll ask only that you do the best you can.

These pages don't really have to do much at this point. I just want you to be able to load them. It is okay if they say nothing more than the following, where each word stored in a jade file using the H1 tag:

- Main
- Edit
- Subjects
- Comments
- About

In other words, I want you to create the following files and to be able to display or use them when I click on the menu items:

| Menu           | Jade           | JavaScript   |
| --------------:| --------------:| ------------:|
| Home           | main.jade      | control.js   |
| Edit           | edit.jade      | edit.js      |
| Subjects       | subjects.jade  | subjects.js  |
| Comments       | comments.jade  | comments.js  |
| About          | about.jade     | about.js     | 

You should also include an **app.js** file similar to the one in the **MongooseEditor** project.

## Mongoose

This part of the assignment is not due yet. It is just a peak at where we are headed.


## Turn it in

Submit you work in a folder called **Week10-AngularOnePage**.
