# Prog 272 Final Spring 2017

I will try to fill in more details later, but this should help you get started.

This is a take home exam. It will be graded fairly liberally. Not everyone is expected to finish everything. Simply complete as much as you can in a reasonable period of time.

## Core Programs

There should be at least the following three programs.

- CongressAddress
- CongressServer
- CongressNative

## Core Features

- CongressServer should be running on port 30025 and be able to access your data on **mlab**.
- CongressAddress should be able to talk to the server.
- CongressNative should be able to talk to CongressServer

## DataBase Features

- Take your address-list and put it in the database.
- Display data from the database in CongressAddress.
- Iterate over records.
- Work disconnected via **localstorage**
- Refresh data from database.
- Update records in **localStorage**
- Delete a record in **localStorage**.
- Extra Credit: Update a record in the database.
- Extra Credit: Delete a record
- Extra Credit: Refresh database from CongressAddress with new data from your address-list.json.

## Platforms

- CongressAddress and CongressServer on Linux
  - You can develop on Mac or Windows, but I will run them on Linux
  - This should just work. But you might want to try it to be sure.
  - Windows users watch for casing issues. On Linux, **MyFile.js** is not the same as **myFile.js**. It will be the same on Windows, but not on Linux.
- Have a final build of CongressAddress talking to mlab on Heroku
- Have something that talks to mlab on CongressNative running on Expo.
  - If it shows even two fields from the database on a single component, then that is fine.
  - You don't need to duplicate all of CongressAddress

## Turn it in

In your repository, in **master**, in a branch called **final**, or in both.

Add, commit, push. Branch and/or tag. Push your branch and/or tag.

Specify, in the following format, at the top of your comments, on the text page of the Canvas submission process, the following:

- Branch and/or tag
- CongressAddress folder
- CongressServer folder
- CongressNative folder
- A link to your program running on Heroku.

Optional, include a commit number.

In your repository, in a folder off the root called images, Include these screenshots:

- CongressAddress running on your development machine and displaying a record from the database.
- The bash command line where your server is running as it looks right after you ask for **all-data**.
- Your program on Heroku.
- Your program on your phone.

## Concurrently

```
npm install --save concurrently
```

And add these lines to the scripts section of **package.json**:

```
"go": "concurrently 'npm run server' 'npm start'",
"server": "nodemon ../CongressServer/bin/www"
```

To use the **go** option, type **npm run go**.
