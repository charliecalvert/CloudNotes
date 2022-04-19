---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/WebCrafts/ElvenWebCraftsDatabase.md
relativePath: Assignments/WebCrafts/ElvenWebCraftsDatabase.md
title: ElvenWebCraftsDatabase
queryPath: Assignments/WebCrafts/
subject: WebCrafts
fileNameMarkdown: ElvenWebCraftsDatabase.md
fileNameHTML: ElvenWebCraftsDatabase.html
---


<!-- toc -->
<!-- tocstop -->

## Ubuntu Server 16.04 with MongoDb

Here is a copy of Ubuntu Server with MongoDb pre-installed. It's about 2 GB, so have patience with the download.

- [Ubuntu Server OVA](http://www.ccalvert.net/books/CloudNotes/Assignments/Mongo/UbuntuServerOva.html)

When the download is complete load it in VirtualBox.

**NOTE**: _The server is relatively small. It can run on machines with limited resources. You can lower the amount of RAM allocated to it and it should still work._

The login:

- UserName: bcuser
- Password: bcuser

The code first loads your key. Then copies the matching public key to the **authorized_keys** file on the server. Then it logs into the server.

## Example Database Records for Login

The data model is defined in **models/user.js**. Here is a simplified example MongoDb record:

```json
{
    "lastName": "bar",
    "firstName": "bar",
    "email": "bar@foo.com",
    "password": "abc",
    "username": "bar",
}
```

Actual records will look more like this.

```json
{
    "_id": {
        "$oid": "557f238c77e80f000a9e4100"
    },
    "lastName": "bar",
    "firstName": "bar",
    "email": "bar@foo.com",
    "password": "abc",
    "username": "bar",
    "__v": 0
}
```

## MLab Database for Login

In routes/connect.js you will need to file in these fields if you want to connect to the database :

```
var userName = 'YOUR-USER-NAME';
var password = 'YOUR-PASSWORD';
var siteAndPort = 'YOUR-MONGODB-SITE-AND-PORT';
var databaseName = 'YOUR-DATABASE-NAME';
```
