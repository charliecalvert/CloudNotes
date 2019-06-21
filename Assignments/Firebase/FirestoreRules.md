## Overview

If you got to the point where you hosted your site and began to read and write to the database, you should learn how to secure your database. In particular, after the quarter ends, you should ensure that your database is not completely open to the world.

**NOTE**: _I believe most of you are on the free [Spark plan](https://firebase.google.com/pricing) and won't get charged regardless of what happens. So the concern here is not money. But one still wants to consider these issues, and some of you may not be on the Spark plan._

Please leave your database open to reading and writing until after the quarter ends. Wait until the Tuesday after finals week to completely secure your database or shutdown hosting. Under normal circumstances, the last day I could possibly be grading your code is on the Monday after finals week. So leave things open until Tuesday (June 25, 2019) to make sure that your app doesn't fail because you have turned off write access and I'm trying to see if you know how to write code that inserts data into the DB.

**NOTE**: _In some cases you may find that I changed your database rules while grading your work. I don't plan to do anything that will cause your app to stop functioning, but still you should know that I may have made a change to your rules._

## Disable Site

You only need to worry about disabling a hosted site that writes data to the database. If your site is not hosted, or it is hosted and you don't use the database, then there is no real concern.

In most cases, you will want to leave your site hosted so you can show it off. However, if you want to disable the site, that is easy. Go to the command prompt and type:

    firebase hosting:disable

After that no one can reach your deployed site. To re-enable the site, simply redeploy:

    firebase deploy

## Strong Rules

If you have database code working and want to leave the site up, put some good rules in the **database.rules.json** file in the root of your Firebase Hosting projects and in the Firebase Console in the **Rules** page of the Database section for your project.

**NOTE**: _None of these rules will apply to us since we have successfully setup and verified tokens and logged in as admin. However, it is still a good idea to shut things down as tightly as possible. To learn more, read the next section._

<img class="sizer" src="https://s3.amazonaws.com/bucket01.elvenware.com/images/firestore-database-rules.png" alt="Firestore rules" />

**Image**: _Putting rules in the firebase console._

Here are some secure rules to put in the console and in **database.rules.json**:

```javascript
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if request.auth.uid != null;
      allow write: if false;
    }
  }
}
```

This ensures only those who are signed in can read the database and no one can write to it. Remember that if you are admin, then the rules don't apply to you.

If there are rules in **database.rules.json** and you deploy an app, then those rules are pushed to the console and overwrite whatever you put there.

## We Are Safe

In general, our apps are safe because we run queries only from the server side. Nothing is impossible, but it is very hard for anyone to modify the requests we make on the server side, and all our database requests are made on the server side. Our requests are hardcoded, there are no parameters or wildcards in our requests. This makes them very hard to hack.

However, it is possible, and somewhat interesting, to tighten things up a bit more. If you want to be safer, explicitly check the email of the logged in user in **verifyToken**. For instance this code would ensure that only two users (foo and bar) can perform actions:

```JavaScript
const emails = ['foo@gmail.com', 'bar@gmail.com'];
if (emails.includes(decodedToken.email)) {
    resolve(decodedToken);
} else {
    reject(decodedToken.email + ' is not an elvenware user.');
}
```

The whole method would look like this:

```javascript
function verifyToken(token) {
    return new Promise(function(resolve, reject) {
        if (!loggedIn) {
            init();
        }
        admin
            .auth()
            .verifyIdToken(token)
            .then(function(decodedToken) {                
                const emails = ['foo@gmail.com', 'bar@gmail.com'];
                if (emails.includes(decodedToken.email)) {
                    resolve(decodedToken);
                } else {
                    reject(decodedToken.email + ' is not an elvenware user.');
                }
            })
            .catch(function(error) {
                console.log(error);
                reject(error);
            });
    });
}
```    

If you do this before the quarter ends, make sure the email I use for hangouts is included in the list of accepted emails. For instance, replace **foo@gmail.com** with my hangouts email and **bar@gmail.com** with your email.

## Weak Security

Here is how to leave your database wide open. This is good for development, but not good for an application in production:

```javascript
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}
```

## More Info

The sections below are FYIs. The above is all you need to know to secure your app.

## Only the Author

Here is how to ensure that only the person who originally inserted the data can update the data:

```JavaScript
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth.uid == request.resource.data.author_uid
    }
  }
}
```

## Food for Thought

Here are a few other options to consider

```javascript
service cloud.firestore {
  match /databases/{database}/documents {
    match /Events/{event} {
      allow read: if request.auth.uid != null;
      allow write: if request.auth.token.email == "authedWriteUser@gmail.com";
    }
  }
}

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
  		allow read: if true;
      allow write: if true;
    }
  }
}

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if request.auth.uid != null;
      allow write: if "auth.token.email_verified == true && auth.token.email.matches(/^elvenware@gmail.com$/)";
    }
  }
}

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if request.auth.uid == request.resource.data.author_uid,
      allow write: if "auth.token.email_verified == true && auth.token.email.matches(/^elvenware@gmail.com$/)"    
    }
  }
}
```
