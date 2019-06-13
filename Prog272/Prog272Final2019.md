## Overview

The main goal is to create properly working versions of:

- AddressMaven
- FirebaseAddressMaven
  - Your Firebase code should be deployed to Firebase Hosting

I'll also be looking at:

- ESLint
- Prettier
- Tests

## Steps

I'll do something like this:

1. Look to see if you told me what folder you want me to look at.
  1. It should be **AddressMaven** and **FirebaseAddressMaven**
1. Ensure that you supply a link to your deployed version of **FirebaseAddressMaven**.

Here are some of the key steps I'll take when grading your assignment.

1. For **AddressMaven**, I'll go to that folder and start your program.
2. In the Menu for your program, I'll expect to see:
  1. Home
  2. Login
  3. Logout
  4. First
  5. Go
  6. AddressShow
  7. AddressForm (Default, empty component with only heading)
  8. AddressList (Default, empty component with only heading)
3. The user should be able to Login and Logout
4. After logging in, the user should be able to iterate through data in **AddressShow**
5. Run your tests, and have **prettier** and **eslint** come back clean

Another key set of steps:

1. Clear **localStorage** and clear the **address** collection in the Firebase Console
2. Login
3. Navigate to the Go page and populate the **address** collection
4. Reload the app, perhaps by going to the home page. This should pull from **address** and populate **localStorage**
5. Test **AddressShow**

These last set of steps don't have to be flawless. In other words, I don't expect you to check every possible path through the menu and ensure that they all work regardless of whether you are signed in, and regardless of whether or not there is data in the **address** collection. But the steps outlined above should work.

We should get this in a very clunk implementation for free, but I'm expecting to see some indicator of whether you are signed in or not. I don't care how it looks, but it is helpful to the user.

## Extra Credit

One little nicety you'll want to implement is handling the case where **AddressShow** is called and there is no data to display. This might happen if the user is not logged in. There are various solutions to this problem and some are dependent on the way you implemented **AddressShow**. In my case I was able to resolve the problem by creating a fake record that can be shown to the user. Perhaps it might look a bit like this:

```javascript
if (!address) {
    address = {
        firstName: 'unknown',
        lastName: 'unknown',
        etc.
    }
}
```

But this solution might not work for all possible implementations of AddressShow. (I don't think there is necessarily a correct or even best implementation. So if they above doesn't work for you, then find one that will work for your implementation. I can't reasonably be expected to anticipate all possible solutions, so I can't provide hints for everyone...)

I believe you will need to do something similar for the **FirebaseLogout/FirebaseLogin** page. (I suggest renaming the page I called **FirebaseLogin.js** to **FirebaseLogout.js** just because it is a much more appropriate name. But be wary, as making that change requires that you make changes in several places in your application. These places aren't hard to find, as errors pop up pretty quickly, still I would push before making the change so that you find it easy to undo you changes if it doesn't work out for you.)

## Firebase Address Maven

I'm looking for all the same features as in **AddressMaven**, but I should be able to start the app with **firebase serve** and view it online because you have run **firebase deploy** and ensured that your code works.



## Port 30025

It's easier for me for various reasons if your Firebase app starts on Port 30025 when we use **firebase serve**. The command to do that is:

    firebase serve --port 30025

Create a file called **go** in the root of your Firebase project. Put the following content in it:

    #! /usr/bin/env bash

    firebase serve --port=30025

Make sure that **go** is executable:

    chmod +x go

Be sure to push your work.

## Database

Add a second button to your **Go** page. When the user selects the button, call a route on the server called **/write-to-db**. On the server, in the **/write-to-db** endpoint, read the data from **address-list.json** and write it to the database.

The address data should be written to a collection called 'address'. Each document in the collection should contain data for one politician. The name of the document should be **lastname-firstname**. For instance: **Alexander_Lamar**.

Create another server side route called **/address-list-db**. It should do the same thing as **/address-list**, but it should return data from the database, not from **address-list.json**.

**NOTE**: _Some of you called the server side route **/get-address-list** rather than **/address-list**. The point is not what it was called, but what it did._

Base your code for reading and writing to the database on the code in the **ElfExpressFirestore** example. Note that I have added code for reading and writing batch data and snapshots. See **batch.js** in the example.

## Turn it in

Be sure to include the Firebase Hosting address to which you have deployed your Firebase app.

State the names of directories where you deployed your code. I'm expecting to see:

- AddressMaven
- FirebaseAddressMaven
- The branch if relevant. Even if you use branches, your final code should also be merged into **master**

Before your final push run **./prettier** and **eslint .** and make sure they come back clean.

After your final push tag your work and give me the tag.
