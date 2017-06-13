# Prog 272 Final Spring 2017

I will try to fill in more details later, but this should help you get started.

This is a take home exam. It will be graded fairly liberally. Not everyone is expected to finish everything. Simply complete as much as you can in a reasonable period of time.

## Core Programs

There should be at least the following three programs.

- Congress
  - CongressAddress
  - CongressServer
- CongressNative
- Congress Address on Heroku

You should have at least 30 unit tests passing. You can pick which ones. But have some working.

## Core Features

- I should be able to run CongressServer on port 30025 and be able to access your data on **mlab**.
- CongressAddress should be able to talk to the server and concurrency should be in your **package.json** file for CongressAddress.
- CongressNative should be able to talk to CongressServer. Provide source and a screenshot of it running on your phone.
- The URL of your CongressServer/CongressAddress app running on Heroku

I just want the URL of your Heroku project. I want the Heroku HTTP address, not the source. If you do want to give me the source, be sure to remove the .git folder from your Heroku project's directory. You don't want to nest git folders. Heroku, by default, has a .git repository. Don't put that repository in your repository. Instead, first remove the .git folder from the heroku directory.

Better yet, just send me the URL of your app on Heroku, don't try to turn in the source form the heroku directory. I do want the source for CongressAddress and CongressServer and CongressNative, but not the source to the heroku project.

## DataBase Features

- Take your address-list and put it in the database.
- Display data from the database in CongressAddress.
- Iterate over records.
- Work disconnected via **localstorage**
- Refresh data from database.
  - My button clears localStorage and then pulls again from the MongoDb
  - When you get the data from DB, have it repopulate localStorage
- Update records in **localStorage**
- Extra Credit" Delete a record in **localStorage**.
  - This is now optional.
  - A simpler option might be to delete from the server and refersh everything.
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
- CongressNative folder or (expo_lastname)
  - Just make it clear which folder I should look in. Tell me explicitly.
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

And also, still in CongressAddress, in its **package.json**, add this line near the top:

```
"proxy": "http://localhost:30025",
```

So the first few lines look like this:

```
{
  "name": "congress-address",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://localhost:30025",
  "dependencies": {
    "bootstrap": "^3.3.7",
    etc...
  }
  etc...
}
```

To use the **go** option, type **npm run go**.

## Build and Deploy

When you feel you are ready to take your app to Heroku, go to the root of your CongressAddress project and type **npm run build**. This will create a folder called **build**, and in it will be a complete copy of your CongressAddress program.

Now you want to go to CongressServer, or to your existing Heroku app, or even to a new application you built with **create-react-app**. If you choose this last option, remember that you will need to copy some files from **CongressServer/routes** folder.

## Build

In CongressAddress:

```
npm run build
```

This creates a production version of our code in a folder called **build**.

Copy the contents of the **build** folder to **CongressServer** or the equivalent. You could do that by issuing this command from the root of the CongressServer:

```
cp -rv ../CongressAddress/build/* public/.
```

Then go into **routes/index.js** and make this change to use **loadFile** to load the **index.html** from your build:

```
router.get('/', function(req, res) {
    'use strict';
    //res.render('index', {title: 'CongressServer'});
    res.loadFile('index.html');
});
```

And then if you want to be able to see the old interface, add this method:

```javascript
router.get('/admin', function(req, res) {
    'use strict';
    res.render('index', {title: 'CongressServer'});
});
```

## Load from database

```
componentDidMount() {
    logger.log('DID MOUNT');
    this.loadFromDatabase();
}

loadFromDatabase() {
    const that = this;
    dataLoader.loadAddresses(function(addressCount) {
        if (!addressCount) {
            throw new Error('Cannot get address count in address.js');
        }
        that.addressCount = addressCount;
        logger.log('LOADED ADDRESS');
        const address = getByIndex(that.addressIndex);
        that.setState({
            address: address
        });
    });
}
```

## Start from Scratch

Go to the ~/Source folder:

```
CreateExpressProject lastname07
cd lastname07
cp -r ~/Git/prog272-calvert-2017/CongressServer/* .
npm start
```

Now go to localhost:30025

Once you see it works. Let's herokuize it:

```
heroku create calvert07
