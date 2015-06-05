## Description

Incorporate the Moongoose editor material into your midterm project. Start by copying your existing midterm into a folder called **Week10-AngularOnePage**.

There are two aspects to this assignment:

1. Add a menu and multiple pages that allow the user to switch between the following views:
  - Home
  - Edit
  - Subjects
  - Comments
  - About
1. Switch to mongoose by creating a Facade object with an interface similar to the objects found in **ScienceResource.js** and **ScienceFacade.js**. It would be best if we could simply link this new page into our application without having to change any code except a script tag in **layout.jade**. We did this earlier when we learned how to switch in our mock **ScienceFacade.js** file.

For this assignment, I expect you to complete part 1, and to make a start on part 2. In a later assignment we will complete part 2.

## Single Page

The key features needed to turn our midterm into a true single page app are:

- An expanded menu similar to the one found in the **MongooseEditor** assignment.
- Multiple pages that can be swapped in while maintaining an unchanged header. Again, this is similar to the functionality found in the **MongooseEditor** project.

In most cases, this should be a fairly straightforward operation. There are, however, one or two midterm projects created by students where incorporating these new pages might be a bit tricky. I think, however, that everyone should be able to create the following pages with little trouble:

- Home
- Edit
- Comments
- About

It's the subjects page that is likely to cause problems in a few cases. For now, I'll ask only that you do the best you can.

## Mongoose

The key to incorporating your Mongoose code will be to create a "Facade" object similar to the one created in the AngularScienceFacade and AngularScienceFacadeUi projects. The point is that we don't want to change the structure of our main application. We want to be able to just plug in the new mongoose based code into our project, and still allow us to switch in the **ScienceFacade** and original MongoDb **ScienceResource** code.

One of the pitfalls that developers can fall into when writing this type of code is to get overly concerned about the overhead of the facade file. Yes, many of your calls to the database will now pass through an extra layer of code found in the Facade object. The point to grasp, however, is that on modern machines such calls typically take a few nanoseconds at most to execute. This is not a big price to pay for the advantages accrued by developing a loosely coupled, flexable architecture with reusable components.

I should add that there can be times when the overhead of a call that takes only a few nanoseconds can be felt. For instance, if that code appeared in a loop that was going to be iterated millions of times. However, that is not the case is this instance. We are going to make single, stand alone, calls to load or send data to the server. The overhead of the call to the server dwarfs the overhead of a call through a facade object.


## Turn it in

Submit you work in a folder called **Week10-AngularOnePage**.
